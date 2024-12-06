import express from 'express'
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controller/taskController"


const router = express.Router();

router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router