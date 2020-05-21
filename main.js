let Canvas = document.getElementById("canvas");
///////////////////////////
//      PIXI ENGINE
///////////////////////////
PIXI.utils.skipHello(); 
let app = new PIXI.Application({resizeTo:Canvas,
    backgroundColor:0x000000,
    antialias:true,
    view:Canvas});

Canvas.setAttribute('width',document.documentElement.clientWidth);
Canvas.setAttribute('height',document.documentElement.clientHeight);

///////////////////////////
//    GLOBAL letIABLES
///////////////////////////
let state_div = document.getElementById("state");
let G = 0.97;
let K = 0; 
let L = 0.1;
let N = 6;
let iterations = 1;
let x_speed = 1;
let h_time = 0.015;
let t_window = 8;
let t_c = 0;
let k_input = document.getElementById("k_input")
let width_px = Canvas.offsetWidth/N;
let path_pendulums = new PIXI.Graphics();
path_pendulums.lineStyle(4, 0xFF3300, 1);
app.stage.addChild(path_pendulums);
let center_y = Canvas.offsetHeight/2;

let q0 = Vector.Random(2*N).multiply(5);
let q = q0;
let RS = CreateRS(N,K,G,L);
///////////////////////////
//      CHART ENGINE
///////////////////////////
let chart = new myChart();
chart.chart.data.labels = new Array(Math.floor(t_window/h_time)).fill(0);
for (let i = 0; i < N; i++) chart.addTrack(q,i);
///////////////////////////
//    GLOBAL FUNCTIONS
///////////////////////////
function update(){
    for (let i = 0; i< x_speed*iterations;i++) {
        q = RK(RS,q);
        t_c += h_time; 
        chart.updateTracks(q,t_c);
    }
    path_pendulums.clear().lineStyle(4, 0xFF3300, 1);
    drawPendulums(N,q);
    chart.update();
};
function updateState(){
    state_div.innerHTML =  `${getState(q.elements)} <br> N = ${N}`;
};
function drawPendulums(N,data){
    for(let i = 0; i < N; i++) drawPendulum(width_px,data.elements[2*i],i);
}
function drawPendulum(width,phase,index){
    let center_x = width/2 + index*width;
    let radius = width/2;
    path_pendulums.lineStyle(2, 0xFF3300, 0.2);
    path_pendulums.drawCircle(center_x,center_y,radius);
    path_pendulums.lineStyle(4, 0xFF3300, 1);
    path_pendulums.drawCircle(center_x + radius*Math.cos(phase),center_y +radius*Math.sin(phase),radius/8);
};

///////////////////////////
//   ADD EVENT LISTENERS
///////////////////////////

let tick = app.ticker.add(update);
setInterval( () =>  updateState() , 1000);