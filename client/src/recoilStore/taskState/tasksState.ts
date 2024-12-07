import { atom } from "recoil";
import { ITask } from "../../types/task"

export const tasksState = atom<ITask[]>({
    key: "tasksState",
    default: [],
});
