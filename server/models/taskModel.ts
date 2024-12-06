import mongoose, { Document, Schema } from 'mongoose';
import { TaskSchema as zodSchema } from '../src/schemas/task';

//todo: extract status and priority options to enums
//todo: split into several files

export interface ITask extends Document {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    creationTime: Date;
    taskOwner: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    tags: string[];
}

const TaskSchema: Schema<ITask> = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        required: true,
    },
    creationTime: {
        type: Date,
        default: Date.now,
    },
    taskOwner: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
});

const CounterSchema = new Schema({
    field: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
});
const Counter = mongoose.model('Counter', CounterSchema);

TaskSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findOneAndUpdate(
            { field: 'taskId' },
            { $inc: { value: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!counter) {
            throw new Error('Failed to retrieve or create task ID counter.');
        }

        if (counter.value < 1000000) {
            await Counter.updateOne(
                { field: 'taskId' },
                { value: 1000000 }
            );
            this.id = 1000000;
        } else {
            this.id = counter.value;
        }

        validateWithZod(this.toObject());

        next();
    } catch (error: any) {
        if (error.code === 11000) {
            console.error('Duplicate key error:', error.keyValue);
            return next(new Error(`Duplicate task ID: ${error.keyValue.id}`));
        }

        console.error('Error in TaskSchema.pre save:', error);
        next(error);
    }
});



TaskSchema.index({ id: 1 });

const validateWithZod = (data: unknown): void => {
    try {
        zodSchema.parse(data);
    } catch (error) {
        throw new Error(`Validation Error: ${(error as Error).message}`);
    }
};

//production note: in production we would also add schema validation for update and remove

//todo change to taskModel and consider exporting default
export const Task = mongoose.model<ITask>('Task', TaskSchema);
