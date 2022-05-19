import { createConnection } from 'typeorm';

createConnection()
    .then(() => console.log("Conectado"))
    .catch(e => console.log(e));