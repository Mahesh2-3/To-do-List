import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar.jsx'; // Ensure correct file name case
import './App.css';
import deleteIcon from './assets/delete.svg';
import editIcon from './assets/edit.svg';

function App() {
  const [searchtodo, setsearchtodo] = useState({ newtodo: "" });
  const [todos, settodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [todo, settodo] = useState(() => JSON.parse(localStorage.getItem("todo")) || {});
  const [comp, setcomp] = useState([]);
  const [incomp, setincomp] = useState([]);
  const element = useRef(null);
  const [show, setshow] = useState(false);
  const [editnum, seteditnum] = useState({ editt: "" });

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const storedTodo = JSON.parse(localStorage.getItem("todo"));
    if (storedTodos) settodos(storedTodos);
    if (storedTodo) settodo(storedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todos, todo]);

  useEffect(() => {
    if (!element.current) return;
    let all = Array.from(Array(element.current.children.length).keys());
    const result = all.filter(num => !comp.includes(num));
    setincomp(result);
  }, [searchtodo, todo, todos]);

  const changed = (e) => {
    setsearchtodo({ newtodo: e.target.value });
  };

  const savedata = () => {
    if (searchtodo.newtodo.trim() !== "" && editnum.editt === "") {
      settodos([...todos, searchtodo.newtodo]);
      settodo({ ...todo, [searchtodo.newtodo]: false });
      setsearchtodo({ newtodo: "" });
    } else if (editnum.editt !== "") {
      settodos(prevTodos => prevTodos.map((item, idx) => idx === parseInt(editnum.editt) ? searchtodo.newtodo : item));
      settodo({ ...todo, [searchtodo.newtodo]: false });
      setsearchtodo({ newtodo: "" });
      seteditnum({ editt: "" });
    }
  };

  const check = (e) => {
    const id = parseInt(e.target.id);
    const updatedTodo = { ...todo, [todos[id]]: !todo[todos[id]] };
    settodo(updatedTodo);

    if (updatedTodo[todos[id]]) {
      setcomp([...comp, id]);
      setincomp(incomp.filter(num => num !== id));
    } else {
      setincomp([...incomp, id]);
      setcomp(comp.filter(num => num !== id));
    }
  };

  const showcompleted = () => {
    setshow(!show);
  };

  const edit = (e) => {
    const id = parseInt(e.target.id);
    setsearchtodo({ newtodo: todos[id] });
    seteditnum({ editt: id.toString() });
  };

  const deleted = (e) => {
    const id = parseInt(e.target.id);
    settodos(prevTodos => prevTodos.filter((_, idx) => idx !== id));
  };

  return (
    <>
      <Navbar />
       <div className="card ">
        <div className='font-bold text-[xx-large] text-center'>iTask - Manage Your Todos</div>
        <div>
          <div className='font-semibold text-[x-large] my-5'>Add a Todo</div>
          <div className='flex gap-2 my-5 flex-col lg:flex-row justify-evenly'>
            <input
              className='bg-white w-[100%] lg:w-[80%] h-[40px] rounded-full border pl-[15px] outline-none'
              value={searchtodo.newtodo}
              name='newtodo'
              onChange={changed}
              type="text"
            />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xl py-1 px-[27px] rounded-full' onClick={savedata}>Save</button>
          </div>
          <div className='flex gap-2 text-[16px] font-semibold'>
            <input type="checkbox" onChange={showcompleted} />
            <div>Show Finished</div>
          </div>
        </div>
        <hr className='h-[2px] my-5 bg-slate-500' />
        <div>
          <h1 className='font-semibold text-[x-large] my-5'>Your Todos</h1>
          <ul className='todoslist' ref={element}>
            {todos.map((todo, index) => (
              <li key={index} className={`mb-4 flex justify-between items-center ${show || !comp.includes(index) ? 'flex' : 'hidden'}`}>
                <div className='flex gap-4'>
                  <input type="checkbox" checked={todo[todos[index]]} onChange={check} id={index} />
                  <div className={`searchedtext text-[18px] font-semibold ${comp.includes(index) ? 'line-through' : ''}`}>{todo}</div>
                </div>
                <div className='flex gap-4'>
                  <img className='svgs w-[19px] cursor-pointer hover:scale-150 transition-all' id={index} onClick={deleted} src={deleteIcon} alt="Delete" />
                  <img className='svgs w-[19px] cursor-pointer hover:scale-150 transition-all' id={index} onClick={edit} src={editIcon} alt="Edit" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
