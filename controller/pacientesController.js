import Paciente from '../models/Paciente.js';
import { Op } from 'sequelize';

// Listar pacientes
const listarPacientes = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    try {
        const { buscar = '' } = req.query;
        
        const where = { activo: true };
        if (buscar) {
            where[Op.or] = [
                { nombre: { [Op.like]: `%${buscar}%` } },
                { apellido: { [Op.like]: `%${buscar}%` } },
                { cedula: { [Op.like]: `%${buscar}%` } }
            ];
        }
        
        const pacientes = await Paciente.findAll({
            where,
            order: [['nombre', 'ASC']]
        });
        
        res.render('pacientes', {
            pagina: 'Pacientes - Beauty Smile',
            usuario: req.session.usuario,
            pacientes,
            buscar
        });
    } catch (error) {
        console.error(error);
        res.render('pacientes', {
            pagina: 'Pacientes - Beauty Smile',
            usuario: req.session.usuario,
            pacientes: [],
            error: 'Error al cargar pacientes'
        });
    }
};

// Mostrar formulario de nuevo paciente
const nuevoPaciente = (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    res.render('nuevo-paciente', {
        pagina: 'Nuevo Paciente - Beauty Smile',
        usuario: req.session.usuario,
        errores: {},
        paciente: {}
    });
};

// Crear paciente
const crearPaciente = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { nombre, apellido, cedula, telefono, email, fecha_nacimiento, direccion } = req.body;
    
    // Validaciones
    const errores = {};
    if (!nombre?.trim()) errores.nombre = 'El nombre es obligatorio';
    if (!apellido?.trim()) errores.apellido = 'El apellido es obligatorio';
    if (!cedula?.trim()) errores.cedula = 'La cédula es obligatoria';
    
    if (Object.keys(errores).length > 0) {
        return res.render('nuevo-paciente', {
            pagina: 'Nuevo Paciente - Beauty Smile',
            usuario: req.session.usuario,
            errores,
            paciente: req.body
        });
    }
    
    try {
        // Verificar si ya existe la cédula
        const pacienteExistente = await Paciente.findOne({ where: { cedula } });
        if (pacienteExistente) {
            return res.render('nuevo-paciente', {
                pagina: 'Nuevo Paciente - Beauty Smile',
                usuario: req.session.usuario,
                errores: { cedula: 'Ya existe un paciente con esta cédula' },
                paciente: req.body
            });
        }
        
        await Paciente.create({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            cedula: cedula.trim(),
            telefono: telefono?.trim(),
            email: email?.trim(),
            fecha_nacimiento: fecha_nacimiento || null,
            direccion: direccion?.trim()
        });
        
        res.redirect('/pacientes?mensaje=Paciente registrado exitosamente');
        
    } catch (error) {
        console.error(error);
        res.render('nuevo-paciente', {
            pagina: 'Nuevo Paciente - Beauty Smile',
            usuario: req.session.usuario,
            errores: { general: 'Error al registrar paciente' },
            paciente: req.body
        });
    }
};

// Mostrar paciente para editar
const editarPaciente = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { id } = req.params;
    
    try {
        const paciente = await Paciente.findByPk(id);
        
        if (!paciente) {
            return res.redirect('/pacientes?error=Paciente no encontrado');
        }
        
        res.render('editar-paciente', {
            pagina: 'Editar Paciente - Beauty Smile',
            usuario: req.session.usuario,
            paciente,
            errores: {}
        });
        
    } catch (error) {
        console.error(error);
        res.redirect('/pacientes?error=Error al cargar paciente');
    }
};

// Actualizar paciente
const actualizarPaciente = async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    
    const { id } = req.params;
    const { nombre, apellido, cedula, telefono, email, fecha_nacimiento, direccion } = req.body;
    
    // Validaciones
    const errores = {};
    if (!nombre?.trim()) errores.nombre = 'El nombre es obligatorio';
    if (!apellido?.trim()) errores.apellido = 'El apellido es obligatorio';
    if (!cedula?.trim()) errores.cedula = 'La cédula es obligatoria';
    
    if (Object.keys(errores).length > 0) {
        return res.render('editar-paciente', {
            pagina: 'Editar Paciente - Beauty Smile',
            usuario: req.session.usuario,
            errores,
            paciente: { id, ...req.body }
        });
    }
    
    try {
        const paciente = await Paciente.findByPk(id);
        
        if (!paciente) {
            return res.redirect('/pacientes?error=Paciente no encontrado');
        }
        
        // Verificar si la cédula ya existe en otro paciente
        const pacienteExistente = await Paciente.findOne({ 
            where: { 
                cedula,
                id: { [Op.ne]: id }
            } 
        });
        
        if (pacienteExistente) {
            return res.render('editar-paciente', {
                pagina: 'Editar Paciente - Beauty Smile',
                usuario: req.session.usuario,
                errores: { cedula: 'Ya existe otro paciente con esta cédula' },
                paciente: { id, ...req.body }
            });
        }
        
        await paciente.update({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            cedula: cedula.trim(),
            telefono: telefono?.trim(),
            email: email?.trim(),
            fecha_nacimiento: fecha_nacimiento || null,
            direccion: direccion?.trim(),
            fecha_modificacion: new Date()
        });
        
        res.redirect('/pacientes?mensaje=Paciente actualizado exitosamente');
        
    } catch (error) {
        console.error(error);
        res.render('editar-paciente', {
            pagina: 'Editar Paciente - Beauty Smile',
            usuario: req.session.usuario,
            errores: { general: 'Error al actualizar paciente' },
            paciente: { id, ...req.body }
        });
    }
};

export {
    listarPacientes,
    nuevoPaciente,
    crearPaciente,
    editarPaciente,
    actualizarPaciente
};