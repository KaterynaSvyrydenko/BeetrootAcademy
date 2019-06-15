var ctx = document.getElementById('#mainChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

// The data for our dataset
    data: {
         labels: [],
         datasets: [{
             //backgroundColor: ['green','#B61F51'],//'rgb(255, 99, 132)'
             //borderColor: ['green','#B61F51'],
             data: [],
         }]
    },

// Configuration options go here
    options: {
    }
});


function addData(labels, data) {
    chart.data.labels = labels;
    chart.data.datasets = data;
    chart.update();
};

function drawChart() {
    var labels = getLabels(gType);
    var data = getData();
    console.log(gType);
    console.log(labels);
    console.log(data);
    addData(labels,data);
};