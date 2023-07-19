const Task = require('../models/task')
const aqp = require('api-query-params');

module.exports = {
    createTask: async (data) => {
        try {
            if (data.type === 'EMPTY-TASK') {
                let result = await Task.create(data).exec()
                return result
            }
        } catch (error) {
            console.log('>>> error: ', error);
            return null;
        }
    },

    getTasks: async (data) => {
        try {
            let offset = (data.page - 1) * data.limit
            const { filter, limit } = aqp(data)
            delete filter.page
            let result = await Task.find(filter).limit(limit).skip(offset).exec()
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    },

    updateTask: async (data) => {
        try {
            // console.log('>>>data: ', data); //data la` n~ thu dc thay doi tu req.body, n~ thu ko dc thay doi thi ko dc truyen sang data
            //destruturing la ta truyen len data ntn no se copy y het v
            //o day truyen form-urlencoded va raw data thi deu dc update tren cung 1 api, ma ko can thay doi link api khac
            let result = await Task.updateOne({ _id: data.id }, { ...data }).exec()
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    },

    deleteTask: async (data) => {
        try {
            let result = await Task.deleteById(data.id).exec()
            return result

        } catch (error) {
            console.log('>>>error: ', error);
            return null
        }
    }
}