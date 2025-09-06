import React, { useEffect, useState } from 'react';
import { getUsers } from '../firebaseFunctions';  // Import the getUsers function

const GetData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get all users when the component mounts
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default GetData;
