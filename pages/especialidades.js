import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = { descripcionEsp: '' };

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleOpen = (especialidad = null) => {
    if (especialidad) {
      setForm({ descripcionEsp: especialidad.descripcionEsp });
      setEditId(especialidad.CodEspec);
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
    if (!form.descripcionEsp) {
      alert('Completa la descripción');
      return;
    }
    if (editId) {
      await fetch(`/api/especialidades/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/especialidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    handleClose();
    fetchEspecialidades();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta especialidad?')) return;
    await fetch(`/api/especialidades/${id}`, { method: 'DELETE' });
    fetchEspecialidades();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', paddingBottom: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Especialidades</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Especialidad
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {especialidades.map((e) => (
                <TableRow key={e.CodEspec}>
                  <TableCell>{e.CodEspec}</TableCell>
                  <TableCell>{e.descripcionEsp}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(e)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(e.CodEspec)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {especialidades.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Especialidad' : 'Agregar Especialidad'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="descripcionEsp"
              label="Descripción"
              value={form.descripcionEsp}
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

export default Especialidades;