import Manager from '../models/manager.js';
import Employee from '../models/employee.js';
import Department from '../models/department.js'
export const createManager = async (req, res) => {
    const { manager_id, full_name, dob, email, phone_number } = req.body;

    try {
        const existingManager = await Manager.findOne({ manager_id });

        if (existingManager) {
            return res.status(400).json({
                status: false,
                message: "Manager ID already exists"
            });
        }

        const newManager = new Manager({ manager_id, full_name, dob, email, phone_number });

        await newManager.save();

        res.json({
            status: true,
            message: "Manager created successfully",
            data: newManager
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const getManager = async (req, res) => {

    try {
        const mangers = await Manager.find({});

        if (mangers.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Managers are Empty"
            });
        } else {
            return res.json({
                status: true,
                positions: mangers
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

export const updateManager = async (req, res) => {
    const { manager_id } = req.params;
    const { full_name, dob, email, phone_number } = req.body;

    try {
        const manager = await Manager.findOneAndUpdate(
            { manager_id },
            { full_name, dob, email, phone_number },
            { new: true, runValidators: true }
        );

        if (!manager) {
            return res.status(400).json({
                status: false,
                message: "Manager not found"
            });
        }

        res.json({
            status: true,
            message: "Manager updated successfully",
            data: manager
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const deleteManager = async (req, res) => {
    const { manager_id } = req.params;

    try {
        const manager = await Manager.findOneAndDelete({ manager_id });

        if (!manager) {
            return res.status(400).json({
                status: false,
                message: "Manager not found"
            });
        }

        res.json({
            status: true,
            message: "Manager deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

export const getManagerByEmployeeId = async (req, res) => {
    const { employee_id } = req.body;

    try {
        // Find the employee by ID
        const employee = await Employee.findOne({ employee_id });
        if (!employee) {
            return res.status(400).json({
                status: false,
                message: "Employee not found"
            });
        }

        // Find the department by the employee's department ID
        const department = await Department.findById(employee.department_id);
        if (!department) {
            return res.status(400).json({
                status: false,
                message: "Department not found"
            });
        }

        // Find the manager by the department's manager ID
        const manager = await Manager.findOne({ manager_id: department.manager_id });
        if (!manager) {
            return res.status(400).json({
                status: false,
                message: "Manager not found"
            });
        }

        // Respond with the manager details
        res.json({
            status: true,
            data: manager
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

