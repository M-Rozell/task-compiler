
import React, { useState } from 'react'
import TaskForm from './TaskForm';
import { AiOutlineClose } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'

function Tasks({ tasks, completeTask, removeTask, updateTask }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTask(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    };

    if (edit.id) {
        return <TaskForm edit={edit} onSubmit={submitUpdate} />
    }

    return tasks.map((task, index) => (

        <div className={task.isComplete ? 'taskRow complete' : 'taskRow'} //ternary operator
            key={index}>

            <div key={task.id} onClick={() => completeTask(task.id)}>
                {task.text}
            </div>

            <div className='icons'>
                <MdModeEditOutline
                    onClick={() => setEdit({ id: task.id, value: task.text })}
                    className='editIcon' />
                <AiOutlineClose
                    onClick={() => removeTask(task.id)}
                    className='removeIcon' />
            </div>
        </div>
    ))
};

export default Tasks;






