-- CreateEnum
CREATE TYPE "AsyncJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "GoodsExportTemplate" AS ENUM ('XML_ROZETKA', 'XLSX_ROZETKA');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Good" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "fullPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "quantity" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "groupId" TEXT,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsGroup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsMedia" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsMediaToGood" (
    "mediaId" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "GoodsMediaToGood_pkey" PRIMARY KEY ("mediaId","goodId","index")
);

-- CreateTable
CREATE TABLE "GoodsAttribute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsAttributeValue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attributeId" TEXT,
    "value" TEXT NOT NULL,

    CONSTRAINT "GoodsAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsAttributeToGood" (
    "id" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "GoodsAttributeToGood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsId" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsIdValue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "goodsIdId" TEXT,

    CONSTRAINT "GoodsIdValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsCharacteristic" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsCharacteristicValue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "characteristicId" TEXT,

    CONSTRAINT "GoodsCharacteristicValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsCharacteristicToGood" (
    "id" TEXT NOT NULL,
    "characteristicId" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "GoodsCharacteristicToGood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInternalField" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsInternalField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInternalFieldValue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "fieldId" TEXT,

    CONSTRAINT "GoodsInternalFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInternalFieldToGood" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT,
    "goodId" TEXT,

    CONSTRAINT "GoodsInternalFieldToGood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GoodsTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,

    CONSTRAINT "GoodsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsImport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "AsyncJobStatus" NOT NULL DEFAULT 'PENDING',
    "schemaId" TEXT,
    "message" TEXT,
    "fileKey" TEXT NOT NULL,

    CONSTRAINT "GoodsImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsImportSchema" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "createNewEntries" BOOLEAN NOT NULL,
    "updateExistingEntries" BOOLEAN NOT NULL,
    "nullifyMissingEntries" BOOLEAN NOT NULL,

    CONSTRAINT "GoodsImportSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsExport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "AsyncJobStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "fileKey" TEXT,
    "schemaId" TEXT,
    "jobId" TEXT,

    CONSTRAINT "GoodsExport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsExportSchema" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "template" "GoodsExportTemplate" NOT NULL,

    CONSTRAINT "GoodsExportSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsExportSchemaToAdditionalId" (
    "schemaId" TEXT NOT NULL,
    "identifierId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "GoodsExportSchemaToAdditionalId_pkey" PRIMARY KEY ("schemaId","identifierId")
);

-- CreateTable
CREATE TABLE "GoodsExportSchemaToInternalField" (
    "schemaId" TEXT NOT NULL,
    "internalFieldId" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,

    CONSTRAINT "GoodsExportSchemaToInternalField_pkey" PRIMARY KEY ("schemaId","internalFieldId")
);

-- CreateTable
CREATE TABLE "GoodsExportJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,

    CONSTRAINT "GoodsExportJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GoodToGoodsTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GoodToGoodsTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GoodToGoodsIdValue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GoodToGoodsIdValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GoodsCharacteristicToGoodToGoodsCharacteristicValue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GoodsCharacteristicToGoodToGoodsCharacteristicValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GoodsInternalFieldToGoodToGoodsInternalFieldValue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GoodsInternalFieldToGoodToGoodsInternalFieldValue_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsMedia_key_key" ON "GoodsMedia"("key");

-- CreateIndex
CREATE INDEX "_GoodToGoodsTag_B_index" ON "_GoodToGoodsTag"("B");

-- CreateIndex
CREATE INDEX "_GoodToGoodsIdValue_B_index" ON "_GoodToGoodsIdValue"("B");

-- CreateIndex
CREATE INDEX "_GoodsCharacteristicToGoodToGoodsCharacteristicValue_B_index" ON "_GoodsCharacteristicToGoodToGoodsCharacteristicValue"("B");

-- CreateIndex
CREATE INDEX "_GoodsInternalFieldToGoodToGoodsInternalFieldValue_B_index" ON "_GoodsInternalFieldToGoodToGoodsInternalFieldValue"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GoodsCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GoodsGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsMediaToGood" ADD CONSTRAINT "GoodsMediaToGood_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "GoodsMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsMediaToGood" ADD CONSTRAINT "GoodsMediaToGood_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsAttributeValue" ADD CONSTRAINT "GoodsAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "GoodsAttribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsAttributeToGood" ADD CONSTRAINT "GoodsAttributeToGood_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "GoodsAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsAttributeToGood" ADD CONSTRAINT "GoodsAttributeToGood_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsAttributeToGood" ADD CONSTRAINT "GoodsAttributeToGood_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "GoodsAttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIdValue" ADD CONSTRAINT "GoodsIdValue_goodsIdId_fkey" FOREIGN KEY ("goodsIdId") REFERENCES "GoodsId"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsCharacteristicValue" ADD CONSTRAINT "GoodsCharacteristicValue_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "GoodsCharacteristic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsCharacteristicToGood" ADD CONSTRAINT "GoodsCharacteristicToGood_characteristicId_fkey" FOREIGN KEY ("characteristicId") REFERENCES "GoodsCharacteristic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsCharacteristicToGood" ADD CONSTRAINT "GoodsCharacteristicToGood_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInternalFieldValue" ADD CONSTRAINT "GoodsInternalFieldValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "GoodsInternalField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInternalFieldToGood" ADD CONSTRAINT "GoodsInternalFieldToGood_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "GoodsInternalField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInternalFieldToGood" ADD CONSTRAINT "GoodsInternalFieldToGood_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsCategory" ADD CONSTRAINT "GoodsCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "GoodsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsImport" ADD CONSTRAINT "GoodsImport_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "GoodsImportSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExport" ADD CONSTRAINT "GoodsExport_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "GoodsExportSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExport" ADD CONSTRAINT "GoodsExport_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "GoodsExportJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExportSchemaToAdditionalId" ADD CONSTRAINT "GoodsExportSchemaToAdditionalId_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "GoodsExportSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExportSchemaToAdditionalId" ADD CONSTRAINT "GoodsExportSchemaToAdditionalId_identifierId_fkey" FOREIGN KEY ("identifierId") REFERENCES "GoodsId"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExportSchemaToInternalField" ADD CONSTRAINT "GoodsExportSchemaToInternalField_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "GoodsExportSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExportSchemaToInternalField" ADD CONSTRAINT "GoodsExportSchemaToInternalField_internalFieldId_fkey" FOREIGN KEY ("internalFieldId") REFERENCES "GoodsInternalField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsExportJob" ADD CONSTRAINT "GoodsExportJob_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "GoodsExportSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToGoodsTag" ADD CONSTRAINT "_GoodToGoodsTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToGoodsTag" ADD CONSTRAINT "_GoodToGoodsTag_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodsTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToGoodsIdValue" ADD CONSTRAINT "_GoodToGoodsIdValue_A_fkey" FOREIGN KEY ("A") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToGoodsIdValue" ADD CONSTRAINT "_GoodToGoodsIdValue_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodsIdValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodsCharacteristicToGoodToGoodsCharacteristicValue" ADD CONSTRAINT "_GoodsCharacteristicToGoodToGoodsCharacteristicValue_A_fkey" FOREIGN KEY ("A") REFERENCES "GoodsCharacteristicToGood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodsCharacteristicToGoodToGoodsCharacteristicValue" ADD CONSTRAINT "_GoodsCharacteristicToGoodToGoodsCharacteristicValue_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodsCharacteristicValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodsInternalFieldToGoodToGoodsInternalFieldValue" ADD CONSTRAINT "_GoodsInternalFieldToGoodToGoodsInternalFieldValue_A_fkey" FOREIGN KEY ("A") REFERENCES "GoodsInternalFieldToGood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodsInternalFieldToGoodToGoodsInternalFieldValue" ADD CONSTRAINT "_GoodsInternalFieldToGoodToGoodsInternalFieldValue_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodsInternalFieldValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
