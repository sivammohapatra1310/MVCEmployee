import Department from '../models/department.js';
import Employee from '../models/employee.js'; // Assuming you have an Employee model
// import mongoose from 'mongoose';
import Manager from '../models/manager.js'; // Add this import


export const addDepartment = async (req, res) => {
    const { department_name, manager_id } = req.body;

    const newDepartment = new Department({ department_name, manager_id });

    try {
        let isValid = true;
        for (const field in newDepartment.toObject()) {
            if (!newDepartment[field]) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }
        console.log(Department);
        const existingDepartment = await Department.findOne({ department_name });
        console.log("yess", existingDepartment);
        if (existingDepartment) {
            return res.status(400).json({
                status: false,
                message: "Department already exists"
            });
        }

        const manager = await Manager.findOne({ manager_id });
        if (!manager) {
            return res.status(400).json({
                status: false,
                message: "Manager ID does not exist"
            });
        }

        await newDepartment.save();
        res.json({
            status: true,
            message: "Department Created",
            data: newDepartment
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
////////////////////////

export const deleteDepartment= async (req, res) => {
    const { department_id } = req.body;

    try {
        const department = await Department.findById(department_id);

        if (!department) {
            return res.status(400).json({
                status: false,
                message: "Department not found"
            });
        }

        // Find employees in this department
        const employees = await Employee.find({ department_id }).exec();

        if (employees.length > 0) {
            // Extract employee IDs
            const employeeIds = employees.map(emp => emp.employee_id);

            // Delete employees from the database
            await Employee.deleteMany({ department_id });
        }

        // Delete the department itself
        await Department.deleteOne({ _id: department_id });

        res.json({
            status: true,
            message: `Department with id: ${department_id} and its employees deleted`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// Endpoint to print all departments
export const printDepartment= async (req, res) => {
    try {
        const departments = await Department.find({});

        if (departments.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Department is Empty"
            });
        } else {
            return res.json({
                status: true,
                departments: departments
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};