import sql from "mssql";

const config = {
    server: "localhost",
    database: "GameSite",
    port: 1433,
    user: "GameUser",
    password: "admin",
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
};

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Conexión exitosa a la base de datos');
    }
    catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

export { sql, connectToDatabase };