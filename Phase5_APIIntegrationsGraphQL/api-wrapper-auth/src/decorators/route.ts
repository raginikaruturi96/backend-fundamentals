import 'reflect-metadata';

export function Get(path: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata('method', 'get', target, propertyKey);
    Reflect.defineMetadata('path', path, target, propertyKey);
  };
}
