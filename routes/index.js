import express from 'express';
import { 
    inicio, 
    autenticar, 
    dashboard, 
    logout 
} from '../controller/paginasController.js';
import { 
    listarPacientes, 
    nuevoPaciente, 
    crearPaciente, 
    editarPaciente, 
    actualizarPaciente 
} from '../controller/pacientesController.js';
import { 
    listarCitas, 
    nuevaCita, 
    crearCita, 
    actualizarEstadoCita, 
    verCita 
} from '../controller/citasController.js';

const router = express.Router();

// Middleware para verificar autenticación
const verificarAuth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/?error=Debe iniciar sesión');
    }
    next();
};

// Rutas públicas
router.get('/', inicio);
router.post('/autenticar', autenticar);

// Rutas protegidas
router.get('/dashboard', verificarAuth, dashboard);
router.get('/logout', logout);

// Rutas de pacientes
router.get('/pacientes', verificarAuth, listarPacientes);
router.get('/pacientes/nuevo', verificarAuth, nuevoPaciente);
router.post('/pacientes', verificarAuth, crearPaciente);
router.get('/pacientes/editar/:id', verificarAuth, editarPaciente);
router.post('/pacientes/editar/:id', verificarAuth, actualizarPaciente);

// Rutas de citas
router.get('/citas', verificarAuth, listarCitas);
router.get('/citas/nueva', verificarAuth, nuevaCita);
router.post('/citas', verificarAuth, crearCita);
router.post('/citas/estado/:id', verificarAuth, actualizarEstadoCita);
router.get('/citas/ver/:id', verificarAuth, verCita);

export default router;