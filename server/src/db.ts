import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Task as TaskModel } from '../models/taskModel';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', (error as Error).message);
        process.exit(1);
    }
};

const loadData = async () => {
    try {
        const existingTasks = await TaskModel.countDocuments();
        if (existingTasks > 0) {
            console.log('Data already exists. Skipping data loading.');
            return;
        }
        const filePath = path.resolve(process.cwd(), '_mockDB', 'tasks.json');

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        await TaskModel.insertMany(data);
        console.log('Data loaded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error loading data:', error);
        process.exit(1);
    }
};


const initMongo = async () => {
    //Note: could consider validating the mock schema before loading

    //todo: find a way not to init mongo every code change
    try {
        await connectDB();
        if (process.env.NODE_ENV === 'development') {
            await loadData();
        }
    }
    catch (error) {
        console.log("Failed to initialize DB")
        throw error
    }
}

export default initMongo

