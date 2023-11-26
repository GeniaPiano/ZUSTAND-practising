import './Column.css';
import Task from "./Task.jsx";
import {useStore} from "../store.js";
import {useState} from "react";
import {unmountComponentAtNode} from "react-dom";
import classNames from "classnames";

export default function Column({state}) {

    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);


    const tasks = useStore((store) =>
            store.tasks.filter((task) => task.state === state),
        //poniżej zamiast shallow można użyć własnej funkcji porównującej
        // (prev, next) => {
        //  const longest = prev.length > next.length ? prev.length : next.length;
        //  for (let i = 0; i < longest; i++) {
        //      if (prev[i] || next[i]) return false;
        //      if (prev[i] !== next[i]) return false;
        //  }
        //  return true;
        // }
    );
    // poniżej zamiast użycia zustand/shallow można użyć useMemo
    // const filtered = useMemo(() =>
    //     tasks.filter((task) => task.state === state), [tasks, state])
    const addTask = useStore((store) => store.addTask)
    const handleAdd = () => {
        addTask(text, state);
        setText('');
        setOpen(false);
    }


    const draggedTask = useStore((store) => store.draggedTask);
    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const moveTask = useStore((store) => store.moveTask)


    return (
        <div className={classNames("column", {drop: drop })}
             onDragOver={(e) => {
                 setDrop(true);
                 e.preventDefault();
             }}
             onDragLeave={(e) => {
                 setDrop(false);
                 e.preventDefault();
             }}
             onDrop = {e => {
                 moveTask(draggedTask, state)
                 setDraggedTask(null);
                 setDrop(false);

             }}
        >
        <div className="titleWrapper">
        <p>{state}</p>
            <button
                onClick={() => setOpen(true)}
            >Add</button>
        </div>
            {tasks.map(task => <Task key={task.title} title={task.title}/>)}
            {open && (
                <div className="modal">
                    <div className="modalContent">
                        <input onChange={(e) => setText(e.target.value)} value={text}/>
                        <button onClick={handleAdd}>Submit</button>
                        <button onClick={()=> setOpen(false)}>x</button>
                    </div>
                </div>
            )}
        </div>
    )
}