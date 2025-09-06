import { db,auth } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Add user to Firestore
export const addUser = async (userData) => {
  try {
    await addDoc(collection(db, 'users'), userData);
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Get all users from Firestore
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Update user in Firestore
export const updateUser = async (id, updatedData) => {
  try {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, updatedData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete user from Firestore
export const deleteUser = async (id) => {
  try {
    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
