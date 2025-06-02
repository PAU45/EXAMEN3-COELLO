import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const orden = await prisma.ordenVenta.findUnique({ where: { NroOrdenVta: id } });
    if (!orden) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(orden);
  }
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const actualizada = await prisma.ordenVenta.update({
        where: { NroOrdenVta: id },
        data,
      });
      return res.status(200).json(actualizada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.ordenVenta.delete({ where: { NroOrdenVta: id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}