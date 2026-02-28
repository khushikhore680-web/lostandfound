import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/found')
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="section container">
      <div className="header">
        <h2 className="title">Found Items</h2>
        <div className="muted">{items.length} reported</div>
      </div>

      <div className="items-grid">
        {items.length === 0 && (
          <div className="muted">No found items reported yet.</div>
        )}

        {items.map(item => (
          <div className="item-card" key={item._id}>
            <b>{item.name}</b>
            <div className="muted">{item.location || 'Unknown location'}</div>
            {item.contact && (
              <div style={{marginTop:8}}>
                <a className="muted" href={`tel:${item.contact}`}>Contact: {item.contact}</a>
              </div>
            )}
            <p>{item.description}</p>
            <div className="muted">Found {item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoundItems;
