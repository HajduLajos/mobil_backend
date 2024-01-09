const express = require('express')
var cors = require('cors')
var mysql=mysql = require('mysql')
const multer = require('multer');
const bodyParser = require('body-parser');


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))
app.use(bodyParser.json());


var connection;

function kapcsolat(){
    
     connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'zarodolgozat_adatb'
    })

    connection.connect()
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})



/*---------Összes pc alkatrész kiíratása-----------*/

app.get('/pcAlkatresz', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=1', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes pc jatek kiíratása-----------*/

app.get('/PcJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=1', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

// összes nintendo tartozek

app.get('/Nintendotart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=2', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes Ninetndo jatek kiíratása-----------*/

app.get('/NintendoJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=2', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

//összes playstation tartozék
app.get('/Playstationtart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=3', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes playstation jatek kiíratása-----------*/

app.get('/PlaystationJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=3', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

//összes Xbox tartozék
app.get('/XboxTart', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM alkatreszek WHERE alkatresz_eszkozid=4', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})
/*---------Összes xbox jatek kiíratása-----------*/

app.get('/XboxJatekok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM jatekok WHERE jatekok_eszkozid=4', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

/*---------Összes eszköz kiíratása-----------*/

app.get('/eszkozok', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM eszkozok', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })
 


    connection.end()
})

//----Comment lekerdez---------------

app.get('/Comment', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM comment', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })
 


    connection.end()
})




//----------Kép feltöltés-----------------------------

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './kepek');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

//-------adatbazisfeltoltes---------
app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
kapcsolat()
  
// connection.query(`INSERT INTO alkatreszek VALUES (NULL,'${req.body.bevitel1}', '${req.body.bevitel2}', ${req.body.bevitel3}, ${req.body.bevitel4}, '${req.file[0].filename}', ${req.body.bevitel6}, ${req.body.bevitel7} )`, (err, rows, fields) => {
connection.query(`INSERT INTO alkatreszek VALUES (NULL, '${req.body.bevitel1}', '2023-12-21', 10, 450000000, '${req.files[0].filename}', 2, 2);`, (err, rows, fields) => {
if (err){
  console.log("Hiba")
  res.send("Hiba")
}
else{
  console.log("Sikeres felvitel")
  res.send("Sikeres felvitel")
}

})
connection.end() 
//-----vege---------------
});

app.get('/KomponensSeged', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM komponens', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

//-----------------------alkatresz seged
app.get('/EszkozokSeged', (req, res) => {
    
  kapcsolat()

    connection.query('SELECT * FROM eszkozok', (err, rows, fields) => {
    if (err) throw err

        console.log(rows)
        res.send(rows)
    })



    connection.end()
})

//---------kereses----------------
app.post('/keresszoveg', (req, res) => {
  kapcsolat()
  
  connection.query(`SELECT * FROM jatekok WHERE jatekok.jatekok_nev LIKE "%${req.body.bevitel1}%"`, (err, rows, fields) => {
  if (err) throw err
  
  console.log(rows)
  res.send(rows)
  })
  connection.end() 
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})