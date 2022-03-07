const boardData = new XMLHttpRequest();
const moveData = new XMLHttpRequest();
let move = "";
let prevMove = "";

/*
Function to get piece locations from server.
It gets a JSON object from the server, and then updates the pieces on the board.
*/
boardData.onload = function() 
{
    let pieceCoords = JSON.parse(this.responseText);    // Getting the JSON data.
    let coords = Object.keys(pieceCoords);  // Dividing the data to 2 arrays of coordinations adn pieces.
    let pieces = Object.values(pieceCoords);
    let tempTile;
    let tempPiece;


    for(let i = 0; i < coords.length; i++)  // Looping through all the pieces.
    {
        tempTile = document.getElementById(coords[i]);  // Finding tile based on coordinations.
        tempTile.innerHTML = "";
        tempPiece = document.createElement("img");
        tempPiece.setAttribute("src", "Assets/" + pieces[i] + ".png");  // Getting the right texture and updating the tile.
        tempTile.appendChild(tempPiece);
    }
}

/*
A function to handle the response for the move from the server.
*/
moveData.onload = function()
{
    let statP = document.getElementsByTagName("p")[0];  // Get the status displaying paragraph.
    console.log(this.responseText);

    if(this.responseText == '-1')   // If the status is for an illegal move.
    {
        statP.innerHTML = "Illegal move!";
    }
    else if(this.responseText == '-2')  // If the status is for wrong turn.
    {
        statP.innerHTML = "Wrong Turn!";
    }
    else if(this.responseText != '-3')   // Clear the status paragraph if the move was successful.
    {
        statP.innerHTML = "";
        document.getElementById(prevMove.substring(0, 2)).innerHTML = "";
        renderPieces();
    }

}


/*
A function that renders the chess board's tiles.
*/
function renderBoard()
{
    let board = document.getElementsByTagName("table")[0];  // Getting the table element.
    let tile = document.createElement("td");
    let row = document.createElement("tr");


    board.innerHTML = "";   // Overwriting previous table.
    for(i = 0; i < 8; i++)  // Outer loop for creating rows.
    {
        for(j = 0; j < 8; j++)  // Inner loop for creating tiles.
        {
            tile = document.createElement("td") // Creating a new tile.
            tile.setAttribute("id", String(i) + String(j))  // Setting the tile's coordinates.
            tile.setAttribute("onclick", "movePiece(this)");

            if((i + j) % 2 == 0)    // Checking if the tile is black or white.
            {
                tile.setAttribute("class", "white-tile");
            }
            else
            {
                tile.setAttribute("class", "black-tile");
            }

            row.appendChild(tile);
        }
        board.appendChild(row);
        row = document.createElement("tr"); // Creating a new row.
    }
    renderPieces();
}
/*
A function that invokes piece rendering.
Sends POST request to server to get board data.
*/
function renderPieces() 
{
    boardData.open('POST', '/boardData');
    boardData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    boardData.send();
}

/*
A function to send move coordinates to server.
*/
function movePiece(tile)
{
    if(tile.firstChild && move.length < 2)  // Check if the the tile is the start position.
    {
        move += tile.id;
        tile.setAttribute("style", "background-color: rgb(228, 230, 132)");
    }
    else if(move.length == 2)   // Check if the tile is the destination position.
    {
        move += tile.id;
    }

    if(move.length == 4)    // Check if the move is complete and send it to the server.
    {
        moveData.open('POST', '/move');
        moveData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        moveData.send("move=" + move);

        document.getElementById(move.substring(0, 2)).removeAttribute("style"); // Remove highlight of move tile.

        prevMove = move;
        move = "";  // Reset move variable.
    }
}