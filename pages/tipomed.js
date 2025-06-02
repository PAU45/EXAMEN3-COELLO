import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';

const TipoMed = () => {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    descripcion: '',
  });

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    const res = await fetch('/api/tipomed');
    const data = await res.json();
    setTipos(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.descripcion) {
      alert('Completa la descripción');
      return;
    }
    await fetch('/api/tipomed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ descripcion: '' });
    fetchTipos();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este tipo?')) return;
    await fetch(`/api/tipomed/${id}`, { method: 'DELETE' });
    fetchTipos();
  };

  return (
    <div>
      <Navbar />
      <h1>Tipos de Medicamento</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
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
          {tipos.map((t) => (
            <tr key={t.CodTipoMed}>
              <td>{t.CodTipoMed}</td>
              <td>{t.descripcion}</td>
              <td>
                <button onClick={() => handleDelete(t.CodTipoMed)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipoMed;