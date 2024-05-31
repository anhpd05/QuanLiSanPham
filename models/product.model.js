const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt : Date
});

const Product = mongoose.model('Product', productSchema,"products");
// Chú ý : tham số thứ 3 truyền vào "products" là collection của database ở MGoose
module.exports = Product;