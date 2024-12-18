import { Input, Button } from 'antd';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ApiInstance from '../config/Apis/ApiInstance';

export default function Todo() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const add = () => {
    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = editText;
      setList(updatedList);
      setEditIndex(null);
      setEditText('');
    } else {
      ApiInstance.post('/todo', { text });
      setList([...list, text]);
      setText('');
    }
  };

  const deleteTodo = (i) => {
    const updatedList = [...list];
    updatedList.splice(i, 1);
    setList(updatedList);
  };

  const editTodo = (i) => {
    setEditIndex(i);
    setEditText(list[i]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Todo List</h2>

        {/* Input for adding tasks */}
        <div className="mb-4">
          <Input
            value={editIndex !== null ? editText : text}
            onChange={(e) => editIndex !== null ? setEditText(e.target.value) : setText(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Add/Update Button */}
        <div className="mb-6">
          <Button
            onClick={add}
            type="primary"
            block
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-gradient-to-l"
          >
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </Button>
        </div>

        {/* Task List */}
        <div>
          <ul className="space-y-4">
            {list.map((task, i) => (
              <li key={i} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <span className="text-lg font-medium text-gray-700">{task}</span>

                <div className="flex space-x-3">
                  <button
                    onClick={() => editTodo(i)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteTodo(i)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
