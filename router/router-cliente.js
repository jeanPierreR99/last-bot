const express = require('express');
const router = express.Router();

const rutas = require('../controllers/index.controller-cliente');
 
router.get('/', rutas.mainCatalogo);
router.get('/menu-cuartos', rutas.mainHabitaciones);
router.get('/:id', rutas.secondCatalogo);

module.exports = router;