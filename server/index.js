import express from 'express';
import morgan from 'morgan';
import user from './src/routes/users';
import loan from './src/routes/loans';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth', user);
app.use('/api/v1/', user);
app.use('/api/v1', loan);

app.get('/api/v1', (req, res) => {
  res.status(200).send({ message: 'This is Quick Credit' });
});


const port = process.env.PORT || 4700;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default server;
