import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import Paciente from '../models/Paciente.js';
import Servicio from '../models/Servicio.js';
import Cita from '../models/Cita.js';

// Página de inicio/login
const inicio = (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/dashboard');
    }
    res.render('inicio', {
        pagina: 'Iniciar Sesión - Beauty Smile',
        error: null
    });
};

// Procesar login
const autenticar = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log('🔍 Intentando login con:', email);
        
        const usuario = await Usuario.findOne({ where: { email, activo: true } });
        
        if (!usuario) {
            console.log('❌ Usuario no encontrado');
            return res.render('inicio', {
                pagina: 'Iniciar Sesión - Beauty Smile',
                error: 'Usuario no encontrado'
            });
        }
        
        console.log('✅ Usuario encontrado:', usuario.nombre);
        
        const passwordValido = await bcrypt.compare(password, usuario.password);
        console.log('🔐 Resultado comparación:', passwordValido);
        
        if (!passwordValido) {
            console.log('❌ Contraseña incorrecta');
            return res.render('inicio', {
                pagina: 'Iniciar Sesión - Beauty Smile',
                error: 'Contraseña incorrecta'
            });
        }
        
        // Crear sesión - MEJORADO
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };
        
        // Guardar sesión antes de redirigir - ESTO ES CLAVE
        req.session.save((err) => {
            if (err) {
                console.error('❌ Error guardando sesión:', err);
                return res.render('inicio', {
                    pagina: 'Iniciar Sesión - Beauty Smile',
                    error: 'Error del servidor'
                });
            }
            
            console.log('✅ Login exitoso y sesión guardada para:', usuario.nombre);
            console.log('🔄 Redirigiendo a dashboard...');
            
            // Redirigir después de guardar la sesión
            return res.redirect('/dashboard');
        });
        
    } catch (error) {
        console.error('💥 Error en autenticación:', error);
        res.render('inicio', {
            pagina: 'Iniciar Sesión - Beauty Smile',
            error: 'Error del servidor'
        });
    }
};

// Dashboard principal
const dashboard = async (req, res) => {
    console.log('📊 Accediendo al dashboard...');
    console.log('👤 Usuario en sesión:', req.session.usuario);
    
    if (!req.session.usuario) {
        console.log('❌ No hay sesión activa, redirigiendo a login');
        return res.redirect('/?error=Debe iniciar sesión');
    }
    
    try {
        console.log('📈 Obteniendo estadísticas...');
        
        const [totalPacientes, totalCitas, citasHoy] = await Promise.all([
            Paciente.count({ where: { activo: true } }),
            Cita.count(),
            Cita.count({ 
                where: { 
                    fecha_cita: new Date().toISOString().split('T')[0] 
                } 
            })
        ]);
        
        console.log('✅ Estadísticas obtenidas:', { totalPacientes, totalCitas, citasHoy });
        console.log('🎨 Renderizando dashboard...');
        
        res.render('dashboard', {
            pagina: 'Dashboard - Beauty Smile',
            usuario: req.session.usuario,
            stats: {
                totalPacientes,
                totalCitas,
                citasHoy
            }
        });
        
    } catch (error) {
        console.error('💥 Error en dashboard:', error);
        res.render('dashboard', {
            pagina: 'Dashboard - Beauty Smile',
            usuario: req.session.usuario,
            stats: { totalPacientes: 0, totalCitas: 0, citasHoy: 0 }
        });
    }
};

// Cerrar sesión
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error cerrando sesión:', err);
        }
        res.redirect('/');
    });
};

export {
    inicio,
    autenticar,
    dashboard,
    logout
};