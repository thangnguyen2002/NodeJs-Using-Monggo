const express = require('express') //commonjs
const router = express.Router()
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultiFileAPI } = require('../controllers/apiController')
const { postCreateCustomer, postCreateManyCustomer, getAllCustomers, putACustomer, deleteACustomer } = require('../controllers/customerController')
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
router.post('/customers-many', postCreateManyCustomer)
router.get('/customers', getAllCustomers)
router.put('/customers', putACustomer)
router.delete('/customers', deleteACustomer)

module.exports = router