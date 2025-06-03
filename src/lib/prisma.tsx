// filepath: lib/prisma.tsx
import { PrismaClient } from '@prisma/client';

declare global {
  // Para evitar redefinición en hot reload en dev
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
