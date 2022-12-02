const express = require('express');
const router = express.Router();

const expressLayouts = require('express-ejs-layouts');

router.use(expressLayouts);

const rutas = require('../controllers/index.controller-admi');

//rutas-funciones
router.post('/menBot/saveBot', rutas.saveBot);
router.get('/menBot/:id', rutas.deleteBot);
router.get('/menCatalogoLoc/:id', rutas.deleteCatalogoLocal)
router.get('/menCatalogoHab/:id', rutas.deleteCatalogoHab)
router.post('/menCatalogo/saveCatalogo',rutas.unpload, rutas.saveCatalogo);
router.post('/menCatalogo/saveCatalogoHab',rutas.unpload, rutas.saveCatalogoHab);
router.get('/menRecientes/:id', rutas.pasarReserva);
router.get('/menRecientesDelete/:id', rutas.deleteReserva);
router.get('/menGestionesDelete/:id', rutas.deleteCliente);
router.get('/menSalir', rutas.salirAdmi);
//main
router.get('/', rutas.plantilla);

//rutas-ejs-layout
router.get('/menu-bot', rutas.menuBot);
router.get('/menu-locales', rutas.menuLocales);
router.get('/menu-habitaciones', rutas.menuHabitaciones);
router.get('/menu-recientes', rutas.menuRecientes);
router.get('/menu-gestiones', rutas.menuGestiones);
router.get('/menu-movimientos', rutas.menuMovimientos);


module.exports = router;