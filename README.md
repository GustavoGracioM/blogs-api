# Blogs Api

Blogs Api é um projeto do módulo de back-end do curso de desenvolvimento  web da <a href="https://www.betrybe.com/">Trybe</a>. Objetivo do projeto era desenvolver uma API Rest e um banco de dados com sequelize para a produção de conteúdo de um blog e com ela realizar um CRUD.



![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## Habilidades utilizadas

* Javascript
* NodeJs
* Express
* Docker
* MySql
* Sequelize 


### Instrução de instalação

1. Clone o repositório
* `git clone git@github.com:GustavoGracioM/blogs-api.git`

2. Executando  Docker

* Inicialize container docker:
    * `docker-compose up -d --build`
* Entre no container:
    * `docker exec -it blogs_api bash`
* Instale as dependências
    * `npm install`
* Inicialize a aplicação
    * `npm run prestart`
    * `npm run seed`
    * `npm start`
    
# Endpoints:

## POST `/login`
- 
O endpoint faz login e gera um token de acesso;
- O corpo da requisição deve seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456",
  }
  ```
- Se algum dado estiver incorreto, o status 400 e uma mensagem de erro serão retornados;

- Quando o login é bem-sucedido, o status 200 e um token de acesso são retornados;

## POST `/user`
- O endpoint adiciona um novo `usuário` ao banco de dados e gera um token de acesso;
- O corpo da requisição deve seguir o formato abaixo:
  ```json
  {
    "displayName": "Blogs Api",
    "email": "blogsapi2@email.com",
    "password": "1234567",
    "image": "https://www.pngwing.com/pt/free-png-bqanx"
  }
  ```
- Se algum dado estiver incorreto, o status 400 e uma mensagem de erro serão retornados;
- Quando o login for bem-sucedido, o status 201 e um token de acesso são retornados;

## GET `/user`
- O endpoint lista todos os usuarios;
- Para realizar essa requisição é necessario ter um token valido;

## GET `/user/:id`
- O endpoint retorna um único usuário através do seu id;
- Caso não exista a postagem um erro com o status `404` e uma messagem é retornado;
- Para realizar essa requisição é necessario ter um token valido;

## POST `/categories`
- O endpoint adiciona uma nova `categoria` ao banco de dados;
- Para realizar essa requisição é necessario ter um token valido;
- O corpo da requisição deve seguir o formato abaixo:
  ```json
  {
    "name": "Criar categoria"
  }
  ```
- Se o dado estiver incorreto, o status 400 e uma mensagem de erro serão retornados;
- Quando os dados são inseridos, o status 201 é retornado e os dados recém-criados;

## GET `/categories`
- O endpoint lista todas as categorias registradas no banco;
- Para realizar essa requisição é necessario ter um token valido;

## POST `/post`
- O endpoint adiciona um novo `post` ao banco de dados;
- Para realizar essa requisição é necessario ter um token valido;
- O corpo da requisição deve seguir o formato abaixo:
  ```json
  {
    "title": "Post Title",
    "content": "Post Content",
    "categoryIds": [1, 2]
  }
  ```
- Se o dado estiver incorreto, o status 400 e uma mensagem de erro serão retornados;
- Quando os dados são inseridos, o status 201 é retornado e os dados recém-criados;
    
## GET `/post`
- O endpoint lista todas as postagens do usuário;
- Para realizar essa requisição é necessario ter um token valido;

## GET `/post/:id`
- O endpoint retorna uma única postagem através do seu id;
- Caso não exista a postagem um erro com o status `404` e uma messagem é retornado;
- Para realizar essa requisição é necessario ter um token valido;
    
## PUT `/post/:id`
- O endpoint atualiza a postagem no banco de dados se o usuário for o proprietário da postagem;
- Para realizar essa requisição é necessario ter um token valido;
- O corpo da requisição deve seguir o formato abaixo:
  ```json
  {
    "title": "Title post",
    "content": "Content post"
  }
  ```
- Se algum dado estiver incorreto, o status 400 e uma mensagem de erro serão retornados;
- Quando os dados são inseridos, o status 200 é retornado e os dados recém-criados;

## DELETE `/post/:id`
- O endpoint exclui o dado se o usuário for o proprietário da postagem;
- Caso não exista a postagem um erro com o status `404` e uma messagem é retornado;
- Para realizar essa requisição é necessario ter um token valido;
- Se a postagem for deletado com sucesso, o status 204 é retornado;

## DELETE `/user/me`
- O endpoint exclui o usuario se o ele estiver logado;
- Para realizar essa requisição é necessario ter um token valido;

## GET `/post/search?q=:searchTerm`
- O endpoint filtra as postagem que contenham em seu título ou conteúdo o termo passado;
- Para realizar essa requisição é necessario ter um token valido;
