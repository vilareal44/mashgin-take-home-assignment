import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await seedCategories();
  await seedItems();
}

// Seed categories
async function seedCategories() {
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        imageId: "f3fbf57b118fa9",
        name: "Bakery"
      },
      {
        id: 2,
        imageId: "b271afbefdc554",
        name: "Entrees"
      },
      {
        id: 3,
        imageId: "eba73b2361fae3",
        name: "Drinks"
      }
    ]
  });
}


// Seed items
async function seedItems() {
  await prisma.item.createMany({
    data: [
      {
        id: 1,
        imageId: "293202f9d9f7f4",
        name: "Bagel",
        price: 2.0,
        categoryId: 1
      },
      {
        id: 2,
        imageId: "808916fd5ddf96",
        name: "Croissant",
        price: 1.0,
        categoryId: 1
      },
      {
        id: 3,
        imageId: "95d02a230fe050",
        name: "Muffin",
        price: 1.25,
        categoryId: 1
      },
      {
        id: 4,
        imageId: "23f95765b967ff",
        name: "Toast / Bread",
        price: 1.0,
        categoryId: 1
      },
      {
        id: 5,
        imageId: "5650be5d48a99b",
        name: "English Muffin",
        price: 2.5,
        categoryId: 1
      },
      {
        id: 6,
        imageId: "bd237a0c0d19ef",
        name: "Pasta Bar",
        price: 12.99,
        categoryId: 2
      },
      {
        id: 7,
        imageId: "3e1bd1342800f7",
        name: "Mediterranean Entree",
        price: 10.99,
        categoryId: 2
      },
      {
        id: 8,
        imageId: "72589c4c990f97",
        name: "Indian Entree",
        price: 11.95,
        categoryId: 2
      },
      {
        id: 9,
        imageId: "70c2a6247e7b58",
        name: "Small Drink",
        price: 0.75,
        categoryId: 3
      },
      {
        id: 10,
        imageId: "dba0fc03da30ca",
        name: "Medium Drink",
        price: 1.5,
        categoryId: 3
      },
      {
        id: 11,
        imageId: "ffc9bf61e441cd",
        name: "Large Drink",
        price: 2.0,
        categoryId: 3
      }
    ]
  });
}

// execute the main seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
