import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('This is Quick Credit');
});


const port = process.env.PORT || 4700;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default server;
