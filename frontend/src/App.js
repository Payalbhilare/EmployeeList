import React, { useEffect, useState } from 'react';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    // Fetch employees from the server
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3001/employees');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    // Get unique departments for the dropdown
    const departments = [...new Set(employees.map((employee) => employee.department))];

    // Filter employees based on the search term and selected department
    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
            selectedDepartment === '' || employee.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Employee List</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name, role, or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />

            {/* Department Filter */}
            <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            >
                <option value="">All Departments</option>
                {departments.map((department) => (
                    <option key={department} value={department}>
                        {department}
                    </option>
                ))}
            </select>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Role</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr
                            key={employee.id}
                            onClick={() => setSelectedEmployee(employee)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td style={{ border: '1px solid black', padding: '10px' }}>{employee.name}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{employee.role}</td>
                            <td style={{ border: '1px solid black', padding: '10px' }}>{employee.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup for Selected Employee */}
            {selectedEmployee && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                    }}
                >
                    <h2>Employee Details</h2>
                    <p><strong>Name:</strong> {selectedEmployee.name}</p>
                    <p><strong>Role:</strong> {selectedEmployee.role}</p>
                    <p><strong>Department:</strong> {selectedEmployee.department}</p>
                    <p><strong>Contact:</strong> {selectedEmployee.contact}</p>
                    <p><strong>Info:</strong> {selectedEmployee.info}</p>
                    <p><strong>Bio:</strong> {selectedEmployee.bio}</p>
                    <button onClick={() => setSelectedEmployee(null)} style={{ marginTop: '10px', padding: '10px' }}>
                        Close
                    </button>
                </div>
            )}

            {/* Overlay to close popup */}
            {selectedEmployee && (
                <div
                    onClick={() => setSelectedEmployee(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                    }}
                ></div>
            )}
        </div>
    );
};

export default App;
