import express, { Application } from 'express';
import dotenv from 'dotenv';
import initMongo from './src/db'
import taskRoutes from './routes/taskRoutes';

dotenv.config();


const app: Application = express();

app.use(express.json());

app.use('/tasks', taskRoutes);

const PORT: number = parseInt(process.env.PORT || '3000');

initMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})

