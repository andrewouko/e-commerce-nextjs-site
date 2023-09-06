-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tx_ref" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "callback" TEXT
);
INSERT INTO "new_Payment" ("amount", "callback", "currency", "customer", "date", "delivery", "id", "tx_ref") SELECT "amount", "callback", "currency", "customer", "date", "delivery", "id", "tx_ref" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_tx_ref_key" ON "Payment"("tx_ref");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
