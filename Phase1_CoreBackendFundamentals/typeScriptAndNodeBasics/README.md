# TypeScript and Node Basics

## TypeScript

TypeScript is the superset of the javascript.

### How typescript different for the javascript?
Typescript enforces type rules in our Javascript code. This allows us to catch any potential errors during development and avoid going live with dozens of errors in the console.

### Difference between typescript node project and general node project
- Javascript is used in the general node project where as typescript is used in typscript node project
- TypeScript files requires a transpilation step (using the tsc compiler) to convert .ts files into .js files that Node.js can execute.

> `npx` is often used to run the tsc command if TypeScript is installed as a local dependency in your project. It finds the tsc executable within your project's node_modules/.bin directory and runs it, saving you from needing a global installation. 

#### Resources
- [Typescript Documentation](https://www.typescriptlang.org/docs/handbook/)
- [Setting up typescript node project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [Setting up typescript node project includes express](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)
- [Adding typescript to nodejs project](https://medium.com/geekculture/adding-typescript-to-your-node-js-project-fe4ba08369c8)

### tsconfig.json
- tsconfig.json tells the typescript compiler(tsc) which files to complie, what rules should be followed
- `target` into which version of javascript needs to be compiled
- `rootdir` which files should be complied
- `outdir` where to store the compiled javascript files
- `strict : true` allows strict type-checking
- `module : commonjs` commonjs is default for the nodejs, tells how modules are imported/exported in the compiled JavaScript.
- [tsconfig.json documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

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
- [Reference](https://www.freecodecamp.org/news/how-typescript-interfaces-work/)

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
 [Detailed working of process](https://medium.com/@lydiahallie/javascript-visualized-promises-async-await-a3f1aad8a943)

**Static Methods**
- `Promise.resolve()`
    - resolves a give value to a promise
    - if the value is a promise, that promise is returned
    - if the value is a thenable, Promise.resolve() will call the then() method with two callbacks it prepared; otherwise the returned promise will be fulfilled with the value
- `Promise.reject()`
    - returns a Promise object that is rejected with a given reason
 - `Promise.all()` 
    - static method takes an iterable of promises as input and returns a single Promise
    - It rejects when any of the input's promises rejects, with this first rejection reason.
    - If the iterable contains non-promise values, they will be ignored, but still counted in the returned promise array value
- `Promise.allsettled()`
    - takes an iterable of promises as input and Returns an array of objects showing success or failure for each.
    - care about every promise’s outcome, even if some fail.
    - returns status, value/ reason for each of the promise
- `Promise.race()`
    - takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles.
    -  It's useful when you want the first async task to complete, but do not care about its eventual state (i.e., it can either succeed or fail).
- `Promise.any()`
    - takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value
    - Resolves as soon as any promise succeeds, Only rejects if all promises reject
[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)


# NPM/Yarn project management

## Differenece between NPM and yarn
-Yarn is built on top of the NPM, default package manager for Node.js
- NPM relies on a global package cache, where it stores downloaded packages. This cache can be shared across projects, saving disk space and reducing redundant downloads. On the other hand, Yarn maintains a per-project cache, storing packages within the project directory. This approach offers increased reliability and ensures consistent package versions across different environments.
-  NPM follows a non-deterministic algorithm, which means that it may install different versions of packages for different users or on different machines. This can lead to potential compatibility issues. In contrast, Yarn uses a deterministic algorithm that guarantees the same package versions will be installed across all environments. 
- yarn offers parallel installation of packages which are not dependent in threads. It can lower installation time to 1/10 of time from npm install
- Yarn also provides offline installation support, allowing developers to install packages without an internet connection, provided the packages are already present in the local cache.
- [Reference1](https://stackoverflow.com/questions/50278553/what-is-main-difference-between-yarn-and-npm)
- [Reference2](https://medium.com/@shunya.ekaya01/understanding-the-difference-between-npm-and-yarn-26b4cf1405f0)

## Dependencies vs Devdependecies
- `Dependencies`: libraries that your project needs in order to run in production
```
npm install <package name>
```

- `Devdependencies` : all the packages that are used in the project in its development phase and not in the production or testing environment with its version number in package.json
```
npm install <package name> --save-dev
```

## Common NPM scripts
[Reference](https://dev.to/ajitforger97/useful-npm-scripts-example-usage-2kha)

## dotenv
dotenv is a library that loads environment variables from a .env file into process.env (Node.js), keeping secrets out of your code for better security and easier configuration management across different environments
To use it
- install the package
- add require('dotenv').config() at the top of your entry file
- create a .env file with KEY=value pairs in your project root
- access them via process.env.KEY 

> Remember to add .env to your .gitignore. 

### Creating .env files using CLI
To create 
```
touch .env.dev .env.prod .env.example
```

To add environment variables
Syntax : echo "environment variable" >> filename

example:
```
echo "PORT=3000" >> .env.dev
echo "DB_URL=mongodb://localhost:27017/devdb" >> .env.dev
echo "DEBUG=true" >> .env.dev
```


## Nodemon
Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
Nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.
To install nodemon
As devdependency:
```
npm install --save-dev nodemon
```
This command adds Nodemon to your project’s package.json file under the devDependencies section.

Global installation:
```
npm install -g nodemon
```

[Reference](https://userjot.com/blog/understanding-nodemon-for-nodejs-development)


### Functions of nodemon
- Monitors Files: Nodemon continuously watches your project directory for any changes in your files. 
- Automatic Restart: When Nodemon detects a change in your files, it automatically restarts your Node.js application.
- Supports Various File Types: Nodemon isn’t limited to just JavaScript files. It can also monitor changes in JSON files, CSS files, HTML files 
- Customizable: You have the flexibility to configure Nodemon to watch specific files or directories, ignore certain paths, or even run custom scripts when your application restarts

[Documentation](https://www.npmjs.com/package/nodemon)

# REST API Principles

## HTTP methods and correct usage
In a REST API, HTTP methodsdefine the action a client wants to perform on a resource

- `GET`	Retrieve data
- `POST` Create
- `PUT`	Replace
- `PATCH` Modify
- `DELETE` Remove

## HTTP status codes
**2xx – Success**
- 200	OK
- 201	Created
- 204	No Content

**4xx – Client Errors**
- 400	Bad request
- 401	Unauthorized
- 403	Forbidden
- 404	Not found
- 409	Conflict
- 422	Validation error

**5xx – Server Errors**
- 500	Internal Server Error
- 502	Bad Gateway
- 503	Service Unavailable

## Idempotency
An operation is idempotent if repeating it multiple times produces the same result.
- GET, PUT, DELETE are idempotent
- POST, PATCH are not idempotent