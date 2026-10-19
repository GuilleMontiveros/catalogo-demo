# 🚀 Catálogo Web Mayorista Autogestionable para Distribuidoras (Demo TRÍAS)

Este proyecto es una plantilla de catálogo web ultraliviano pensado específicamente para distribuidoras, mayoristas y ferreterías que buscan reemplazar listas pesadas en PDF por una experiencia de compra fluida desde el celular que genera pedidos automáticos a WhatsApp.

---

## 🌟 Características Principales

- **Ultraliviano y Rápido:** Abre al instante en cualquier teléfono con datos móviles (sin descargar archivos pesados de 18MB).
- **Buscador en Tiempo Real:** Búsqueda instantánea por nombre de producto, código, presentación o rubro.
- **Filtros por Categoría:** Descartables, Bebidas, Limpieza, Ferretería (personalizable).
- **Cálculo de Totales en Vivo:** El comprador ve el importe acumulado en tiempo real.
- **Checkout Inteligente a WhatsApp:** Al confirmar, genera un remito estructurado con nombre del comercio, dirección de entrega y detalle de bultos listo para despachar.
- **Cero Carga Manual:** Los datos se estructuran en `products.js`, que se puede alimentar fácilmente exportando las listas desde cualquier sistema de gestión o Excel.

---

## 📁 Estructura de Archivos

```
/
├── index.html       # Estructura principal, modales y barra flotante
├── style.css        # Diseño dark mode moderno (optimizado mobile-first)
├── products.js     # Configuración y base de datos de productos de ejemplo
├── app.js           # Lógica interactiva del carrito y generador de mensaje
└── README.md        # Documentación de uso y despliegue
```

---

## 🛠️ Cómo Subirlo a GitHub y Activar GitHub Pages (Paso a Paso en 3 Minutos)

1. **Crear el Repositorio en GitHub:**
   - Entrá a [github.com/new](https://github.com/new).
   - Nombre sugerido: `catalogo-demo` o `distribuidora-demo`.
   - Seleccioná **Public** y hacé clic en **Create repository**.

2. **Subir los Archivos:**
   - En la pantalla del repo, hacé clic en **uploading an existing file** (o usá Git desde tu terminal).
   - Arrastrá los 4 archivos descomprimidos: `index.html`, `style.css`, `products.js`, `app.js`.
   - Hacé clic en **Commit changes**.

3. **Activar GitHub Pages:**
   - Andá a la pestaña **Settings** del repositorio.
   - En el menú izquierdo, hacé clic en **Pages**.
   - En la sección **Branch**, seleccioná `main` (o `master`) y la carpeta `/ (root)`.
   - Hacé clic en **Save**.
   - ¡Listo! En 1 minuto tu demo estará online en:
     `https://tu-usuario.github.io/catalogo-demo/`

---

## ⚡ Cómo Personalizar la Demo para un Cliente en 2 Minutos

Cuando una distribuidora te pase su lista o PDF:
1. Abrí `products.js`.
2. Modificá `window.CATALOG_CONFIG`:
   ```javascript
   window.CATALOG_CONFIG = {
     businessName: "NOMBRE DEL CLIENTE",
     whatsappNumber: "549264XXXXXXX", // Su número de WhatsApp
     minOrder: 50000,
     currency: "$"
   };
   ```
3. Reemplazá 3 o 4 productos en `window.PRODUCTS_DATA` con los nombres y precios reales de su negocio.
4. Hacé commit: su demo personalizada queda lista para mandársela por chat.
