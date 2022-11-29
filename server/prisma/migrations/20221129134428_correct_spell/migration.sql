/*
  Warnings:

  - You are about to drop the column `neighbourhood` on the `address` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_address" ("city", "complement", "coordinates", "country", "id", "number", "postalCode", "state", "street", "userId") SELECT "city", "complement", "coordinates", "country", "id", "number", "postalCode", "state", "street", "userId" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
