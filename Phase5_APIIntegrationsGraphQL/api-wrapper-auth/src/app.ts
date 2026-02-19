import express, { Request, Response } from 'express';
import 'reflect-metadata';

export const app = express();
app.use(express.json());

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export function registerController(controllerClass: any) {
  const instance = new controllerClass();
  const basePath: string = Reflect.getMetadata('basePath', controllerClass);

  const prototype = Object.getPrototypeOf(instance);

  Object.getOwnPropertyNames(prototype).forEach((methodName) => {
    if (methodName === 'constructor') return;

    const method = Reflect.getMetadata('method', prototype, methodName) as HttpMethod;
    const path = Reflect.getMetadata('path', prototype, methodName) as string;

    if (method && path) {
      (app as any)[method](
        basePath + path,
        async (req: Request, res: Response) => {
          await instance[methodName](req, res);
        }
      );
    }
  });
}
