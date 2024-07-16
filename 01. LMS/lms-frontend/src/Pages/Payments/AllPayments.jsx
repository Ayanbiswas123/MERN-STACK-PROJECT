import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../Helpers/axiosInstance';
import { format } from 'date-fns';
import HomeLayout from '../../Layouts/HomeLayout';
import Chart from 'chart.js/auto';

function AllPayments() {
  const [paymentsByMonth, setPaymentsByMonth] = useState([]);
  const chartRef = useRef(null); // Ref for canvas element

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axiosInstance.get('/payments');
        const payments = response.data.AllPayments;

        const groupedPayments = groupPaymentsByMonth(payments);
        setPaymentsByMonth(groupedPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        // Handle error (e.g., show toast message)
      }
    }

    fetchPayments();
  }, []);

  useEffect(() => {
    // Draw chart whenever paymentsByMonth changes
    drawChart();
  }, [paymentsByMonth]);

  const groupPaymentsByMonth = (payments) => {
    const grouped = {};
    payments.forEach(payment => {
      const month = format(new Date(payment.createdAt), 'MMMM yyyy');
      if (!grouped[month]) {
        grouped[month] = {
          payments: [],
          totalAmount: 0
        };
      }
      grouped[month].payments.push(payment);
      grouped[month].totalAmount += 499; // Assuming 499 is the fixed amount per payment
    });
    return grouped;
  };

  const drawChart = () => {
    if (chartRef.current && paymentsByMonth) {
      // Sort months chronologically
      const sortedMonths = Object.keys(paymentsByMonth).sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      const amounts = sortedMonths.map(month => paymentsByMonth[month].totalAmount);

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: sortedMonths,
            datasets: [{
              label: 'Total Payments (₹)',
              data: amounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total Payments (₹)'
                }
              }
            }
          }
        });
      } else {
        console.error('Failed to get 2D context for canvas');
      }
    } else {
      console.error('Canvas element reference or paymentsByMonth is null');
    }
  };

  return (
    <HomeLayout>
      <div className="bg-base-100 min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-2xl font-bold my-4 text-center text-white">All Payments</h1>
        {Object.keys(paymentsByMonth).length === 0 ? (
          <p className="text-gray-500">No payments available</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Total Payments Per Month</h2>
              {/* Use ref attribute to connect the canvas element */}
              <canvas ref={chartRef} id="paymentsChart"></canvas>
            </div>
            {Object.keys(paymentsByMonth).sort((a, b) => new Date(a) - new Date(b)).map(month => (
              <div key={month} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{month}</h2>
                <p className="text-zinc-800">Total Payment: ${paymentsByMonth[month].totalAmount}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentsByMonth[month].payments.map(payment => (
                    <li key={payment._id} className="bg-white rounded-lg shadow-lg p-4">
                      <p className='text-zinc-800'><strong>User:</strong> {payment.user_name}</p>
                      <p className='text-zinc-800'><strong>Payment ID:</strong> {payment.payment_id}</p>
                      <p className='text-zinc-800'><strong>Payment Date:</strong> {format(new Date(payment.createdAt), 'dd MMMM yyyy HH:mm')}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </HomeLayout>
  );
}

export default AllPayments;
