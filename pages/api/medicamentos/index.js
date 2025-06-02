import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const medicamentos = await prisma.medicamento.findMany();
    return res.status(200).json(medicamentos);
  }
 if (req.method === 'POST') {
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    // Convertir fechaVencimiento a formato ISO si viene como YYYY-MM-DD
    if (data.fechaVencimiento && data.fechaVencimiento.length === 10) {
      data.fechaVencimiento = new Date(data.fechaVencimiento).toISOString();
    }
    const nuevo = await prisma.medicamento.create({ data });
    return res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
}
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}