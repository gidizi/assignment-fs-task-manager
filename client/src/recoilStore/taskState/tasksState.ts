import { atom } from "recoil";
import { ITaskDTO } from "../../types/task"

//in reality we would convert the dto to oour business object
export const tasksState = atom<ITaskDTO[]>({
    key: "tasksState",
    default: [],
});
