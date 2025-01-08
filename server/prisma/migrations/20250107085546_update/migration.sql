/*
  Warnings:

  - Added the required column `completed` to the `FocusSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paused` to the `FocusSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FocusSession" ADD COLUMN     "completed" BOOLEAN NOT NULL,
ADD COLUMN     "paused" BOOLEAN NOT NULL;
