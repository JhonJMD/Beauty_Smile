import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Paciente from './Paciente.js';
import Servicio from './Servicio.js';
import Usuario from './Usuario.js';

const Cita = db.define('Cita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paciente,
            key: 'id'
        }
    },
    servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servicio,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    fecha_cita: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_cita: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('programada', 'completada', 'cancelada', 'no_asistio'),
        defaultValue: 'programada'
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'citas',
    timestamps: false
});

// Asociaciones
Cita.belongsTo(Paciente, { foreignKey: 'paciente_id', as: 'paciente' });
Cita.belongsTo(Servicio, { foreignKey: 'servicio_id', as: 'servicio' });
Cita.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'doctor' });

Paciente.hasMany(Cita, { foreignKey: 'paciente_id', as: 'citas' });
Servicio.hasMany(Cita, { foreignKey: 'servicio_id', as: 'citas' });
Usuario.hasMany(Cita, { foreignKey: 'usuario_id', as: 'citas' });

export default Cita;