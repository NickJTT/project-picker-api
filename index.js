import express from 'express';
import cors from 'cors';
import auth from './src/routers/auth';
import projects from './src/routers/projects';

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/projects', projects);

app.listen(PORT);
