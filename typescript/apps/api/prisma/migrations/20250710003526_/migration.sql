/*
  Warnings:

  - Added the required column `last_launch_os` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_launch_version` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OS" AS ENUM ('IOS', 'ANDROID');

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "last_launch_os" "OS" NOT NULL,
ADD COLUMN     "last_launch_version" TEXT NOT NULL,
ADD COLUMN     "last_launched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
