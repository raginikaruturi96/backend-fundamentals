import 'reflect-metadata';

export function Get(path: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata('method', 'get', target, propertyKey);
    Reflect.defineMetadata('path', path, target, propertyKey);
  };
}

export function Post(path: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata('method', 'post', target, propertyKey);
    Reflect.defineMetadata('path', path, target, propertyKey);
  };
}

export function Put(path: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata('method', 'put', target, propertyKey);
    Reflect.defineMetadata('path', path, target, propertyKey);
  };
}
