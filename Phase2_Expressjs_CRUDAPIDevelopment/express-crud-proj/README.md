## Customer API
Base URL: /customers

### Create Customer
POST /
Validates input and creates a customer
Body: name, email, age
Success: 201 Created

### Get All Customers
GET /
Fetches all customers
Success: 200 OK

### Update Customer
PUT /:id
Updates customer by ID
Body: name, email, age
Success: 200 OK

### Delete Customer
DELETE /:id
Deletes customer by ID
Success: 200 OK