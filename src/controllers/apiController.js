const User = require("../models/User");
const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json(
        {
            EC: 0,
            data: results
        }
    )
}

const postCreateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let user = await User.create({
        email: email,
        name: name,
        city: city
    })

    return res.status(200).json(
        {
            EC: 0,
            data: user
        }
    )
}

const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let userId = req.body.userId;

    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });

    return res.status(200).json(
        {
            EC: 0,
            data: user
        }
    )
}

const deleteUserAPI = async (req, res) => {
    const id = req.body.userId;

    let result = await User.deleteOne({
        _id: id
    }) //deleteOne() se xoa khoi database luon, nen dung deleteById cua soft delete de tranh nguy hiem mat data

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadSingleFileAPI = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadMultiFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // console.log(req.files);
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } else {
        //upload single
        return await postUploadSingleFileAPI(req, res);
    }
}

module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultiFileAPI
}
