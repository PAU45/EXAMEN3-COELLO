import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../src/components/Navbar';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Medicamento {
  CodMedicamento: number;
  descripcionMed: string;
  fechaVencimiento: string;
  Presentacion: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres: number;
  marca: string;
  CodTipoMed: number;
  CodEspec: number;
}

interface FormData {
  descripcionMed: string;
  fechaVencimiento: string;
  Presentacion: string;
  stock: string;          // keep as string for controlled input, convert later
  precioVentaUni: string; // same as above
  precioVentaPres: string;
  marca: string;
  CodTipoMed: string;
  CodEspec: string;
}

const initialForm: FormData = {
  descripcionMed: '',
  fechaVencimiento: '',
  Presentacion: '',
  stock: '',
  precioVentaUni: '',
  precioVentaPres: '',
  marca: '',
  CodTipoMed: '',
  CodEspec: '',
};

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [form, setForm] = useState<FormData>(initialForm);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    const response = await fetch('/api/medicamentos');
    const data = await response.json();
    setMedicamentos(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpen = (med: Medicamento | null = null) => {
    if (med) {
      setForm({
        descripcionMed: med.descripcionMed,
        fechaVencimiento: med.fechaVencimiento?.substring(0, 10) || '',
        Presentacion: med.Presentacion,
        stock: med.stock.toString(),
        precioVentaUni: med.precioVentaUni.toString(),
        precioVentaPres: med.precioVentaPres.toString(),
        marca: med.marca,
        CodTipoMed: med.CodTipoMed.toString(),
        CodEspec: med.CodEspec.toString(),
      });
      setEditId(med.CodMedicamento);
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
    const payload = {
      ...form,
      stock: Number(form.stock),
      precioVentaUni: Number(form.precioVentaUni),
      precioVentaPres: Number(form.precioVentaPres),
      CodTipoMed: Number(form.CodTipoMed),
      CodEspec: Number(form.CodEspec),
    };

    if (editId) {
      await fetch(`/api/medicamentos/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/medicamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    handleClose();
    fetchMedicamentos();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este medicamento?')) return;
    await fetch(`/api/medicamentos/${id}`, { method: 'DELETE' });
    fetchMedicamentos();
  };

  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <h1 style={{ color: '#1976d2' }}>Medicamentos</h1>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Agregar Medicamento
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Vencimiento</TableCell>
                <TableCell>Presentación</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Precio Uni</TableCell>
                <TableCell>Precio Pres</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>CodTipoMed</TableCell>
                <TableCell>CodEspec</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicamentos.map((m) => (
                <TableRow key={m.CodMedicamento}>
                  <TableCell>{m.CodMedicamento}</TableCell>
                  <TableCell>{m.descripcionMed}</TableCell>
                  <TableCell>{m.fechaVencimiento?.substring(0, 10)}</TableCell>
                  <TableCell>{m.Presentacion}</TableCell>
                  <TableCell>{m.stock}</TableCell>
                  <TableCell>{m.precioVentaUni}</TableCell>
                  <TableCell>{m.precioVentaPres}</TableCell>
                  <TableCell>{m.marca}</TableCell>
                  <TableCell>{m.CodTipoMed}</TableCell>
                  <TableCell>{m.CodEspec}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpen(m)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(m.CodMedicamento)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {medicamentos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Editar Medicamento' : 'Agregar Medicamento'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 350 }}>
            <TextField
              name="descripcionMed"
              label="Descripción"
              value={form.descripcionMed}
              onChange={handleChange}
              required
            />
            <TextField
              name="fechaVencimiento"
              label="Fecha de Vencimiento"
              type="date"
              value={form.fechaVencimiento}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              name="Presentacion"
              label="Presentación"
              value={form.Presentacion}
              onChange={handleChange}
              required
            />
            <TextField
              name="stock"
              label="Stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <TextField
              name="precioVentaUni"
              label="Precio Unitario"
              type="number"
              value={form.precioVentaUni}
              onChange={handleChange}
              required
            />
            <TextField
              name="precioVentaPres"
              label="Precio Presentación"
              type="number"
              value={form.precioVentaPres}
              onChange={handleChange}
              required
            />
            <TextField
              name="marca"
              label="Marca"
              value={form.marca}
              onChange={handleChange}
              required
            />
            <TextField
              name="CodTipoMed"
              label="CodTipoMed"
              type="number"
              value={form.CodTipoMed}
              onChange={handleChange}
              required
            />
            <TextField
              name="CodEspec"
              label="CodEspec"
              type="number"
              value={form.CodEspec}
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

export default Medicamentos;
