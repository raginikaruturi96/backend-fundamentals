# MongoDB and Mongoose

## MongoDB
- MongoDB is a NoSQL database, specifically a document-oriented database, designed to handle unstructured or semi-structured data. 
- MongoDB stores data in JSON-like documents (BSON format)

## RDBMS Vs MongoDB
- Schema: Relational databases require a fixed schema, meaning the structure of the data must be defined upfront. MongoDB supports a dynamic schema, enabling documents in the same collection to have different fields and data types

-  Scalabitlity: Relational databases are typically vertically scalable, requiring more powerful hardware to handle increased load. MongoDB is horizontally scalable, allowing the addition of more servers to distribute the load.

- MongoDB does not support joins natively; relationships are often embedded within documents or handled at the application level.

- RDBMS Focuses on ACID properties (Atomicity, Consistency, Isolation, Durability), MongoDB Focuses on CAP theorem (Consistency, Availability, Partition tolerance)

> `C — Consistency` All nodes return the same data at the same time.
> `A — Availability` Every request gets a response (even if it may not be the latest data).
> `P — Partition Tolerance` The system continues to work even if network failures occur between servers.

## Mongoose
Mongoose schemas enforce a structured format for documents, validate incoming data, apply default values, and create indexes to improve query performance, acting as a safety layer between the application and MongoDB.

## Aggregations
MongoDB Aggregation is a process for performing advanced data transformations and computations on collections. It uses the aggregation pipeline, where documents pass through a series of stages to produce summarized or transformed results

MongoDB provides multiple approaches for performing aggregation depending on the complexity
- `Single Purpose Aggregation` methods are designed for simple analytical queries

- `MongoDB Aggregation Pipeline` is a multi-stage process where each stage transforms documents. The output of one stage becomes the input for the next, with each stage filtering, modifying, or computing on documents until the final result is produced.

#### $group
It Groups documents by the "_id" field 
```
db.users.aggregate([
  { $group: { _id: "$city", totalUsers: { $sum: 1 } } }
])
```
- `$sum : 1` adds a value of one for each document

#### $project
Include or exclude fields from the output documents.

```
db.users.aggregate([
  { $project: { name: 1, city: 1, _id: 0 } }
])
```

The field with value 1 is included and the field with value 0 is excluded

#### $match
Filter documents to pass only those that match the specified condition(s).

```
db.users.aggregate([
  { $match: { age: { $gt: 30 } } }
])
```
- `$gt` greater than
- `$lt` less than
- `$eq` equals
- `$gte` greater than or equal
- `$lte` less than or equal

#### $sort
It Sorts documents based on field values

```
db.users.aggregate([
  { $sort: { age: 1 } }
])
```

#### $limit
Limit the number of documents passed to the next stage.

```
db.users.aggregate([
  { $limit: n }
])
```
gives the first n documnets

[Reference](https://www.geeksforgeeks.org/mongodb/aggregation-in-mongodb/)
