import React, { useState } from 'react';
import { addUser } from '../firebaseFunctions'; // Import the addUser function

const AddData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    addUser(name, email);  // Call the addUser function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Add User</button>
    </div>
  );
};

export default AddData;
