Readme - 🇺🇸 Football Match Management (Back-End)
Readme - 🇧🇷 Gerenciamento de Partidas de Futebol (Back-End)

🇧🇷 Este readme fornece informações detalhadas sobre o Back-End da aplicação de Gerenciamento de Partidas de Futebol, incluindo sua estrutura, funcionalidades, bibliotecas utilizadas e práticas de desenvolvimento. O Front-End da aplicação já está pronto e não será abordado neste documento.

🇺🇸 This readme provides detailed information about the Back-End of the Football Match Management application, including its structure, features, used libraries, and development practices. The Front-End of the application is already complete and will not be covered in this document.

🇧🇷 Estrutura de Pastas e Organização
A aplicação Back-End está organizada seguindo o padrão MSC (Model, Service, Controller), proporcionando uma estrutura limpa e escalável. As pastas principais e suas responsabilidades são as seguintes:

Controller: Controladores que lidam com as requisições HTTP e a lógica de roteamento.
Service: Camada de serviço que contém a lógica de negócios da aplicação.
Database (Model/Migration): Modelos de dados e migrações para a criação e modificação do esquema do banco de dados.

🇺🇸 Folder Structure and Organization
The Back-End application is structured following the MSC (Model, Service, Controller) pattern, providing a clean and scalable architecture. The main folders and their responsibilities are as follows:

Controller: Controllers that handle HTTP requests and routing logic.
Service: Service layer containing the business logic of the application.
Database (Model/Migration): Data models and migrations for database schema creation and modification.

🇧🇷 Bibliotecas Utilizadas
Para o desenvolvimento deste projeto, foram utilizadas as seguintes bibliotecas:

Sequelize: Um ORM (Object-Relational Mapping) que simplifica a interação com bancos de dados relacionais.
Express: Um framework de aplicativo web Node.js que facilita a criação de APIs RESTful.
JsonWebToken: Utilizado para autenticação e autorização baseada em tokens.
Bcrypt: Biblioteca para a criptografia segura de senhas.
Mysql2: Driver MySQL para Node.js.
Funcionalidades
Autenticação e Autorização
A aplicação requer a autenticação de usuários cadastrados no banco de dados. O processo de adição de novos usuários é facilitado pelos SEEDERS do SEQUELIZE, garantindo que os usuários tenham acesso à aplicação. As permissões dos usuários são controladas através do token JWT (JsonWebToken).

🇺🇸 Used Libraries
For the development of this project, the following libraries were used:

Sequelize: An Object-Relational Mapping (ORM) library that simplifies interaction with relational databases.
Express: A Node.js web application framework that facilitates the creation of RESTful APIs.
JsonWebToken: Used for token-based authentication and authorization.
Bcrypt: A library for secure password hashing.
Mysql2: MySQL driver for Node.js.
Features
Authentication and Authorization
The application requires authentication of users registered in the database. Adding new users is facilitated by SEEDERS in SEQUELIZE, ensuring that users have access to the application. User permissions are controlled using JWT (JsonWebToken) tokens.

🇧🇷 Consulta de Dados
Os usuários autenticados podem realizar as seguintes consultas:

Recuperar informações de todos os times.
Listar todas as partidas registradas.
Consultar partidas específicas por time.
Visualizar o dashboard com informações sobre as partidas.
Filtrar partidas por "em casa" e "fora de casa".

Ações Permitidas
Com base nas permissões do usuário, ele pode executar as seguintes ações:

Criar novas partidas.
Encerrar partidas em andamento.
Atualizar o placar das partidas.

🇺🇸 Data Queries
Authenticated users can perform the following queries:

Retrieve information about all teams.
List all registered matches.
Query specific matches by team.
View the dashboard with match-related information.
Filter matches by "home" and "away" status.

Permitted Actions
Based on user permissions, they can perform the following actions:

Create new matches.
End ongoing matches.
Update match scores.


Testes
O Back-End foi submetido a Testes Unitários e Testes de Integração para garantir a qualidade do código e a funcionalidade da aplicação. A prática do TDD (Desenvolvimento Orientado por Testes) foi aplicada, e a cobertura de código foi mantida em níveis adequados.

🇺🇸 Testing
The Back-End underwent Unit Testing and Integration Testing to ensure code quality and application functionality. The practice of Test-Driven Development (TDD) was applied, and code coverage was maintained at appropriate levels.

🇧🇷 Executando a Aplicação
Para executar a aplicação Back-End, siga os seguintes passos:

Clone o repositório da aplicação.
Instale as dependências com npm install ou yarn install.
Configure o banco de dados no arquivo de configuração Sequelize.
Execute a migração do banco de dados com npm run migrate ou yarn migrate.
Inicie o servidor com npm start ou yarn start.
Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas corretamente, incluindo a chave JWT e as informações de conexão com o banco de dados.

🇺🇸 Running the Application
To run the Back-End application, follow these steps:

Clone the application's repository.
Install dependencies using npm install or yarn install.
Configure the database in the Sequelize configuration file.
Run the database migration using npm run migrate or yarn migrate.
Start the server using npm start or yarn start.
Ensure that all required environment variables are properly configured, including the JWT secret key and database connection information.

🇧🇷 Conclusão
Este Back-End de Gerenciamento de Partidas de Futebol oferece uma estrutura organizada, funcionalidades poderosas e segurança no acesso aos dados. Certifique-se de revisar a documentação do Front-End para obter informações completas sobre o uso da aplicação como um todo.

Para quaisquer dúvidas ou problemas, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento.

Agradecemos por escolher nossa aplicação de Gerenciamento de Partidas de Futebol!

🇺🇸 Conclusion
This Football Match Management Back-End offers an organized structure, powerful features, and data access security. Be sure to review the Front-End documentation for complete information on using the application as a whole.

For any questions or issues, please feel free to contact the development team.

Thank you for choosing our Football Match Management application!


🇺🇸 Development Team 🧑‍💻
🇧🇷 Equipe de Desenvolvimento 🧑‍💻

Eduardo Malhao - https://www.linkedin.com/in/eduardo-malhao/












