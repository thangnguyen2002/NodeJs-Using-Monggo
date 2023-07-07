const mongoose = require('mongoose');

//create a database and data inside it
// Tạo nên hình dạng data
const userSchema = new mongoose.Schema({ //create a Schema
    // _id: String // truong nay la id cua moongoose tu sinh ra dua theo thu vien uuid nen ko can dinh nghia
    name: String, //cac truong luu trong collection (table) dc goi la documents (row)
    email: String,
    city: String,
});
// Lưu hình dạng đấy vào db, 'Kitten' sẽ là tên collection (table) của database
const User = mongoose.model('user', userSchema); //define a model, tạo biến Kitten để hứng model collection(table) tên Kitten

module.exports = User

//theo MVC, model là đối tượng tượng trưng cho dữ liệu muốn lưu trữ
//sau này dùng model ở rất nhiều nơi, ko phải model này chỉ có lưu mà còn có query kết quả, xóa kqua, cập nhật kqa...
//nên ta ko để save() vào đây