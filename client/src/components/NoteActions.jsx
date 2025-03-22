import { useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../api';

const NoteActions = ({ note, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: note.fileName,
    description: note.fileDescription,
    tags: note.tags.join(', '),
    file: null
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('tags', formData.tags);
      if (formData.file) formPayload.append('file', formData.file);

      if (!formData.title || !formData.tags) {
        throw new Error('Title and tags are required');
      }

      const { data } = await api.put(`/notes/${note._id}`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      onUpdate(data.data);
      setShowModal(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${note._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        onUpdate(note._id, true); // true indicates deletion
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className="flex gap-2">
      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Note</h3>
            <form onSubmit={handleUpdate}>
              {/* Form fields */}
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full mb-3 p-2 border rounded"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full mb-3 p-2 border rounded"
                placeholder="Comma-separated tags"
              />
              <input
                type="file"
                onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                className="w-full mb-3"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default NoteActions;