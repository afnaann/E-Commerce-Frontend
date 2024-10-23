// SummaryChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SummaryChart({ orders }) {
  // Prepare sales data
  const salesData = orders.map((order) => ({
    date: new Date(order.order_date).toLocaleDateString(), // Format date
    total: parseFloat(order.total_price), // Convert total_price to float
  }));

  // Group sales by date and sort by date
  const salesByDate = salesData.reduce((acc, { date, total }) => {
    if (!acc[date]) {
      acc[date] = 0; // Initialize if date not present
    }
    acc[date] += total; // Sum up sales for the date
    return acc;
  }, {});

  // Sort dates and prepare data for Chart.js
  const sortedDates = Object.keys(salesByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const data = {
    labels: sortedDates, // X-axis labels (dates)
    datasets: [
      {
        label: "Sales (INR)",
        data: sortedDates.map((date) => salesByDate[date]), // Y-axis data (sales totals)
        fill: true, // Fill the area under the line
        backgroundColor: "rgba(75, 192, 192, 0.4)", // Light fill color
        borderColor: "#4bc0c0", // Line color
        borderWidth: 3, // Line thickness
        tension: 0.4, // Smooth curve
        pointRadius: 6, // Size of points
        pointBackgroundColor: "#4bc0c0", // Point color
        pointBorderColor: "#fff", // Point border color
        pointBorderWidth: 2, // Point border width
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Maintain aspect ratio for responsiveness
    scales: {
      x: {
        title: {
          display: true,
          text: "Order Date",
          font: {
            size: 16, // Font size for the title
            weight: "bold", // Bold font
            family: "'Helvetica Neue', 'Arial', sans-serif", // Font family
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Grid color
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales (INR)",
          font: {
            size: 16,
            weight: "bold",
            family: "'Helvetica Neue', 'Arial', sans-serif", // Font family
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Grid color
        },
        ticks: {
          beginAtZero: true, // Start Y-axis from 0
          color: "rgba(75, 75, 75, 0.8)", // Tick color
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14, // Legend font size
            weight: "bold", // Legend font weight
            family: "'Helvetica Neue', 'Arial', sans-serif", // Font family
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Displaying date and sales total in tooltip
            const date = tooltipItem.label;
            const total = tooltipItem.raw;
            return [`Date: ${date}`, `Total Sales: ₹${total.toFixed(2)}`]; // Tooltip formatting
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Tooltip background color
        titleColor: "rgba(0, 0, 0, 0.7)", // Tooltip title color
        bodyColor: "rgba(0, 0, 0, 0.8)", // Tooltip body color
        borderColor: "rgba(75, 192, 192, 1)", // Tooltip border color
        borderWidth: 1, // Tooltip border width
        padding: 10, // Tooltip padding
        cornerRadius: 5, // Tooltip border radius
      },
      title: {
        display: true,
        text: "Sales Overview",
        font: {
          size: 20,
          weight: "bold",
          family: "'Helvetica Neue', 'Arial', sans-serif", // Font family
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 h-96">
      {" "}
      {/* Adjust height */}
      <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
        Sales Overview
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default SummaryChart;
