import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const OrdenesVenta = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [form, setForm] = useState({
    fechaEmision: '',
    MotivoEspec: '',
    Situacion: '',
  });

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    const res = await fetch('/api/ordenes-venta');
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
      !form.MotivoEspec ||
      !form.Situacion
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/ordenes-venta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({
      fechaEmision: '',
      MotivoEspec: '',
      Situacion: '',
    });
    fetchOrdenes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta orden?')) return;
    await fetch(`/api/ordenes-venta/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  return (
    <div>
      <Navbar />
      <h1>Órdenes de Venta</h1>
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
          name="MotivoEspec"
          placeholder="Motivo Específico"
          value={form.MotivoEspec}
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
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Emisión</th>
            <th>Motivo Específico</th>
            <th>Situación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.NroOrdenVta}>
              <td>{o.NroOrdenVta}</td>
              <td>{o.fechaEmision?.substring(0, 10)}</td>
              <td>{o.MotivoEspec}</td>
              <td>{o.Situacion}</td>
              <td>
                <button onClick={() => handleDelete(o.NroOrdenVta)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenesVenta;