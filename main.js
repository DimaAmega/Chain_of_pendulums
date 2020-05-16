var Canvas = document.getElementById("canvas");
///////////////////////////
//      PIXI ENGINE
///////////////////////////
PIXI.utils.skipHello(); 
var app = new PIXI.Application({resizeTo:Canvas,
    backgroundColor:0x000000,
    antialias:true,
    view:Canvas});

Canvas.setAttribute('width',document.documentElement.clientWidth);
Canvas.setAttribute('height',document.documentElement.clientHeight);
    ///////////////////////////
    //    GLOBAL VARIABLES
    ///////////////////////////
var state_div = document.getElementById("state");
var G = 0.97;
var K = 0; 
var L = 0.1;
var N = 6;
var iterations = 1;
var x_speed = 1;
var k_input = document.getElementById("k_input")
var width_px = Canvas.offsetWidth/N;
var path_pendulums = new PIXI.Graphics();
path_pendulums.lineStyle(4, 0xFF3300, 1);
app.stage.addChild(path_pendulums);
var center_y = Canvas.offsetHeight/2;

var q0 = Vector.Random(2*N).multiply(5);
var q = q0;
var RS = CreateRS(N,K,G,L);

///////////////////////////
//    GLOBAL FUNCTIONS
///////////////////////////
function update(){
    for (var i = 0; i< x_speed*iterations;i++) q = RK(RS,q);
    path_pendulums.clear().lineStyle(4, 0xFF3300, 1);
    drawPendulums(N,q);
};
function updateState(){
    state_div.innerHTML =  `${getState(q.elements)} <br> N = ${N}`;
};
function drawPendulums(N,data){
    for(var i = 0; i < N; i++) drawPendulum(width_px,data.elements[2*i],i);
}
function drawPendulum(width,phase,index){
    var center_x = width/2 + index*width;
    var radius = width/2;
    path_pendulums.lineStyle(2, 0xFF3300, 0.2);
    path_pendulums.drawCircle(center_x,center_y,radius);
    path_pendulums.lineStyle(4, 0xFF3300, 1);
    path_pendulums.drawCircle(center_x + radius*Math.cos(phase),center_y +radius*Math.sin(phase),radius/8);
};

///////////////////////////
//   ADD EVENT LISTENERS
///////////////////////////

var tick = app.ticker.add(update);
setInterval( () =>  updateState() , 1000);
