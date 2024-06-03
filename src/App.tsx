
import React, { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem';

const App: React.FC = () => {
  const [toDos, setTodos] = useState<TodoItem[]>([]);
  const [toDo, setTodo] = useState<string>('');
  const [editMode, setEditMode] = useState<number | null>(null);

  const addTodo = () => {
    if (toDo.trim() !== '') {
      if (editMode !== null) {
        const updatedTodos = toDos.map((todo) =>
          todo.id === editMode ? new TodoItem(todo.id, toDo, todo.status) : todo
        );
        setTodos(updatedTodos);
        setEditMode(null);
      } else {
        const isDuplicate = toDos.some((todo) => todo.text === toDo);
        if (!isDuplicate) {
          setTodos([...toDos, new TodoItem(Date.now(), toDo)]);
          setTodo('');
        } else {
          alert('This ToDo already exists!');
        }
      }
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(toDos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTodos(
      toDos.map((todo) => {
        if (todo.id === id) {
          todo.toggleStatus();
        }
        return todo;
      })
    );
  };

  const startEdit = (id: number) => {
    const todoToEdit = toDos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.text);
      setEditMode(id);
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className={`todo ${obj.status ? 'completed' : ''}`} key={obj.id}>
            <div className="left">
              <input
                onChange={() => toggleStatus(obj.id)}
                checked={obj.status}
                type="checkbox"
              />
              {editMode === obj.id ? (
                <input
                  type="text"
                  value={toDo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              ) : (
                <p className={obj.status ? 'completed' : ''}>{obj.text}</p>
              )}
            </div>
            <div className="right">
              {editMode === obj.id ? (
                <i onClick={addTodo} className="fas fa-check"></i>
              ) : (
                <>
                  <i onClick={() => startEdit(obj.id)} className="fas fa-pen"></i>
                  <i onClick={() => deleteTodo(obj.id)} className="fas fa-times"></i>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
