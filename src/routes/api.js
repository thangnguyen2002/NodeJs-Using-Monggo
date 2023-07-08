const express = require('express') //commonjs
const router = express.Router()
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultiFileAPI } = require('../controllers/apiController')
const { postCreateCustomer, postCreateManyCustomer, getAllCustomers, putACustomer, deleteACustomer, deleteManyCustomer } = require('../controllers/customerController')
// API la cac url, Restful API la viet API theo tieu chuan Rest
// tieu chuan Rest la chi ro get la lay, post la tao, put la update, delete la xoa
router.get('/users', getUsersAPI)
router.post('/users', postCreateUserAPI)
router.put('/users', putUpdateUserAPI)
router.delete('/users', deleteUserAPI)

router.post('/file', postUploadSingleFileAPI)
router.post('/files', postUploadMultiFileAPI)

router.post('/customers', postCreateCustomer)
router.post('/customers-many', postCreateManyCustomer)
router.get('/customers', getAllCustomers)
router.put('/customers', putACustomer)
router.delete('/customers', deleteACustomer)
router.delete('/customers-many', deleteManyCustomer)

// Query string luon dung method get
router.get('/info', (req, res) => { //query string
    // console.log('req.query: ', req.query);
    res.status(200).json({
        data: req.query
    })
})

router.get('/info/:name/:address/:birth/:phone', (req, res) => { //co bao nhieu value se phai dinh nghia bay nhieu /:
    //nen khi truyen nhieu ta thuong dung query string thay vi params
    // console.log('req.params: ', req.params);
    res.status(200).json({
        data: req.params
    })
})


module.exports = router