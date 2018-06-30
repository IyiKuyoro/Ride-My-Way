import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/routes';

const app = express();
app.use(bodyParser.json());

app.use(apiRoutes);

const { PORT } = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

export default server;
