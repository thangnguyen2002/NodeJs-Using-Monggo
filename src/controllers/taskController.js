const { createTask, getTasks, updateTask, deleteTask } = require("../services/taskService")

module.exports = {
    postCreateTask: async (req, res) => {
        let result = await createTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getAllTasks: async (req, res) => {
        let result = await getTasks(req.query)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    putUpdateTask: async (req, res) => {
        let result = await updateTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteATask: async (req, res) => {
        let result = await deleteTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
}