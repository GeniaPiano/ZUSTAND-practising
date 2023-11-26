import './Task.css'
import classNames from "classnames";
import {useStore} from "../store.js";
import trash from "../assets/trash-2.svg";


export default function Task({title}) {

    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );
    const deleteTask = useStore((store) => store.deleteTask)
    const setDraggedTask = useStore ((store) => store.setDraggedTask)

    return (
        <div className="task"
             draggable
             onDragStart={() => {
                 setDraggedTask(task.title)
             }}
        >

            <div> {task.title} </div>
            <div className="bottomWrapper">
                <img src={trash}
                     onClick={() => {deleteTask(task.title)}}
                     alt="delete button"/>
                <div className={classNames("status", task.state)}> {task.state} </div>
            </div>
        </div>
    )
}
