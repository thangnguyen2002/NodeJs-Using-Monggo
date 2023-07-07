const connection = require('../config/database')
const User = require('../models/User')
// file này để chia code nhỏ ra, tái sử dụng (thuc hien các logic thay vi de tat ca trong Controller)
// cai nao dung nhieu -> cho vao service de co the tai su dung nhieu lan
const getAllUsers = async () => {
    const results = await User.find({})
    // console.log('>>>results:', results);
    return results
}

const getUserById = async (userId) => {
    // console.log('>>>id: ', userId);
    let user = await User.findOne({ _id: userId }).exec(); // _id trong mongoose co _ duoi
    // console.log('>>a: ', user);
    return user
}

const updateUserById = async (email, city, name, userId) => {
    await User.updateOne({ _id: userId }, { email, city, name })
}

const deleteUserById = async (userId) => {
    await User.deleteOne({ _id: userId })
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}