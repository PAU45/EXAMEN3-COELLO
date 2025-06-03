import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string, 10); // Especificar la base del parseo

  if (req.method === 'GET') {
    const detalle = await prisma.detalleOrdenCompra.findUnique({ where: { id } });
    if (!detalle) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(detalle);
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body; // Asegúrate de que 'data' tenga un tipo específico
      const actualizado = await prisma.detalleOrdenCompra.update({
        where: { id },
        data,
      });
      return res.status(200).json(actualizado);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error desconocido' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.detalleOrdenCompra.delete({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error desconocido' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Método ${req.method} no permitido`);
}