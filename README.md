# Sistema de cadastro de usuário - Full-Stack

Este é um projeto Full-Stack para cadastro de usuário desenvolvido por mim desde o planejamento até a implementação. O sistema abrange todas as etapas, desde a modelagem do banco de dados utilizando até a construção do back-end com Node.js e Express, usando o Prisma para auxiliar na criação do banco de dados PostgreSQL. O Front-End foi desenvolvido usando Next.js.

## Funcionalidades
<br/>
- Listagem de Usuários <br/>
- Cadastro de Usuários <br/>
- Detalhe de Usuário - ao clicar no nome do usuário desejado na lista, um modal será aberto, exibindo todas as informações do usuário, juntamente com as opções de edição e exclusão. <br/>
- Edição de Usuário <br/>
- Exclusão de Usuário <br/>
- Filtragem de Usuários por ID - O teste não solicitava especificamente uma filtragem por ID. Portanto, optei por implementá-la no Front-End, utilizando a lista completa de usuários já carregada na página de listagem. <br/>
- Filtragem por data de criação, do menor para o maior, do maior para o menor e por período - conforme exigido no teste, todos os filtros foram implementados de forma independente, sendo acionados por meio de solicitações à API. <br/>
- Filtragem por nome do Usuário - a funcionalidade de Filtragem por Nome de Usuário foi projetada para permitir que a API filtre e retorne usuários que contenham as letras fornecidas no nome. Se o nome completo for inserido e houver apenas um usuário correspondente, ele será o único retornado. No entanto, se houver vários usuários com o mesmo nome no sistema, todos eles serão retornados. <br/>

## Tecnologias Utilizadas
<br/>
- Back-End: Node.js, Express, Prisma, PostgreSQL.<br/>
- Front-End: Next.js.<br/>
- Clean Code: O projeto foi desenvolvido seguindo boas práticas de código limpo, resultando em um código robusto e de fácil manutenção. <br>

## Instalação
<br/>
1 - Clone o repositório do projeto. <br/>
2 - Instale as dependências do back-end usando o gerenciador de pacotes npm:<br/>
- cd backend <br/>
- npm install <br/>

3 - Configure o banco de dados PostgreSQL com as informações necessárias no arquivo .env.<br/>

4 - Execute as migrações do banco de dados usando Prisma:<br/>
- npx prisma migrate dev <br/>
- Siga as instruções para da documentação do Prisma para construir seu banco de dados: <br/>
[Pagina Prisma](https://www.prisma.io/)

5 - Inicie o servidor do back-end: <br/>
- npm start <br/>

6 - Instale as dependências do front-end: <br/>
- cd frontend <br/>
- npm install <br/>

7 - Inicie o servidor do front-end:<br/>
- npm dev <br/>

## Contribuição
<br/>
Contribuições são bem-vindas! Se você deseja contribuir com o projeto, por favor, abra uma "issue" para discutir suas ideias e sugestões ou envie um "pull request" com suas melhorias.

## Licença 
<br/>
Este projeto está sob a Licença MIT.

## Contato
Em caso de dúvidas ou mais informações, entre em contato comigo:
<br/>
Zezerino Mattos - mattoszz@hotmail.com <br/>
Site - www.zezerino.com.br
