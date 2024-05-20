-- 20240520104453_add_stock_to_product

-- Step 1: Add the `stock` column with a default value
ALTER TABLE "Product" ADD COLUMN "stock" INTEGER DEFAULT 0;

-- Step 2: Update existing rows to set the `stock` column to a default value
UPDATE "Product" SET "stock" = 0 WHERE "stock" IS NULL;

-- Step 3: Alter the `stock` column to make it NOT NULL
ALTER TABLE "Product" ALTER COLUMN "stock" SET NOT NULL;
