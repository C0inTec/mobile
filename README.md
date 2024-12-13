# Cointec

Cointec é um projeto em desenvolvimento utilizando **React Native** e **Expo** para criar uma aplicação mobile moderna e responsiva. O objetivo principal do projeto é oferecer uma interface de usuário interativa e fácil de usar para gerenciar conteúdos ou dados financeiros.

## 🚀 Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo**: Ferramenta que facilita a construção, execução e empacotamento do app.
- **React Navigation**: Biblioteca de navegação utilizada para gerenciar as rotas e a estrutura do app.

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

Cointec/ ├── src/ │ ├── api/ # Serviços e chamadas à API │ ├── components/ # Componentes reutilizáveis │ ├── pages/ # Páginas da aplicação │ │ └── main/ # Página principal │ ├── routes/ # Configuração das rotas │ │ └── routes.js # Rotas principais do app ├── App.js # Ponto de entrada do aplicativo ├── app.json # Configurações do Expo ├── package.json # Dependências e scripts do projeto ├── .gitignore # Arquivos ignorados pelo Git


## 🔑 Funcionalidades

- **Navegação**: Configuração de navegação com o `React Navigation` utilizando `Stack Navigator`.
- **Organização de Rotas**: Todas as rotas são gerenciadas no arquivo `routes.js` para facilitar a manutenção.
- **Estilo Personalizado**: Estilização utilizando `StyleSheet` do React Native.


## 🛠️ Como Rodar o Projeto

1. Certifique-se de ter o Node.js e o Expo CLI instalados em sua máquina.
2. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/cointec.git
Instale as dependências:
npm install

Inicie o projeto com Expo:
npm start

Abra o aplicativo em um emulador ou dispositivo físico utilizando o QR Code gerado no terminal.
