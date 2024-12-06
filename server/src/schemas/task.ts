import { z } from 'zod';
//todo: get enum value from shared type that will be used for mongo schema
export const TaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    dueDate: z.string(),
    status: z.enum(['To Do', 'In Progress', 'Completed']),
    taskOwner: z.string(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
    tags: z.array(z.string()),
});

export type Task = z.infer<typeof TaskSchema>;

