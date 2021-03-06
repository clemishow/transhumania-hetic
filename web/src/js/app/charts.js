// CHART
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["13-24 ans", "25-34 ans", "35-44 ans", "45-54 ans", "55-64 ans", "65+ ans"],
        datasets: [{
            label: 'Pourcentage',
            data: [95, 50, 15, 75, 25, 100],
            backgroundColor: [
                'rgba(255, 130, 94, 0.2)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        title: {
            display: true,
            text: 'Part de pour et de contre sur le transhumanisme selon l\'age',
            fontSize: 22,
            fontFamily: 'Abrade',
            padding: 5,
        },
    },
});