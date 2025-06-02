import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = { descripcion: '' };

const TipoMed = () => {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleOpen = (tipo = null) => {
    if (tipo) {
      setForm({ descripcion: tipo.descripcion });
      setEditId(tipo.CodTipoMed);
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
    if (!form.descripcion) {
      alert('Completa la descripción');
      return;
    }
    if (editId) {
      await fetch(`/api/tipomed/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/tipomed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    handleClose();
    fetchTipos();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este tipo?')) return;
    await fetch(`/api/tipomed/${id}`, { method: 'DELETE' });
    fetchTipos();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Tipos de Medicamento</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Tipo
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
              {tipos.map((t) => (
                <TableRow key={t.CodTipoMed}>
                  <TableCell>{t.CodTipoMed}</TableCell>
                  <TableCell>{t.descripcion}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(t)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(t.CodTipoMed)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {tipos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Tipo' : 'Agregar Tipo'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="descripcion"
              label="Descripción"
              value={form.descripcion}
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

export default TipoMed;