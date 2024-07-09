import express from 'express';
import {
    createManager,
    getManager,
    updateManager,
    deleteManager,
    getManagerByEmployeeId,
} from '../controllers/managerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/add',createManager);       
// router.get('/get/:manager_id',  getManager); 
// router.patch('/update/:manager_id',updateManager); 
// router.delete('/delete/:manager_id', deleteManager); 
// router.post('/get-manager-by-employee', getManagerByEmployeeId); 

router.post('/add',authMiddleware,  createManager);       
router.get('/get/:manager_id',authMiddleware,  getManager); 
router.patch('/update/:manager_id',authMiddleware,  updateManager); 
router.delete('/delete/:manager_id',authMiddleware,  deleteManager); 
router.post('/get-manager-by-employee',authMiddleware,  getManagerByEmployeeId); 

export default router;
