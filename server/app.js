import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(apiRoutes);
app.use((req, res, done) => {
  res.header('Accept', 'application/json, text/plain, */*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, jwt');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
  res.header('Content-Type', 'application/json');
  done();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

export default server;
