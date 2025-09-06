import React, { useEffect, useState } from 'react'; 
import './AccountPage.css';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updatePassword } from 'firebase/auth'; // ✅ added
import defaultAvatar from '../assets/default-avatar.png';

const AccountPage = () => {
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    district: '',
    state: '',
  });

  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState(''); // ✅ added
  const [confirmPassword, setConfirmPassword] = useState(''); // ✅ added
  const [passwordMsg, setPasswordMsg] = useState(''); // ✅ added

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data);
          if (data.photoURL) setPhotoURL(data.photoURL);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { ...formData, photoURL }, { merge: true });
        alert('Details saved successfully!');
      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Error saving data. Please try again.');
      }
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);
      await updateDoc(doc(db, 'users', user.uid), { photoURL: downloadURL });
    } catch (err) {
      console.error('Failed to upload avatar:', err);
    }
  };

  const handlePasswordUpdate = async () => {
    setPasswordMsg('');
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match.');
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      setPasswordMsg('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMsg('Error: ' + err.message);
    }
  };

  if (loading) return <div className="account-container"><p>Loading...</p></div>;

  return (
    <div className="account-container">
      <h2 className="account-heading">Your Account</h2>
      <div className="profile-section">
        <label htmlFor="avatar-upload" className="avatar-label">
          <img src={photoURL || defaultAvatar} alt="Avatar" className="profile-pic" />
          <p className="edit-label">Edit Profile Picture</p>
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
      </div>

      <div className="form-fields">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Email', name: 'email' },
          { label: 'Mobile Number', name: 'mobile' },
          { label: 'Password', name: 'password' },
          { label: 'District', name: 'district' },
          { label: 'State', name: 'state' }
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={name === 'password' ? 'password' : 'text'}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
      </div>

      {/* ✅ Password Update Section */}
      <div className="password-change-section">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handlePasswordUpdate}>Change Password</button>
        {passwordMsg && <p className="password-message">{passwordMsg}</p>}
      </div>
    </div>
  );
};

export default AccountPage;
