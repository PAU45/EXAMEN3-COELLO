import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const medicamentos = await prisma.medicamento.findMany();
      return res.status(200).json(medicamentos);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({ error: message });
    }
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
      const message = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(400).json({ error: message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Método ${req.method} no permitido`);
}