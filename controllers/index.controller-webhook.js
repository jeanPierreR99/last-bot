const request = require('request');
const { Pool } = require('pg');
const fetch = require('node-fetch');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const pool = new Pool({
    user: "tvjohsqnthxeko",
    host: "ec2-3-217-251-77.compute-1.amazonaws.com",
    database: "d16nt5ibvkp7b8",
    password: "3573d1dbb8b0bd0d951e3e74b26e104bdadc1a9f58701de359e0f261a821f624",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

const postWebHook = (req, res) => {
    console.log('POST: webhook');
    console.log('post webhook activado');
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            //mensajes recibidos
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            const sender_psid = webhookEvent.sender.id;
            console.log(`Sender PSID: ${sender_psid}`);

            //valdiar el mensaje
            if (webhookEvent.message) {
                handleMessage(sender_psid, webhookEvent.message);
            } else if (webhookEvent.postback) {
                handlePostback(sender_psid, webhookEvent.postback);
            }
        });

        res.status(200).send('Evento recibido exitosamente');

    } else {
        res.sendStatus(404);
    }
};

const getWebHook = (req, res) => {
    console.log('GET: webhook');
    console.log('get webhook activado');
    const VERIFY_TOKEN = 'tokenunicodeverificacionchatbot';

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('webhook verificado');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }

};

function handleMessage(sender_psid, received_message) {

    let response;
    let palabra = received_message.text;
    let palabraSplit = palabra.split(' ');

    pool.query('select *from table_bot where input_bot = $1', [palabra], (err, customers) => {

        let varResult;
        let aux;
        varResult = customers;

        if (varResult.rowCount >= 1) {

            aux = varResult.rows[0].output_bot;
            response = {
                'text': `${aux}`
            }
            callSendAPI(sender_psid, response);
        }
        else if (palabraSplit.length >= 2 && isNaN(palabraSplit[0])) {

            let palabra1 = palabraSplit[0];
            let palabra2 = palabraSplit[1];
            let palabra3 = palabraSplit[2];

            pool.query('select *from table_bot where input_bot = $1 or input_bot = $2 or input_bot = $3', [palabra1, palabra2, palabra3], (err, customers) => {

                let varResult3;
                let aux3;
                varResult3 = customers;

                if (varResult3.rowCount >= 1) {

                    aux3 = varResult3.rows[0].output_bot;
                    response = {
                        'text': `${aux3}`
                    }
                    callSendAPI(sender_psid, response);
                }
                else {
                    response = {
                        'text': `Desconozco esa frase1`
                    }
                    callSendAPI(sender_psid, response);
                }
            })
        }
        else if (palabra.length == 8 && isFinite(palabra)) {
        
            fetch("https://dniruc.apisperu.com/api/v1/dni/" + palabra + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1aXNwZmNhbmFsZXNAZ21haWwuY29tIn0.Vg8H-t3AU2FNwYPp8tBCVdjpuyl_7Q6CcLeL2Z3aR5k")
                .then((res) => res.json())
                .then(data => {
                    if (data.message === 'No se encontraron resultadoss.') {
                        response = {
                            'text': `El dni no existe`
                        }
                        callSendAPI(sender_psid, response);
                    }
                    else {

                        var nombres = data.nombres;
                        var apellidos = data.apellidoPaterno + " " + data.apellidoMaterno;
                        response = {
                            'text': `Hola Sr(a). ${nombres}, ${apellidos} gracias por elegirnos ahora mandenos el 'ID' de la propiedad que esta interesada.
ejemplo(cat-9999) tenga cuidado con las minusculas y mayusculas.`
                        }
                        callSendAPI(sender_psid, response);

                    }
                })
        }
        else {
            pool.query('select *from table_catalogo where cat_loc_id = $1 or cat_hab_id = $1', [palabra], (err, customers) => {
                
                let varResult2;
                let id, precio, direccion;
                varResult2 = customers;

                if (varResult2.rowCount >= 1 && varResult2.rows[0].cat_loc_estado == 'disponible') {

                    id = varResult2.rows[0].cat_loc_id;
                    precio = varResult2.rows[0].cat_loc_precio;
                    direccion = varResult2.rows[0].cat_loc_dir;
                    response = {
                        'text': `la propiedad que usted a elegido es ${id} que tiene un precio de ${precio} y está ubicado en ${direccion}.
Como ultimo paso mandenos un numero de contacto para confirmar su solicitud con su DNI y el ID de la propiedad que esta interesado ejemplo(944271227 74415423 cat-9999)`
                    }
                    callSendAPI(sender_psid, response);
                }
                else if (varResult2.rowCount >= 1 && varResult2.rows[0].cat_hab_estado == 'disponible') {

                    id = varResult2.rows[0].cat_hab_id;
                    precio = varResult2.rows[0].cat_hab_precio;
                    direccion = varResult2.rows[0].cat_hab_dir;
                    response = {
                        'text': `la propiedad que usted a elegido es ${id} que tiene un precio de ${precio} y está ubicado en ${direccion}.
Como ultimo paso mandenos un numero de contacto para confirmar su solicitud con su DNI y el ID de la propiedad que esta interesado ejemplo(944271227 74415423 cat-9999)`
                    }
                    callSendAPI(sender_psid, response);
                }
                else if (varResult2.rowCount >= 1 && varResult2.rows[0].cat_loc_estado != 'disponible' || varResult2.rowCount >= 1 && varResult2.rows[0].cat_hab_estado != 'disponible') {
                   
                    response = {
                        'text': `la propiedad ${palabra} no esta disponible en estos momentos`
                    }
                    callSendAPI(sender_psid, response);
                }
                else if (palabraSplit.length == 3 && isFinite(palabraSplit[0]) && isFinite(palabraSplit[1]) && palabraSplit[1].length == 8 && isNaN(palabraSplit[2])) {
                    fetch("https://dniruc.apisperu.com/api/v1/dni/" + palabraSplit[1] + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1aXNwZmNhbmFsZXNAZ21haWwuY29tIn0.Vg8H-t3AU2FNwYPp8tBCVdjpuyl_7Q6CcLeL2Z3aR5k")
                    .then((res) => res.json())
                    .then(data => {
                        if (data.message === 'No se encontraron resultadoss.') {
                            response = {
                                'text': `El dni no existe, intentelo nuevamente`
                            }
                            callSendAPI(sender_psid, response);
                        }
                        else {
                            pool.query('select *from table_catalogo where cat_hab_id = $1 or cat_loc_id = $1', [palabraSplit[2]], (err, customers) => {
                               
                                let varResult4;
                                varResult4=customers;

                                if (varResult4.rowCount >= 1){
                                    var nombres = data.nombres;
                                    var apellidos = data.apellidoPaterno + " " + data.apellidoMaterno;
                                    var ac1= varResult4.rows[0].cat_loc_id || varResult4.rows[0].cat_hab_id;
                                    var id_cat = varResult4.rows[0].cat_id;
                                    console.log('nombres: '+nombres+' apellidos: '+apellidos+' ID: '+ac1);
                                    //insetamos a la base de datos
                                    //---------------------------------//
                                    pool.query('INSERT INTO table_reserva (id_catalogo, nombres, apellidos, telefono) VALUES ($1, $2, $3, $4)', [id_cat, nombres, apellidos, palabraSplit[0]], (error, results) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log("agregado a la reserva");
                                            response = {
                                                'text': `Felicitaciones, sr(a). ${nombres}, ${apellidos} la propiedad ${ac1}
ya se regsitro exitosamente en la base de datos con su nombre, nos pondremos en contacto con usted lo antes posible para confirmar`
                                            }

                                            callSendAPI(sender_psid, response);
                                            let estado1 = 'reservado';
                                            let estado2 = 'reservado';
                                            pool.query('UPDATE table_catalogo SET cat_hab_estado = $1, cat_loc_estado = $2 WHERE cat_id = $3',[estado1, estado2, id_cat], (error,results) => {
                                                if(error){
                                                    console.log(error);
                                                }
                                                else{
                                                    console.log('estado actualziado');
                                                }
                                            })
                                        }
                                    });
                                }
                                else{
                                    response = {
                                        'text': `el ID de la propiedad no existe, intentelo nuevamente`
                                    }
                                    callSendAPI(sender_psid, response);
                                }
                        })
                    }
                    })
                }
                else{
                    response = {
                        'text': `desconzoco esa frase 2`
                    }
                    callSendAPI(sender_psid, response);
                }
            });
        }
    });
}

function handlePostback(sender_psid, received_postback) {
}

function callSendAPI(sender_psid, response) {

    const requestBody = {
        'recipient': {
            'id': sender_psid
        },
        'message': response
    };

    request({
        'uri': 'https://graph.facebook.com/v2.6/me/messages',
        'qs': { 'access_token': PAGE_ACCESS_TOKEN },
        'method': 'POST',
        'json': requestBody
    }, (err, res, body) => {
        if (!err) {
            console.log('mensaje enviado de vuelta');
        } else {
            console.log('mensaje fallido :(');
        }
    });
}
module.exports = {
    postWebHook,
    getWebHook
}