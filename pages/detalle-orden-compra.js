import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const DetalleOrdenCompra = () => {
  const [detalles, setDetalles] = useState([]);
  const [form, setForm] = useState({
    NroOrdenCompra: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    montoun: '',
    CodMedicamento: '',
  });

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = async () => {
    const res = await fetch('/api/detalle-orden-compra');
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
      !form.NroOrdenCompra ||
      !form.descripcion ||
      !form.cantidad ||
      !form.precio ||
      !form.montoun ||
      !form.CodMedicamento
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/detalle-orden-compra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        NroOrdenCompra: Number(form.NroOrdenCompra),
        cantidad: Number(form.cantidad),
        precio: Number(form.precio),
        montoun: Number(form.montoun),
        CodMedicamento: Number(form.CodMedicamento),
      }),
    });
    setForm({
      NroOrdenCompra: '',
      descripcion: '',
      cantidad: '',
      precio: '',
      montoun: '',
      CodMedicamento: '',
    });
    fetchDetalles();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este detalle?')) return;
    await fetch(`/api/detalle-orden-compra/${id}`, { method: 'DELETE' });
    fetchDetalles();
  };

  return (
    <div>
      <Navbar />
      <h1>Detalle Orden Compra</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="NroOrdenCompra"
          type="number"
          placeholder="Nro Orden Compra"
          value={form.NroOrdenCompra}
          onChange={handleChange}
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          name="montoun"
          type="number"
          step="0.01"
          placeholder="Monto Unitario"
          value={form.montoun}
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
            <th>Nro Orden Compra</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Monto Unitario</th>
            <th>Cod Medicamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.NroOrdenCompra}</td>
              <td>{d.descripcion}</td>
              <td>{d.cantidad}</td>
              <td>{d.precio}</td>
              <td>{d.montoun}</td>
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

export default DetalleOrdenCompra;