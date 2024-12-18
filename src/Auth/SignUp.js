import { Input, notification, Button, Form } from 'antd';
import React, { useState } from 'react';
import ApiInstance from '../config/Apis/ApiInstance';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [model, setModel] = useState({});

  const saved = async (e) => {
    e.preventDefault();
    if (!model.name || !model.email || !model.password) {
      return notification.error({
        message: 'Validation error',
        description: 'Please fill all the input fields',
      });
    }

    try {
      const response = await ApiInstance.post('/signUp', model);
      console.log(response, 'send');
      notification.success({
        message: 'Congrats',
        description: 'User successfully created',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while creating the user.',
      });
    }
  };

  return (
    <>
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <p className="text-center text-gray-600 mb-6">Already have an Account? <Link className="text-blue-500 hover:text-blue-700" to={'/Login'}>Login</Link></p>

          {/* Input Fields */}
          <Form layout="vertical" onSubmitCapture={saved}>
            <Form.Item label="User Name" required>
              <Input
                placeholder="Enter your username"
                onChange={(e) => setModel({ ...model, name: e.target.value })}
                className="rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </Form.Item>

            <Form.Item label="Email" required>
              <Input
                placeholder="Enter your email"
                onChange={(e) => setModel({ ...model, email: e.target.value })}
                className="rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </Form.Item>

            <Form.Item label="Password" required>
              <Input.Password
                placeholder="Enter your password"
                onChange={(e) => setModel({ ...model, password: e.target.value })}
                className="rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
