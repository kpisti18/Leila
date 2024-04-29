const mysql = require('mysql');

// adatbázishoz kapcsolódás \\
const connection = mysql.createConnection({
    host: '192.168.255.103:3306',
    user: 'u104_L1NJf5AVTP',
    password: 'CdjZ6@dcJRSsZkjpl6.W13Cb',
    database: 's104_db'
});

connection.connect((err) => {
    if(err){
        console.log(`Hiba az adatbázis kapcsolodásakor: ${err}`);
        return;
    }
    console.log("Sikeres kapcsolódás az adatbázishoz!");
});

module.exports = connection;  // exportáljuk a kapcsolt objektum