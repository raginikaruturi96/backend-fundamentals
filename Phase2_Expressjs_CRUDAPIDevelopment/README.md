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

### Branching
A standardized way to manage branches in a Git repository so that multiple developers can work together in a structured way. It’s not specific to any programming language or framework; it applies whenever you are using Git for team development.

#### Why Branching Strategy Matters
In team development:
- many developers work concurrently
- new features, bug fixes, and patches are developed in parallel
- you need a safe way to integrate work without breaking the main codebase

A branching strategy defines:
- which branches exist
- how they’re used
- how and when they merge into other branches
This reduces conflicts and coordination issues in team workflows

#### Main Branches in the Strategy

**master**
- Contains the latest delivered development changes for upcoming releases
- Developers branch off of master to build features

**stable**
- Represents the production code — what is currently deployed
- Only accepts changes after formal deployment from master
- Acts as a stable snapshot for live systems with versions and releases tagged against it

#### Supporting Branches
Supporting branches are temporary branches created for specific purposes. They allow isolated work without affecting other ongoing work.

**Feature branches**
- Used for developing new features or enhancements
- Created from the main working branch (master in this model)
- Branch must always be kept up-to-date with the base branch to avoid merge conflicts
- When complete, merged back to master

```
git checkout -b feature-id master                 // creates a local branch for the new feature
git push origin feature-id                        // makes the new feature remotely available
git merge master                                  // merges changes from master into feature branch
git checkout master                               // change to the master branch  
git merge --no-ff feature-id                      // makes sure to create a commit object during merge
git push origin master                            // push merge changes
git push origin :feature-id                       // deletes the remote branch
```

**Bug branches**
- Similar to feature branches but created specifically for bug fixes
- Branch off from the main working branch
- Typically short-lived, focused on fixing a specific issue
- Gets merged back into the working branch once fixed

**Hotfix branches**
- Used for urgent fixes in live production (“hotfixes”)
- Created off of stable (the production branch), not the working branch
- After the fix is ready, merged into stable with a version tag
- merged back into master so the fix isn’t lost in the next development cycle

[Branching Strategies](https://gist.github.com/digitaljhelms/4287848)

### Versioning 
GitHub Docs uses a single source approach for documentation that can apply to multiple products (like different GitHub plans or Enterprise versions) without duplicating content. This means one Markdown file can serve several versions of the documentation.

#### How it works
- **YAML frontmatter**: At the top of each doc file, metadata called frontmatter defines which versions the content applies to.
- **Liquid conditionals**: Inside the document text, special tags ({% ifversion … %}) let you include or exclude content for specific versions. For example, content that only applies to GitHub Enterprise Server can be wrapped in a version conditional.
-This versioning system ensures users see the right documentation for the exact product/version they are using, while saving writers from maintaining separate files for every version.
[Versioning Doc](https://docs.github.com/en/contributing/writing-for-github-docs/versioning-documentation)

### Clear Commit Message Rules
Good commit messages help teams understand history

- type — describes the change category (e.g., feat, fix, docs, refactor, test, chore).
- short description — imperative tense, concise (often ≤50 chars)

**Common Conventions**
- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting/white‑space (no logic change)
- refactor: code restructuring (no behavior change)
- perf: performance improvement
- test: adding/updating tests
- chore: maintenance or build tool changes

new line

