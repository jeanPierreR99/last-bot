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


const main = (req, res) => {

    res.render('login.ejs');
}
const validar = (req, res) => {

    const { user, pass } = req.body;

    pool.query('select *from table_admi where admi_user = $1 and admi_pass = $2', [user, pass], (err, customers) => {
        if (customers.rowCount >= 1) {
            req.session.nombre = user;
            req.session.pass = pass;
            console.log(customers)
            console.log(req.session)
            res.redirect('/admi');
        }
        else {
            console.log('no existe 4444')

            res.redirect('/login')
        }
    })
}
const validar2 = (req, res) => {
    res.render('error');
}

module.exports = {
    main,
    validar,
    validar2
}