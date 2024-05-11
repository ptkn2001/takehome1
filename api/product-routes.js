const router = require('express').Router();
const { Product, Category } = require('../models');

// find all products
router.get('/', async(req, res) => {
    try {
        const productsData = await Product.findAll({
            include: [{ model: Category }],
        });
        res.status(200).json(productsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find a single product by its `id`
router.get('/:id', async(req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            include: [{ model: Category }],
        });

        if (!productData) {
            res.status(404).json({
                message: `No Product found with id: ${req.params.id}`
            })
            return;
        }

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new product
router.post('/', (req, res) => {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
      }
    */
    Product.create(req.body)
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update product
router.put('/:id', (req, res) => {
    // update product data
    Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// delete one product by its `id`
router.delete('/:id', async(req, res) => {
    try {
        const productData = await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!productData) {
            res.status(404).json({
                message: `Product with id: ${req.params.id} does not exist.`
            });
            return;
        }

        res.status(200).json({
            message: `Product with id: ${req.params.id} deleted successfully.`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;