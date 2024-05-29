// [GET] : /admin/products
const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filter-status");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");

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

    if(objectSearch.regex) {
        find.title = objectSearch.regex 
    }
// End 16.1.4 :

//Pagination ( Phân Trang)
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelpers(
    {
        currentPage: 1,
        limitItem: 4,
    },
    req.query,
    countProducts
    );
    
    // if(req.query.page) {
    //     objectPagination.currentPage = parseInt(req.query.page)
    //     objectPagination.skip = (objectPagination.currentPage - 1 ) *objectPagination.limitItem
    //     // console.log(objectPagination.skip);
    // }
    // const countProducts = await Product.countDocuments(find);
    // // console.log(countProducts); // Đếm số lượng bản ghi
    // const totalPages = Math.ceil(countProducts / objectPagination.limitItem)
    // // console.log(totalPages); // Tính ra số trang cần có 
    // objectPagination.totalPages = totalPages;


// End Pagination
  

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)
    // console.log(products);
    res.render("admin/pages/products/index.pug" , {
        pageTitle : "Trang danh sách sản phẩm ",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination


    }) 
}