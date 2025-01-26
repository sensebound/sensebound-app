-- CreateTable
CREATE TABLE "ResetTokens" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "ResetTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetTokens_user_id_key" ON "ResetTokens"("user_id");

-- AddForeignKey
ALTER TABLE "ResetTokens" ADD CONSTRAINT "ResetTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
