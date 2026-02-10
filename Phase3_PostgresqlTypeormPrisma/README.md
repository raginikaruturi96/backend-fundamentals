# PostgreSQL and TypeORM & Prisma Integration

# Testing
## Jest
Jest is a JavaScript testing framework developed by Facebook
- It is primarily used for unit testing any JavaScript codebase, including Node.js, React, Angular, and Vue.js projects.
- Test suites and cases are defined using functions like describe() and test()
- Jest's assertion methods (expect()) are used to validate the status codes, response bodies, and headers returned from the SuperTest requests. 

### describe
- The describe function in Jest is used to group related tests together 
- This helps organize your test files and provides a logical structure(more readable and maintainable)
- You can nest describe blocks to create a hierarchical structure for organizing related tests
- The function takes two primary arguments: A name (string), a callback function that contains the actual test cases (test or it functions) and potentially other nested describe blocks or setup/teardown hooks (beforeEach, afterEach, etc.).

### Tear down hooks
These are crucial for cleaning up resources, such as closing database connections or clearing mocks, after tests run. These hooks ensure test isolation and prevent state leakage
- afterEach(() => { ... }): Runs after each individual test (test or it) block in a file, ideal for cleaning up temporary data created by a specific test.
- afterAll(() => { ... }): Runs once after all tests in a file have completed, suitable for closing persistent connections (e.g., closing a server).
- beforeAll sets up expensive resources (e.g., database connections, API clients) used across multiple tests. afterAll clears these resources.
- Execution Order: beforeAll → beforeEach → Test → afterEach → afterAll
- globalTeardown: Configured in jest.config.js, this script runs once after all test suites have finished. 


## Supertest
SuperTest is a library for testing Node.js HTTP servers, built on top of the SuperAgent HTTP client.
- It allows you to programmatically send high-level HTTP requests (GET, POST, PUT, DELETE, etc.) to your API endpoints and make assertions on the responses.

> Jest alone does not have an in-built library to simulate real HTTP requests, so SuperTest fills this gap for integration and end-to-end testing of an API.