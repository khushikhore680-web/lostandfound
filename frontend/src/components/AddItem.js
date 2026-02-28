import React, { useState } from 'react';
import axios from 'axios';

function AddItem() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('lost');
  const [saveState, setSaveState] = useState(''); // '', 'saving', 'saved', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // basic validation
    setSaveState('saving');
    axios.post('http://localhost:5000/api/items/add', { name, location, description, contact, status })
      .then(() => {
        setSaveState('saved');
        setName('');
        setLocation('');
        setContact('');
        setDescription('');
        setTimeout(() => setSaveState(''), 2500);
      })
      .catch(err => {
        console.error(err);
        setSaveState('error');
        setTimeout(() => setSaveState(''), 2500);
      });
  };

  return (
    <div className="section container">
      <h3 className="title">Report Lost Item</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input className="input" placeholder="Contact number" value={contact} onChange={e => setContact(e.target.value)} />
        <textarea className="textarea" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <button className="btn" type="submit">{saveState === 'saving' ? 'Saving...' : 'Report Item'}</button>
        {saveState === 'saved' && <div className="muted">Item added successfully.</div>}
        {saveState === 'error' && <div className="muted">Error adding item. Try again.</div>}
      </form>
    </div>
  );
}

export default AddItem;