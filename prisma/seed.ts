import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Seedar categories med info
  const category1 = await db.category.create({
    data: {
      name: "Supplements",
    },
  });

  const category2 = await db.category.create({
    data: {
      name: "Clothing",
    },
  });

  // Seedar våra produkter
  const product1 = await db.product.create({
    data: {
      name: "Protein powder",
      description: "A delicious shake filled with protein",
      price: "132",
      CategoryProducts: {
        create: [
          { category: { connect: { id: category1.id } } }, // Associate med cat 1
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
          { category: { connect: { id: category2.id } } }, // Associate med cat 2
        ],
      },
    },
  });

  console.log("Categories seeded:", category1, category2);
  console.log("Products seeded:", product1, product2);
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
