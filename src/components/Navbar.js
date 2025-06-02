const Navbar = () => {
  return (
    <nav style={{ marginBottom: 20 }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/medicamentos">Medicamentos</a></li>
        <li><a href="/tipomed">Tipos de Medicamento</a></li>
        <li><a href="/especialidades">Especialidades</a></li>
        <li><a href="/laboratorios">Laboratorios</a></li>
        <li><a href="/ordenes-compra">Órdenes de Compra</a></li>
        <li><a href="/ordenes-venta">Órdenes de Venta</a></li>
        <li><a href="/detalle-orden-compra">Detalle Orden Compra</a></li>
        <li><a href="/detalle-orden-vla">Detalle Orden Venta</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;