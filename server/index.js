import '@babel/polyfill';
import express from 'express';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import logger from './src/helper/debugger';
import routes from './src/routes';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(expressValidator());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Quick Credit' });
});
app.use('*', (req, res) => {
  res.status(404).send('route not found');
});
app.use((err, req, res, next) => {
  if (req.app.get('env') === 'development') {
    logger(err);
  }
  return res.status(400).json({
    status: 400,
    error: err.message,
  });
});

const port = process.env.PORT || 4700;

const server = app.listen(port, () => {
  logger(`App is listening on port ${port}`);
});

export default server;
