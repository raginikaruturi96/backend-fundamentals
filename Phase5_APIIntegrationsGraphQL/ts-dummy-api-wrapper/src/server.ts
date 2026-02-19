import 'reflect-metadata';
import express from 'express';
import { UserController } from './controllers/user.controller';

const app = express();
app.use(express.json());

function registerController(controllerClass: any) {
  const instance = new controllerClass();
  const basePath = Reflect.getMetadata('basePath', controllerClass);

  const prototype = Object.getPrototypeOf(instance);

  Object.getOwnPropertyNames(prototype).forEach((methodName) => {
    if (methodName === 'constructor') return;

    const method = Reflect.getMetadata('method', prototype, methodName);
    const path = Reflect.getMetadata('path', prototype, methodName);

    if (method && path) {
      app[method](
        basePath + path,
        (req: express.Request, res: express.Response) =>
          instance[methodName](req, res)
      );
    }
  });
}

// Register controllers
registerController(UserController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
