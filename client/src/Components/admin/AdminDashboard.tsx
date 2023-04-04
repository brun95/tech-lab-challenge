import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { getJotcRequests } from '../../services/api';
import { JotcRequest } from '../../types/types';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests]               = useState<JotcRequest[]>([]);
  const [emailFilter, setEmailFilter]         = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter]     = useState('');
  const [refreshData, setRefreshData]         = useState(true);

  const handleRefreshClick = () => {
    setRefreshData(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { requests } = await getJotcRequests();
      setRequests(requests);
    };
    if (refreshData) {
      fetchData();
      setRefreshData(false);
    }
  }, [refreshData]);

  const handleEmailFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFilter(event.target.value);
  };

  const handleStartDateFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateFilter(event.target.value);
  };

  const handleEndDateFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setEmailFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
  };

  const filteredRequests = requests.filter(request => {
    const emailMatch = request.email.includes(emailFilter);
    const startDateMatch =
      startDateFilter === '' || new Date(request.created_at) >= new Date(startDateFilter);
    const endDateMatch =
      endDateFilter === '' || new Date(request.created_at) <= new Date(endDateFilter);

    return emailMatch && startDateMatch && endDateMatch;
  });

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-4xl font-bold mb-8">Requests Dashboard</h1>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <label htmlFor="emailFilter" className="text-lg font-medium mr-2">
            Email:
          </label>
          <input
            id="emailFilter"
            type="text"
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={emailFilter}
            onChange={handleEmailFilterChange}
          />
        </div>
        <div className="flex items-center mb-4 sm:mb-0">
          <label htmlFor="startDateFilter" className="text-lg font-medium mr-2">
            Start Date:
          </label>
          <input
            id="startDateFilter"
            type="date"
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={startDateFilter}
            onChange={handleStartDateFilterChange}
          />
          <label htmlFor="endDateFilter" className="text-lg font-medium ml-4 mr-2">
            End Date:
          </label>
          <input
            id="endDateFilter"
            type="date"
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={endDateFilter}
            onChange={handleEndDateFilterChange}
          />
        </div>
        <div className='flex flex-row items-center justify-between mb-4'>
          <button
            className="bg-blue-500 text-white rounded-md py-1 px-2 ml-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
          <button 
            onClick={() => handleRefreshClick()}
            className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium">
            <FiRefreshCw className="mr-2 h-5 w-5" />
          </button>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-sm md:text-base px-4 py-2">Email</th>
            <th className="text-sm md:text-base px-4 py-2">Input</th>
            <th className="text-sm md:text-base px-4 py-2">Result</th>
            <th className="text-sm md:text-base px-4 py-2">Date Played</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request.id}>
              <td className="border px-4 py-2 text-sm md:text-base">{request.email}</td>
              <td className="border px-4 py-2 text-sm md:text-base" style={{ wordBreak: 'break-all' }}>{request.jotc_input}</td>
              <td className="border px-4 py-2 text-sm md:text-base">{request.jotc_result}</td>
              <td className="border px-4 py-2 text-sm md:text-base">{new Date(request.created_at).toLocaleDateString()}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    );
}

export default AdminDashboard;