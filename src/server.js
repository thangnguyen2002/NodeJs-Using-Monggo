const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
require('dotenv').config()
const connection = require('./config/database')
const User = require('./models/User')
const fileUpload = require('express-fileupload');
//thư viện này giúp gửi kèm file (req.files) dựa vào biến image (đặt trong postman) -> req.files.image

const app = express() //app express
const port = process.env.PORT || 8081 //if port at .env error -> use port 8081
const hostname = process.env.HOST_NAME
// console.log(process.env)

// default options
app.use(fileUpload());
// De len dau tien vi theo mo hinh MVC: view -> routes -> req.files -> controller -> service -> view
// trc khi return data from service to view thi` ta da co files

//middleware: config req.body (phải để ở trên cùng mới dc)
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// Cấu hình view engine và file static
configViewEngine(app)

// Khai báo routes
app.use('/', webRoutes);
// app.use('/user',webRoutes) //-> http://localhost:8080/user/abc
app.use('/api/v1/', apiRoutes);

// create object for Kitten collection(table) defined in Kitten.js
// const cat = new Kitten({ name: 'Duc Thang model' }); //thay tạo pbject mới = cách ghi dài model thì ta đã hứng vào biến Kitten
// cat.save();
//save() can tao 1 object (ban sao - instance) cua model -> thao tac gian tiep
//create() thao tac truc tiep thong qua model

// connection to db
(async () => {
  try {
    await connection()
    app.listen(port, hostname, () => {
      console.log(`Example app listening on ${hostname}:${port}`)
    })
  } catch (error) {
    console.log('>>>Error connect to DB ', error);
  }
})()


