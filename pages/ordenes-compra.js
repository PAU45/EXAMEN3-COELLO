import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [form, setForm] = useState({
    fechaEmision: '',
    Situacion: '',
    NroFacturaProv: '',
    CodLab: '',
  });

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    const res = await fetch('/api/ordenes-compra');
    const data = await res.json();
    setOrdenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !form.fechaEmision ||
      !form.Situacion ||
      !form.NroFacturaProv ||
      !form.CodLab
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/ordenes-compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        CodLab: Number(form.CodLab),
      }),
    });
    setForm({
      fechaEmision: '',
      Situacion: '',
      NroFacturaProv: '',
      CodLab: '',
    });
    fetchOrdenes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta orden?')) return;
    await fetch(`/api/ordenes-compra/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  return (
    <div>
      <Navbar />
      <h1>Órdenes de Compra</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="fechaEmision"
          type="date"
          placeholder="Fecha Emisión"
          value={form.fechaEmision}
          onChange={handleChange}
          required
        />
        <input
          name="Situacion"
          placeholder="Situación"
          value={form.Situacion}
          onChange={handleChange}
          required
        />
        <input
          name="NroFacturaProv"
          placeholder="Nro Factura Proveedor"
          value={form.NroFacturaProv}
          onChange={handleChange}
          required
        />
        <input
          name="CodLab"
          type="number"
          placeholder="Cod Laboratorio"
          value={form.CodLab}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Emisión</th>
            <th>Situación</th>
            <th>Nro Factura Prov</th>
            <th>Cod Lab</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.NroOrdenCompra}>
              <td>{o.NroOrdenCompra}</td>
              <td>{o.fechaEmision?.substring(0, 10)}</td>
              <td>{o.Situacion}</td>
              <td>{o.NroFacturaProv}</td>
              <td>{o.CodLab}</td>
              <td>
                <button onClick={() => handleDelete(o.NroOrdenCompra)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenesCompra;