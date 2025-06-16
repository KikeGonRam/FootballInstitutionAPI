const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-fs-backend');

i18next
    .use(FilesystemBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: './src/locales/{{lng}}.json',
        },
        fallbackLng: 'es',
        preload: ['es', 'en'],
    });

module.exports = i18nextMiddleware.handle(i18next);