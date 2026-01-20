const Customer = require('../models/customerModel');
let customers = [];

exports.createCustomer = (data) => {
  const customer = new Customer(
    Date.now(),
    data.name,
    data.email,
    data.age
  );
  customers.push(customer);
  return customer;
};

exports.getAllCustomers = () => customers;

exports.updateCustomer = (id, data) => {
  const customer = customers.find(c => c.id == id);
  if (!customer) return null;

  customer.name = data.name ?? customer.name;
  customer.email = data.email ?? customer.email;
  customer.age = data.age ?? customer.age;

  return customer;
};

exports.deleteCustomer = (id) => {
  const index = customers.findIndex(c => c.id == id);
  if (index === -1) return false;

  customers.splice(index, 1);
  return true;
};
