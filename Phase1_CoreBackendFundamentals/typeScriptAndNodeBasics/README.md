# TypeScript and Node Basics

## TypeScript

TypeScript is the superset of the javascript.

### How typescript different for the javascript?
Typescript enforces type rules in our Javascript code. This allows us to catch any potential errors during development and avoid going live with dozens of errors in the console.

### Difference between typescript node project and general node project
- Javascript is used in the general node project where as typescript is used in typscript node project
- TypeScript files requires a transpilation step (using the tsc compiler) to convert .ts files into .js files that Node.js can execute.

> `npx` is often used to run the tsc command if TypeScript is installed as a local dependency in your project. It finds the tsc executable within your project's node_modules/.bin directory and runs it, saving you from needing a global installation. 

### tsconfig.json
- tsconfig.json tells the typescript compiler(tsc) which files to complie, what rules should be followed
- `target` into which version of javascript needs to be compiled
- `rootdir` which files should be complied
- `outdir` where to store the compiled javascript files
- `strict : true` allows strict type-checking
- `module : commonjs` commonjs is default for the nodejs, tells how modules are imported/exported in the compiled JavaScript.

### Datatypes in Typescript

- `Number` for floating point number, binary, hexadecimal, `bigint` for bigintegers
- `array` same as other languages. we can use single quotes or double quotes or we can surround string data with bact tick for multiples lines and embedded expressions(as ${exp})
- `tuple` fixed number of elements, can be of any type
- `Enum` can give numbers to the names and the names can be accessed using the numerical values as arrays
- `unknown` 
- `any`
- `void`
- `null`
- `undefined`

### Interfaces
Interface in TypeScript defines the expected structure of an object. It provides a way to describe the shape of objects, including their properties and methods, without implementing any functionality\n

Not all properties of an interface may be required
Interfaces with optional properties are written similar to other interfaces, with each optional property denoted by a ? at the end of the property name in the declaration.

**Syntax**\n
```
interface InterfaceName {
    property1: type;
    property2: type;
}
```

- Interfaces can extend other interfaces, enabling composition and reuse of interface definitions
- Interfaces can be implemeted by the classes to get specific proprties and methods
- Another role of interfaces is in type-checking function parameters during compile-time
[ref](https://www.freecodecamp.org/news/how-typescript-interfaces-work/)

### readonly
readonly doesn't allow the properties to modify, we can modify at the time of creation. 
TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed

> `readonly vs const` Variables use const whereas properties use readonly

### Promises
A promise in TypeScript is an object representing the eventual completion or failure of an asynchronous operation. It acts as a placeholder for a value that may be available now, in the future, or never.
i.e., A Promise is an object that contains a status, ([[PromiseStatus]]) and a value ([[PromiseValue]])
The value of the PromiseStatus, the state, can be one of three values:
- fulfilled: if everything went fine, no errors occurred within the promise
- rejected : if something went wrong.
- pending: The promise has neither resolved nor rejected

A promise is typically created using the Promise constructor, which takes a callback function with resolve and reject parameters. The asynchronous operation is performed inside this callback.
 
[Detailed working of process] (https://medium.com/@lydiahallie/javascript-visualized-promises-async-await-a3f1aad8a943)


## Resources
 
- [Typescript Documentation] (https://www.typescriptlang.org/docs/handbook/)
- [Setting up typescript node project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [Setting up typescript node project includes express](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)
- [Adding typescript to nodejs project](https://medium.com/geekculture/adding-typescript-to-your-node-js-project-fe4ba08369c8)
- [tsconfig.json documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)