import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string, 10);

  if (req.method === 'GET') {
    try {
      const orden = await prisma.ordenVenta.findUnique({ where: { NroOrdenVta: id } });
      if (!orden) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(orden);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({ error: message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body; // Asegúrate de que 'data' tenga un tipo específico en otro lugar
      const actualizada = await prisma.ordenVenta.update({
        where: { NroOrdenVta: id },
        data,
      });
      return res.status(200).json(actualizada);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(400).json({ error: message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.ordenVenta.delete({ where: { NroOrdenVta: id } });
      return res.status(204).end();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(400).json({ error: message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Método ${req.method} no permitido`);
}