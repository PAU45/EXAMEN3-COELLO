// src/types/global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Cambia 'var' a 'let' para evitar el error
  var prisma: PrismaClient | undefined; // Usar 'let' en lugar de 'var'
}

// Asegúrate de que este archivo se trate como un módulo
export {};