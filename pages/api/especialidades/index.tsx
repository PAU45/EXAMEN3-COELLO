import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const especialidades = await prisma.especialidad.findMany();
      return res.status(200).json(especialidades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      const nuevo = await prisma.especialidad.create({ data });
      return res.status(201).json(nuevo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
