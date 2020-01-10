const express = require('express');
const server = express();
const fs = require('fs');
const port = 1337;

//värdena ska följa pid-standarden, inte 0
var x =     0;
var y =     0;
var z =     0;
var speed = 0;
var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);



server.get("/", (req, res) => 
{
    res.sendFile(__dirname + '/index.html');
});




//-----------------------------------------------------------------------

server.get("/x.upp", (req, res) => 
{
    x = x + 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});

server.get("/x.ner", (req, res) => 
{
    x = x - 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});
//-----------------------------------------------------------------------
server.get("/y.upp", (req, res) => 
{
    y = y + 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});

server.get("/y.ner", (req, res) => 
{
    y = y - 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});
//-----------------------------------------------------------------------
server.get("/z.upp", (req, res) => 
{
    z = z + 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});

server.get("/z.ner", (req, res) => 
{
    z = z - 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});
//-----------------------------------------------------------------------
server.get("/speed.upp", (req, res) => 
{
    speed = speed + 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});

server.get("/speed.ner", (req, res) => 
{
    speed = speed - 1;
    var pidtot = (x+"\n"+y+"\n"+z+"\n"+speed);

    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
});
//-----------------------------------------------------------------------
















server.listen(port, () => 
{
    console.log(`Server listening at ${port}`);
});