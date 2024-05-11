const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');

router.use('/api/categories', categoryRoutes);
router.use('/api/products', productRoutes);

module.exports = router;
