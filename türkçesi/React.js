import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function App() {
  const [loglar, setLoglar] = useState([]);
  const [baslangicTarihi, setBaslangicTarihi] = useState('');
  const [bitisTarihi, setBitisTarihi] = useState('');

  useEffect(() => {
    loglarıAl();
  }, []);

  const loglarıAl = async () => {
    try {
      const cevap = await axios.get('http://localhost:3000/loglar');
      setLoglar(cevap.data);
    } catch (hata) {
      console.error(hata);
    }
  };

  const loglarıFiltrele = async () => {
    try {
      const cevap = await axios.get(`http://localhost:3000/loglar/tarih/${baslangicTarihi}/${bitisTarihi}`);
      setLoglar(cevap.data);
    } catch (hata) {
      console.error(hata);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Log Görüntüleyici</h1>
      <div className="row mb-3">
        <div className="col">
          <input type="date" className="form-control" value={baslangicTarihi} onChange={(e) => setBaslangicTarihi(e.target.value)} />
        </div>
        <div className="col">
          <input type="date" className="form-control" value={bitisTarihi} onChange={(e) => setBitisTarihi(e.target.value)} />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={loglarıFiltrele}>Filtrele</button>
        </div>
      </div>
      <div className="list-group">
        {loglar.map((log) => (
          <div key={log._id} className="list-group-item">
            <h5 className="mb-1">{log.oluşturmaTarihi}</h5>
            <p className="mb-1">Kullanıcı: {log.kullanıcı}</p>
            <p className="mb-1">İçerik: {log.içerik}</p>
            <p className="mb-1">Kanal: {log.kanal}</p>
            <small>{moment(log.oluşturulmaTarihi).format('YYYY-MM-DD HH:mm:ss')}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
