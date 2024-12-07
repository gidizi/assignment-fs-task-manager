import { z } from 'zod';
//todo: get enum value from shared type that will be used for mongo schema
//production: make regex to validate dueDate.
export const TaskSchema = z.object({
    id: z.number(),
    title: z.string().min(2, "Title must be at least 2 characters").max(30, "Title must not exceed 30 characters"),
    description: z.string().max(100, "Description must not exceed 100 characters"),
    dueDate: z.string(),
    status: z.enum(['To Do', 'In Progress', 'Completed']),
    taskOwner: z.string().min(2, "Task Owner must be at least 2 characters").max(30, "Task Owner must not exceed 30 characters"),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
    tags: z.array(z.string()),
});

export type Task = z.infer<typeof TaskSchema>;

