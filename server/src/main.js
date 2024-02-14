import 'dotenv/config';
import App from './app.js';
import validateEnv from './utils/validateEnv.js';

validateEnv();

const app = new App(Number(process.env.PORT));
app.listen();
