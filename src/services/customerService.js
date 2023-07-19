const Customer = require('../models/customer')
const aqp = require('api-query-params');

module.exports = {
    createCustomerService: async (customerData) => {
        // console.log("check customerData: ", customerData);
        try {
            let result = await Customer.create({
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone,
                email: customerData.email,
                description: customerData.description,
                image: customerData.image //chi lưu đường dẫn ảnh chứ ko lưu tên ảnh vào database
            })

            return result

        } catch (error) {
            console.log('error: ', error)
            return null
        }
    },

    createManyCustomerService: async (customersArray) => {
        try {
            let result = await Customer.insertMany(customersArray)
            return result

        } catch (error) { //neu co bat ky object nao ko co name (required) -> error
            // console.log(">>> error: ", error);
            return null
        }
    },

    getAllCustomersService: async (page, limit, queryString) => {
        try {
            let result = null
            if (page && limit) {
                let offset = (page - 1) * limit

                const { filter } = aqp(queryString) //day la thu vien lay dynamic query dua theo url query string
                // console.log('>>>filter: ', filter); //{ page: 1, name: 'thang2' }
                delete filter.page
                //phai delete truong (field) page vi neu cho vao find() de filter se ko dung vi ta chi loc theo exact name la 'thang2'
                console.log('>>>filter: ', filter);

                //filter ko co page nen delete page de ko anh huong dkien find()
                //  va limit thi ko nam trong field nen log se ko hien 
                //filter chi lay tuy vao dkien toan tu truyen vao tren url query

                // vdu theo toan tu $in: http://localhost:8080/api/v1/customers?page=1&limit=2&name=thang2&address=hanoi,hcm
                //loc theo name la thang2 va address la hanoi hoac hcm
                //theo $regex: http://localhost:8080/api/v1/customers?page=1&limit=4&name=/thang/&address=hanoi,hcm
                //loc theo trang 1 limit 4, n~ customer co chua 'thang' trong ten va o hn hoac hcm

                result = await Customer.find(filter).limit(limit).skip(offset).exec()
                //exec() dam bao chay dung nhu 1 promise async await

            } else {
                result = await Customer.find({})
            }
            return result

        } catch (error) {
            return null
        }
    },

    updateACustomersService: async (customerInfo) => {
        try {
            let result = await Customer.updateOne(
                { id: customerInfo.id }, //key la cac truong dien trong postmand nen phai khop
                { name: customerInfo.name, email: customerInfo.email, address: customerInfo.address }
            )
            return result

        } catch (error) {
            return null
        }
    },

    deleteACustomersService: async (cusId) => {
        try {
            //deleteById la static method cua thu vien mongoose delete plugin (based on soft delete)
            //neu dung deleteOne() cua mongoose se delete khoi database -> mat luon, rat nguy hiem
            //static method tuc la co the thao tac truc tiep vs model thay vi dung` tu khoa new nhu save()
            //static method la method co the tu dinh nghia va tai su dung
            let result = await Customer.deleteById(cusId)
            // Customer.findByThang() //static method dc dinh nghia o Schema
            return result

        } catch (error) {
            return null
        }
    },

    deleteManyCustomersService: async (cusIdArray) => {
        try {
            let result = await Customer.delete({ _id: { $in: cusIdArray } })
            //xoa _id (luu y _id chu ko phai ten khac id hay j khac ko dung se xoa tat ca chu ko theo dkien), 
            //toán tử in: $in tuc la lam` n~ gtri trong array, tuc la nhan 1 array, day la dkien xoa
            // console.log('a: ', { _id: { $in: cusIdArray } });
            return result

        } catch (error) {
            return null
        }
    },


}