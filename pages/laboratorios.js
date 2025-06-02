import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const Laboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [form, setForm] = useState({
    razonSocial: '',
    email: '',
    contacto: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    fetchLaboratorios();
  }, []);

  const fetchLaboratorios = async () => {
    const res = await fetch('/api/laboratorios');
    const data = await res.json();
    setLaboratorios(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !form.razonSocial ||
      !form.email ||
      !form.contacto ||
      !form.direccion ||
      !form.telefono
    ) {
      alert('Completa todos los campos');
      return;
    }
    await fetch('/api/laboratorios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({
      razonSocial: '',
      email: '',
      contacto: '',
      direccion: '',
      telefono: '',
    });
    fetchLaboratorios();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este laboratorio?')) return;
    await fetch(`/api/laboratorios/${id}`, { method: 'DELETE' });
    fetchLaboratorios();
  };

  return (
    <div>
      <Navbar />
      <h1>Laboratorios</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="razonSocial"
          placeholder="Razón Social"
          value={form.razonSocial}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="contacto"
          placeholder="Contacto"
          value={form.contacto}
          onChange={handleChange}
          required
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Razón Social</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.map((l) => (
            <tr key={l.CodLab}>
              <td>{l.CodLab}</td>
              <td>{l.razonSocial}</td>
              <td>{l.email}</td>
              <td>{l.contacto}</td>
              <td>{l.direccion}</td>
              <td>{l.telefono}</td>
              <td>
                <button onClick={() => handleDelete(l.CodLab)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Laboratorios;