import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tipos = await prisma.tipoMed.findMany();
    return res.status(200).json(tipos);
  }
  
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const nuevo = await prisma.tipoMed.create({ data });
      return res.status(201).json(nuevo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
