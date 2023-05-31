from faker import Faker
import csv
import random

fake = Faker()

num_rows = 10
field_names = ['Book', 'Customer','Address','e-mail','phone number', 'Warehouse','Warehouse address','Warehouse capacity', 'Retailer','Retailer address','Retailer contact','Retailer phone','Supplier','Supplier address','Supplier contact','Supplier phone','Author','ISBN','Publication date']

def generate_fake_isbn():
    prefix = fake.random_element(["978", "979"])  # Choose between ISBN-10 (978) or ISBN-13 (979) prefixes
    group = fake.random_int(min=0, max=9)  # Randomly generate a group identifier
    publisher = fake.random_int(min=0, max=9999)  # Randomly generate a publisher identifier
    title = fake.random_int(min=0, max=999)  # Randomly generate a title identifier
    check_digit = fake.random_int(min=0, max=9)  # Randomly generate a check digit
    
    isbn = f"{prefix}-{group}-{publisher}-{title}-{check_digit}"
    return isbn

# Generate a fake ISBN
fake_isbn = generate_fake_isbn()

with open('data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    writer.writerow(field_names)
    
    for _ in range(num_rows):
        book_title = fake.catch_phrase()
        row = [book_title, fake.name(),fake.address(),fake.email(),fake.phone_number(), fake.company(),fake.address(),random.randint(100,2000), fake.company(),fake.address(),fake.name(),fake.phone_number(), fake.company(),fake.address(),fake.name(),fake.phone_number(), fake.name(), generate_fake_isbn(), fake.date()]
        writer.writerow(row)

# File will be closed automatically after exiting the 'with' block

print("CSV file created successfully.")
