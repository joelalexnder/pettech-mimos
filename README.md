# 🐾 Mimos Pet Club

**Plataforma web completa para una pet shop con IA integrada** - Descubre productos, servicios y funcionalidades innovadoras para el cuidado de mascotas.

[![TypeScript](https://img.shields.io/badge/TypeScript-98.8%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 🎯 ¿Qué es Mimos Pet Club?

**Mimos Pet Club** es una aplicación web moderna desarrollada con Next.js que ofrece:

- ✨ **Tienda en línea** - Catálogo de productos para mascotas
- 🤖 **Asistente IA (VetBot)** - Chat inteligente para consultas veterinarias con Google Gemini
- 🎨 **Probador Virtual** - Visualiza accesorios en tu mascota
- 📱 **Escáner de Mascotas** - Detecta e identifica razas (Computer Vision)
- 🛎️ **Servicios Integrados** - Reserva citas y servicios
- 📍 **Ubicación y Contacto** - Botón flotante de WhatsApp para soporte directo

---

## 🏗️ Stack Tecnológico

| Aspecto | Tecnología |
|--------|-----------|
| **Framework** | Next.js 16 + React 19 |
| **Lenguaje** | TypeScript 5 |
| **Estilos** | Tailwind CSS 4 + PostCSS |
| **UI Components** | Lucide React, Swiper, Framer Motion |
| **Base de datos** | PostgreSQL (Prisma ORM) |
| **IA** | Google Generative AI (Gemini Flash) |
| **Despliegue** | Cloudflare Workers (Edge Runtime) |
| **Animaciones** | GSAP, Anime.js |

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Home principal
│   ├── layout.tsx            # Layout global
│   ├── (routes)/
│   │   ├── tienda/           # Catálogo de productos
│   │   ├── servicios/        # Servicios disponibles
│   │   ├── conoce-a-tu-perro/# Escáner de razas
│   │   └── reservas/         # Sistema de reservas
│   └── api/
│       ├── chat/             # Endpoint VetBot
│       ├── scanner/          # API análisis de imágenes
│       ├── products/         # API de productos
│       └── bookings/         # API de reservas
├── components/
│   ├── Hero.tsx              # Sección principal con animaciones
│   ├── Navbar.tsx            # Navegación responsiva
│   ├── VetBotWidget.tsx      # Chat IA integrado
│   ├── ProbadorVirtual.tsx   # Try-on virtual
│   └── ...otros             # Componentes reutilizables
├── lib/
│   ├── db.ts                 # Configuración Prisma
│   ├── gemini.ts             # Cliente Google Gemini
│   └── utils.ts              # Funciones utilitarias
└── prisma/
    └── schema.prisma         # Esquema de BD
```

**Flujo de la aplicación:**
1. Usuario accede a la página principal con animaciones GSAP
2. Navega por tienda, servicios o herramientas de IA
3. Puede interactuar con VetBot, probar ropa virtualmente o escanear su mascota
4. Realiza compras o reserva servicios
5. Contacta por WhatsApp para soporte

---

## 🚀 Cómo Ejecutar

### Requisitos
- Node.js 18+ y npm/pnpm/yarn
- Variables de entorno configuradas (ver `.env.example`)

### Instalación y Desarrollo

```bash
# 1. Clonar repositorio
git clone https://github.com/joelalexnder/pettech-mimos.git
cd pettech-mimos

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales:
# - DATABASE_URL (PostgreSQL)
# - GOOGLE_API_KEY (Gemini AI)
# - CLOUDFLARE_TOKEN (opcional, para despliegue)

# 4. Ejecutar migraciones de BD
npx prisma migrate dev

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build y Producción

```bash
# Build para producción
npm run build

# Iniciar servidor producción
npm start

# Lint del código
npm run lint
```

---

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz:

```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/mimos

# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# (Opcional) Cloudflare para Edge Runtime
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_API_TOKEN=xxx

# WhatsApp (número sin +)
WHATSAPP_NUMBER=51987654321
```

---

## 🎨 Funcionalidades Principales

### 1️⃣ **Asistente VetBot**
Chatbot IA impulsado por Google Gemini que responde preguntas sobre:
- Salud y cuidado de mascotas
- Recomendaciones de productos
- Consejos veterinarios

### 2️⃣ **Probador Virtual**
Visualiza accesorios (ropa, accesorios) en tu mascota usando Computer Vision.

### 3️⃣ **Escáner de Razas**
Carga una foto de tu perro y obtén identificación automática de la raza con análisis IA.

### 4️⃣ **Tienda Online**
- Catálogo completo de productos
- Búsqueda y filtros
- Carrito de compras

### 5️⃣ **Reserva de Servicios**
- Reserva citas para grooming, veterinaria, etc.
- Sistema de calendario integrado
- Confirmación por correo/WhatsApp

---

## 📊 Rendimiento

- ⚡ **Optimización de imágenes** con Next.js Image & Sharp
- 📦 **Code splitting** con importaciones dinámicas
- 🚀 **Edge Runtime** compatible (Cloudflare Workers)
- 📱 **Responsive design** mobile-first

---

## 🤝 Equipo

- **Joel Alexander** (@joelalexnder) - Lead Frontend & Arquitectura
- **Diego Colca** (@diegocolca) - Backend & Servicios
- **Albieri** (@albieri765) - Base de datos & Integración IA

---

## 📝 Historial de Cambios

Consulta [CHANGELOG.md](./CHANGELOG.md) para ver los cambios por versión.

### Versiones Destacadas
- **v1.0** (Jun 2026) - Lanzamiento inicial con escáner de razas, probador y tienda
- **v1.1** (Jul 2026) - Rediseño visual, animaciones GSAP, optimización de IA

---

## 🐛 Reporte de Bugs

Abre un [GitHub Issue](https://github.com/joelalexnder/pettech-mimos/issues) describiendo:
- Pasos para reproducir
- Comportamiento esperado vs actual
- Capturas/videos si es relevante
- Navegador y versión

---

## 📄 Licencia

Repositorio privado. Derechos reservados © 2026 Mimos Pet Club.

---

## 🔗 Enlaces Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Google Generative AI](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com)

---

**Hecho con ❤️ para los amigos de cuatro patas 🐾**
