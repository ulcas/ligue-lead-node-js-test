<p align="center">
  <img src="https://liguelead.com.br/wp-content/uploads/2024/05/LOGO-LL-VERDE-E-BRANCO-1024x331.png" alt="Descrição da imagem" width="400"/>
</p>

# Desafio Técnico — Node.js
[Descrição do desafio](https://github.com/ligue-lead-tech/node-js-test)

## Tecnologias e documentações utilizadas
- [Node.js](https://nodejs.org/docs/latest-v18.x/api/index.html)
  - [Express](https://expressjs.com/pt-br/guide/routing.html)
    - [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
    - [Express-validator](https://www.npmjs.com/package/express-validator)
  - [Sequelize](https://sequelize.org/docs/v6/)
  - [axios](https://axios-http.com/ptbr/docs/intro)
  - [Helmet](https://www.npmjs.com/package/helmet/v/6.1.2)
- [Docker](https://docs.docker.com/reference/cli/docker/)
  - [Docker-Compose](https://docs.docker.com/reference/cli/docker/compose/)  
  - [Dockerize](https://github.com/jwilder/dockerize)
- [GIT](https://git-scm.com/)
- [API](https://aws.amazon.com/pt/what-is/restful-api/)
- [MySQL](https://dev.mysql.com/doc/refman/8.4/en/)
- [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS)

## Requisitos
- Docker + Docker Compose
- [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download)

## Funcionalidades
- [ ] Cria, Atualiza e apaga um projeto e as tarefas/repositórios vinculados a ele (se houver)
- [ ] Lista todos os projetos
- [ ] Cria, Atualiza e apaga as tarefas vinculadas a um projeto
- [ ] Vincula os últimos 5 repositórios públicos de um usuário do GitHub

## Como Instalar

1. Clone o repositório
```bash
git clone https://github.com/ulcas/ligue-lead-node-js-test.git
```
2. Acesse o diretório do projeto e crie o .env
```bash
cd ligue-lead-node-js-test
cp .env.example .env
```
3. Crie e suba o container do docker
```bash
docker compose up --build -d
```
> Containers: `ligue-lead-app` (Node) e `ligue-lead-mysql` (MySQL).

***CERTIFIQUE-SE QUE NÃO HÁ NADA SENDO EXECUTADO NA PORTA 3000 E 3306***

**3.5 (OPCIONAL).** Rodar migrations (Caso não tenha criado as tabelas)

_normalmente as migrations são executadas no momento do build do container, recomendo validar no banco de dados se as tabelas já foram criadas_
```bash
docker exec -it ligue-lead-app npx sequelize-cli db:migrate
```

## Como usar
Após instalar o projeto corretamente e executar as migrations, já deve ser possível acessar a API.

Acesse a URL Base: http://localhost:3000/api e uma mensagem de boas-vindas deve aparecer:
<img width="1418" height="227" alt="image" src="https://github.com/user-attachments/assets/61d5c0f9-f1cf-4aa0-9136-d88b95aa7a08" />

Se a mensagem acima apareceu, a sua API está pronta para uso :)
Caso deseje, pode utilizar a [Collection do Postman](https://github.com/ulcas/ligue-lead-node-js-test/blob/main/ligue_lead_postman_collection.json).

### Segue abaixo um guia dos end-points disponiveis:
## Endpoints (base: http://localhost:3000/api)
### Projects
- POST `/projects`
  ```json
  { "title": "Meu Projeto", "description": "Opcional" }
  ```
- GET `/projects`
- GET `/projects/:id`
- GET `/projects/:id/github/:username`
- PUT `/projects/:id`
- DELETE `/projects/:id`

### Tasks
- POST `/projects/:projectId/tasks`
  ```json
  { 
    "title": "Tarefa",
    "description": "Opcional",
    "status": "pendente|em_andamento|concluido"
  }
  ```
- PUT `/tasks/:id`
- DELETE `/tasks/:id`

| Método  | End-point | Tipo de campo | Descrição | Exemplo de Body / Valores |
| ------- | --------- | ------------- | --------- | ------------------------ |
| GET     | /api      | nenhum        | Rota base, retorna mensagem de welcome | - |
| POST    | /api/projects | body       | Cria um novo projeto | `{ "title": "Projeto X", "description": "Descrição opcional" }` |
| GET     | /api/projects | nenhum     | Lista todos os projetos com tarefas e repositórios vinculados | - |
| GET     | /api/projects/{id} | int  | Retorna um projeto específico pelo ID | - |
| PUT | /api/projects/{id} | body  | Atualiza os dados de um projeto | `{ "title": "Novo título", "description": "Nova descrição" }` |
| DELETE  | /api/projects/{id} | int  | Remove um projeto | - |
| POST    | /api/projects/{projectId}/tasks | body | Cria uma tarefa dentro de um projeto | `{ "title": "Tarefa 1", "description": "Opcional", "status": "pendente" }` |
| PUT | /api/tasks/{id} | body       | Atualiza os dados de uma tarefa | `{ "title": "Nova Tarefa", "status": "em_andamento" }` |
| DELETE  | /api/tasks/{id} | int        | Remove uma tarefa | - |
| GET     | /api/projects/{id}/github/{username} | int:string | Busca os 5 últimos repositórios públicos de um usuário do GitHub e vincula ao projeto | - |

**Observações sobre `status` de tarefas:**
- Valores permitidos: `pendente`, `em_andamento`, `concluido`
- Se não informado ao criar, o valor padrão será `pendente`.

## Comandos Úteis

| Finalidade | Comando |
| ---------- | ------- |
| **Subir containers** | `docker-compose up -d` |
| **Derrubar containers** | `docker-compose down` |
| **Ver logs do container app** | `docker logs -f ligue-lead-app` |
| **Acessar container app** | `docker exec -it ligue-lead-app sh` |
| **Rodar migrations** | `npx sequelize-cli db:migrate` |
| **Rodar migrations no container** | `docker exec -it ligue-lead-app npx sequelize-cli db:migrate` |
| **Reverter última migration** | `npx sequelize-cli db:migrate:undo` |
