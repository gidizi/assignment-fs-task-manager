import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { modalState, closedModalState } from '../../recoilStore/modalState/modalState';
import { useSetRecoilState } from "recoil";
import { tasksState } from '../../recoilStore/taskState/tasksState';
import axiosInstance from '../../API/axiosInstance';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ITask, ITaskDTO } from "../../types/task"
import Button from "@mui/material/Button";
import { addTask, updateTask } from '../../recoilStore/taskState/tasksReducer';

//todo important: add form validation/

interface props {
    taskId?: string;
}

const filterNonITaskKeys = (obj: ITaskDTO) => {
    const allowedKeys: (keyof ITask)[] = ["title", "description", "dueDate", "status", "taskOwner", "priority", "tags"];
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowedKeys.includes(key as keyof ITask))
    );
}

const TaskForm = ({ taskId }: props) => {
    const setTasks = useSetRecoilState(tasksState);
    const setModal = useSetRecoilState(modalState);
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit, control, reset } = useForm()


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const currentTask = await axiosInstance.get(`/tasks/${taskId}`)
                const resData = currentTask?.data
                //note: in Prod app we would have set server data dto and converter for the form required format (BO)
                reset(resData)
            } catch (error) {
                setError('Unexpected error has occured, please try to refresh the page ') //extract to external messages file
            }
        }
        if (taskId) fetchTask()
    }, [taskId])


    const onSubmit = async (data: ITask) => {
        try {
            if (taskId) {
                const modifiedTask = await axiosInstance.put(`/tasks/${taskId}`, data)
                const resData = modifiedTask?.data.data
                const filteredObject = filterNonITaskKeys(resData)
                reset(filteredObject)
                updateTask(setTasks, taskId, filteredObject)
                setModal(closedModalState)
            } else {
                const createdTask = await axiosInstance.post('/tasks', data)
                const resData = createdTask?.data.data
                addTask(setTasks, resData)

            }
            setError('')
        } catch (error) {
            console.log(error)
            //todo: get a shared type of response type for both Server and Client!
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message?.message)
            } else {
                setError('Unexpected error has occured')
            }
        }
    }
    return (
        <div>
            <h2>{taskId ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
                <TextField
                    required
                    label="Title"
                    {...register("title", { required: true })}
                    aria-invalid={errors.title ? "true" : "false"}
                    error={!!errors.title}
                    helperText={errors.title?.message?.toString() || errors.title?.type?.toString()}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    {...register("description")}
                    aria-invalid={errors.description ? "true" : "false"}
                    error={!!errors.description}
                    helperText={errors.description?.message?.toString() || errors.description?.type?.toString()}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Task Owner"
                    {...register("taskOwner")}
                    aria-invalid={errors.taskOwner ? "true" : "false"}
                    error={!!errors.taskOwner}
                    helperText={errors.taskOwner?.message?.toString() || errors.taskOwner?.type?.toString()}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Due Date"
                    {...register("dueDate")}
                    aria-invalid={errors.dueDate ? "true" : "false"}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate?.message?.toString() || errors.dueDate?.type?.toString()}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Controller
                    name="priority"
                    control={control}
                    defaultValue="Low"
                    render={({ field }) => (
                        <TextField
                            select
                            label="Priority"
                            {...field}
                            fullWidth
                            aria-invalid={errors.priority ? "true" : "false"}
                            error={!!errors.priority}
                            helperText={errors.priority?.message?.toString() || errors.priority?.type?.toString()}
                            sx={{ mb: 2 }}
                        >
                            {(["Low", "Medium", "High", "Critical"] as ITask["priority"][]).map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    defaultValue="To Do"
                    render={({ field }) => (
                        <TextField
                            select
                            label="Status"
                            {...field}
                            fullWidth
                            disabled={!taskId}
                            error={!!errors.status}
                            helperText={errors.status?.message?.toString() || errors.status?.type?.toString()}
                            aria-invalid={errors.status ? "true" : "false"}
                            sx={{ mb: 2 }}
                        >
                            {(['To Do', 'In Progress', 'Completed'] as ITask["status"][]).map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
            {error && <Alert severity="error">{error}</Alert>}
        </div >
    )
}

export default TaskForm