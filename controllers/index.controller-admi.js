const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fetch = require('node-fetch');

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

const plantilla = (req, res) => {

    if (req.session.nombre) {
        pool.query('select *from table_bot', (err, customers_bot) => {
            if (err) {
                res.json(err);
            } else {
                res.render('menu-bot.ejs', { varResult: customers_bot });
            }
        });
    } else {

        res.redirect('/login/validarA');
    }

};

//direcciones//
const menuBot = (req, res) => {
    if (req.session.nombre) {
        pool.query('select *from table_bot', (err, customers_bot) => {
            if (err) {
                res.json(err);
            } else {
                res.render('menu-bot.ejs', { varResult: customers_bot });
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
};
const menuLocales = (req, res) => {
    if (req.session.nombre) {
        pool.query('select *from table_catalogo', (err, customers_locales) => {
            if (err) {
                res.json(err);
            } else {
                res.render('menu-locales.ejs', { varResult: customers_locales });
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
};

const menuHabitaciones = (req, res) => {
    if (req.session.nombre) {
        pool.query('select *from table_catalogo', (err, customers_locales) => {
            if (err) {
                res.json(err);
            } else {
                res.render('menu-habitaciones.ejs', { varResult: customers_locales });
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
};
const menuRecientes = (req, res) => {
    if (req.session.nombre) {
        pool.query('select r.reserva_id, r.nombres, r.apellidos, r.telefono, ca.cat_loc_id, ca.cat_hab_id, ca.cat_loc_precio, ca.cat_hab_precio, ca.cat_loc_dir, ca.cat_hab_dir, ca.cat_loc_estado, ca.cat_hab_estado, r.fecha, ca.cat_loc_prin, ca.cat_hab_prin from table_catalogo as ca join table_reserva as r on r.id_catalogo=ca.cat_id', (err, customers_bot) => {
            if (err) {
                res.json(err);
                console.log('error recientes')
            } else {
                res.render('menu-recientes.ejs', { varResult: customers_bot });
                console.log('consulta ehcha')
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
};
const menuMovimientos = (req, res) => {
    if (req.session.nombre) {
        pool.query('select *from table_callendar', (err, customers_move) => {
            if (err) {
                res.json(err);
            } else {
                res.render('menu-movimientos.ejs', { varResult: customers_move });
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
};
const menuGestiones = (req, res) => {
    if (req.session.nombre) {
        pool.query('select cli.cliente_id, cli.id_catalogo, cli.cliente_nombres, cli.cliente_apellidos, cli.cliente_telefono, ca.cat_loc_id, ca.cat_hab_id, ca.cat_loc_precio, ca.cat_hab_precio, ca.cat_loc_dir, ca.cat_hab_dir, ca.cat_loc_estado, ca.cat_hab_estado, ca.cat_loc_prin, ca.cat_hab_prin, cli.cliente_fecha from table_catalogo as ca join table_cliente as cli on cli.id_catalogo=ca.cat_id', (err, customers_gestiones) => {
            if (err) {
                res.json(err);
                console.log('error gestiones')
            } else {
                res.render('menu-gestiones.ejs', { varResult: customers_gestiones });
                console.log('consulta ehcha')
            }
        });
    } else {

        res.redirect('/login/validarA');
    }
}
//funcion-formularios
const salirAdmi = (req, res) => {
    req.session.nombre = null;
    req.session.pass = null;
    res.redirect('/login');
    console.log(req.session)
}
const pasarReserva = (req, res) => {
    const id = req.params.id;
    pool.query('INSERT INTO table_cliente (id_catalogo,cliente_nombres,cliente_apellidos,cliente_telefono) SELECT id_catalogo, nombres, apellidos, telefono FROM table_reserva where reserva_id = $1', [id], (err, customers) => {
        if (err) {
            res.json(err);
        } else {
            console.log("recientes pasado: " + id);
            pool.query('delete from table_reserva where reserva_id = $1', [id], (err, customers_delete) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log('borrado de reserva agregado a gestiones');
                    res.redirect('/admi/menu-recientes');
                }
            })

        }
    });
}

const saveBot = (req, res) => {
    console.log("listo bot");

    const { input, output } = req.body;
    const response = pool.query('insert into table_bot (input_bot, output_bot) values ($1, $2)', [input, output], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("agregado");
            res.redirect('/admi/menu-bot');
        }
    });
};
const deleteBot = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM table_bot WHERE id_bot = $1', [id], (err, customers) => {
        if (err) {
            res.json(err);
        } else {
            console.log("borrado: " + id);
            res.redirect('/admi/menu-bot');
        }
    });
}
const deleteCatalogoLocal = (req, res) => {
    const id = req.params.id;
    pool.query('delete from table_catalogo where cat_id = $1', [id], (err, customers) => {
        if (err) {
            res.json(err);
        } else {
            console.log("borrado: " + id);
            res.redirect('/admi/menu-locales');
        }
    });
}
const deleteCatalogoHab = (req, res) => {
    const id = req.params.id;
    pool.query('delete from table_catalogo where cat_id = $1', [id], (err, customers) => {
        if (err) {
            res.json(err);
        } else {
            console.log("borrado: " + id);
            res.redirect('/admi/menu-habitaciones');
        }
    });
}
const deleteReserva = (req, res) => {
    const id = req.params.id;

        pool.query('select *from table_reserva where reserva_id = $1', [id], (err, customers_select) => {
              
        var id_cat = customers_select.rows[0].id_catalogo;
        var estado1 = 'disponible';
        var estado2 = 'disponible';
        console.log('ide del catalog extraido:'+id_cat);
        pool.query('UPDATE table_catalogo SET cat_hab_estado = $1, cat_loc_estado = $2 WHERE cat_id = $3;', [estado1, estado2, id_cat], (err, customers_update) => {   
         if (err) {
                res.json(err);
            } else {
                console.log("estado actualizado");
                pool.query('delete from table_reserva where reserva_id = $1', [id], (err, customers_delete) => {
                    if (err) {
                        res.json(err);
                    } else {
                        console.log("borrado: " + id);
                        res.redirect('/admi/menu-recientes');
                    }
                });
            }
        })
});
}
const deleteCliente = (req, res) => {
    const id = req.params.id;
    pool.query('select *from table_cliente where cliente_id = $1', [id], (err, customers_select) => {

              
               var id_cat = customers_select.rows[0].id_catalogo;
               var estado1 = 'disponible';
               var estado2 = 'disponible';
               console.log('ide del catalog extraido:'+id_cat);
               pool.query('UPDATE table_catalogo SET cat_hab_estado = $1, cat_loc_estado = $2 WHERE cat_id = $3;', [estado1, estado2, id_cat], (err, customers_update) => {   
                if (err) {
                       res.json(err);
                   } else {
                       console.log("estado actualizado");
                       pool.query('delete from table_cliente where cliente_id = $1', [id], (err, customers_delete) => {
                           if (err) {
                               res.json(err);
                           } else {
                               console.log("borrado: " + id);
                               res.redirect('/admi/menu-gestiones');
                           }
                       });
                   }
               })
    });
}
const saveCatalogo = (req, res) => {
    console.log("listo catalogo loc");

    const { id, estado, precio, titulo, desc, lat, long, direccion, area } = req.body;
    const image1 = req.files[0].originalname;
    const image2 = req.files[1].originalname;
    const image3 = req.files[2].originalname;
    const response1 = pool.query("select *from table_Catalogo where cat_loc_id=$1", [id], (error, customers1) => {
        if (customers1.rowCount >= 1) {
            res.redirect('/admi/menu-locales');
            console.log('el id ya existe');
        }
        else {
            const response = pool.query('insert into table_catalogo (cat_loc_id, cat_loc_estado, cat_loc_precio, cat_loc_titulo, cat_loc_desc, cat_loc_lat, cat_loc_long, cat_loc_dir, cat_loc_tamaño, cat_loc_prin, cat_loc_sec, cat_loc_ter) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id, estado, precio, titulo, desc, lat, long, direccion, area, image1, image2, image3], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("catalogo agregado");
                    console.log(id + estado + precio + titulo + desc + lat + long + direccion + area);
                    res.redirect('/admi/menu-locales');
                }
            });
        }
    })
}
const saveCatalogoHab = (req, res) => {
    console.log("listo catalogo hab");

    const { id, estado, precio, titulo, desc, lat, long, direccion } = req.body;
    const image1 = req.files[0].originalname;
    const image2 = req.files[1].originalname;
    const image3 = req.files[2].originalname;
    const response1 = pool.query("select *from table_Catalogo where cat_hab_id=$1", [id], (error, customers1) => {
        if (customers1.rowCount >= 1) {
            res.redirect('/admi/menu-habitaciones');
            console.log('el id ya existe');
        }
        else {
            const response = pool.query('insert into table_catalogo (cat_hab_id, cat_hab_estado, cat_hab_precio, cat_hab_titulo, cat_hab_desc, cat_hab_lat, cat_hab_long, cat_hab_dir, cat_hab_prin, cat_hab_sec, cat_hab_ter) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [id, estado, precio, titulo, desc, lat, long, direccion, image1, image2, image3], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("catalogo agregado");
                    console.log(id + estado + precio + titulo + desc + lat + long + direccion);
                    res.redirect('/admi/menu-habitaciones');
                }
            });
        }
    })
}
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, files, cb) => {
        cb(null, files.originalname);
    }
});

const unpload = multer({
    storage: storage,
    dest: path.join(__dirname, '../public/uploads'),
    /*fileFilter: (req, file, cb)=>{
        const filetypes = /jpeg|jpg|webp|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = mimetype.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null,true);
        }
        cb.apply("error al cargar archivo: archivo no admitido");
    }*/
}).array('img_1', 3);

module.exports = {
    plantilla,
    menuBot,
    deleteBot,
    menuHabitaciones,
    menuRecientes,
    menuMovimientos,
    menuGestiones,
    saveBot,
    deleteCatalogoLocal,
    deleteCatalogoHab,
    salirAdmi,
    deleteCliente,
    deleteReserva,
    saveCatalogo,
    saveCatalogoHab,
    pasarReserva,
    unpload,
    menuLocales
}