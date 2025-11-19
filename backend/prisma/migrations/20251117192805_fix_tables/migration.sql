/*
  Warnings:

  - You are about to alter the column `phone` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - You are about to alter the column `cpf` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "status" SET DEFAULT 'inativo',
ALTER COLUMN "cpf" DROP DEFAULT,
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
