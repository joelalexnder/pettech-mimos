# Mimos Pet Club 🐾

Plataforma web completa para una pet shop con IA integrada. Descubre productos, servicios y funcionalidades innovadoras para el cuidado de mascotas.

[![TypeScript](https://img.shields.io/badge/TypeScript-98.8%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)]()

---

## Descripcion

Mimos Pet Club es una aplicación web moderna desarrollada con Next.js que ofrece:

- Tienda en línea: Catálogo de productos para mascotas
- Asistente IA (VetBot): Chat inteligente para consultas veterinarias con Google Gemini
- Probador Virtual: Visualiza accesorios en tu mascota
- Escáner de Mascotas: Detecta e identifica razas (Computer Vision)
- Servicios Integrados: Reserva citas y servicios
- Ubicación y Contacto: Botón flotante de WhatsApp para soporte directo

---

## Stack Tecnologico

| Aspecto | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 + React 19 |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + PostCSS |
| UI Components | Lucide React, Swiper, Framer Motion |
| Base de datos | PostgreSQL (Prisma ORM) |
| IA | Google Generative AI (Gemini Flash) |
| Despliegue | Cloudflare Workers (Edge Runtime) |
| Animaciones | GSAP, Anime.js |

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              Home principal
│   ├── layout.tsx            Layout global
│   ├── (routes)/
│   │   ├── tienda/           Catalogo de productos
│   │   ├── servicios/        Servicios disponibles
│   │   ├── conoce-a-tu-perro Escaner de razas
│   │   └── reservas/         Sistema de reservas
│   └── api/
│       ├── chat/             Endpoint VetBot
│       ├── scanner/          API analisis de imagenes
│       ├── products/         API de productos
│       └── bookings/         API de reservas
├── components/
│   ├── Hero.tsx              Seccion principal con animaciones
│   ├── Navbar.tsx            Navegacion responsiva
│   ├── VetBotWidget.tsx      Chat IA integrado
│   ├── ProbadorVirtual.tsx   Try-on virtual
│   └── otros                 Componentes reutilizables
├── lib/
│   ├── db.ts                 Configuracion Prisma
│   ├── gemini.ts             Cliente Google Gemini
│   └── utils.ts              Funciones utilitarias
└── prisma/
    └── schema.prisma         Esquema de BD
```

---

## Como Ejecutar

### Requisitos
- Node.js 18+ y npm/pnpm/yarn
- Variables de entorno configuradas (ver `.env.example`)

### Instalacion y Desarrollo

```bash
git clone https://github.com/joelalexnder/pettech-mimos.git
cd pettech-mimos

npm install

cp .env.example .env.local

npx prisma migrate dev

npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Build y Produccion

```bash
npm run build

npm start

npm run lint
```

---

## Variables de Entorno

Crea un archivo `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mimos
GOOGLE_API_KEY=your_google_api_key_here
WHATSAPP_NUMBER=51987654321
```

---

## Funcionalidades Principales

**Asistente VetBot**
Chatbot IA impulsado por Google Gemini que responde preguntas sobre salud y cuidado de mascotas.

**Probador Virtual**
Visualiza accesorios en tu mascota usando Computer Vision.

**Escaner de Razas**
Carga una foto de tu perro y obtén identificacion automatica de la raza.

**Tienda Online**
Catalogo de productos, busqueda, filtros y carrito de compras.

**Reserva de Servicios**
Reserva citas para grooming, veterinaria y otros servicios.

---

## Rendimiento

- Optimizacion de imagenes con Next.js Image & Sharp
- Code splitting con importaciones dinamicas
- Edge Runtime compatible (Cloudflare Workers)
- Responsive design mobile-first

---

## Equipo

- Joel Alexander (@joelalexnder) - Lead Frontend & Arquitectura & Integracion IA
- Diego Colca (@diegocolca) - Backend & Servicios
- Albieri (@albieri765) - Base de datos & Integracion IA

---

## Licencia

Todos los derechos reservados. Ver LICENSE para mas detalles.

Las imagenes, logos y activos de marca de Mimos Pet Club estan sujetos a licencias separadas.

---

## Enlaces

- https://pettech-mimos.netlify.app/

---

Hecho con amor para los amigos de cuatro patas 🐾
