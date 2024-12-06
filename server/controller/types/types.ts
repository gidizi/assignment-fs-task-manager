import { ITask } from "../../models/taskModel"

export type taskPayload = Omit<ITask, 'creationTime' | 'id'>;
export type taskPayloadWithPotentialInstanceAttrs = taskPayload & {
    [key: string]: unknown;
};