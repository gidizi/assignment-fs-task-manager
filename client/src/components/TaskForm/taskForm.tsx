import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { modalState, closedModalState } from '../../recoilStore/modalState';
import { useSetRecoilState } from "recoil";
import axiosInstance from '../../API/axiosInstance';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { ITask } from "../../types/task"
import Button from "@mui/material/Button";

//todo important: add form validation

//todo: get priority select options from shared enum + fix the option rendering function

//todo: reuse from shared types library

interface props {
    taskId?: string;
}

const filterNonITaskKeys = (obj) => {
    const allowedKeys: (keyof ITask)[] = ["title", "description", "dueDate", "status", "taskOwner", "priority", "tags"];
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => allowedKeys.includes(key as keyof ITask))
    );
}

const TaskForm = ({ taskId }: props) => {
    const [error, setError] = useState('')
    const setModal = useSetRecoilState(modalState);
    const { register, formState: { errors }, handleSubmit, control, reset } = useForm()


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const currentTask = await axiosInstance.get(`/tasks/${taskId}`)
                const resData = currentTask?.data
                console.log("resData", resData)
                //note: in Prod app we would have set server data dto and converter for the form required format (BO)
                reset(resData)
            } catch (error) {
                setError('Unexpected error has occured, please try to refresh the page ')//todo adjust
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
                //todo: update store
                setModal(closedModalState)

            } else {
                const createdTask = await axiosInstance.post('/tasks', data)
                const resData = createdTask?.data
                //todo: update store

            }
            setError('')
        } catch (error) {
            console.log(error)
            //todo: get a shared type of response type for both BE and FE!
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    label="Title"
                    {...register("title", { required: true })}
                    aria-invalid={errors.title ? "true" : "false"}
                    error={!!errors.title}
                    helperText={errors.title?.message?.toString() || errors.title?.type?.toString()}
                    fullWidth
                />
                <TextField
                    label="Description"
                    {...register("description")}
                    aria-invalid={errors.description ? "true" : "false"}
                    error={!!errors.description}
                    helperText={errors.description?.message?.toString() || errors.description?.type?.toString()}
                    fullWidth
                />
                <TextField
                    label="Task Owner"
                    {...register("taskOwner")}
                    aria-invalid={errors.taskOwner ? "true" : "false"}
                    error={!!errors.taskOwner}
                    helperText={errors.taskOwner?.message?.toString() || errors.taskOwner?.type?.toString()}
                    fullWidth
                />
                <TextField
                    type="date"
                    label="Due Date"
                    {...register("dueDate")}
                    aria-invalid={errors.dueDate ? "true" : "false"}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate?.message?.toString() || errors.dueDate?.type?.toString()}
                    fullWidth
                />
                <Controller
                    name="priority"
                    control={control}
                    defaultValue="Low" // Set an initial value to avoid uncontrolled warnings
                    render={({ field }) => (
                        <TextField
                            select
                            label="Priority"
                            {...field}
                            fullWidth
                            aria-invalid={errors.priority ? "true" : "false"}
                            error={!!errors.priority}
                            helperText={errors.priority?.message?.toString() || errors.priority?.type?.toString()}
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
                        >
                            {(['To Do', 'In Progress', 'Completed'] as ITask["status"][]).map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />



                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
            </form >
        </div>
    )
}

export default TaskForm