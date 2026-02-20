# YogIA Center - Plataforma de Bienestar Inteligente

**YogIA Center** es una plataforma premium de Yoga y Bienestar que fusiona la sabiduría milenaria de la práctica física con el potencial de la Inteligencia Artificial. Diseñada especialmente para profesionales del sector tecnológico (Techies & Devs), la plataforma optimiza el "hardware" humano a través del movimiento consciente y la claridad mental.

Este **repositorio** es una muestra de lo que se puede lograr mediante el uso estratégico de la IA,en este caso utilice la Plataforma de **antigravity** para el desarrollo de la misma, refinado con ajustes técnicos manuales.Es una pieza ilustrativa que demuestra mi capacidad para integrar herramientas avanzadas sin perder el criterio humano.Aunque el contenido está inspirado en mi practica personal de **Yoga**, mi enfoque y meta profesional están centrados en la creación de **páginas web de alto impacto**

---

## 📋 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
  - [🚀 Sales Landing Page (NEW)](#-sales-landing-page-new)
  - [🧘 Experiencia de Usuario](#-experiencia-de-usuario)
  - [🔐 Seguridad y Datos](#-seguridad-y-datos)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [🎨 Identidad Visual](#-identidad-visual)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
  - [1. Clonar el repositorio](#1-clonar-el-repositorio-e-instalar-dependencias)
  - [2. Configurar Variables de Entorno](#2-configurar-variables-de-entorno)
  - [3. Ejecutar en Desarrollo](#3-ejecutar-en-desarrollo)
- [🗄️ Base de Datos](#-base-de-datos)
- [🧠 Aprendizajes y Reflexiones](#-aprendizajes-y-reflexiones)
  - [🌌 La Potencia de Antigravity](#-la-potencia-de-antigravity)
  - [🔌 MCP y la Gestión de Datos](#-mcp-y-la-gestión-de-datos-supabase)
- [�️ Desarrollo Continuo](#️-desarrollo-continuo)
- [�👩‍💻 Sobre la Autora](#-sobre-la-autora)

---

## ✨ Características Principales

### 🚀 Sales Landing Page (NEW)
- **High-Conversion Landing**: Página de ventas profesional con animaciones premium (`framer-motion`).
- **Eleva tu equilibrio**: Propuesta de valor enfocada en la armonía entre código y bienestar.
- **CTAs Inteligentes**: Acceso fluido a la plataforma con persistencia de sesión.

### 🧘 Experiencia de Usuario
- **Dashboard Personalizado**: Vista para clientes y administradores.
- **Agenda Semanal**: Calendario interactivo (`CalendarGrid`) para gestionar reservas en tiempo real.
- **Tipos de Yoga**: Desde Vinyasa Flow hasta Yoga Nidra, con descripciones detalladas y niveles.
- **Yoga para Techies**: Blog especializado con tips para reducir el estrés, mejorar la postura (cobra pose) y cuidar la salud visual (regla 20-20-20).

### 🔐 Seguridad y Datos
- **Autenticación Robusta**: Gestión de usuarios mediante Supabase Auth.
- **Base de Datos en Tiempo Real**: Sincronización de perfiles, clases y reservas.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Manejo de Fechas**: [date-fns](https://date-fns.org/)

---

## 🎨 Identidad Visual

La marca utiliza una paleta de colores que transmiten calma y profesionalismo:
- **Sage Green (`#5E8C61`)**: Conexión con la naturaleza y equilibrio.
- **Lavender (`#E6E6FA`)**: Relajación y espiritualidad.
- **Mint (`#F0FFF4`)**: Frescura y tecnología.
- **Font-Family**: Poppins (Headings) y Open Sans (Body) para una legibilidad superior.

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

---

## 🗄️ Base de Datos

Para inicializar las tablas necesarias, ejecuta el contenido de `update_schema.sql` en el SQL Editor de tu proyecto de Supabase. Esto creará:
- `perfiles`: Almacena roles (admin/client) y datos de usuario.
- `clases`: Catálogo de tipos de yoga.
- `reservas`: Gestión de inscripciones.

---

## 🧠 Aprendizajes y Reflexiones

### 🌌 La Potencia de Antigravity
Trabajar con **Antigravity** ha transformado mi flujo de desarrollo. No es solo un asistente de código, sino un entorno agéntico que comprende el contexto profundo del proyecto. Me ha permitido:
- **Prototipado Ultra-Rápido**: De la idea a una landing funcional con animaciones en tiempo récord.
- **Refinamiento Inteligente**: La capacidad de la plataforma para aplicar cambios complejos en múltiples archivos manteniendo la coherencia.
- **Enfoque en la Calidad**: Delegar tareas repetitivas a la IA para concentrarme en la experiencia de usuario y el diseño premium.

### 🔌 MCP y la Gestión de Datos (Supabase)
El uso de **MCP (Model Context Protocol)** ha sido un punto de inflexión. A través del `supabase-mcp-server`, la IA no solo "escribe" código de base de datos, sino que:
- **Interactúa directamente** con la infraestructura de Supabase para ejecutar SQL y gestionar esquemas.
- **Garantiza la Consistencia**: Al tener acceso directo a las herramientas de la base de datos, la IA reduce errores de sincronización entre el código frontend y las tablas.
- **Automatización de Infraestructura**: Gestión de roles, políticas de seguridad (RLS) y migraciones de forma integrada en el chat.

Esta combinación de IA agéntica y protocolos de herramientas (MCP) representa el futuro del desarrollo Full-Stack, permitiendo que el desarrollador se enfoque en la arquitectura creativa mientras la IA maneja la complejidad técnica operativa.

---

## �️ Desarrollo Continuo

Este proyecto se encuentra en una fase de **evolución constante**. Es importante destacar que:
- **Estado Actual**: Es una pieza demostrativa creada para evidenciar capacidades técnicas en integración de IA, diseño de interfaces y manejo de datos.
- **Pendientes**: Aún quedan optimizaciones por implementar, adaptaciones de diseño para casos de borde y funcionalidades adicionales para completar la experiencia de usuario final.
- **Propósito**: Mostrar el potencial de las herramientas agénticas modernas aplicadas al desarrollo de software de alta calidad.

---

## �👩‍💻 Sobre la Autora
**Lisbeth E. Polidor** - Frontend Dev y Yoguista.
Combinando la ingeniería con la fluidez del yoga para crear soluciones digitales que conectan.

[GitHub](https://github.com/polidorl/) | [LinkedIn](https://www.linkedin.com/in/lisbeth-emperatriz-polidor-solano/)
