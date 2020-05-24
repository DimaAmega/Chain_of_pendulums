var ctx = document.getElementById("myChart").getContext("2d");
let myChart = function () {

  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
            ticks: {
              maxTicksLimit:5
            }
        }]
      },
      animation: false,
      tooltips: { enabled: false },
      hover: { mode: null },
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
      },
    },
});  

this.chart = chart;
this.color = "rgba(0, 0, 0, 1)";
this.borderWidth = 1;
this.update = function(){ chart.update()};
this.addTrack = function(q,i){
  chart.data.datasets.push({
    radius: 0,
    fill: false,
    label: `${i+1}`,
    data: new Array(Math.floor(t_window/h_time)).fill(q.elements[2*i+1]),
    borderColor: this.color,
    borderWidth: this.borderWidth})
}
this.removeTrack = function(){
  chart.data.datasets.pop();
}
this.updateTracks = function(q,t_c) {
  for (let i = 0; i < N; i++) {
    chart.data.datasets[i].data.shift();
    chart.data.datasets[i].data.push(q.elements[2*i + 1]);
  }
  chart.data.labels.shift(); 
  chart.data.labels.push(t_c.toFixed(1));
}
};
