# Teste Conexa Backend

## Instalação
1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd conexa-backend
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=conexa
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```

4. Execute as migrações do banco de dados:
```mysql
CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  documentNumber VARCHAR(14) NOT NULL,
  birthDate DATE NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL
);

CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  documentNumber VARCHAR(14) NOT NULL 
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointmentTimestamp DATETIME NOT NULL,
  patientId INT NOT NULL,
  doctorId INT NOT NULL,
  FOREIGN KEY (doctorId) REFERENCES doctors(id),
  FOREIGN KEY (patientId) REFERENCES patients(id)
);
```

## Execução
Para iniciar o servidor:
```sh
npm start
```

## Testes
Para executar os testes:
```sh
npm test
```