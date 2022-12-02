const express = require('express');
const router = express.Router();


const rutas = require('../controllers/index.controller-webhook');

router.post('/webhook', rutas.postWebHook); 
router.get('/webhook', rutas.getWebHook);

module.exports = router;