"use server";
import {auth} from "@/auth";
import {db} from "@/prisma/db";
import {Product} from "@prisma/client";
import {ProductCreate} from "../zodSchemas/product";

export async function productCreate(formData: ProductCreate) {
  const session = await auth();
  const user = await db.user.findUnique({where: {id: session?.user.id}});
  if (user?.isAdmin !== true) {
    throw new Error("User not found");
  }

  const existingCategories = await db.category.findMany({
    where: {
      name: {
        in: formData.categories.map(c => c.name),
      },
    },
  });

  const connectCategories = existingCategories.map(c => ({id: c.id}));
  const createCategories = formData.categories
    .filter(c => !existingCategories.find(ec => ec.name === c.name))
    .map(c => ({name: c.name, slug: c.slug}));

  const products = await db.product.create({
    data: {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image,
      slug: formData.name,
      stock: formData.stock,
      categories: {
        connect: connectCategories,
        create: createCategories,
      },
    },
  });

  return products;
}

export async function productUpdate(
  formData: ProductCreate,
  id: number | undefined,
) {
  if (!id) return;

  const existingCategories = await db.category.findMany({
    where: {
      name: {
        in: formData.categories.map(c => c.name),
      },
    },
  });

  const connectCategories = existingCategories.map(c => ({id: c.id}));
  const createCategories = formData.categories
    .filter(c => !existingCategories.find(ec => ec.name === c.name))
    .map(c => ({name: c.name, slug: c.slug}));

  // Fetch the current categories of the product
  const currentProduct = await db.product.findUnique({
    where: {id: id},
    include: {categories: true},
  });

  // Determine which categories need to be disconnected
  const disconnectCategories = currentProduct?.categories
    .filter(c => !formData.categories.find(fc => fc.name === c.name))
    .map(c => ({id: c.id}));

  const products = await db.product.update({
    where: {id: id},
    data: {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image,
      stock: formData.stock,
      categories: {
        disconnect: disconnectCategories,
        connect: connectCategories,
        create: createCategories,
      },
    },
  });

  return products;
}

export async function getCurrentProducts() {
  const products = await db.product.findMany({where: {deleted: false}});

  return products;
}

export async function getProduct(id: number) {
  return await db.product.findUnique({
    where: {id: id},
    include: {categories: true},
  });
}

export async function deleteProduct(id: number) {
  try {
    await db.product.update({
      where: {id: id},
      data: {deleted: true},
    });
    console.log("Product marked as deleted.");
  } catch (error) {
    console.error("Error marking product as deleted:", error);
  }
}

export async function generateStaticParams() {
  const products = await db.product.findMany({});
  return products.map((product: Product) => ({
    product: product.id.toString(),
  }));
}

// Filter products by categoryId
export async function getProductsByCategory(categoryName: string) {
  const products = await db.product.findMany({
    where: {
      categories: {
        some: {
          name: categoryName,
        },
      },
      // deleted: false,
    },
    include: {
      categories: true,
    },
  });
  return products;
}

export async function getProductsByCategoryAndSort(
  slug: string,
  sortOrder: "asc" | "desc",
) {
  const products = await db.product.findMany({
    where: {
      categories: {
        some: {
          slug,
        },
      },
    },
    include: {
      categories: true,
    },
    orderBy: {
      price: sortOrder,
    },
  });
  return products;
}

export async function isProductInStock(productId: number, quantity: number) {
  const product = await db.product.findUnique({where: {id: productId}});

  if (product!.stock < quantity) {
    return false;
  } else {
    return true;
  }
}

// Search products by name or category
export async function searchProducts(query: string) {
  if (!query) {
    throw new Error("Please provide a search query.");
  }

  try {
    const results = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            categories: {
              some: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        categories: true,
      },
    });
    return results;
  } catch (error) {
    throw new Error(
      "Error occurred while searching products. Please try again.",
    );
  }
}
