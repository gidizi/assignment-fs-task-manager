export interface ITask {
    title: string;
    description: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    taskOwner: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    tags: string[];
}