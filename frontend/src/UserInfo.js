// src/UserInfo.js
import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        alert('Access token is missing, please log in again.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          alert('Failed to retrieve user info. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>User Info</h1>
      {userInfo ? (
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default UserInfo;
