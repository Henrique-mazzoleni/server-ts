import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootControler';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['alskdjflaskdf'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});
