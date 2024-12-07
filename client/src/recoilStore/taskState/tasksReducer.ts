import { ITaskDTO } from "../../types/task";



export const addTask = (setTasks: React.Dispatch<React.SetStateAction<ITaskDTO[]>>, newTask: ITaskDTO) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
};

export const updateTask = (
    setTasks: React.Dispatch<React.SetStateAction<ITaskDTO[]>>,
    id: string,
    updatedTask: ITaskDTO
) => {
    setTasks((prevTasks) =>
        prevTasks.map(task => (task._id === id ? { ...task, ...updatedTask } : task))
    );
};

export const deleteTask = (
    setTasks: React.Dispatch<React.SetStateAction<ITaskDTO[]>>,
    id: string
) => {
    setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
};
