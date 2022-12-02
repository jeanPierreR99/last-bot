const { Pool } = require('pg');

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