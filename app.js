const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
require('express-async-errors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/products', routes.productsRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;