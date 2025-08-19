import psycopg2
from faker import Faker

# Configuration
num_records = 100000
batch_size = 1000

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="mydatabase",
    user="user",
    password="password",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Generate and insert sample data
fake = Faker()

insert_query = """
INSERT INTO students (first_name, last_name, email, enrollment_date)
VALUES (%s, %s, %s, %s)
"""

print(f"Starting to insert {num_records} records into the students table...")

for i in range(num_records // batch_size):
    batch = [
        (fake.first_name(), fake.last_name(), fake.email(), fake.date_this_decade())
        for _ in range(batch_size)
    ]
    cur.executemany(insert_query, batch)
    conn.commit()
    
    if (i + 1) % 10 == 0 or i == 0:
        print(f"Inserted {batch_size * (i + 1)} records so far...")

print("Data insertion completed.")

cur.close()
conn.close()
