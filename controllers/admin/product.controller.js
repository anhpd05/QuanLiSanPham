const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filter-status");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
// [GET] : /admin/products
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
    
// End Pagination
  
    const products = await Product
    .find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip)
    .sort({position : "desc"})
    // console.log(products);
    res.render("admin/pages/products/index.pug" , {
        pageTitle : "Trang danh sách sản phẩm ",
        products : products,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination
    }) 
} 
// [PATCH] : /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({_id : id } , {status : status});
    req.flash('success', `Đã thay đổi trạng thái  thành công sản phẩm!`);
    res.redirect('back')
}
// [PATCH] : /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body)
    const type = req.body.type ;
    const ids = req.body.ids.split(", ") ;
    // console.log(ids);
    switch (type) {
        case "active":
            await Product.updateMany({_id:{ $in : ids}}, {status : type})
            req.flash('success', `Đã cập nhập trạng thái ${ids.length} sản phẩm!`);
            break;

        case "inactive":
            await Product.updateMany({_id:{ $in : ids}}, {status : type})
            req.flash('success', `Đã cập nhập trạng thái ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({_id:{ $in : ids}}, {
                deleted : true, 
                deletedAt : new Date()
            })
            req.flash('success', `Đã xoá ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            console.log(req.body.ids)
            for (const item of ids) {
                let[id,position] = item.split("-");
                position = parseInt(position)
                console.log(id)
                console.log(position)
            await Product.updateOne({_id : id } , {position : position});    
            
            }
            req.flash('success', `Đã thay đổi vị trí ${ids.length} sản phẩm!`);

            break;

        default:
            break;
    }
    res.redirect('back');
}

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
  
    // await Product.deleteOne({ _id: id });
    await Product.updateOne({_id:id},{
        deleted : true,
        deletedAt: new Date
    })
    req.flash('success', `Đã xoá thành công sản phẩm!`);
    res.redirect('back');
  }

// [GET] : /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create" , {
        pageTitle : "Thêm mới sản phẩm ",
        
    }) 
} 

// [POST] : /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    
    if(req.body.position == "") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    console.log(req.body);
    const product = new Product(req.body);
    product.save()
    res.redirect(`${systemConfig.prefixAdmin}/products`)
} 