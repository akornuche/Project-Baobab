-- CreateTable
CREATE TABLE "DirectorySubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listingId" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'free',
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "amountPaid" REAL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "invoiceUrl" TEXT,
    "cancelledAt" DATETIME,
    "cancellationReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DirectorySubscription_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "DirectoryListing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DirectoryReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "listingId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "title" TEXT,
    "comment" TEXT,
    "reviewer" TEXT,
    "email" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DirectoryReview_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "DirectoryListing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DirectoryListing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "address" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "guideId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "premiumTier" TEXT DEFAULT 'free',
    "premiumStartDate" DATETIME,
    "premiumEndDate" DATETIME,
    "premiumAutoRenew" BOOLEAN NOT NULL DEFAULT true,
    "rating" REAL NOT NULL DEFAULT 0.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "DirectoryListing_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DirectoryListing" ("address", "category", "city", "createdAt", "description", "email", "guideId", "id", "isDeleted", "name", "phone", "premium", "state", "updatedAt", "verified", "website") SELECT "address", "category", "city", "createdAt", "description", "email", "guideId", "id", "isDeleted", "name", "phone", "premium", "state", "updatedAt", "verified", "website" FROM "DirectoryListing";
DROP TABLE "DirectoryListing";
ALTER TABLE "new_DirectoryListing" RENAME TO "DirectoryListing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
