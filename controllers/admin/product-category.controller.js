const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filter-status");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination");
const createTreeHelpers = require("../../helpers/createTree");


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

    const newRecords = createTreeHelpers.tree(records);
    res.render("admin/pages/products-category/index.pug" , {
        pageTitle : "Danh mục sản phẩm ",
        records : newRecords,
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



    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelpers.tree(records);
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

//[GET] admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
      _id: id,
      deleted: false,
    }
    const data = await ProductCategory.findOne(find);
  
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTreeHelpers.tree(records);
  
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Trang sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  };

//[PATCH] admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
      const id = req.params.id;
  
      req.body.position = parseInt(req.body.position);
  
      await ProductCategory.updateOne({ _id: id }, req.body)
      req.flash("success", "Cập nhập danh mục thành công!");
      res.redirect("back");
    } catch (error) {
      req.flash("errer", "Cập nhập danh mục thất bại!");
      res.redirect("back");
    }
  }

// [DELETE] /admin/product-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
  
    await ProductCategory.updateOne({_id:id},{
        deleted : true,
        deletedAt: new Date
    })
    req.flash('success', `Đã xoá thành công sản phẩm!`);
    res.redirect('back');
  }