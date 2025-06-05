# 🦷 Beauty Smile - Sistema de Gestión Clínica Odontológica

Sistema web desarrollado para la gestión integral de una clínica odontológica, incluyendo administración de pacientes, programación de citas y seguimiento de historiales clínicos.

## 🌐 Demo en Vivo

**🚀 Accede a la aplicación aquí:** [https://beauty-smile.onrender.com](https://beauty-smile.onrender.com)

### 👤 Credenciales de Prueba
- **Email**: `admin@beautysmile.com`
- **Contraseña**: `admin123`

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
- **Deployment**: Render.com
- **Base de Datos**: Filess.io (MySQL en la nube)

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- MySQL (versión 5.7 o superior)
- npm o yarn

## 🔧 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/JhonJMD/beauty-smile-clinic.git
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
├── utils/
│   └── hashPassword.js     # Utilidad para generar hashes
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

### Datos Iniciales Incluidos
- 2 usuarios (administrador y doctor)
- 6 servicios odontológicos predefinidos
- 2 pacientes de ejemplo
- 3 citas de muestra

## 🎨 Características de la Interfaz

- **Diseño Responsive**: Se adapta a móviles, tablets y escritorio
- **Tema Médico**: Colores y iconografía apropiada para el sector salud
- **Navegación Intuitiva**: Menú claro y breadcrumbs
- **Feedback Visual**: Alertas, notificaciones y estados
- **Búsqueda y Filtros**: Funcionalidad de búsqueda en pacientes y citas
- **Animaciones Suaves**: Transiciones y efectos visuales mejorados

## 🚀 Despliegue

### Render.com (Producción)
La aplicación está desplegada en Render.com y disponible en:
**https://beauty-smile.onrender.com**


### Despliegue Local en Otros Servicios

#### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login y crear app
heroku login
heroku create tu-app-name

# Configurar variables de entorno
heroku config:set DB_HOST=tu_host
heroku config:set DB_NAME=tu_db_name
# ... otras variables

# Desplegar
git push heroku main
```

#### Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login y desplegar
railway login
railway link
railway up
```

## 🧪 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación seguro
- [x] Dashboard con estadísticas en tiempo real
- [x] CRUD completo de pacientes con validaciones
- [x] CRUD de citas con gestión de estados
- [x] Interfaz responsive y moderna
- [x] Búsqueda y filtros avanzados
- [x] Validaciones de formularios frontend y backend
- [x] Manejo robusto de errores
- [x] Sesiones seguras y persistentes
- [x] Deployment en producción
- [x] Base de datos en la nube

## 🔒 Seguridad

- **Contraseñas encriptadas** con bcrypt
- **Sesiones seguras** con express-session
- **Validación de datos** en frontend y backend
- **Protección CSRF** implementada
- **Sanitización de inputs** para prevenir inyecciones
- **Headers de seguridad** configurados

## 🐛 Solución de Problemas

### Error de Conexión a la Base de Datos
1. Verifica que MySQL esté ejecutándose
2. Confirma las credenciales en `config/db.js`
3. Asegúrate de que la base de datos existe
4. Revisa la conectividad de red (firewall/puertos)

### Error de Dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install

# Si persiste el error
npm install --force
```

### Puerto en Uso
```bash
# Verificar qué proceso usa el puerto
lsof -ti:3000

# Terminar proceso
lsof -ti:3000 | xargs kill -9

# O cambiar puerto en index.js
const PORT = process.env.PORT || 3001;
```

### Problemas con Render.com
- **Cold Start**: La primera carga puede tardar 30-60 segundos
- **Logs**: Revisa los logs en el dashboard de Render
- **Environment Variables**: Verifica que estén configuradas correctamente

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🏗️ Arquitectura Técnica

### Patrón MVC Implementado
- **Model**: Sequelize ORM para gestión de datos
- **View**: Plantillas Pug con Bootstrap 5
- **Controller**: Lógica de negocio en Express.js

### Base de Datos
- **Motor**: MySQL 8.0+
- **ORM**: Sequelize 6.x
- **Conexiones**: Pool de conexiones configurado
- **Migraciones**: Esquema SQL incluido

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Beauty Smile Clinic**