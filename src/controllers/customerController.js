
const { createCustomerService, createManyCustomerService, getAllCustomersService, updateACustomersService, deleteACustomersService, deleteManyCustomersService } = require('../services/customerService')
const { uploadSingleFile } = require("../services/fileService");
const Joi = require('joi');

//co the viet kieu nay, do la object nen phai co key:value, key la ten, value la function
module.exports = {
    postCreateCustomer: async (req, res) => {
        // name: {
        //     type: String,
        //     required: true
        // },
        // address: String,
        // phone: String,
        // email: String,
        // image: String,
        // description: String

        //lay req ng dung truyen len 
        let { name, address, phone, email, description } = req.body //image thi` phai dung thu vien req.files
        // console.log("req.body: ", name, description);

        //validate with joi (sau nay nen dinh nghia cai nay o file rieng biet, o day se rất rối)
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            address: Joi.string(),
            phone: Joi.string().pattern(new RegExp('^[0-9]{9,11}$')), //.pattern() chi co tac dung vs string()
            //required number 0-9, min 9, max 11 number
            email: Joi.string().email(),
            description: Joi.string(),
            image: Joi.string().allow('') //allow null or have to be string value for this field
        })
        //abortEarly false tuc la se thong bao het tat ca cac loi, true thi chi tbao 1 loi
        // const { error } = schema.validate(req.body, { abortEarly: false }); 
        const { error } = schema.validate(req.body); //neu ko co loi no chi return object rong, tuc la ko co error
        // console.log(">>>result joi: ", result);
        if (error) { //neu co error ta return message 
            return res.status(200).json({
                ms: error
            })

        } else {
            let imageUrl = ""
            if (!req.files || Object.keys(req.files).length === 0) {
                //do nothing
            } else { //co file
                let image = await uploadSingleFile(req.files.image);
                // console.log("result: ", image);
                imageUrl = image.path
            }

            //truyen data tu req qua service
            let customerData = {
                name,
                address,
                phone,
                email,
                description,
                image: imageUrl
            }

            let customer = await createCustomerService(customerData)
            // console.log(">>>customer: ", customer);

            return res.status(200).json({
                EC: 0,
                data: customer
            })
        }

    },

    postCreateManyCustomer: async (req, res) => {
        let customersArray = req.body.customers
        // console.log("customersArray: ", customersArray);

        let customers = await createManyCustomerService(customersArray)
        // console.log('>>>customers: ', customers);

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })

        } else { //customers rong hoac = null
            return res.status(400).json({
                EC: -1,
                data: customers
            })
        }
    },

    getAllCustomers: async (req, res) => {
        // console.log('>>>req.query: ', req.query); //page, limit
        let { page, limit } = req.query
        let customers = null

        if (page && limit) {
            customers = await getAllCustomersService(page, limit, req.query)

        } else {
            customers = await getAllCustomersService()
        }

        return res.status(200).json({
            EC: 0,
            data: customers
        })
    },

    putACustomer: async (req, res) => {
        let { id, name, email, address } = req.body
        let customerInfo = {
            id,
            name,
            email,
            address
        }
        // console.log('>>> customerInfo: ', customerInfo);
        let customer = await updateACustomersService(customerInfo)
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },

    deleteACustomer: async (req, res) => {
        // console.log(">>>id Customer: ", req.body.id);
        let result = await deleteACustomersService(req.body.id)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteManyCustomer: async (req, res) => {
        console.log(">>>req.body.customers : ", req.body.customers);
        let result = await deleteManyCustomersService(req.body.customers)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },


}