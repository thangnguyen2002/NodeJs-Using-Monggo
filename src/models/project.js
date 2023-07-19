const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
//model trong mongoose de tao ra collecion cho database
//khi import và tạo dữ liệu theo hình dạng dựa theo projectSchema thì nó sẽ tự tạo bảng tên project cho ta
//vd import Project ở file khác và gọi hàm của model mongoose vd Project.create(), .find(),... thì nó sẽ tạo bảng project trong database cho ta

//shape data
const customerSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        email: String,
    }
);

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        startDate: String,
        endDate: String,
        description: String,
        customerInfor: customerSchema, //auto generate an id for any field using Schema
        usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], //do la tham chieu reference nen input chi can objectId
        //tham chieu den bang collection co ten user
        leader: userSchema,
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
        //tham chieu den bang collection co ten task
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
projectSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Project = mongoose.model('project', projectSchema);

module.exports = Project;

