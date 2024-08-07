const express = require('express'); // cài đặt express
const path = require('path');
const methodOverride = require('method-override') ;// cài đặt method : PATCH ,DE,..
const flash = require('express-flash'); // hiện thông báo thay đổi trạng thái
const bodyParser = require('body-parser'); // cài đặt ép kiểu của statusChangeMulti
const session = require('express-session');
const cookieParser = require('cookie-parser');
const moment = require('moment'); // lấy ra time chuẩn 


require('dotenv').config();  // cài env 
const app = express();
const port = process.env.PORT // kết nối env


const route = require("./routes/client/index.route.js") ;
// Kết nối route của client
const routeAdmin = require("./routes/admin/index.route.js");


const database = require("./config/database.js");
// Kết nối database. (try catch => test ok ko ?)
database.connect();

const systemConfig = require("./config/system");
// Lấy cái /admin để dùng cho all file pug

app.use(methodOverride('_method'))// ÉP kiểu method : Patch

app.use(bodyParser.urlencoded({ extended: false }))// dùng bodyparser


app.set('views', `${__dirname}/views`);  // kết nối pug
app.set('view engine', 'pug');

//Flash(thông báo trạng thái )
app.use(cookieParser('05JuLy'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

//TimyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TimyMCE

app.use(express.static(`${__dirname}/public`)); 
// Deloy online project 



// Gọi Route : client and admin
route(app);
routeAdmin(app);

// Các đường dẫn không hợp lệ sẽ vào trang 404
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
      pageTitle: "404 Not found",
    });
});
  

// App Local Variable 
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});