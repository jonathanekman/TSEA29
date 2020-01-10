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
var xpos = 0;
var ypos = 0;
var zpos = 0;
var xtagpos = 0;
var ytagpos = 0;
var start = false;

var pidtot = (         
    yp+"\n"+
    yi+"\n"+
    yd+"\n"+
    xp+"\n"+
    xi+"\n"+
    xd+"\n"+
    zp+"\n"+
    zi+"\n"+
    zd+"\n"+
    0+"\n"+
    0+"\n"+
    0+"\n"+
    0+"\n"+
    speed +"\n"+
    start);

var pidtotSendToWeb = [xp,xi,xd,yp,yi,yd,zp,zi,zd,speed,xpos,ypos,zpos,xtagpos,ytagpos,start];


setInterval(() =>		
{
readingfile();
}, 1000);

function readingfile(){
    fs.readFile('data.txt', "utf8", function read(error, data)   //läser gustavsfil
    {
        if (error) {
            throw error;
        }
            yp = parseInt(data.split(/\r?\n/)[0]);
            yi = parseInt(data.split(/\r?\n/)[1]);
            yd = parseInt(data.split(/\r?\n/)[2]);     
            xp = parseInt(data.split(/\r?\n/)[3]);     
            xi = parseInt(data.split(/\r?\n/)[4]);     
            xd = parseInt(data.split(/\r?\n/)[5]); 
            zp = parseInt(data.split(/\r?\n/)[6]);
            zi = parseInt(data.split(/\r?\n/)[7]);
            zd = parseInt(data.split(/\r?\n/)[8]);
            speed = parseInt(data.split(/\r?\n/)[13]);    
            // start = parseInt(data.split(/\r?\n/)[14]);    

    });
};




setInterval(() =>		
{
readingfile2();
newprint();
}, 50);

function readingfile2(){
    fs.readFile('/home/jonathan/RAM/xyz.txt', "utf8", function read(error, data)   //läser drönarpositioner från: xyz.txt
    {
        if (error) {
            throw error;
        }
            xpos = parseInt(data.split(/\r?\n/)[0]);       //skall hämtas från RAM
            ypos = parseInt(data.split(/\r?\n/)[1]);       //skall hämtas från RAM  
            zpos = parseInt(data.split(/\r?\n/)[2]);       //skall hämtas från RAM
            xtagpos = parseInt(data.split(/\r?\n/)[3]);    //x-position på lapp
            ytagpos = parseInt(data.split(/\r?\n/)[4]);
    });
};




server.get("/", (req, res) =>                  //läser hemsidan
{
    res.sendFile(__dirname + '/index.html');
});



server.listen(port, () => 
{
    console.log(`Server listening at ${port}`);
});



//________________SERVER-REQUESTS____________________
//__________________X-request______________
server.get("/xpu", (req, res) => 
{
    xp = xp + 1;
    print();
});
server.get("/xpn", (req, res) => 
{
    xp = xp - 1;
    print();
});

server.get("/xiu", (req, res) => 
{
    xi = xi + 1;
    print();
});
server.get("/xin", (req, res) => 
{
    xi = xi - 1;
    print();
});

server.get("/xdu", (req, res) => 
{
    xd = xd + 1;
    print();
});
server.get("/xdn", (req, res) => 
{
    xd = xd - 1;
    print();
});
//__________________Y-request______________

server.get("/ypu", (req, res) => 
{
    yp = yp + 1;
    print();
});
server.get("/ypn", (req, res) => 
{
    yp  = yp - 1;
    print();
});

server.get("/yiu", (req, res) => 
{
    yi = yi + 1;
    print();
});
server.get("/yin", (req, res) => 
{
    yi = yi - 1;
    print();
});

server.get("/ydu", (req, res) => 
{
    yd = yd + 1;
    print();
});
server.get("/ydn", (req, res) => 
{
    yd = yd - 1;
    print();
});
//__________________Z-request______________

server.get("/zpu", (req, res) => 
{
    zp = zp + 1;
    print();
});
server.get("/zpn", (req, res) => 
{
    zp = zp - 1;
    print();
});

server.get("/ziu", (req, res) => 
{
    zi = zi + 1;
    print();
});
server.get("/zin", (req, res) => 
{
    zi = zi - 1;
    print();
});

server.get("/zdu", (req, res) => 
{
    zd = zd + 1;
    print();
});
server.get("/zdn", (req, res) => 
{
    zd = zd - 1;
    print();
});
//__________________SPEED-request__________


server.get("/speed.upp", (req, res) => 
{
    speed = speed + 1;
    print();
});
server.get("/speed.ner", (req, res) => 
{
    speed = speed - 1;
    print();
});




//_________________________________________
server.get("/start", (req, res) =>
{
 start = true;
 print();
});
server.get("/stop",(req, res) =>
{
    start = false;
    print();
});
//_________________________________________





function newprint()
{
    pidtot = (
        yp+"\n"+
        yi+"\n"+
        yd+"\n"+
        xp+"\n"+
        xi+"\n"+
        xd+"\n"+
        zp+"\n"+
        zi+"\n"+
        zd+"\n"+
        0+"\n"+
        0+"\n"+
        0+"\n"+
        0+"\n"+        
        speed+"\n"+
        start);



    pidtotSendToWeb = [xp,xi,xd,yp,yi,yd,zp,zi,zd,speed,xpos,ypos,zpos,xtagpos,ytagpos,start];   //json data to clieant

    server.get("/update", (req, res) =>     //sends "pidtotSendToWeb" to client
    {
        res.json(pidtotSendToWeb);
    });


};
function print(){
    console.log(pidtotSendToWeb)
    fs.writeFile('data.txt', pidtot, (error, file) => //skickar beräkningarna till data.txt
    {
        if (error) throw error;
        // console.log('Wrote to: gustavsdata.txt');
    });
};







































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

