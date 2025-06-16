const mongoose = require('mongoose');

const clearDatabaseCompletely = async () => {
    try {
        // Conexión a MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/football_institution');
        console.log('✅ MongoDB conectado');

        // Obtener todas las colecciones
        const collections = await mongoose.connection.db.collections();

        // Borrar cada colección (estructura + datos)
        for (let collection of collections) {
        await collection.drop(); // Esto elimina la colección completamente
        console.log(`🗑️ Colección ${collection.collectionName} eliminada`);
        }

        console.log('🔥 Base de datos borrada completamente (datos + estructura)');
        
        await mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        // Manejar error específico cuando se intenta borrar una colección que no existe
        if (error.message.includes('ns not found')) {
        console.log('ℹ️ Algunas colecciones ya no existían');
        } else {
        console.error('❌ Error al borrar la base de datos:', error);
        }
        process.exit(1);
    }
};

clearDatabaseCompletely();