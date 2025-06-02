import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const DetalleOrdenVla = () => {
  const [detalles, setDetalles] = useState([]);
  const [form, setForm] = useState({
    NroOrdenVta: '',
    cantidadMed: '',
    cantidadRequerida: '',
    CodMedicamento: '',
  });

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = async () => {
    const res = await fetch('/api/detalle-orden-vla');
    const data = await res.json();
    setDetalles(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !form.NroOrdenVta ||
      !form.cantidadMed ||
      !form.cantidadRequerida ||
      !form.CodMedicamento
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/detalle-orden-vla', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        NroOrdenVta: Number(form.NroOrdenVta),
        cantidadMed: Number(form.cantidadMed),
        cantidadRequerida: Number(form.cantidadRequerida),
        CodMedicamento: Number(form.CodMedicamento),
      }),
    });
    setForm({
      NroOrdenVta: '',
      cantidadMed: '',
      cantidadRequerida: '',
      CodMedicamento: '',
    });
    fetchDetalles();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este detalle?')) return;
    await fetch(`/api/detalle-orden-vla/${id}`, { method: 'DELETE' });
    fetchDetalles();
  };

  return (
    <div>
      <Navbar />
      <h1>Detalle Orden Venta</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="NroOrdenVta"
          type="number"
          placeholder="Nro Orden Venta"
          value={form.NroOrdenVta}
          onChange={handleChange}
          required
        />
        <input
          name="cantidadMed"
          type="number"
          placeholder="Cantidad Med"
          value={form.cantidadMed}
          onChange={handleChange}
          required
        />
        <input
          name="cantidadRequerida"
          type="number"
          placeholder="Cantidad Requerida"
          value={form.cantidadRequerida}
          onChange={handleChange}
          required
        />
        <input
          name="CodMedicamento"
          type="number"
          placeholder="Cod Medicamento"
          value={form.CodMedicamento}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nro Orden Venta</th>
            <th>Cantidad Med</th>
            <th>Cantidad Requerida</th>
            <th>Cod Medicamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.NroOrdenVta}</td>
              <td>{d.cantidadMed}</td>
              <td>{d.cantidadRequerida}</td>
              <td>{d.CodMedicamento}</td>
              <td>
                <button onClick={() => handleDelete(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleOrdenVla;