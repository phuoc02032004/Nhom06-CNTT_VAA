import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getAllUsers, updateUser, deleteUser } from '../services/user';
import 'tailwindcss/tailwind.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
  });
  const [viewingUser, setViewingUser] = useState(null); // Xem chi tiết
  const [editingUserId, setEditingUserId] = useState(null); // Sửa người dùng
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);

        const userList = await getAllUsers(tokenFromStorage);
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  // Xử lý form thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sửa người dùng
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser(editingUserId, formData, token);
        setEditingUserId(null);
        setFormData({ name: '', email: '', id: '' });
        const updatedUsers = await getAllUsers(token);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(id, token);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  };

  // Hiển thị thông tin người dùng
  const handleViewUser = (user) => {
    setViewingUser(user);
    setEditingUserId(null);
    setFormData({ name: user.name, email: user.email, id: user._id });
  };

  // Bắt đầu sửa người dùng
  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setViewingUser(null);
    setFormData({ name: user.name, email: user.email, id: user._id });
  };

  // Đóng bảng chi tiết
  const handleCloseDetails = () => {
    setViewingUser(null);
    setEditingUserId(null);
    setFormData({ name: '', email: '', id: '' });
  };

  return (
    <>
      <Breadcrumb pageName="User" />
      <div className="p-8 bg-gray-100 min-h-screen">
        {(editingUserId || viewingUser) && (
          <form
            onSubmit={handleUpdateUser}
            className="mb-6 bg-white p-4 rounded shadow relative"
          >
            <button
              type="button"
              onClick={handleCloseDetails}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editingUserId ? 'Sửa Người Dùng' : 'Thông Tin Chi Tiết'}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                className="mt-1 p-2 w-full border rounded bg-gray-100"
                readOnly // Trường này luôn chỉ để xem
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                readOnly={!editingUserId} // Chỉ sửa được khi đang chỉnh sửa
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded"
                readOnly={!editingUserId} // Chỉ sửa được khi đang chỉnh sửa
              />
            </div>
            {editingUserId && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cập Nhật
              </button>
            )}
          </form>
        )}

        {/* Danh sách người dùng */}
        <div className="bg-white p-4 rounded shadow text-black">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">ID</th>
                <th className="border-b p-2">NAME</th>
                <th className="border-b p-2">Email</th>
                <th className="border-b p-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border-b p-2">{user._id}</td>
                  <td className="border-b p-2">{user.name}</td>
                  <td className="border-b p-2">{user.email}</td>
                  <td className="border-b p-2">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="hover:text-primary"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="hover:text-primary"
                      >
                        <svg
                          className="h-5 w-4 text-white-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="hover:text-primary"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
