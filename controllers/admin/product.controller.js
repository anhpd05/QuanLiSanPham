// [GET] : /admin/products
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {


    // 16.1.3 : tạo ra phần lọc theo trạng thái 
    // console.log(req.query.status); // lấy ra thằng active , inactive ,..
    const statusChange = req.query.status;

    let find = {
        deleted : false
    }
    if(statusChange){
        find.status = statusChange;
    } // End 16.1.3 

    // Tối ưu là những phần trạng thái product
    let filterStatus = [
        {
            name : "Tất cả",
            status :"",
            class : ""
        },

        {
            name : "Hoạt động",
            status :"active",
            class : ""
        },

        {
            name : "Dừng Hoạt động",
            status :"inactive",
            class : ""
        },
    ]
    if(statusChange){
        const index = filterStatus.findIndex( item => item.status == statusChange)
        filterStatus[index].class = "active"

    }else{
        const index = filterStatus.findIndex( item => item.status == "")
        filterStatus[index].class = "active"
    }
  

    const products = await Product.find(find)
    // console.log(products);
    res.render("admin/pages/products/index.pug" , {
        pageTitle : "Trang danh sách sản phẩm ",
        products : products,
        filterStatus : filterStatus
    }) 
}