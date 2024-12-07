import { z } from 'zod';

//Todo: reuse server schema
//production: make regex to validate dueDate.
export const taskSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(30, "Title must not exceed 30 characters"),
    description: z.string().max(100, "Description must not exceed 100 characters"),
    dueDate: z.string(),
    status: z.enum(['To Do', 'In Progress', 'Completed']),
    taskOwner: z.string().min(2, "Task Owner must be at least 2 characters").max(30, "Task Owner must not exceed 30 characters"),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
});

