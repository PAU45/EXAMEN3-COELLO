import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (req.method === 'GET') {
    const orden = await prisma.ordenCompra.findUnique({ where: { NroOrdenCompra: id } });
    if (!orden) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(orden);
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const actualizada = await prisma.ordenCompra.update({
        where: { NroOrdenCompra: id },
        data,
      });
      return res.status(200).json(actualizada);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.ordenCompra.delete({ where: { NroOrdenCompra: id } });
      return res.status(204).end();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
