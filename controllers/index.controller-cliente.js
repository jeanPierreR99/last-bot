const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "containers-us-west-98.railway.app",
    database: "railway",
    password: "s3bfIypNitkXaIHxtj7j",
    port: 6912,
    ssl: {
        rejectUnauthorized: false,
    }
});

const mainCatalogo = (req, res) => {
    pool.query('select *from table_catalogo', (err, customers2) => {
        if (err) {
            res.json(err);
        } else {
            res.render('catalogo.ejs', { varResult2: customers2 });
            console.log("catalogo")
        }
    });
};
const mainHabitaciones = (req, res) => {
    res.render('index.ejs');
  console.log("abriendo habitaciones");
};

const secondCatalogo = (req, res) => {
   const id = req.params.id;
   pool.query('SELECT *FROM table_catalogo WHERE cat_id = $1',[id],(err, customers) => {
    if (err) {
        res.json(err);
    } else {
        pool.query('select *from table_catalogo', (err, customers2) => {
            if (err) {
                res.json(err);
            } else {
                res.render('catalogo-ver.ejs', { varResult: customers, varResult2: customers2 });
            }
        });

    }
});

}


module.exports = {
    mainCatalogo,
    secondCatalogo,
    mainHabitaciones
}