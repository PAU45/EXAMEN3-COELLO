import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [form, setForm] = useState({
    descripcionMed: '',
    fechaVencimiento: '',
    Presentacion: '',
    stock: '',
    precioVentaUni: '',
    precioVentaPres: '',
    marca: '',
    CodTipoMed: '',
    CodEspec: '',
  });

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    const response = await fetch('/api/medicamentos');
    const data = await response.json();
    setMedicamentos(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !form.descripcionMed ||
      !form.fechaVencimiento ||
      !form.Presentacion ||
      !form.stock ||
      !form.precioVentaUni ||
      !form.precioVentaPres ||
      !form.marca ||
      !form.CodTipoMed ||
      !form.CodEspec
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/medicamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        stock: Number(form.stock),
        precioVentaUni: Number(form.precioVentaUni),
        precioVentaPres: Number(form.precioVentaPres),
        CodTipoMed: Number(form.CodTipoMed),
        CodEspec: Number(form.CodEspec),
      }),
    });
    setForm({
      descripcionMed: '',
      fechaVencimiento: '',
      Presentacion: '',
      stock: '',
      precioVentaUni: '',
      precioVentaPres: '',
      marca: '',
      CodTipoMed: '',
      CodEspec: '',
    });
    fetchMedicamentos();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este medicamento?')) return;
    await fetch(`/api/medicamentos/${id}`, { method: 'DELETE' });
    fetchMedicamentos();
  };

  return (
    <div>
      <Navbar />
      <h1>Medicamentos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="descripcionMed" placeholder="Descripción" value={form.descripcionMed} onChange={handleChange} required />
        <input name="fechaVencimiento" type="date" value={form.fechaVencimiento} onChange={handleChange} required />
        <input name="Presentacion" placeholder="Presentación" value={form.Presentacion} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input name="precioVentaUni" type="number" step="0.01" placeholder="Precio Unitario" value={form.precioVentaUni} onChange={handleChange} required />
        <input name="precioVentaPres" type="number" step="0.01" placeholder="Precio Presentación" value={form.precioVentaPres} onChange={handleChange} required />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} required />
        <input name="CodTipoMed" type="number" placeholder="CodTipoMed" value={form.CodTipoMed} onChange={handleChange} required />
        <input name="CodEspec" type="number" placeholder="CodEspec" value={form.CodEspec} onChange={handleChange} required />
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Vencimiento</th>
            <th>Presentación</th>
            <th>Stock</th>
            <th>Precio Uni</th>
            <th>Precio Pres</th>
            <th>Marca</th>
            <th>CodTipoMed</th>
            <th>CodEspec</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((m) => (
            <tr key={m.CodMedicamento}>
              <td>{m.CodMedicamento}</td>
              <td>{m.descripcionMed}</td>
              <td>{m.fechaVencimiento?.substring(0, 10)}</td>
              <td>{m.Presentacion}</td>
              <td>{m.stock}</td>
              <td>{m.precioVentaUni}</td>
              <td>{m.precioVentaPres}</td>
              <td>{m.marca}</td>
              <td>{m.CodTipoMed}</td>
              <td>{m.CodEspec}</td>
              <td>
                <button onClick={() => handleDelete(m.CodMedicamento)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicamentos;