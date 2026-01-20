const service = require('../services/customerService');

exports.create = (req, res) => {
    const customer = service.createCustomer(req.body);
    res.status(201).json(customer);
};

exports.getAll = (req, res) => {
  res.json(service.getAllCustomers());
};

exports.update = (req, res) => {
  const updated = service.updateCustomer(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};

exports.remove = (req, res) => {
  const success = service.deleteCustomer(req.params.id);
  if (!success) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};
