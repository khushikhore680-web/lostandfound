import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LostItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/all')
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="section container">
      <div className="header">
        <h2 className="title">Lost Items</h2>
        <div className="muted">{items.length} reported</div>
      </div>

      <div className="items-grid">
        {items.length === 0 && (
          <div className="muted">No items reported yet.</div>
        )}

        {items.map(item => {
          const isNew = item.createdAt && (Date.now() - new Date(item.createdAt).getTime()) < 24 * 60 * 60 * 1000;
          return (
            <div className="item-card" key={item._id}>
              <b>
                {item.name}
                {isNew && <span className="badge badge--new">New</span>}
              </b>
              <div>
                <span className="muted">{item.location || 'Unknown location'}</span>
                {item.location && <span className="badge badge--loc" style={{marginLeft:8}}>{item.location}</span>}
              </div>
              {item.contact && (
                <div style={{marginTop:8}}>
                  <a className="muted" href={`tel:${item.contact}`}>Contact: {item.contact}</a>
                </div>
              )}
              <p>{item.description}</p>
              <div className="muted">Reported {item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LostItems;