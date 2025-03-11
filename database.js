require("dotenv").config();
const mysql = require("mysql2");

// Crear la conexión con la base de datos usando el host y puerto correctos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones simultáneas
    queueLimit: 0
});

// Manejo de errores en la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error al conectar con MySQL en Render:", err);
    } else {
        console.log("✅ Conexión establecida con MySQL en Railway");
        connection.release();
    }
});

// Función para ejecutar consultas con promesas
const Conexion = {
    query: (sql, params) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, results) => {
                if (err) {
                    console.error("❌ Error en la consulta SQL:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = Conexion;
