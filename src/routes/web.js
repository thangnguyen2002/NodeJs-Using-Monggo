const express = require('express') //commonjs
const router = express.Router()
const { getHomePage, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, getDeletePage, postDeleteUser } = require('../controllers/homeController')

// router.Method('/route', function handler)
router.get('/', getHomePage) //đây là tham chiếu, ko phải gọi hàm vì hàm ko thực thi ở đây mà thực thi ở homeController
router.get('/create', getCreatePage)
router.post('/create-user', postCreateUser)
router.get('/update/:id', getUpdatePage)
router.post('/update-user', postUpdateUser)
router.get('/delete/:id', getDeletePage)
router.post('/delete-user', postDeleteUser)

module.exports = router