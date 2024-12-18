import { Input, notification, Button } from 'antd';
import { useState } from 'react';
import ApiInstance from '../config/Apis/ApiInstance';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [model, setModel] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const post = (e) => {
    e.preventDefault();
    if (!model.email || !model.password) {
      return notification.error({
        message: 'Validation Error',
        description: 'Please provide a valid Email or Password.',
      });
    }

    setLoader(true);

    ApiInstance.post('/Login', {
      email: model.email,
      password: model.password,
    })
      .then((res) => {
        setLoader(false);
        console.log(res, 'send');
        notification.success({
          message: 'Login Successful',
          description: 'User successfully logged in.',
        });
        navigate('/Todo');
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        notification.error({
          message: 'Login Failed',
          description: 'Something went wrong. Please try again!',
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-10">
        {loader && (
          <div className="flex justify-center mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT4zMgFFgb8TlC4UMhxBoi8K16cq2G0TYG9A&s"
              alt="Loader"
              className="w-16 h-16 animate-spin"
            />
          </div>
        )}

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        <div>
          <div className="mb-4">
            <Input
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e) => setModel({ ...model, email: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <Input.Password
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setModel({ ...model, password: e.target.value })}
            />
          </div>

          <Button
            type="primary"
            onClick={post}
            className="w-full py-2 text-white font-semibold bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
