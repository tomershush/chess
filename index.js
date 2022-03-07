const express = require('express');
const engine = require('./engine.js');
const app = express();
const rout = express.Router();
const port = 3000;

const START_PIECE_DATA = {
  "10":"bp",  // Black Pawns.
  "11":"bp",
  "12":"bp",
  "13":"bp",
  "14":"bp",
  "15":"bp",
  "16":"bp",
  "17":"bp",

  "60":"wp",  // White Pawns.
  "61":"wp",
  "62":"wp",
  "63":"wp",
  "64":"wp",
  "65":"wp",
  "66":"wp",
  "67":"wp",
  
  "00":"br",  // Black Rooks.
  "07":"br",
  
  
  "70":"wr",  // White Rooks.
  "77":"wr",
  
  "01":"bn",  // Black Knights.
  "06":"bn",
  
  "71":"wn",  // White Knights.
  "76":"wn",
  
  "02":"bb",  // Black Bishops.
  "05":"bb",
  
  "72":"wb",  // White Bishops.
  "75":"wb",
  
  "03":"bq",  // Black Queen.

  "73":"wq",  // White Queen.
  /*
  "04":"bk",  // Black King.

  "74":"wk"   // White King.
  */
}

let boardData = START_PIECE_DATA;
let board = new engine.Piece(boardData);


app.use(express.static('HTML')) // Using the static HTML and CSS files.
app.use('/Assets', express.static('HTML/Assets/128h/'));

app.use(express.urlencoded({    // In order to handle POST requests.
    extended: true
  }))

rout.get('/', (req, res) => {    // Main page.
  res.sendFile(__dirname + "/HTML/index.html");
});

rout.get('/form', (req, res) => {
    res.sendFile(__dirname + "/HTML/form.html");
  });

  rout.get('/board', (req, res) => {
    res.sendFile(__dirname + "/HTML/board.html");
  });  

  rout.post('/submit', (req, res) => {
    let name = req.body.name;  
    res.send("Hello, " + name);
    res.end()
  });

  rout.post('/boardData', (req, res) => {
    let boardData = JSON.stringify(board.board);  
    res.send(board.board);
    res.end()
  });

  rout.post('/move', (req, res) => {
    let stat;
    console.log(req.body.move);
    
    stat = board.checkMove(req.body.move)

    if(stat == -1)
    {
      console.log("Illegal move!");
      res.send("-1");
    }
    else if(stat == -2)
    {
      console.log("Wrong Turn!");
      res.send("-2");
    }
    else if(stat == -3)
    {
      console.log("Cancelled Move!");
      res.send("-3");
    }
    else
    {
      res.send("0");
    }
    
    res.end()
  });

app.use('/', rout);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});