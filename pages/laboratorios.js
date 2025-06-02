import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = {
  razonSocial: '',
  email: '',
  contacto: '',
  direccion: '',
  telefono: '',
};

const Laboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleOpen = (lab = null) => {
    if (lab) {
      setForm({
        razonSocial: lab.razonSocial,
        email: lab.email,
        contacto: lab.contacto,
        direccion: lab.direccion,
        telefono: lab.telefono,
      });
      setEditId(lab.CodLab);
    } else {
      setForm(initialForm);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (editId) {
      await fetch(`/api/laboratorios/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/laboratorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    handleClose();
    fetchLaboratorios();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este laboratorio?')) return;
    await fetch(`/api/laboratorios/${id}`, { method: 'DELETE' });
    fetchLaboratorios();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', paddingBottom: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Laboratorios</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Laboratorio
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Razón Social</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laboratorios.map((l) => (
                <TableRow key={l.CodLab}>
                  <TableCell>{l.CodLab}</TableCell>
                  <TableCell>{l.razonSocial}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.contacto}</TableCell>
                  <TableCell>{l.direccion}</TableCell>
                  <TableCell>{l.telefono}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(l)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(l.CodLab)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {laboratorios.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Laboratorio' : 'Agregar Laboratorio'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="razonSocial"
              label="Razón Social"
              value={form.razonSocial}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="contacto"
              label="Contacto"
              value={form.contacto}
              onChange={handleChange}
              required
            />
            <TextField
              name="direccion"
              label="Dirección"
              value={form.direccion}
              onChange={handleChange}
              required
            />
            <TextField
              name="telefono"
              label="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {editId ? 'Guardar Cambios' : 'Agregar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Laboratorios;