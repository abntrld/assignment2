const pool = require('../db'); 

const getEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees ORDER BY employee_id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addEmployee = async (req, res) => {
    try {
        const { full_name, phone, position } = req.body;
        const result = await pool.query(
            'INSERT INTO employees (full_name, phone, position) VALUES ($1, $2, $3) RETURNING *',
            [full_name, phone, position]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM employees WHERE employee_id=$1', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getEmployees, addEmployee, deleteEmployee };
