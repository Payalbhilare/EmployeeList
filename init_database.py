import sqlite3

# Database file path
db_file = "e:\\EmployeeList\\employees.db"

# Connect to SQLite database (creates the file if it doesn't exist)
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Create the employees table
cursor.execute('''
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT CHECK(department IN ('IT', 'Finance', 'Marketing')) NOT NULL,
    contact TEXT NOT NULL,
    info TEXT,
    bio TEXT
)
''')

# Insert dummy data
dummy_data = [
    ("Alice Johnson", "Software Engineer", "IT", "alice.johnson@example.com", "Expert in backend systems", "Alice has 5 years of experience in software development."),
    ("Bob Smith", "Accountant", "Finance", "bob.smith@example.com", "Specialist in financial analysis", "Bob has been working in finance for over 10 years."),
    ("Charlie Brown", "Marketing Manager", "Marketing", "charlie.brown@example.com", "Leader in marketing strategies", "Charlie has a proven track record in marketing leadership."),
    ("Diana Prince", "IT Support", "IT", "diana.prince@example.com", "Skilled in IT troubleshooting", "Diana is known for her quick problem-solving skills."),
    ("Eve Adams", "Financial Analyst", "Finance", "eve.adams@example.com", "Focused on investment strategies", "Eve has a strong background in financial planning."),
    ("Frank White", "Content Creator", "Marketing", "frank.white@example.com", "Creative content specialist", "Frank excels in creating engaging content.")
]

cursor.executemany('''
INSERT INTO employees (name, role, department, contact, info, bio)
VALUES (?, ?, ?, ?, ?, ?)
''', dummy_data)

# Commit changes and close the connection
conn.commit()
conn.close()

print(f"Database initialized and dummy data inserted into {db_file}")
