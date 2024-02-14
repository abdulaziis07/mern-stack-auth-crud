import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production']
    }),
    MONGODB_URI: str(),
    MONGODB_DB_NAME: str(),
    ACCESS_TOKEN: str(),
    REFRESH_TOKEN: str(),
    PORT: port({ default: 9000 })
  });
}

export default validateEnv;
