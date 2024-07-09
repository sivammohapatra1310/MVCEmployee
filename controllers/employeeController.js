import Employee from '../models/employee.js';
import Department from '../models/department.js';
import Position from '../models/position.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

let employeeCounter = 1;

async function getMaxEmployeeId() {
    try {
        const result = await Employee.aggregate([
            { $group: { _id: null, maxEmployeeId: { $max: { $toInt: { $substr: ["$employee_id", 4, -1] } } } } }
        ]);
        return result.length > 0 ? result[0].maxEmployeeId : null;
    } catch (error) {
        console.error("Error getting max employee ID:", error);
        return null;
    }
}

(async () => {
    try {
        await mongoose.connection;
        const maxEmployeeId = await getMaxEmployeeId();
        employeeCounter = maxEmployeeId ? maxEmployeeId + 1 : 1;
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
})();

export const addEmployee = async (req, res) => {
    const {
        first_name, last_name, dob, gender, contact_number,
        email, address, doj, position_id, department_id
    } = req.body;

    try {
        const position = await Position.findById(position_id);
        const department = await Department.findById(department_id);

        if (!position) {
            return res.status(400).json({
                status: false,
                message: "Invalid position_id"
            });
        }

        if (!department) {
            return res.status(400).json({
                status: false,
                message: "Invalid department_id"
            });
        }

        const employee_id = `nte-${String(employeeCounter).padStart(3, '0')}`;

        const newEmployee = new Employee({
            employee_id, first_name, last_name, dob, gender, contact_number,
            email, address, doj, position_id, department_id
        });

        let isValid = true;
        for (const field in newEmployee.toObject()) {
            if (!newEmployee[field]) {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        } else {
            await newEmployee.save();
            employeeCounter++;
            res.json({
                status: true,
                message: "Employee Created",
                data: newEmployee
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};



export const deleteEmployee = async (req, res) => {
    const { employee_id } = req.body;
    try {
        const employee = await Employee.findOne({ employee_id });
        if (employee) {
            await Employee.deleteOne({ employee_id });
            res.json({
                status: true,
                message: `Employee with id: ${employee_id} deleted`
            });
        } else {
            res.status(400).json({
                status: false,
                message: "Employee not found"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const deleteAllEmployees = async (req, res) => {
    try {
        await Employee.deleteMany({});
        res.json({
            status: true,
            message: "All employees deleted"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        if (employees.length === 0) {
            res.status(400).json({
                status: false,
                message: "No employees found"
            });
        } else {
            res.status(200).json({
                status: true,
                total: employees.length, 
                data: employees,
                message: "Employees fetched successfully"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// export const getManagerDetails = async (req, res) => {
//     try {
//         const { employee_id } = req.body;
//         const employee = await Employee.findOne({ employee_id });

//         if (!employee) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Employee not found"
//             });
//         }

//         const department = await Department.findById(employee.department_id);
//         if (!department) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Department not found"
//             });
//         }

//         const manager = await Employee.findOne({ employee_id: department.manager_id });
//         if (!manager) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Manager not found"
//             });
//         }

//         res.json({
//             status: true,
//             data: manager
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//             status: false,
//             message: error.message,
//         });
//     }
// };

export const updateEmployeeDetails = async (req, res) => {
    const { employee_id, contact_number, email, address } = req.body;
    try {
        
        console.log(req.body);
        // const employee = await Employee.findById("668bda0b06a39116909feeef");
        const employee = await Employee.findOne({  _id: new ObjectId('668cc1e19c4a56cdc68226e4')});

        console.log("=======================",employee);

        if (!employee) {
            return res.status(400).json({
                status: false,
                message: "Employee not found"
            });
        }

        if (contact_number) employee.contact_number = contact_number;
        if (email) employee.email = email;
        if (address) employee.address = address;

        await employee.save();

        res.json({
            status: true,
            message: "Employee details updated",
            data: employee
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const updateDepartmentManager = async (req, res) => {
    const { department_name, manager_id } = req.body;

    try {
        const department = await Department.findOne({ department_name });

        if (!department) {
            return res.status(400).json({
                status: false,
                message: "Department not found"
            });
        }

        const manager = await Employee.findOne({ employee_id: manager_id });

        if (!manager) {
            return res.status(400).json({
                status: false,
                message: "Manager not found"
            });
        }

        department.manager_id = manager_id;

        await department.save();

        res.json({
            status: true,
            message: "Department manager updated",
            data: department
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
