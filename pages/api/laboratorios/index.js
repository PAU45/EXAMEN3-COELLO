import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const laboratorios = await prisma.laboratorio.findMany();
    return res.status(200).json(laboratorios);
  }
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const nuevo = await prisma.laboratorio.create({ data });
      return res.status(201).json(nuevo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}