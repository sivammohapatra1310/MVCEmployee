import express from 'express';
import { addPosition, deletePosition, printPositions } from '../controllers/positionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', addPosition);       
router.delete('/delete', deletePosition); 
router.get('/get', printPositions);      

router.post('/add', authMiddleware, addPosition);       
router.delete('/delete', authMiddleware, deletePosition); 
router.get('/get', authMiddleware, printPositions);  
export default router;
