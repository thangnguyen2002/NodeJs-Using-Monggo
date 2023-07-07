const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
//file này để định dạng hình thù data (process data), tức là theo mongoose viết theo MVC nên có model
// model trong MVC la đối tượng
// schema để tạo hình thù data trông ntn
//model giống như bản sao của schema giúp thao tác vs db (read, insert, update,...)
const customerSchema = new mongoose.Schema( //create a new Schema
    {
        name: {
            type: String,
            required: true
            //neu user ko truyen value vao name (trong postman ko truyen gtri vao truong name) -> error -> chay vao catch(erorr)
        },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String
    },
    { timestamps: true } //createdAt, updateAt
);

customerSchema.plugin(mongoose_delete, { overrideMethods: true });
//soft delete (ko thuc su delete khoi db, no them truong deleted true or false)
//khi delete 1 customer -> them truong deleted: true, khi query se ko lay n~ customer nay
//muon lay dc customer nay -> vao db doi deleted: false

// Lưu hình dạng đấy vào db, 'Kitten' sẽ là tên collection (table) của database
const Customer = mongoose.model('customer', customerSchema); //define a model, tạo biến Kitten để hứng model collection(table) tên Kitten

module.exports = Customer

//theo MVC, model là đối tượng tượng trưng cho dữ liệu muốn lưu trữ
//sau này dùng model ở rất nhiều nơi, ko phải model này chỉ có lưu mà còn có query kết quả, xóa kqua, cập nhật kqa...
//nên ta ko để save() vào đây