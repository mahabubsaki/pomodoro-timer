-- CreateTable
CREATE TABLE "BreakSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "paused" BOOLEAN NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BreakSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BreakSession" ADD CONSTRAINT "BreakSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
