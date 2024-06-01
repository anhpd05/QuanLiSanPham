const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({ 
    title: String, // Sản phẩm 1 
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug : {
        type:String,
        slug:"title", // san-pham-1
        unique : true // giống kiểu khóa chính 
    },
    deleted: {
        type: Boolean,
        default : false
    },
    deletedAt : Date,
},{
    timestamps : true 
});

const Product = mongoose.model('Product', productSchema,"products");
// Chú ý : tham số thứ 3 truyền vào "products" là collection của database ở MGoose
module.exports = Product;