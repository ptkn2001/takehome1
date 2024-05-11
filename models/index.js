const Product = require('./Product');
const Category = require('./Category');

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id'
});


module.exports = {
    Product,
    Category,
};