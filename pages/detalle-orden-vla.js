import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = {
  NroOrdenVta: '',
  cantidadMed: '',
  cantidadRequerida: '',
  CodMedicamento: '',
};

const DetalleOrdenVla = () => {
  const [detalles, setDetalles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleOpen = (detalle = null) => {
    if (detalle) {
      setForm({
        NroOrdenVta: detalle.NroOrdenVta,
        cantidadMed: detalle.cantidadMed,
        cantidadRequerida: detalle.cantidadRequerida,
        CodMedicamento: detalle.CodMedicamento,
      });
      setEditId(detalle.id);
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
      !form.NroOrdenVta ||
      !form.cantidadMed ||
      !form.cantidadRequerida ||
      !form.CodMedicamento
    ) {
      alert('Completa todos los campos');
      return;
    }
    const payload = {
      ...form,
      NroOrdenVta: Number(form.NroOrdenVta),
      cantidadMed: Number(form.cantidadMed),
      cantidadRequerida: Number(form.cantidadRequerida),
      CodMedicamento: Number(form.CodMedicamento),
    };

    if (editId) {
      await fetch(`/api/detalle-orden-vla/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/detalle-orden-vla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    handleClose();
    fetchDetalles();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este detalle?')) return;
    await fetch(`/api/detalle-orden-vla/${id}`, { method: 'DELETE' });
    fetchDetalles();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', paddingBottom: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Detalle Orden Venta</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Detalle
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nro Orden Venta</TableCell>
                <TableCell>Cantidad Med</TableCell>
                <TableCell>Cantidad Requerida</TableCell>
                <TableCell>Cod Medicamento</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalles.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.NroOrdenVta}</TableCell>
                  <TableCell>{d.cantidadMed}</TableCell>
                  <TableCell>{d.cantidadRequerida}</TableCell>
                  <TableCell>{d.CodMedicamento}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(d)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(d.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {detalles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Detalle' : 'Agregar Detalle'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="NroOrdenVta"
              label="Nro Orden Venta"
              type="number"
              value={form.NroOrdenVta}
              onChange={handleChange}
              required
            />
            <TextField
              name="cantidadMed"
              label="Cantidad Med"
              type="number"
              value={form.cantidadMed}
              onChange={handleChange}
              required
            />
            <TextField
              name="cantidadRequerida"
              label="Cantidad Requerida"
              type="number"
              value={form.cantidadRequerida}
              onChange={handleChange}
              required
            />
            <TextField
              name="CodMedicamento"
              label="Cod Medicamento"
              type="number"
              value={form.CodMedicamento}
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

export default DetalleOrdenVla;