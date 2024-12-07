import { useEffect } from "react";
import axiosInstance from '../../API/axiosInstance';
import TaskForm from "../TaskForm/taskForm";
import { modalState } from "../../recoilStore/modalState/modalState";
import { tasksState } from "../../recoilStore/taskState/tasksState"
import { useRecoilState, useSetRecoilState } from "recoil";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { deleteTask } from "../../recoilStore/taskState/tasksReducer";


const TasksList = () => {
    const [tasks, setTasks] = useRecoilState(tasksState)
    const setModal = useSetRecoilState(modalState);


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const currentTask = await axiosInstance.get(`/tasks/`)
                const resData = currentTask?.data.data
                setTasks(resData.slice(0, 10))
            } catch (error) {
                console.log(error)
                //todo: handle gracefully by refetch or show user error at the UI
            }
        }
        fetchTask()
    }, [])

    const handleUpdate = (id: string) => {
        setModal({ open: true, content: <TaskForm taskId={id} /> })
    };

    const handleDelete = async (id: string, title: string) => {
        //todo: replace 'confirm' with better looking modal
        const userResponse = confirm(`Are you sure you want to delete ${title}?`);
        if (userResponse) {
            try {
                await axiosInstance.delete(`/tasks/${id}`)
                deleteTask(setTasks, id)
            } catch (error) {
                console.log(error)
            }



        }
    };

    return (
        <div>
            <h2>Task manager</h2>
            <List>
                {tasks.map((item) => (
                    <ListItem
                        key={item._id}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            mb: 2,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px",
                        }}
                    >
                        <ListItemText
                            primary={item.title}
                            secondary={item.description}
                            sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>

                            <Button
                                variant="contained"
                                color="primary"
                                size="small" // Make the button smaller
                                onClick={() => handleUpdate(item._id)}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small" // Make the button smaller
                                onClick={() => handleDelete(item._id, item.title)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TasksList;
