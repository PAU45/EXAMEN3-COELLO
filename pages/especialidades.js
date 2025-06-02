import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({
    descripcionEsp: '',
  });

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    const res = await fetch('/api/especialidades');
    const data = await res.json();
    setEspecialidades(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.descripcionEsp) {
      alert('Completa la descripción');
      return;
    }
    await fetch('/api/especialidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ descripcionEsp: '' });
    fetchEspecialidades();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta especialidad?')) return;
    await fetch(`/api/especialidades/${id}`, { method: 'DELETE' });
    fetchEspecialidades();
  };

  return (
    <div>
      <Navbar />
      <h1>Especialidades</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="descripcionEsp"
          placeholder="Descripción"
          value={form.descripcionEsp}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((e) => (
            <tr key={e.CodEspec}>
              <td>{e.CodEspec}</td>
              <td>{e.descripcionEsp}</td>
              <td>
                <button onClick={() => handleDelete(e.CodEspec)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Especialidades;