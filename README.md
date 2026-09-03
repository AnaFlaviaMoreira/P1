verificar se tem:   node -v   
##REQUISITOS
Node.js 22 ou superior

Criar arquivo package
npm init 

Instalar express p gerenciar requisições, rotas URLs
npm i express

instalar pacotes para suporte ao TypeScript 

npm i --save-dev @types/express
npm i --save-dev @types/node

instalar compilador projetos TypeScript e reiniciar quando o arquivo é modificado
npm i --save-dev ts-node

Compilar

npx tsc 

executar 
node dist/index.js

compilar arquivo TS Executar arquivo gerado
npm run start:watch