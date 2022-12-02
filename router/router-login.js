const express = require('express');
const router = express.Router();

const rutas = require('../controllers/index.controller-login');

router.get('/', rutas.main);
router.post('/validar', rutas.validar);
router.get('/validarA', rutas.validar2);
module.exports = router;