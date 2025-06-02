import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ordenes = await prisma.ordenVenta.findMany();
    return res.status(200).json(ordenes);
  }
  if (req.method === 'POST') {
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (data.fechaEmision && data.fechaEmision.length === 10) {
      data.fechaEmision = new Date(data.fechaEmision).toISOString();
    }
    const nuevo = await prisma.ordenVenta.create({ data });
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
}
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}