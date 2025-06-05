import { Sequelize } from "sequelize";

const db = new Sequelize('beautysmile_busysixegg', 'beautysmile_busysixegg', '4307caab5b93d5c8892aba85ecff428ca41ded63', {
    host: 'auruz.h.filess.io',
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;