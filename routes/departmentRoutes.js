// import express from 'express';
// import { addDepartment, deleteDepartment, printDepartment } from '../controllers/departmentController.js';

// const router = express.Router();

// router.post('/add', addDepartment);
// router.delete('/delete', deleteDepartment);
// router.get('/get', printDepartment);
// export default router;

import express from 'express';
import { addDepartment, deleteDepartment, printDepartment } from '../controllers/departmentController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// router.post('/add', addDepartment);
// router.delete('/delete', deleteDepartment);
// router.get('/get',  printDepartment);

router.post('/add', authMiddleware, addDepartment);
router.delete('/delete', authMiddleware, deleteDepartment);
router.get('/get', authMiddleware, printDepartment);

export default router;
