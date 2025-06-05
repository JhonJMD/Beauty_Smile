# 🦷 Beauty Smile - Sistema de Gestión Clínica Odontológica

Sistema web desarrollado para la gestión integral de una clínica odontológica, incluyendo administración de pacientes, programación de citas y seguimiento de historiales clínicos.

## 🚀 Características

- **Gestión de Pacientes**: Registro, edición y búsqueda de pacientes
- **Sistema de Citas**: Programación, seguimiento y gestión de estados
- **Dashboard Informativo**: Estadísticas y accesos rápidos
- **Autenticación Segura**: Sistema de login con sesiones
- **Interfaz Responsive**: Diseño adaptativo para todos los dispositivos
- **Base de Datos MySQL**: Gestión robusta de datos con Sequelize ORM

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **Frontend**: Pug (Motor de plantillas)
- **Base de Datos**: MySQL
- **ORM**: Sequelize
- **Autenticación**: Express-session + bcrypt
- **Estilos**: Bootstrap 5 + CSS personalizado
- **Iconos**: Font Awesome

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- MySQL (versión 5.7 o superior)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd beauty-smile-clinic
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar la base de datos

#### Crear la base de datos en MySQL
```sql
CREATE DATABASE beautysmile_clinic;
```

#### Ejecutar el script SQL
Ejecuta el contenido del archivo de base de datos proporcionado en tu servidor MySQL.

### 4. Configurar la conexión a la base de datos

Actualiza el archivo `config/db.js` con tus credenciales:

```javascript
const db = new Sequelize('tu_base_de_datos', 'tu_usuario', 'tu_password', {
    host: 'tu_host',
    port: 3307, // o tu puerto
    dialect: 'mysql',
    // ... resto de configuración
});
```

### 5. Iniciar la aplicación

#### Modo desarrollo
```bash
npm run dev
```

#### Modo producción
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 👤 Usuarios de Prueba

### Administrador
- **Email**: admin@beautysmile.com
- **Contraseña**: admin123

### Doctor
- **Email**: doctor@beautysmile.com
- **Contraseña**: admin123

## 📁 Estructura del Proyecto

```
beauty-smile-clinic/
├── config/
│   └── db.js                 # Configuración de base de datos
├── controllers/
│   ├── paginasController.js  # Controlador principal
│   ├── pacientesController.js # Controlador de pacientes
│   └── citasController.js    # Controlador de citas
├── models/
│   ├── Usuario.js           # Modelo de usuarios
│   ├── Paciente.js         # Modelo de pacientes
│   ├── Servicio.js         # Modelo de servicios
│   └── Cita.js             # Modelo de citas
├── routes/
│   └── index.js            # Rutas principales
├── views/
│   ├── layout.pug          # Layout base
│   ├── inicio.pug          # Página de login
│   ├── dashboard.pug       # Dashboard principal
│   ├── pacientes.pug       # Lista de pacientes
│   ├── nuevo-paciente.pug  # Formulario nuevo paciente
│   ├── editar-paciente.pug # Formulario editar paciente
│   ├── citas.pug           # Lista de citas
│   ├── nueva-cita.pug      # Formulario nueva cita
│   └── ver-cita.pug        # Detalles de cita
├── public/
│   └── css/
│       └── style.css       # Estilos personalizados
├── package.json
├── index.js                # Archivo principal
└── README.md
```

## 🔗 Rutas Principales

### Públicas
- `GET /` - Página de login
- `POST /autenticar` - Procesar login

### Protegidas (requieren autenticación)
- `GET /dashboard` - Dashboard principal
- `GET /pacientes` - Lista de pacientes
- `GET /pacientes/nuevo` - Formulario nuevo paciente
- `POST /pacientes` - Crear paciente
- `GET /pacientes/editar/:id` - Formulario editar paciente
- `POST /pacientes/editar/:id` - Actualizar paciente
- `GET /citas` - Lista de citas
- `GET /citas/nueva` - Formulario nueva cita
- `POST /citas` - Crear cita
- `GET /citas/ver/:id` - Ver detalles de cita
- `POST /citas/estado/:id` - Actualizar estado de cita
- `GET /logout` - Cerrar sesión

## 📊 Base de Datos

### Tablas Principales

1. **usuarios** - Información de administradores y doctores
2. **pacientes** - Datos de los pacientes
3. **servicios** - Servicios odontológicos disponibles
4. **citas** - Programación de citas médicas

### Relaciones
- Una cita pertenece a un paciente, un servicio y un doctor
- Un paciente puede tener múltiples citas
- Un doctor puede atender múltiples citas
- Un servicio puede estar en múltiples citas

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Se adapta a móviles, tablets y escritorio
- **Tema Médico**: Colores y iconografía apropiada para el sector salud
- **Navegación Intuitiva**: Menú claro y breadcrumbs
- **Feedback Visual**: Alertas, notificaciones y estados
- **Búsqueda y Filtros**: Funcionalidad de búsqueda en pacientes y citas

## 🚀 Despliegue

### Render
1. Conecta tu repositorio a Render
2. Configura las variables de entorno para la base de datos
3. Despliega automáticamente

### Variables de Entorno Recomendadas
```env
NODE_ENV=production
DB_HOST=tu_host
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASS=tu_password
DB_PORT=3307
SESSION_SECRET=tu_clave_secreta
```

## 🧪 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación
- [x] Dashboard con estadísticas
- [x] CRUD completo de pacientes
- [x] CRUD de citas con estados
- [x] Interfaz responsive
- [x] Búsqueda y filtros
- [x] Validaciones de formularios
- [x] Manejo de errores

## 🐛 Solución de Problemas

### Error de Conexión a la Base de Datos
1. Verifica que MySQL esté ejecutándose
2. Confirma las credenciales en `config/db.js`
3. Asegúrate de que la base de datos existe

### Error de Dependencias
```bash
npm install --force
```

### Puerto en Uso
```bash
# Cambiar puerto en index.js o terminar proceso
lsof -ti:3000 | xargs kill -9
```

## 📞 Soporte

Para reportar problemas o solicitar nuevas características, por favor crea un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Beauty Smile Clinic**