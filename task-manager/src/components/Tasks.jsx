import { useEffect, useState } from "react";
import '../styles/Tasks.css';
import { Delete, DeleteIcon, Edit, Plus, X } from "lucide-react";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";

function Tasks(props){

    const [data, setData] = useState(props.data || []);
    const [size, setSize] = useState((props.data && props.data.length) || 0);
    const [task, setTask] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        setData(props.data || []);
        setSize((props.data && props.data.length) || 0);
    }, [props.data]);

    useEffect(() => {
        if (props.setData) props.setData(data);
        setSize(data ? data.length : 0);
    }, [data, props.setData]);

    function handleAddData() {
        setAddOpen(true);
    }

    function addData(newTask) {
        setData(prev => {
            const maxId = prev && prev.length > 0
                ? Math.max(...prev.map(task => task.id))
                : 0;

            newTask.id = maxId + 1;
            newTask.completed = false;

            return [...(prev || []), newTask];
        });
    }

    function handleEdit(id) {
        setTask(data.find(t => t.id === id));
        setEditOpen(true);
    }

    function editData(updatedTask) {
        setData(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    }

    function handleDelete(id) {
        setTask(data.find(t => t.id === id));
        setDeleteOpen(true);
    }

    function deleteData(id) {
        setData(prev => prev.filter(t => t.id !== id));
    }

    function handleTaskCompletion(id) {
        setData(prev => prev.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }


    return (
        <div className="tasks-container">
            <div className="show-taks">
                <div className="record-data">
                    <h3>Total Tasks: {size}</h3>
                    <button onClick={() => handleAddData()}>
                        <Plus size={20}/>
                    </button>
                </div>
                <div className="record-tabel">
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Task</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {size === 0 ? (
                                <tr>
                                    <td colSpan={4} className="empty-row">No records yet</td>
                                </tr>
                            ) : (
                                (data || []).map(task => (
                                    <tr key={task.id}>
                                        <td>
                                            {task.id}
                                        </td>
                                        <td className={task.completed ? 'completed-task' : ''}>
                                            {task.name}
                                        </td>
                                        <td className={task.completed ? 'completed-task' : ''}>
                                            {task.date}
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-button" onClick={() => handleEdit(task.id)}>
                                                    <Edit size={20}/>
                                                </button>
                                                <button className="delete-button" onClick={() => handleDelete(task.id)}>
                                                    <X size={20}/>
                                                </button>
                                                <input 
                                                    type="checkbox" 
                                                    name="Done"
                                                    checked={task.completed}
                                                    onChange={() => handleTaskCompletion(task.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
            {(editOpen && <EditForm
                            task={task}
                            onSubmit={(updatedTask)=>{
                                        editData(updatedTask);
                                        setEditOpen(false);
                                    }}
                            onCancel={() => setEditOpen(false)}/>)}
            {(addOpen && <AddForm
                            onSubmit={(newTask)=>{
                                        addData(newTask);
                                        setAddOpen(false);
                                    }}
                            onCancel={() => setAddOpen(false)}/>)}
            {(deleteOpen && <DeleteForm
                            id={task.id}
                            onSubmit={(id)=>{
                                        deleteData(id);
                                        setDeleteOpen(false);
                                    }}
                            onCancel={() => setDeleteOpen(false)}/>)}
            
        </div>
    );
}

export default Tasks;