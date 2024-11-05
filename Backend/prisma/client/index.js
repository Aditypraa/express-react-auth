/* Helper adalah file yang berisi kode yang dapat digunakan berulang kali di berbagai tempat dalam aplikasi kita. 
Helper ini berisi kode yang berhubungan dengan prisma client. Kode ini akan digunakan untuk mengakses database. */
/* PrismaClient adalah kelas yang digunakan untuk mengakses database. 
- PrismaClient adalah kelas yang dihasilkan oleh Prisma Client Generator. 
- Prisma Client Generator adalah sebuah tool yang digunakan untuk menghasilkan PrismaClient. 
- PrismaClient adalah kelas yang digunakan untuk mengakses database. */

// Cara Installasnya :
// npm install @prisma/client

// Cara Menggunakannya seperti ini :

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // prisma berguna untuk mengakses database

export default prisma;
