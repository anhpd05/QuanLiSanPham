module.exports.createCheck = (req , res , next) => {
    if(!req.body.title) {
        req.flash('error', `Vui Lòng nhập tiêu đề cho sản phẩm!`);
        res.redirect('back');
        return; // Tránh lưu data rác vào DB
    }
    next();
}