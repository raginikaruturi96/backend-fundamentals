const request = require('supertest');
const app = require('../src/app.js');
const pool = require('../src/db/index.js');

// Run this before all tests
beforeAll(async () => {
  // Optionally, create test tables or seed data
});

// Run after all tests
afterAll(async () => {
  try {
    await pool.end();
  } catch (err) {
    console.error('Pool end error:', err);
  }
});

describe('User API Endpoints', () => {
  
  let userId;

  test('POST /api/users - create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com'
      });
    console.log('POST response:', response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  test('GET /api/users - get all users', async () => {
    const response = await request(app).get('/api/users');
    console.log('GET response:', response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/users/:id - get user by id', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('PUT /api/users/:id - update user', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated Name', email: 'updated@example.com' });
    expect(response.statusCode).toBe(200);
  });

  test('DELETE /api/users/:id - delete user', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
  });

});