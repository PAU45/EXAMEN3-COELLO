const Navbar = () => {
  return (
    <nav
      style={{
        marginBottom: 32,
        background: '#1976d2',
        padding: '1rem 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <ul
        style={{
          display: 'flex',
          gap: '1.5rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          justifyContent: 'center',
        }}
      >
        {[
          { href: '/', label: 'Inicio' },
          { href: '/medicamentos', label: 'Medicamentos' },
          { href: '/tipomed', label: 'Tipos de Medicamento' },
          { href: '/especialidades', label: 'Especialidades' },
          { href: '/laboratorios', label: 'Laboratorios' },
          { href: '/ordenes-compra', label: 'Órdenes de Compra' },
          { href: '/ordenes-venta', label: 'Órdenes de Venta' },
          { href: '/detalle-orden-compra', label: 'Detalle Orden Compra' },
          { href: '/detalle-orden-vla', label: 'Detalle Orden Venta' },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1.05rem',
                padding: '6px 14px',
                borderRadius: 6,
                transition: 'background 0.2s',
                display: 'inline-block',
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#1565c0')}
              onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;