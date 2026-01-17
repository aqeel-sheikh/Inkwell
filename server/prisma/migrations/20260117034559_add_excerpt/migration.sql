/*
  Warnings:

  - Added the required column `excerpt` to the `blog_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_post" ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT;
