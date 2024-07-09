import express from 'express';
import { addEmployee, deleteEmployee, deleteAllEmployees, getEmployees, updateEmployeeDetails, updateDepartmentManager } from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/add', addEmployee);
// // router.post('/login', authMiddleware, loginEmployee);
// router.delete('/delete',  deleteEmployee);
// router.delete('/deleteAll',deleteAllEmployees);
// router.get('/get',getEmployees);
// // router.get('/getManager', authMiddleware, getManagerDetails);
// router.patch('/update', updateEmployeeDetails);
// router.patch('/updateManager', updateDepartmentManager);

router.post('/add', authMiddleware, addEmployee);
// router.post('/login', authMiddleware, loginEmployee);
router.delete('/delete',authMiddleware,  deleteEmployee);
router.delete('/deleteAll',authMiddleware,  deleteAllEmployees);
router.get('/get', authMiddleware, getEmployees);
// router.get('/getManager', authMiddleware, getManagerDetails);
router.patch('/update', authMiddleware, updateEmployeeDetails);
router.patch('/updateManager',authMiddleware,  updateDepartmentManager);

export default router;
