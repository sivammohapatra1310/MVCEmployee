import Position from '../models/position.js';
import Employee from '../models/employee.js'; // Assuming you have an Employee model

// import mongoose from 'mongoose';

export const addPosition = async (req, res) => {
    const { position_name } = req.body;

    try {
        const newPosition = new Position({ position_name });

        if (!position_name) {
            res.status(400).json({
                status: false,
                message: "Position name is required"
            });
        } else {
            await newPosition.save();
            res.json({
                status: true,
                message: "Position Created",
                data: newPosition
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

// Endpoint to delete a position and its employees
export const deletePosition= async (req, res) => {
    const { position_id } = req.body;
    console.log(position_id);
    try {
        const position = await Position.findById(position_id);

        if (!position) {
            return res.status(400).json({
                status: false,
                message: "Position not found"
            });
        }

        // Find employees in this position
        const employees = await Employee.find({ position_id }).exec();

        if (employees.length > 0) {
            // Extract employee IDs
            const employeeIds = employees.map(emp => emp.employee_id);

            // Delete employees from the database
            await Employee.deleteMany({ position_id });
        }

        // Delete the position itself
        await Position.deleteOne({ _id: position_id });

        res.json({
            status: true,
            message: `Position with id: ${position_id} and its employees deleted`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

// Endpoint to print all positions
export const printPositions= async (req, res) => {
    try {
        const positions = await Position.find({});

        if (positions.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Positions are Empty"
            });
        } else {
            return res.json({
                status: true,
                positions: positions
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