const Customer = require('../models/customer')

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
                image: customerData.image //chir lưu đường dẫn ảnh chứ ko lưu tên ảnh vào database
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

    getAllCustomersService: async () => {
        try {
            let result = await Customer.find({})
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
            //deleteById la static method cua thu vien mongoose delete (based on soft delete)
            //static method tuc la co the thao tac truc tiep vs model thay vi dun` tu khoa new nhu save()
            let result = await Customer.deleteById(cusId)
            return result

        } catch (error) {
            return null
        }
    },
}