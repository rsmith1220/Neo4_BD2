from faker import Faker
import csv

fake = Faker()

num_rows = 10
field_names = ['Book', 'Customer', 'Warehouse', 'Retailer','Supplier']

with open('data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    writer.writerow(field_names)
    
    for _ in range(num_rows):
        book_title = fake.catch_phrase()
        row = [book_title, fake.name(), fake.company(), fake.company(), fake.company()]
        writer.writerow(row)

# File will be closed automatically after exiting the 'with' block

print("CSV file created successfully.")
