import React from "react";

const RecentActivity = () => {
  const activities = [
    { id: 1, action: "New user registered", date: "2024-10-01" },
    { id: 2, action: "Product added", date: "2024-10-02" },
    { id: 3, action: "Order #123 shipped", date: "2024-10-03" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-4 text-left">Action</th>
            <th className="py-3 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b border-gray-200">{activity.action}</td>
              <td className="py-3 px-4 border-b border-gray-200">{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
