const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filter-status");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");


// [GET] : /admin/products-catagory
module.exports.index = async (req, res) => {
    
// 16.1.3 : tạo ra phần lọc theo trạng thái 
    // console.log(req.query.status); 
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
    const countProducts = await ProductCategory.countDocuments(find);
    let objectPagination = paginationHelpers(
    {
        currentPage: 1,
        limitItem: 5,
    },
    req.query,
    countProducts
    );
    
// End Pagination

// Sort (Sắp thêm theo tiêu chí )
    let sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue // [String]
    }else {
        sort.position = "desc"
    }
    console.log(req.query)
//End Sort 
  
    const products = await ProductCategory
    .find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip)
    .sort(sort)
    
    const records = await ProductCategory.find(find);
    res.render("admin/pages/products-category/index.pug" , {
        pageTitle : "Danh mục sản phẩm ",
        records : records,
        filterStatus : filterStatus,
        keyword : objectSearch.keyword,
        pagination: objectPagination
    }) 
} 

// [GET] : /admin/products-catagory/craete
module.exports.create = async (req, res) => {
    let find = {
        deleted : false,
    }

    function createTree(arr,parentId = "") {
        const tree =[];
        arr.forEach( item => {
            if(item.parent_id === parentId) {
                const NewItem = item ; // arr first only node Tree
                const children = createTree(arr, item.id)
                if(children.length > 0) {
                    NewItem.children = children;
                }
                tree.push(NewItem)
            }

        })
        return tree
    }

    const records = await ProductCategory.find(find)

    const newRecords = createTree(records);
    console.log(newRecords);

    res.render("admin/pages/products-category/create.pug" , {
        pageTitle : "Tạo danh mục sản phẩm ",
        records : newRecords ,
    }) 
} 

// [POST] : /admin/products-category/create
module.exports.createPost = async (req, res) => {
    try {
        if (req.body.position == "") {
            const countProducts = await ProductCategory.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }

        const product = new ProductCategory(req.body);
        await product.save();
        req.flash("success", " Tạo danh mục sản phẩm thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
        catch (error) {
        req.flash("error", "Tạo danh mục sản phẩm thất bại");
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
      }
} 