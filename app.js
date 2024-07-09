import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Routes
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import positionRoutes from './routes/positionRoutes.js';
import managerRoutes from './routes/managerRoutes.js'; // Import manager routes
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import authMiddleware from './middleware/authMiddleware.js'; // Ensure this path is correct

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Database connection
import './config/db.js';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use auth routes
app.use('/auth', authRoutes);

// Use other routes with authMiddleware
app.use('/employees', authMiddleware, employeeRoutes); // Apply middleware to routes that need protection
app.use('/departments', authMiddleware, departmentRoutes);
app.use('/positions', authMiddleware, positionRoutes);
// app.use('/managers)
app.use('/managers', authMiddleware, managerRoutes);

// app.use('/employees',  employeeRoutes); // Apply middleware to routes that need protection
// app.use('/departments',departmentRoutes);
// app.use('/positions',  positionRoutes);
// app.use('/api', managerRoutes);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/', (req, res)=>{
    res.send('Home Page');
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
