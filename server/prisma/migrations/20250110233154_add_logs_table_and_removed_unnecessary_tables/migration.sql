/*
  Warnings:

  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BreakSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BreakSession" DROP CONSTRAINT "BreakSession_userId_fkey";

-- DropTable
DROP TABLE "Badges";

-- DropTable
DROP TABLE "BreakSession";

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
