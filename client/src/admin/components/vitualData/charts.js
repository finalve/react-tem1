const data = {
    labels: ["AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL"],
    datasets: [{
        data: [42, 90, 70, 88, 15, 92, 40, 75, 60, 90, 75, 100],
        backgroundColor: [
            
            'rgba(243, 153, 21, .6)','rgba(255, 255, 255, 1)',],
        borderColor: [
            '#f39915'
        ],
        borderWidth: 5,
        fill: true,
        tension: 0.1,
        label: "online"
    }
    ]
};

const plugins = [{
    afterLayout: chart => {
      let ctx = chart.chart.ctx;
      ctx.save();
      let yAxis = chart.scales["y-axis-0"];
      let yBottom = yAxis.getPixelForValue(0);
      let dataset = chart.data.datasets[2];
      dataset.backgroundColor = dataset.data.map(v => {
        let yTop = yAxis.getPixelForValue(v);
        let gradient = ctx.createLinearGradient(0, 0, 0, 110);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(243, 153, 21, .6)');
        return gradient;
      });
      ctx.restore();
    }
  }]

const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        filler: {
            propagate: false
        }
    },
    scales: {
        xAxes: [{
            display: false,
            ticks: {
                display: false
            },
            gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
            }
        }],
        yAxes: [{
            display: false,
            ticks: {
                display: false,
                autoSkip: false,
                maxRotation: 0,
                stepSize: 15,
                min: 0,
                max: 100
            }
        }]
    },
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    elements: {
        line: {
            tension: 0
        },
        point: {
            radius: 0
        }
    }
}

export default { data, options,plugins }