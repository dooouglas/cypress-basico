# Testes Automatizados com Cypress

Este projeto foi desenvolvido durante o curso **"Testes Automatizados com Cypress - Básico"**, ministrado pelo professor **Walmyr** da **Escola TAT**. O objetivo foi aplicar testes automatizados em uma aplicação web chamada **Central de Atendimento ao Cliente TAT (CAC TAT)** e configurar um pipeline de integração contínua para execução automática dos testes.

📌 **Objetivo**

O desafio foi validar todas as funcionalidades da aplicação **CAC TAT** e configurar um pipeline de integração contínua para executar os testes sempre que houvesse alterações no repositório do GitHub. Os testes foram projetados para rodar em diferentes viewports, simulando ambientes desktop e mobile.

--------------------------

### Execução dos Testes

💻 **Desktop:**

- Execute `npm test` (ou `npm t` para a versão curta) para rodar os testes no modo headless em uma viewport de desktop.
- Ou execute `npm run cy:open` para abrir o Cypress no modo interativo em uma viewport de desktop.

📱 **Mobile:**

- Execute `npm run test:mobile` para rodar os testes no modo headless em uma viewport móvel.
- Ou execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo em uma viewport móvel.

--------------------------

### Aplicação em Teste: CAT TAT

A aplicação **CAC TAT** é um sistema web que simula o envio de mensagens para um centro de atendimento ao cliente. O foco do curso foi a automação dos testes utilizando Cypress e JavaScript, enquanto a interface e funcionalidades já estavam predefinidas.

🔧 **Requisitos testados:**

1️⃣ Campos obrigatórios:

- Nome (campo de texto)
- Sobrenome (campo de texto)
- Email (campo de email com validação)
- Mensagem (campo de área de texto "Como podemos te ajudar?")

2️⃣ Outros campos testados:

- Telefone (campo numérico, opcional, mas obrigatório caso "Telefone" seja o meio de contato escolhido)
- Produto (seleção suspensa com opções: Blog, Cursos, Mentoria e YouTube)
- Tipo de atendimento (radio buttons: Ajuda, Elogio, Feedback)
- Meio de contato preferencial (checkboxes: Email, Telefone)
- Anexo (upload de arquivo)

3️⃣ Regras de validação:

- Se "Telefone" for escolhido como meio de contato, o campo telefone se torna obrigatório.
- Desmarcar "Telefone" remove a obrigatoriedade do campo telefone.

4️⃣ Política de Privacidade:

- O link "Política de Privacidade" abre em uma nova aba do navegador.

5️⃣ Mensagens de retorno:

- ✅ Sucesso: "Mensagem enviada com sucesso." (exibido em fundo verde ao enviar o formulário corretamente, retornando os campos ao estado padrão).
- ⚠️ Erro: "Valide os campos obrigatórios!" (exibido em fundo amarelo caso haja erro de preenchimento).

--------------------------

🎯 **Principais Aprendizados**

- Configuração e estruturação de um projeto Cypress do zero.
- Manipulação de elementos comuns em aplicações web.
- Teste de upload de arquivos e validação de regras de preenchimento.
- Criação de comandos customizados para otimizar os testes.
- Interação com links que abrem em novas abas.
- Execução de testes simulando diferentes dispositivos (desktop e mobile).
- Utilização da API do Cypress para diversas estratégias de automação.
- Implementação de um pipeline de integração contínua.
- Documentação mínima para um projeto de testes automatizados.

🛠 **Tecnologias e Ferramentas Utilizadas**

- Cypress
- Node.js (v16.13.2)
- npm (v8.3.2)
- JavaScript
- Visual Studio Code
- Git – Controle de versão
- Live Server

--------------------------

Se você quiser apoiar este projeto, deixe uma ⭐.

Este projeto foi criado com 💚 por [Walmyr](https://walmyr.dev).