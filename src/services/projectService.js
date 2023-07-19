const Project = require('../models/project')
const aqp = require('api-query-params');

module.exports = {
    createProject: async (data) => {
        try {
            if (data.type === 'EMPTY-PROJECT') {
                // console.log('>>>data: ', data);
                let result = await Project.create(data)
                return result
            }

            if (data.type === 'ADD-USERS') {
                // console.log('>>>data: ', data);
                //find project by id
                let myProject = await Project.findById(data.projectId).exec()
                // console.log('>>> myProject: ', myProject);
                //luu subDocument (usersArr) to the array usersInfor
                for (let i = 0; i < data.usersArr.length; i++) { //do push chi push dc 1 cai nen phai dung loop
                    myProject.usersInfor.push(data.usersArr[i])
                }
                // cap nhat tren database (vi ta thao tac truc tiep vs row do' nen can cap nhat tren database = save())
                let newResult = await myProject.save() //neu ko co save() thi tren db se ko biet dc thay doi cua row myProject do'
                // console.log('>>> newResult: ', newResult);
                return newResult
            }

            if (data.type === 'REMOVE-USERS') {
                let myProject = await Project.findById(data.projectId).exec()
                // console.log('>>>myProject: ', myProject);

                // myProject.usersInfor = myProject.usersInfor.filter(user => !data.usersArr.includes(user))
                // console.log(">>>myProject.usersInfor: ", myProject.usersInfor, data.usersArr);
                //ko filter dc vì ko cùng dạng, 1 cái là objectId, 1 cái là string
                //nếu vẫn muốn filter có thể ép kiểu objectId -> string hay string -> objectId

                for (let i = 0; i < data.usersArr.length; i++) {
                    myProject.usersInfor.pull({ _id: data.usersArr[i] })
                }

                let newResult = await myProject.save()
                return newResult
            }

            if (data.type === 'ADD-TASKS') {
                //find project by id
                let myProject = await Project.findById(data.projectId).exec()
                for (let i = 0; i < data.tasksArr.length; i++) {
                    myProject.tasks.push(data.tasksArr[i])
                }
                //sau khi day vao array -> luu lai de dc cap nhat tren database
                let newResult = await myProject.save()
                return newResult
            }

        } catch (error) {
            console.log('>>error: ', error);
            return null
        }
    },

    getProject: async (data) => {
        try {
            let offset = (data.page - 1) * data.limit
            // const { filter, limit } = aqp(data)
            const { filter, limit, population } = aqp(data)
            delete filter.page
            // console.log(filter, limit, population);
            let result = await Project.find(filter).populate(population).limit(limit).skip(offset).exec()
            //populate() dùng khi muốn tham chiếu tới bảng khác trong db (có reference, ref)
            // populate() có tham số là string là tên trường ta muốn nó thay thế cho ta
            // vd populate('userInfo') nó sẽ tham chiếu _id đầu vào đến bảng user và lấy all thông tin row có id đó
            //vì trường userInfo ta đã define là usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    },

    uProject: async (data) => {
        try {
            // console.log('>>>data: ', { ...data });
            // let { name, startDate, endDate, description } = data
            let result = await Project.updateOne({ _id: data.id }, { ...data })
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    },

    dProject: async (data) => {
        try {
            let result = await Project.deleteById(data.id)
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    }
}