import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function App() {
  const [logs, setLogs] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/logs');
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/logs/date/${startDate}/${endDate}`);
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Log Viewer</h1>
      <div className="row mb-3">
        <div className="col">
          <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="col">
          <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={filterLogs}>Filter</button>
        </div>
      </div>
      <div className="list-group">
        {logs.map((log) => (
          <div key={log._id} className="list-group-item">
            <h5 className="mb-1">{log.event}</h5>
            <p className="mb-1">User: {log.user}</p>
            <p className="mb-1">Content: {log.content}</p>
            <p className="mb-1">Channel: {log.channel}</p>
            <small>{moment(log.createdAt).format('YYYY-MM-DD HH:mm:ss')}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
