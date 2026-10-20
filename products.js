// Base de datos de productos de demostración
// Fácilmente editable: se puede pegar o exportar desde un Excel / Google Sheets
window.CATALOG_CONFIG = {
  businessName: "DISTRIBUIDORA SAN JUAN",
  whatsappNumber: "5492", // Cambiar por el número de WhatsApp de destino (formato internacional sin signos)
  minOrder: 50000,
  currency: "$"
};

window.PRODUCTS_DATA = [
  // Categoría: Descartables & Embalaje
  {
    id: "DESC-001",
    name: "Vaso Térmico N°8 (Telgopor)",
    category: "Descartables",
    presentation: "Bulto x 120 unidades",
    price: 12400,
    icon: "🥤"
  },
  {
    id: "DESC-002",
    name: "Bandeja Plástica N°2 Descartable",
    category: "Descartables",
    presentation: "Pack cerrado x 100 u.",
    price: 8500,
    icon: "📦"
  },
  {
    id: "DESC-003",
    name: "Bolsa Camiseta Reforzada 40x50",
    category: "Descartables",
    presentation: "Fardo x 1000 u. (Alta Densidad)",
    price: 18900,
    icon: "🛍️"
  },
  {
    id: "DESC-004",
    name: "Rollo Papel Film Adherente 38cm",
    category: "Descartables",
    presentation: "Bobina x 300 metros",
    price: 9200,
    icon: "📜"
  },

  // Categoría: Bebidas & Almacén Mayorista
  {
    id: "BEB-101",
    name: "Coca Cola Sabor Original 1.5L",
    category: "Bebidas",
    presentation: "Pack cerrado x 6 botellas",
    price: 14200,
    icon: "🍾"
  },
  {
    id: "BEB-102",
    name: "Agua Mineral sin gas 2L",
    category: "Bebidas",
    presentation: "Fardo x 8 unidades",
    price: 7800,
    icon: "💧"
  },
  {
    id: "ALM-201",
    name: "Lavandina Común Concentrada",
    category: "Limpieza",
    presentation: "Caja x 12 botellas de 1L",
    price: 11500,
    icon: "🧴"
  },
  {
    id: "ALM-202",
    name: "Rollo de Cocina Hogar Maxi",
    category: "Limpieza",
    presentation: "Bulto x 8 packs de 3 rollos",
    price: 13600,
    icon: "🧻"
  },

  // Categoría: Ferretería & Bulonería
  {
    id: "FER-301",
    name: "Tornillo Drywall Autoperforante T1",
    category: "Ferretería",
    presentation: "Caja x 1.000 unidades",
    price: 14800,
    icon: "🔩"
  },
  {
    id: "FER-302",
    name: "Disco de Corte Extra Fino 115mm",
    category: "Ferretería",
    presentation: "Lata x 25 unidades",
    price: 21500,
    icon: "⚙️"
  },
  {
    id: "FER-303",
    name: "Cinta Aisladora Negra 20m Tacsa",
    category: "Ferretería",
    presentation: "Tubo x 10 unidades",
    price: 16200,
    icon: "⬛"
  },
  {
    id: "FER-304",
    name: "Tarugos de Nylon con tope N°8",
    category: "Ferretería",
    presentation: "Bolsa x 500 unidades",
    price: 9800,
    icon: "🧱"
  }
];
