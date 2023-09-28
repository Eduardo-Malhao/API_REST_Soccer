# README:
Back-end - Gerenciamento de Partidas de Futebol

OBS: Apenas o Back-End foi desenvolvido (Front-end estava pronto)

Organização de pastas em formato MSC (Controller, Service, Database(Model/Migration))
Bibliotecas utilizadas:
 Sequelize
* Express
* JsonWebToken
* Bcrypt
* Mysql12

A aplicação funciona através de usuários préviamente cadastrados no banco de dados.
Adição de novos usuários é feita através dos SEEDERS do SEQUELIZE.
O mesmo usuário poderá, requisitar:
* Todos os Times
* Todas as partidas
* Todas as partidas por Time
* Dashboard das partidas
  * Partidas por Time em casa
  * Partidas por Time fora de casa
  * Todas Partidas

De acordo com as permissões do usuário será possível:
A verificação do usuário será feita de acordo com o token que o mesmo possuí.
-> Criar novas partidas
-> Encerrar partidas em Andamento
-> Atualizar o Placar da Partida

O Back-End foi testado utilizando Testes Unitários e Testes de Integração, com a devida cobertura de código e aplicação do TDD.
