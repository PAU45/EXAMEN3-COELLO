import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const ordenes = await prisma.ordenVenta.findMany();
      return res.status(200).json(ordenes);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({ error: message });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      // Convertir fechaEmision a formato ISO si viene como YYYY-MM-DD
      if (data.fechaEmision && data.fechaEmision.length === 10) {
        data.fechaEmision = new Date(data.fechaEmision).toISOString();
      }

      const nuevo = await prisma.ordenVenta.create({ data });
      return res.status(201).json(nuevo);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(400).json({ error: message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Método ${req.method} no permitido`);
}