import { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialForm = {
  fechaEmision: '',
  Situacion: '',
  NroFacturaProv: '',
  CodLab: '',
};

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    const res = await fetch('/api/ordenes-compra');
    const data = await res.json();
    setOrdenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpen = (orden = null) => {
    if (orden) {
      setForm({
        fechaEmision: orden.fechaEmision?.substring(0, 10) || '',
        Situacion: orden.Situacion,
        NroFacturaProv: orden.NroFacturaProv,
        CodLab: orden.CodLab,
      });
      setEditId(orden.NroOrdenCompra);
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
      !form.fechaEmision ||
      !form.Situacion ||
      !form.NroFacturaProv ||
      !form.CodLab
    ) {
      alert('Completa todos los campos');
      return;
    }
    const payload = {
      ...form,
      CodLab: Number(form.CodLab),
    };
    if (editId) {
      await fetch(`/api/ordenes-compra/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/ordenes-compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    handleClose();
    fetchOrdenes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta orden?')) return;
    await fetch(`/api/ordenes-compra/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Órdenes de Compra</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Orden
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha Emisión</TableCell>
                <TableCell>Situación</TableCell>
                <TableCell>Nro Factura Prov</TableCell>
                <TableCell>Cod Lab</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenes.map((o) => (
                <TableRow key={o.NroOrdenCompra}>
                  <TableCell>{o.NroOrdenCompra}</TableCell>
                  <TableCell>{o.fechaEmision?.substring(0, 10)}</TableCell>
                  <TableCell>{o.Situacion}</TableCell>
                  <TableCell>{o.NroFacturaProv}</TableCell>
                  <TableCell>{o.CodLab}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(o)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(o.NroOrdenCompra)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {ordenes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Orden' : 'Agregar Orden'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="fechaEmision"
              label="Fecha Emisión"
              type="date"
              value={form.fechaEmision}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              name="Situacion"
              label="Situación"
              value={form.Situacion}
              onChange={handleChange}
              required
            />
            <TextField
              name="NroFacturaProv"
              label="Nro Factura Proveedor"
              value={form.NroFacturaProv}
              onChange={handleChange}
              required
            />
            <TextField
              name="CodLab"
              label="Cod Laboratorio"
              type="number"
              value={form.CodLab}
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

export default OrdenesCompra;