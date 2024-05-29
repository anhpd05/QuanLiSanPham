module.exports = (objectPagination,query,countProducts) => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page)
        objectPagination.skip = (objectPagination.currentPage - 1 ) *objectPagination.limitItem
        // console.log(objectPagination.skip);
    }
    
    // console.log(countProducts); // Đếm số lượng bản ghi
    const totalPages = Math.ceil(countProducts / objectPagination.limitItem)
    // console.log(totalPages); // Tính ra số trang cần có 
    objectPagination.totalPages = totalPages;
    return objectPagination;
}