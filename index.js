import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import paginasRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesiones - MEJORADA
app.use(session({
    secret: 'beauty-smile-secret-key-2024-super-secure',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true solo para HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        httpOnly: true // Seguridad adicional
    },
    name: 'beauty-smile-session' // Nombre personalizado de la cookie
}));

// Archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Middleware para verificar autenticación y logs
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.path} - Sesión:`, req.session.usuario ? '✅ Activa' : '❌ Inactiva');
    res.locals.usuario = req.session.usuario || null;
    next();
});

// Rutas
app.use('/', paginasRoutes);

// Manejador de errores 404
app.use((req, res) => {
    res.status(404).render('error', {
        pagina: 'Página no encontrada',
        mensaje: 'La página que buscas no existe'
    });
});

// Manejador de errores del servidor
app.use((err, req, res, next) => {
    console.error('💥 Error del servidor:', err);
    res.status(500).render('error', {
        pagina: 'Error del servidor',
        mensaje: 'Ha ocurrido un error interno'
    });
});

// Conexión a la base de datos y arranque del servidor
try {
    await db.authenticate();
    console.log('✅ Conexión exitosa a la base de datos');
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        console.log(`🏥 Beauty Smile Clinic - Servidor activo en http://localhost:${PORT}`);
        console.log('📋 Rutas disponibles:');
        console.log('   🔑 Login: http://localhost:3000/');
        console.log('   📊 Dashboard: http://localhost:3000/dashboard');
        console.log('   👥 Pacientes: http://localhost:3000/pacientes');
        console.log('   📅 Citas: http://localhost:3000/citas');
    });
    
} catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    process.exit(1);
}