// [GET] : /admin/products
const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filter-status");
const searchHelpers = require("../../helpers/search");

module.exports.index = async (req, res) => {


// 16.1.3 : tạo ra phần lọc theo trạng thái 
    // console.log(req.query.status); // lấy ra thằng active , inactive ,..

    let find = {
        deleted : false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
// End 16.1.3 

//16.1.3 : Tối ưu lại những phần trạng thái product khi đc chọn => xanh
    let filterStatus = filterStatusHelpers(req.query)
// END 16.1.3

// 16.1.4 : Phần tìm kiếm 
    const objectSearch = searchHelpers(req.query)
    console.log(objectSearch);

    if(objectSearch.regex) {
        find.title = objectSearch.regex 
    }
// End 16.1.4 :
  

    const products = await Product.find(find)
    // console.log(products);
    res.render("admin/pages/products/index.pug" , {
        pageTitle : "Trang danh sách sản phẩm ",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,

    }) 
}