import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from '../../API/axiosInstance';
import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';


//todo: get priority select options from shared enum + fix the option rendering function
//todo: take care of due date and think whether pr=localization is relevant (and should we add time)
//todo: get potential owners

//todo: reuse from shared types library
export interface ITask {
    title: string;
    description: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    creationTime: Date;
    taskOwner: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    tags: string[];
}


//add editmode or taskId
const AddTask = () => {
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm()
    //todo: change undefined type
    const onSubmit = async (data: ITask) => {
        try {
            const createdTask = await axiosInstance.post('/tasks', data)
            const resData = createdTask?.data
            setError('')
            //todo: do something with the data
        } catch (error) {
            //todo: get a shared type of response type for both BE and FE!
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message?.message)
            } else {
                setError('Unexpected error has occured')
            }
        }
    }
    return (
        <>
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
                <TextField
                    select
                    label="Priority"
                    {...register("priority")}
                    aria-invalid={errors.priority ? "true" : "false"}
                    error={!!errors.priority}
                    helperText={errors.priority?.message?.toString() || errors.priority?.type?.toString()}
                    fullWidth>
                    {(["Low", "Medium", "High", "Critical"] as ITask["priority"][]).map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </TextField>
                {/* {editMode && <TextField
                    select
                    label="Status"
                    {...register("status")}
                    aria-invalid={errors.status ? "true" : "false"}
                    error={!!errors.status}
                    helperText={errors.status?.message?.toString() || errors.status?.type?.toString()}
                    fullWidth>
                    {['new', 'old', 3].map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </TextField>} */}
                <TextField
                    select
                    label="Status"
                    {...register("status")}
                    aria-invalid={errors.status ? "true" : "false"}
                    error={!!errors.status}
                    helperText={errors.status?.message?.toString() || errors.status?.type?.toString()}
                    fullWidth>
                    {(['To Do', 'In Progress', 'Completed'] as ITask["status"][]).map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </TextField>


                <input type="submit" />
                {error && <Alert severity="error">{error}</Alert>}
            </form>
        </>
    )
}

export default AddTask