# Mercafacil-API

## API Para CRUD de contatos :
Existem duas empresas cadastradas para gerar token:
Varejao - /varejao/auth { login: 'varejao', pass: '1234' } 
Macapa - /macapa/auth { login: 'macapa', pass: '1234' }
Para uma rota com autenticação usar authorization no headers passando o token

## Metodo aceitos
- GET - /:varejao/contacts/ - lista com todos os contatos
- GET - /:varejao/contacts/:id - lista contatoc com id especifico
- POST - /:varejao/contacts/ - aceita um objeto com dados, inseri apenas 1, ou uma lista { contacts: [{ nome: "Teste", celular:"5599999999999" }] }
- PUT - /:varejao/contacts/:id - Atualiza um determinado contato baseado no ID 
- DELETE - /:varejao/contacts/:id - Deleta um determinado contato baseado no ID 
- DELETE - /:varejao/contacts/ - Deleta todos os contatos

obs: O Get nao necessita token


