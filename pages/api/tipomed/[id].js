import prisma from '../../../src/lib/prisma';

export default async function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    const tipo = await prisma.tipoMed.findUnique({ where: { CodTipoMed: id } });
    if (!tipo) return res.status(404).json({ error: 'No encontrado' });
    return res.status(200).json(tipo);
  }
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const actualizado = await prisma.tipoMed.update({
        where: { CodTipoMed: id },
        data,
      });
      return res.status(200).json(actualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.tipoMed.delete({ where: { CodTipoMed: id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}