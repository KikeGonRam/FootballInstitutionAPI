    const swaggerUi = require('swagger-ui-express');

    const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API Institución de Fútbol',
        version: '1.0.0',
        description: 'API para gestionar una institución de fútbol, incluyendo autenticación, ubicaciones, equipos, jugadores, personal y oficiales.',
    },
    servers: [
        {
        url: '{protocol}://{host}:{port}',
        variables: {
            protocol: { default: 'http', enum: ['http', 'https'] },
            host: { default: 'localhost' },
            port: { default: '3000' },
        },
        },
    ],
    tags: [
        { name: 'Auth', description: 'Operaciones de autenticación y autorización' },
        { name: 'Location', description: 'Gestión de países y ciudades' },
        { name: 'Teams', description: 'Gestión de equipos de fútbol' },
        { name: 'Players', description: 'Gestión de jugadores' },
        { name: 'Staff', description: 'Gestión del personal del equipo (entrenadores, auxiliares, directivos)' },
        { name: 'Officials', description: 'Gestión de árbitros' },
    ],
    paths: {
        '/auth/register': {
        post: {
            tags: ['Auth'],
            summary: 'Registrar un nuevo usuario',
            description: 'Crea un nuevo usuario en el sistema con un rol específico.',
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/User' },
                },
            },
            },
            responses: {
            201: {
                description: 'Usuario registrado correctamente',
                content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiJ9...' },
                    },
                    },
                },
                },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Iniciar sesión',
            description: 'Autentica a un usuario y devuelve un token JWT.',
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Login' },
                },
            },
            },
            responses: {
            200: {
                description: 'Token generado correctamente',
                content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiJ9...' },
                    },
                    },
                },
                },
            },
            400: {
                description: 'Credenciales inválidas',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/countries': {
        post: {
            tags: ['Location'],
            summary: 'Crear un país',
            description: 'Añade un nuevo país a la base de datos.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Country' },
                },
            },
            },
            responses: {
            201: {
                description: 'País creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Country' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Location'],
            summary: 'Obtener todos los países',
            description: 'Devuelve una lista de todos los países registrados.',
            responses: {
            200: {
                description: 'Lista de países',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Country' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/countries/{id}': {
        put: {
            tags: ['Location'],
            summary: 'Actualizar un país',
            description: 'Actualiza los datos de un país existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del país',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Country' },
                },
            },
            },
            responses: {
            200: {
                description: 'País actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Country' } } },
            },
            404: {
                description: 'País no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Location'],
            summary: 'Eliminar un país',
            description: 'Elimina un país de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del país',
            },
            ],
            responses: {
            204: { description: 'País eliminado exitosamente' },
            404: {
                description: 'País no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/cities': {
        post: {
            tags: ['Location'],
            summary: 'Crear una ciudad',
            description: 'Añade una nueva ciudad a la base de datos.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/City' },
                },
            },
            },
            responses: {
            201: {
                description: 'Ciudad creada exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/City' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Location'],
            summary: 'Obtener todas las ciudades',
            description: 'Devuelve una lista de todas las ciudades registradas.',
            responses: {
            200: {
                description: 'Lista de ciudades',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/City' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/cities/{id}': {
        put: {
            tags: ['Location'],
            summary: 'Actualizar una ciudad',
            description: 'Actualiza los datos de una ciudad existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID de la ciudad',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/City' },
                },
            },
            },
            responses: {
            200: {
                description: 'Ciudad actualizada exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/City' } } },
            },
            404: {
                description: 'Ciudad no encontrada',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Location'],
            summary: 'Eliminar una ciudad',
            description: 'Elimina una ciudad de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID de la ciudad',
            },
            ],
            responses: {
            204: { description: 'Ciudad eliminada exitosamente' },
            404: {
                description: 'Ciudad no encontrada',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/teams': {
        post: {
            tags: ['Teams'],
            summary: 'Crear un equipo',
            description: 'Añade un nuevo equipo a la base de datos.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Team' },
                },
            },
            },
            responses: {
            201: {
                description: 'Equipo creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Team' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Teams'],
            summary: 'Obtener todos los equipos',
            description: 'Devuelve una lista de todos los equipos registrados.',
            responses: {
            200: {
                description: 'Lista de equipos',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Team' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/teams/{id}': {
        get: {
            tags: ['Teams'],
            summary: 'Obtener un equipo por ID',
            description: 'Devuelve los detalles de un equipo específico.',
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del equipo',
            },
            ],
            responses: {
            200: {
                description: 'Equipo encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Team' } } },
            },
            404: {
                description: 'Equipo no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        put: {
            tags: ['Teams'],
            summary: 'Actualizar un equipo',
            description: 'Actualiza los datos de un equipo existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del equipo',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Team' },
                },
            },
            },
            responses: {
            200: {
                description: 'Equipo actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Team' } } },
            },
            404: {
                description: 'Equipo no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Teams'],
            summary: 'Eliminar un equipo',
            description: 'Elimina un equipo de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del equipo',
            },
            ],
            responses: {
            204: { description: 'Equipo eliminado exitosamente' },
            404: {
                description: 'Equipo no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/players': {
        post: {
            tags: ['Players'],
            summary: 'Crear un jugador',
            description: 'Añade un nuevo jugador a la base de datos.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Player' },
                },
            },
            },
            responses: {
            201: {
                description: 'Jugador creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Player' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Players'],
            summary: 'Obtener todos los jugadores',
            description: 'Devuelve una lista de todos los jugadores registrados.',
            responses: {
            200: {
                description: 'Lista de jugadores',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Player' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/players/{id}': {
        get: {
            tags: ['Players'],
            summary: 'Obtener un jugador por ID',
            description: 'Devuelve los detalles de un jugador específico.',
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del jugador',
            },
            ],
            responses: {
            200: {
                description: 'Jugador encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Player' } } },
            },
            404: {
                description: 'Jugador no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        put: {
            tags: ['Players'],
            summary: 'Actualizar un jugador',
            description: 'Actualiza los datos de un jugador existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del jugador',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Player' },
                },
            },
            },
            responses: {
            200: {
                description: 'Jugador actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Player' } } },
            },
            404: {
                description: 'Jugador no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Players'],
            summary: 'Eliminar un jugador',
            description: 'Elimina un jugador de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del jugador',
            },
            ],
            responses: {
            204: { description: 'Jugador eliminado exitosamente' },
            404: {
                description: 'Jugador no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/coaches': {
        post: {
            tags: ['Staff'],
            summary: 'Crear un entrenador',
            description: 'Añade un nuevo entrenador a un equipo.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Coach' },
                },
            },
            },
            responses: {
            201: {
                description: 'Entrenador creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Coach' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Staff'],
            summary: 'Obtener todos los entrenadores',
            description: 'Devuelve una lista de todos los entrenadores registrados.',
            responses: {
            200: {
                description: 'Lista de entrenadores',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Coach' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/coaches/{id}': {
        put: {
            tags: ['Staff'],
            summary: 'Actualizar un entrenador',
            description: 'Actualiza los datos de un entrenador existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del entrenador',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Coach' },
                },
            },
            },
            responses: {
            200: {
                description: 'Entrenador actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Coach' } } },
            },
            404: {
                description: 'Entrenador no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Staff'],
            summary: 'Eliminar un entrenador',
            description: 'Elimina un entrenador de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del entrenador',
            },
            ],
            responses: {
            204: { description: 'Entrenador eliminado exitosamente' },
            404: {
                description: 'Entrenador no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/referees': {
        post: {
            tags: ['Officials'],
            summary: 'Crear un árbitro',
            description: 'Añade un nuevo árbitro al sistema.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Referee' },
                },
            },
            },
            responses: {
            201: {
                description: 'Árbitro creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Referee' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Officials'],
            summary: 'Obtener todos los árbitros',
            description: 'Devuelve una lista de todos los árbitros registrados.',
            responses: {
            200: {
                description: 'Lista de árbitros',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Referee' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/referees/{id}': {
        put: {
            tags: ['Officials'],
            summary: 'Actualizar un árbitro',
            description: 'Actualiza los datos de un árbitro existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del árbitro',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Referee' },
                },
            },
            },
            responses: {
            200: {
                description: 'Árbitro actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Referee' } } },
            },
            404: {
                description: 'Árbitro no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Officials'],
            summary: 'Eliminar un árbitro',
            description: 'Elimina un árbitro de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del árbitro',
            },
            ],
            responses: {
            204: { description: 'Árbitro eliminado exitosamente' },
            404: {
                description: 'Árbitro no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/assistants': {
        post: {
            tags: ['Staff'],
            summary: 'Crear un auxiliar',
            description: 'Añade un nuevo auxiliar a un equipo.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Assistant' },
                },
            },
            },
            responses: {
            201: {
                description: 'Auxiliar creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Assistant' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Staff'],
            summary: 'Obtener todos los auxiliares',
            description: 'Devuelve una lista de todos los auxiliares registrados.',
            responses: {
            200: {
                description: 'Lista de auxiliares',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Assistant' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/assistants/{id}': {
        put: {
            tags: ['Staff'],
            summary: 'Actualizar un auxiliar',
            description: 'Actualiza los datos de un auxiliar existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del auxiliar',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Assistant' },
                },
            },
            },
            responses: {
            200: {
                description: 'Auxiliar actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Assistant' } } },
            },
            404: {
                description: 'Auxiliar no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Staff'],
            summary: 'Eliminar un auxiliar',
            description: 'Elimina un auxiliar de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del auxiliar',
            },
            ],
            responses: {
            204: { description: 'Auxiliar eliminado exitosamente' },
            404: {
                description: 'Auxiliar no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/executives': {
        post: {
            tags: ['Staff'],
            summary: 'Crear un directivo',
            description: 'Añade un nuevo directivo a un equipo.',
            security: [{ bearerAuth: [] }],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Executive' },
                },
            },
            },
            responses: {
            201: {
                description: 'Directivo creado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Executive' } } },
            },
            400: {
                description: 'Error de validación',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        get: {
            tags: ['Staff'],
            summary: 'Obtener todos los directivos',
            description: 'Devuelve una lista de todos los directivos registrados.',
            responses: {
            200: {
                description: 'Lista de directivos',
                content: {
                'application/json': {
                    schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Executive' },
                    },
                },
                },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
        '/executives/{id}': {
        put: {
            tags: ['Staff'],
            summary: 'Actualizar un directivo',
            description: 'Actualiza los datos de un directivo existente.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del directivo',
            },
            ],
            requestBody: {
            content: {
                'application/json': {
                schema: { $ref: '#/components/schemas/Executive' },
                },
            },
            },
            responses: {
            200: {
                description: 'Directivo actualizado exitosamente',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Executive' } } },
            },
            404: {
                description: 'Directivo no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        delete: {
            tags: ['Staff'],
            summary: 'Eliminar un directivo',
            description: 'Elimina un directivo de la base de datos.',
            security: [{ bearerAuth: [] }],
            parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string', format: 'uuid' },
                description: 'ID del directivo',
            },
            ],
            responses: {
            204: { description: 'Directivo eliminado exitosamente' },
            404: {
                description: 'Directivo no encontrado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            401: {
                description: 'No autorizado',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            500: {
                description: 'Error del servidor',
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            },
        },
        },
    },
    components: {
        securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        },
        schemas: {
        User: {
            type: 'object',
            properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' },
            role: {
                type: 'string',
                enum: ['admin', 'coach', 'player', 'referee', 'assistant', 'executive'],
                example: 'admin',
            },
            },
            required: ['email', 'password', 'role'],
        },
        Login: {
            type: 'object',
            properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' },
            },
            required: ['email', 'password'],
        },
        Country: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Argentina' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/flag.png' },
            },
            required: ['name'],
        },
        City: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Buenos Aires' },
            country: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            },
            required: ['name', 'country'],
        },
        Team: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'River Plate' },
            city: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/team.png' },
            },
            required: ['name', 'city', 'image'],
        },
        Player: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Lionel Messi' },
            team: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/player.png' },
            position: { type: 'string', example: 'Delantero' },
            },
            required: ['name', 'team', 'position'],
        },
        Coach: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Juan Pérez' },
            team: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/coach.png' },
            license: { type: 'string', example: 'Licencia UEFA Pro' },
            },
            required: ['name', 'team', 'license'],
        },
        Referee: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'María Gómez' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/referee.png' },
            certification: { type: 'string', example: 'Certificación FIFA' },
            },
            required: ['name', 'certification'],
        },
        Assistant: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Carlos López' },
            team: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/assistant.png' },
            role: { type: 'string', example: 'Preparador físico' },
            },
            required: ['name', 'team', 'role'],
        },
        Executive: {
            type: 'object',
            properties: {
            name: { type: 'string', example: 'Ana Martínez' },
            team: { type: 'string', format: 'uuid', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', format: 'uri', example: 'https://example.com/executive.png' },
            position: { type: 'string', example: 'Presidente' },
            },
            required: ['name', 'team', 'position'],
        },
        Error: {
            type: 'object',
            properties: {
            message: { type: 'string', example: 'Error en la solicitud' },
            code: { type: 'integer', example: 400 },
            },
            required: ['message', 'code'],
        },
        },
    },
    };

    module.exports = { swaggerUi, swaggerDocument };