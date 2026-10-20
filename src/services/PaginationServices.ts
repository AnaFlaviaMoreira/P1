import { Repository, ObjectLiteral, FindOptionsOrder } from "typeorm";

interface paginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;

}

export class PaginationServices<T> {
    static async paginate <T extends ObjectLiteral>(
        repository: Repository<T>,
        page: number = 1,
        limit: number = 10,
        order:FindOptionsOrder<T> = {}

        


    ): Promise<paginationResult<T>> {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limit);

        if (page > lastPage && totalRecords > 0) {
            throw new Error(`Página inválida. O total de páginas é ${lastPage}.`);
        };

        const offset = (page - 1) * limit;

        const data = await repository.find({
            take: limit,
            skip: offset,
            order: order
        });

        return {
            error: false,
            data: data,
            currentPage: page,
            lastPage: lastPage,
            totalRecords: totalRecords
        };

    }

    

}