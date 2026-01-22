const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/customerController');

const validateCustomer = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive number')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', validateCustomer, handleValidationErrors, controller.create);
router.get('/', controller.getAll);
router.put('/:id', validateCustomer, handleValidationErrors, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
