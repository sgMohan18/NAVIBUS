import React, { useState } from 'react';
import { updateUser } from '../firebaseFunctions';  // Import the updateUser function

const UpdateData = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    const updatedData = { name, email };
    updateUser(userId, updatedData);  // Call the updateUser function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
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
      <button onClick={handleUpdate}>Update User</button>
    </div>
  );
};

export default UpdateData;
