
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/Form.css';

function DeleteForm({id, onSubmit, onCancel }){

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(id);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Delete Task</h2>
                    <button className="close-button" onClick={onCancel}>
                        <X size={24} />
                    </button>
                </div>
                <div className="form-group">
                        <label>Are you sure you wanna delete task {id} ?</label>
                </div>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-actions">
                        <button type="submit" className="save-button">
                            confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteForm;