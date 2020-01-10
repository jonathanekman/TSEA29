const express = require('express');
const server = express();
const fs = require('fs');
const port = 1337;


var xp = 0;
var xi = 0;
var xd = 0;     
var yp = 0;     
var yi = 0;     
var yd = 0; 
var zp = 0;
var zi = 0;
var zd = 0;
var speed = 0;


fs.readFile('gustavsdata.txt', "utf8", function read(error, data)
{
    if (error) {
        throw error;
    }
        xp = parseInt(data.split(/\r?\n/)[0]);
        xi = parseInt(data.split(/\r?\n/)[1]);
        xd = parseInt(data.split(/\r?\n/)[2]);     
        yp = parseInt(data.split(/\r?\n/)[3]);     
        yi = parseInt(data.split(/\r?\n/)[4]);     
        yd = parseInt(data.split(/\r?\n/)[5]); 
        zp = parseInt(data.split(/\r?\n/)[6]);
        zi = parseInt(data.split(/\r?\n/)[7]);
        zd = parseInt(data.split(/\r?\n/)[8]);
        speed = parseInt(data.split(/\r?\n/)[9]);
});





// //____________________XYZ-PID Variabler____________________
// var xpu    //xpu = x-axeln proportionell upp
// var xpn    //xpn = x-axeln proportionell ner
// var xiu    //xiu = x-axeln integrerande upp
// var xin
// var xdu
// var xdn    //xdn = x-axeln deriverande ner
// var ypu
// var ypn
// var yiu
// var yin
// var ydu
// var ydn
// var zpu
// var zpn
// var ziu
// var zin
// var zdu
// var zdn
// //________________________________________________________




server.get("/", (req, res) => 
{
    res.sendFile(__dirname + '/index.html');
});


//________________SERVER-REQUESTS__________

//__________________X-request______________
server.get("/xpu", (req, res) => 
{
    count("xpu");
});
server.get("/xpn", (req, res) => 
{
    count("xpn");
});

server.get("/xiu", (req, res) => 
{
    count("xiu");
});
server.get("/xin", (req, res) => 
{
    count("xin");
});

server.get("/xdu", (req, res) => 
{
    count("xdu");
});
server.get("/xdn", (req, res) => 
{
    count("xdn");
});


//__________________Y-request______________

server.get("/ypu", (req, res) => 
{
    count("ypu");
});
server.get("/ypn", (req, res) => 
{
    count("ypn");
});

server.get("/yiu", (req, res) => 
{
    count("yiu");
});
server.get("/yin", (req, res) => 
{
    count("yin");
});

server.get("/ydu", (req, res) => 
{
    count("ydu");
});
server.get("/ydn", (req, res) => 
{
    count("ydn");
});


//__________________Z-request______________

server.get("/zpu", (req, res) => 
{
    count("zpu");
});
server.get("/zpn", (req, res) => 
{
    count("zpn");
});

server.get("/ziu", (req, res) => 
{
    count("ziu");
});
server.get("/zin", (req, res) => 
{
    count("zin");
});

server.get("/zdu", (req, res) => 
{
    count("zdu");
});
server.get("/zdn", (req, res) => 
{
    count("zdn");
});



//__________________SPEED-request__________


server.get("/speed.upp", (req, res) => 
{
    count("speed.upp");
});
server.get("/speed.ner", (req, res) => 
{
    count("speed.ner");
});

//_________________________________________






function count(status)
{
    //------------------------X_PID_MATH
        if (status === "xpu"){
            xp = xp + 1;
        };
        if (status === "xpn"){
            xp = xp - 1;
        };
        if (status === "xiu"){
            xi = xi + 1;
        };
        if (status === "xin"){
            xi = xi - 1;
        };
        if (status === "xdu"){
            xd = xd + 1;
        };
        if (status === "xdn"){
            xd = xd - 1;
        };
    //------------------------Y_PID_MATH
        if (status === "ypu"){
            yp = yp + 1;
        };
        if (status === "ypn"){
            yp  = yp - 1;
        };
        if (status === "yiu"){
            yi = yi + 1;
        };
        if (status === "yin"){
            yi = yi - 1;
        };
        if (status === "ydu"){
            yd = yd + 1;
        };
        if (status === "ydn"){
            yd = yd - 1;
        };
    //------------------------Z_PID_MATH
        if (status === "zpu"){
        zp = zp + 1;
        };
        if (status === "zpn"){
        zp = zp - 1;
        };
        if (status === "ziu"){
        zi = zi + 1;
        };
        if (status === "zin"){
        zi = zi - 1;
        };
        if (status === "zdu"){
        zd = zd + 1;
        };
        if (status === "zdn"){
        zd = zd - 1;
        };
    //------------------------SPEED_MATH
        if (status === "speed.upp"){
            speed = speed + 1;
        };
        if (status === "speed.ner"){
            speed = speed - 1;
        };
    //------------------------

 
    var pidtot = (
        xp+"\n"+
        xi+"\n"+
        xd+"\n"+
        yp+"\n"+
        yi+"\n"+
        yd+"\n"+
        zp+"\n"+
        zi+"\n"+
        zd+"\n"+
        speed);


    fs.writeFile('gustavsdata.txt', pidtot, (error, file) => 
    {
        if (error) throw error;
        console.log('Wrote to: gustavsdata.txt');
    });
};



server.listen(port, () => 
{
    console.log(`Server listening at ${port}`);
});


//document.getElementById("number1").innerHTML = xp;
