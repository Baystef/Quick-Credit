import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import logger from './src/helper/debugger';
import user from './src/routes/users';
// import loan from './src/routes/loans';
// import repayment from './src/routes/repayments';


const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1', user);
// app.use('/api/v1', loan);
// app.use('/api/v1', repayment);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Quick Credit' });
});
app.use('*', (req, res) => {
  res.status(404).send('route not found');
});


const port = process.env.PORT || 4700;

const server = app.listen(port, () => {
  logger(`App is listening on port ${port}`);
});

export default server;
