/*
  Warnings:

  - Added the required column `email` to the `ResetTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `ResetTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetTokens" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;
