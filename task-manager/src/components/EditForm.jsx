
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/Form.css';

function EditForm({ task, onSubmit, onCancel }){
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        date: '',
        completed: false
    });

    useEffect(() => {
        if (task) {
            setFormData({
                id: task.id,
                name: task.name,
                date: task.date
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Task</h2>
                    <button className="close-button" onClick={onCancel}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            type="text"
                            id="taskName"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-button">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditForm;