# Teste Conexa Backend

## Instalação e Execução com Docker

Este projeto pode ser executado facilmente usando o Docker.
É necessário ter o node instalado em sua máquina.

### 1. Clone o repositório

Clone o repositório e entre na pasta do projeto:

```sh
git clone https://github.com/RaphaelAndres/appointment
cd conexa-backend
```

### 2. Instale as dependências do projeto

Para instalar as dependências de bibliotecas do projeto:

```sh
npm install
```

### 2. Configuração das variáveis de ambiente

Crie um arquivo `.env` com as variáveis de ambiente para a configuração do banco de dados e outras configurações importantes. Você pode usar o arquivo `.env.example` como modelo.

```env
NODE_ENV=development
DATABASE_HOST=db
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=conexa
REDIS_HOST=redis
JWT_SECRET=secret_super_seguro
```

### 3. Construir e subir os contêineres

Para construir e iniciar os contêineres do Docker (incluindo a aplicação, MySQL e Redis), rode o seguinte comando:

```sh
docker-compose up --build
```

### 4. Acessando o servidor

Após a execução do comando anterior, o servidor estará disponível na URL [http://localhost:3000](http://localhost:3000).
