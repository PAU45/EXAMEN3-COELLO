import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface OrdenVenta {
  NroOrdenVta: number;
  fechaEmision: string;
  MotivoEspec: string;
  Situacion: string;
}

interface FormState {
  fechaEmision: string;
  MotivoEspec: string;
  Situacion: string;
}

const initialForm: FormState = {
  fechaEmision: '',
  MotivoEspec: '',
  Situacion: '',
};

const OrdenesVenta = () => {
  const [ordenes, setOrdenes] = useState<OrdenVenta[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    const res = await fetch('/api/ordenes-venta');
    const data: OrdenVenta[] = await res.json();
    setOrdenes(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpen = (orden: OrdenVenta | null = null) => {
    if (orden) {
      setForm({
        fechaEmision: orden.fechaEmision?.substring(0, 10) || '',
        MotivoEspec: orden.MotivoEspec,
        Situacion: orden.Situacion,
      });
      setEditId(orden.NroOrdenVta);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.fechaEmision || !form.MotivoEspec || !form.Situacion) {
      alert('Completa todos los campos');
      return;
    }
    const payload = { ...form };
    if (editId) {
      await fetch(`/api/ordenes-venta/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/ordenes-venta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    handleClose();
    fetchOrdenes();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta orden?')) return;
    await fetch(`/api/ordenes-venta/${id}`, { method: 'DELETE' });
    fetchOrdenes();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Órdenes de Venta</h1>
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
                <TableCell>Motivo Específico</TableCell>
                <TableCell>Situación</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenes.map((o) => (
                <TableRow key={o.NroOrdenVta}>
                  <TableCell>{o.NroOrdenVta}</TableCell>
                  <TableCell>{o.fechaEmision?.substring(0, 10)}</TableCell>
                  <TableCell>{o.MotivoEspec}</TableCell>
                  <TableCell>{o.Situacion}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(o)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(o.NroOrdenVta)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {ordenes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">Sin registros</TableCell>
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
              name="MotivoEspec"
              label="Motivo Específico"
              value={form.MotivoEspec}
              onChange={handleChange}
              required
            />
            <TextField
              name="Situacion"
              label="Situación"
              value={form.Situacion}
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

export default OrdenesVenta;
