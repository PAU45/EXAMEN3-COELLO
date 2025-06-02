import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const laboratorio = await prisma.laboratorio.findUnique({ where: { CodLab: id } });
    if (!laboratorio) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(laboratorio);
  }
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const actualizado = await prisma.laboratorio.update({
        where: { CodLab: id },
        data,
      });
      return res.status(200).json(actualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.laboratorio.delete({ where: { CodLab: id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}