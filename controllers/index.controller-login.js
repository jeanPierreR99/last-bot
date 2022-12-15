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