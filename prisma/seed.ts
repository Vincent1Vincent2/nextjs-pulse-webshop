import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Seedar categories och produkter med data
  const categories = [];

  const category1 = await db.category.create({
    data: {
      name: "Supplements",
    },
  });
  categories.push(category1);

  const category2 = await db.category.create({
    data: {
      name: "Clothing",
    },
  });
  categories.push(category2);

  const product1 = await db.product.create({
    data: {
      name: "Protein powder",
      description: "A delicious shake filled with protein",
      price: "132",
      CategoryProducts: {
        create: [
          { category: { connect: { id: category1.id } } }, // Associate with cat 1
        ],
      },
    },
  });

  const product2 = await db.product.create({
    data: {
      name: "T-shirt",
      description: "Comfortable shirt to workout in style",
      price: "190",
      CategoryProducts: {
        create: [
          { category: { connect: { id: category2.id } } }, // Associate with cat 2
        ],
      },
    },
  });

  console.log("Categories seeded:", categories);
  console.log("Products seeded:", product1, product2);
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
