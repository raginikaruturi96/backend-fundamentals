# Express.js and CRUD API Development
## Express.js Fundamentals
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and RESTful APIs.

### Nodejs Vs Expressjs
**Node.js**
- A JavaScript runtime built on Chrome’s V8 engine.
- Allows JavaScript to run outside the browser.
- Writing a server using pure Node.js requires manual handling of routes, requests, and responses.

**Express.js**
A framework built on top of Node.js.
Simplifies server creation and request handling.
Provides:
- Easy routing
- Middleware support
- Cleaner request/response handling

### Server setup
Basic Express server setup involves:
- Importing Express
- Creating an application instance
- Adding middleware
- Starting the server using a port
Common syntax: express(), app.use(), app.listen()

> `Routing` defines how an application responds to client requests at specific endpoints.

### Controller-service structure
This structure separates responsibilities into layers:
**Controller**
- Handles HTTP requests and responses
- Passes data to services

**Service**
- Contains business logic
- Handles data processing and database interactions

### Middleware fundamentals
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object `req`, the response object `res`, and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`

Middleware functions:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack
- Middleware execution stops once a response is sent

#### Types of Middleware
**Application-level middleware**
Application-level middleware is middleware that is bound directly to the Express app instance and executes for requests handled by that application.
> Applies to all routes or specific paths across the entire application.
syntax: app.use(), app.METHOD()

**Router-level middleware**
Router-level middleware is middleware that is attached to an Express Router instance and applies only to routes defined within that router.
syntax: router.use(), router.METHOD()

- `next()` → passes control to the next middleware in sequence
- `next('route')` → skips remaining handlers of the current route

**Built-in middleware**
Provided by Express
- `express.static` serves static assets such as HTML files, images, and so on.
- `express.json` parses incoming requests with JSON payloads.
- `express.urlencoded` parses incoming requests with URL-encoded payloads.

**Error-handling middleware**
Handles errors centrally
Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

**Third-party middleware**
Use third-party middleware to add functionality to Express apps.
Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.
[Ref Middleware](https://expressjs.com/en/guide/using-middleware.html)

### Basic error handling methodologies
- If an error occurs, Express skips normal middleware
- Control is passed directly to error-handling middleware
- A single handler can manage all application errors
- Catches errors passed using next(error) or thrown inside routes

[Ref ErrorHandling](https://expressjs.com/en/guide/error-handling.html)

### Bulk Hitting Using Postman Automation – Collection Runner
Bulk hitting refers to sending multiple API requests automatically using Postman, without manual repetition.

**Collection Runner**
Postman’s Collection Runner allows execution of a request multiple times using external data.
Working:
- A request is placed inside a collection
- Variables are used in request URL, headers, or body
- A data file (CSV or JSON) supplies multiple input values
- Postman runs the request once for each data entry
Supported data formats: CSV, JSON

### Request Validation and Input Sanitization
Request validation and sanitization ensure that APIs receive correct, safe, and expected input.

**Validation**
- Checks whether input meets required rules
- Ensures correct data types, formats, and constraints
- Prevents invalid or incomplete data from reaching business logic
- Ex: Required fields, Email format, etc.

**Sanitization**
- Cleans and normalizes input data
- Removes harmful or unnecessary characters
- Prevents injection attacks and malformed data
- Ex: Trimming whitespace, etc.
[Ref](https://express-validator.github.io/docs/6.0.0/sanitization/)

## Git and Documentation Practices

### Branching and versioning standards
[Version Control Branching Strategies](https://medium.com/@dmosyan/version-control-branching-strategies-e68e8d5ef1e0)

