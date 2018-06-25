import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { Line } from 'react-chartjs-2';
import { ISO_DATE_FORMAT, CURRENCY_FORMAT } from '../constants';

const Chart = ({ expenses, incomes }) => {
  const chartData = {
    datasets: [
      {
        label: 'Expense',
        type: 'line',
        data: expenses.map(({ amount, createdAt }) => ({
          x: createdAt,
          y: amount,
        })),
        borderColor: '#6772a4',
        backgroundColor: 'rgba(103, 114, 164, 0.1)',
        pointBorderColor: '#6772a4',
        pointBackgroundColor: 'rgba(103, 114, 164, 0.5)',
        borderDash: [5, 5],
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded',
      },
      {
        label: 'Income',
        type: 'line',
        data: incomes.map(({ amount, createdAt }) => ({
          x: createdAt,
          y: amount,
        })),
        borderColor: 'orange',
        backgroundColor: 'rgba(255,150,0,0.1)',
        pointBorderColor: 'orange',
        pointBackgroundColor: 'rgba(255,150,0,0.5)',
        borderDash: [5, 5],
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 50,
        right: 100,
        top: 50,
        bottom: 100,
      },
    },
    responsive: true,
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black',
      },
    },
    tooltips: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      callbacks: {
        label(tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';

          if (label) {
            label += ': ';
          }
          label += numeral(tooltipItem.yLabel / 100).format(CURRENCY_FORMAT);
          return label;
        },
      },
    },
    scales: {
      weight: 23,
      xAxes: [
        {
          type: 'time',
          time: {
            displayFormats: 'YYYY',
            tooltipFormat: ISO_DATE_FORMAT,
          },
          ticks: {
            callback(value) {
              return `${moment(value).format(ISO_DATE_FORMAT)}`;
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontColor: '#484c91',
            fontSize: 18,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback(value) {
              return `${numeral(value / 100).format(CURRENCY_FORMAT)}`;
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Amount',
            fontColor: '#6772a4',
            fontSize: 18,
          },
        },
      ],
    },
  };

  const width = 760;
  const height = 900;

  return (
    <div className="chart">
      <Line data={chartData} options={chartOptions} width={width} height={height} redraw />
    </div>
  );
};

const mapStateToProps = state => ({
  expenses: state.expenses,
  incomes: state.incomes,
});

export default connect(mapStateToProps)(Chart);
