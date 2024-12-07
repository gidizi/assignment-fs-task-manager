import { z } from 'zod';

//Todo: reuse server schema
export const taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    dueDate: z.string(),
    status: z.enum(['To Do', 'In Progress', 'Completed']),
    taskOwner: z.string(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
});

