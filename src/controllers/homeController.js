const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService')
const User = require('../models/User')

// day la file Controller giong nhu leader, giao nhiem vu cho cac Model lam, sau do can gi thi goi tu Model len
const getHomePage = async (req, res) => {
    const results = await getAllUsers()
    // console.log('>>>results:', results);
    res.render('home.ejs', { listUsers: results })
}

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body
    await User.create({ email, name, city })
    // res.send('Create user successfully')
    res.redirect('/')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => { //get id user update
    let userId = req.params.id
    let user = await getUserById(userId)
    // console.log('>>>user: ', user);
    res.render('edit.ejs', { userEdit: user })
}

const postUpdateUser = async (req, res) => { //implement update user
    let { email, name, city, userId } = req.body //id lay tu attribute name="" cua input
    await updateUserById(email, city, name, userId)
    res.redirect('/')//go to home page
}

const getDeletePage = async (req, res) => {
    let userId = req.params.id
    let user = await getUserById(userId)
    // console.log('>>>user: ', user);
    res.render('delete.ejs', { userEdit: user })
}

const postDeleteUser = async (req, res) => {
    let { userId } = req.body
    await deleteUserById(userId)
    res.redirect('/')
}

module.exports = {
    getHomePage,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    getDeletePage,
    postDeleteUser
}