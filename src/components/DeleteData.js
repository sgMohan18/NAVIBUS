import React, { useState } from 'react';
import { deleteUser } from '../firebaseFunctions';  // Import the deleteUser function

const DeleteData = () => {
  const [userId, setUserId] = useState('');

  const handleDelete = () => {
    deleteUser(userId);  // Call the deleteUser function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteData;
