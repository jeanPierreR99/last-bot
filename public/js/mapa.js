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
function verMapa() {
   
    pool.query('select *from register_user', (err, customers) => {
        if (err) {
            res.json(err);
        } else {
           console.log(customers);
        }
    });
    
    const map = L.map('map').setView([-12.5889633,-69.2076587],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
var marker = L.marker([-12.5889633,-69.2076587]).addTo(map);
}
module.exports={
    verMapa
}

