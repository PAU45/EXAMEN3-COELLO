import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const medicamento = await prisma.medicamento.findUnique({ where: { CodMedicamento: id } });
    if (!medicamento) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(medicamento);
  }
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const actualizado = await prisma.medicamento.update({
        where: { CodMedicamento: id },
        data,
      });
      return res.status(200).json(actualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.medicamento.delete({ where: { CodMedicamento: id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}