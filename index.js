const express = require('express') // cài đặt express
require('dotenv').config()  // cài env 
const app = express()
const port = process.env.PORT // kết nối env

const route = require("./routes/client/index.route.js") ;
// Kết nối route của client
const routeAdmin = require("./routes/admin/index.route.js");


const database = require("./config/database.js");
// Kết nối database. (try catch => test ok ko ?)
database.connect();

const systemConfig = require("./config/system");
// Lấy cái /admin để dùng cho all file pug

app.set('views', './views');  // kết nối pug
app.set('view engine', 'pug');
app.use(express.static("public")); // kết nối folder public



// Gọi Route : client and admin
route(app);
routeAdmin(app);

// App Local Variable 
app.locals.prefixAdmin = systemConfig.prefixAdmin;


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});