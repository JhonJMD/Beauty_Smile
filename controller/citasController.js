import Cita from '../models/Cita.js';
import Paciente from '../models/Paciente.js';
import Servicio from '../models/Servicio.js';
import Usuario from '../models/Usuario.js';
import { Op } from 'sequelize';

// Listar citas
const listarCitas = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    try {
        const { buscar = '', estado = '' } = req.query;
        
        const where = {};
        if (estado) {
            where.estado = estado;
        }
        
        const include = [
            { 
                model: Paciente, 
                as: 'paciente',
                where: buscar ? {
                    [Op.or]: [
                        { nombre: { [Op.like]: `%${buscar}%` } },
                        { apellido: { [Op.like]: `%${buscar}%` } },
                        { cedula: { [Op.like]: `%${buscar}%` } }
                    ]
                } : undefined
            },
            { model: Servicio, as: 'servicio' },
            { model: Usuario, as: 'doctor' }
        ];
        
        const citas = await Cita.findAll({
            where,
            include,
            order: [['fecha_cita', 'DESC'], ['hora_cita', 'ASC']]
        });
        
        res.render('citas', {
            pagina: 'Citas - Beauty Smile',
            usuario: req.session.usuario,
            citas,
            buscar,
            estado
        });
    } catch (error) {
        console.error(error);
        res.render('citas', {
            pagina: 'Citas - Beauty Smile',
            usuario: req.session.usuario,
            citas: [],
            error: 'Error al cargar citas'
        });
    }
};

// Mostrar formulario de nueva cita
const nuevaCita = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    try {
        const [pacientes, servicios, doctores] = await Promise.all([
            Paciente.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
            Servicio.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
            Usuario.findAll({ where: { rol: 'doctor', activo: true }, order: [['nombre', 'ASC']] })
        ]);
        
        res.render('nueva-cita', {
            pagina: 'Nueva Cita - Beauty Smile',
            usuario: req.session.usuario,
            pacientes,
            servicios,
            doctores,
            errores: {},
            cita: {}
        });
    } catch (error) {
        console.error(error);
        res.render('nueva-cita', {
            pagina: 'Nueva Cita - Beauty Smile',
            usuario: req.session.usuario,
            pacientes: [],
            servicios: [],
            doctores: [],
            errores: { general: 'Error al cargar datos' },
            cita: {}
        });
    }
};

// Crear cita
const crearCita = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { paciente_id, servicio_id, usuario_id, fecha_cita, hora_cita, observaciones } = req.body;
    
    // Validaciones
    const errores = {};
    if (!paciente_id) errores.paciente_id = 'Debe seleccionar un paciente';
    if (!servicio_id) errores.servicio_id = 'Debe seleccionar un servicio';
    if (!usuario_id) errores.usuario_id = 'Debe seleccionar un doctor';
    if (!fecha_cita) errores.fecha_cita = 'La fecha es obligatoria';
    if (!hora_cita) errores.hora_cita = 'La hora es obligatoria';
    
    if (Object.keys(errores).length > 0) {
        try {
            const [pacientes, servicios, doctores] = await Promise.all([
                Paciente.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
                Servicio.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
                Usuario.findAll({ where: { rol: 'doctor', activo: true }, order: [['nombre', 'ASC']] })
            ]);
            
            return res.render('nueva-cita', {
                pagina: 'Nueva Cita - Beauty Smile',
                usuario: req.session.usuario,
                pacientes,
                servicios,
                doctores,
                errores,
                cita: req.body
            });
        } catch (error) {
            return res.redirect('/citas?error=Error al validar datos');
        }
    }
    
    try {
        // Verificar conflictos de horario
        const citaExistente = await Cita.findOne({
            where: {
                usuario_id,
                fecha_cita,
                hora_cita,
                estado: { [Op.ne]: 'cancelada' }
            }
        });
        
        if (citaExistente) {
            const [pacientes, servicios, doctores] = await Promise.all([
                Paciente.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
                Servicio.findAll({ where: { activo: true }, order: [['nombre', 'ASC']] }),
                Usuario.findAll({ where: { rol: 'doctor', activo: true }, order: [['nombre', 'ASC']] })
            ]);
            
            return res.render('nueva-cita', {
                pagina: 'Nueva Cita - Beauty Smile',
                usuario: req.session.usuario,
                pacientes,
                servicios,
                doctores,
                errores: { general: 'Ya existe una cita programada en esa fecha y hora' },
                cita: req.body
            });
        }
        
        await Cita.create({
            paciente_id,
            servicio_id,
            usuario_id,
            fecha_cita,
            hora_cita,
            observaciones: observaciones?.trim()
        });
        
        res.redirect('/citas?mensaje=Cita creada exitosamente');
        
    } catch (error) {
        console.error(error);
        res.redirect('/citas?error=Error al crear la cita');
    }
};

// Actualizar estado de cita
const actualizarEstadoCita = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { id } = req.params;
    const { estado } = req.body;
    
    try {
        const cita = await Cita.findByPk(id);
        
        if (!cita) {
            return res.redirect('/citas?error=Cita no encontrada');
        }
        
        await cita.update({
            estado,
            fecha_modificacion: new Date()
        });
        
        res.redirect('/citas?mensaje=Estado de cita actualizado');
        
    } catch (error) {
        console.error(error);
        res.redirect('/citas?error=Error al actualizar cita');
    }
};

// Ver detalles de cita
const verCita = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { id } = req.params;
    
    try {
        const cita = await Cita.findByPk(id, {
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Servicio, as: 'servicio' },
                { model: Usuario, as: 'doctor' }
            ]
        });
        
        if (!cita) {
            return res.redirect('/citas?error=Cita no encontrada');
        }
        
        res.render('ver-cita', {
            pagina: 'Detalles de Cita - Beauty Smile',
            usuario: req.session.usuario,
            cita
        });
        
    } catch (error) {
        console.error(error);
        res.redirect('/citas?error=Error al cargar cita');
    }
};

export {
    listarCitas,
    nuevaCita,
    crearCita,
    actualizarEstadoCita,
    verCita
};