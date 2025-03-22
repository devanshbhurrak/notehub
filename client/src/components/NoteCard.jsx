import React from 'react'

const NoteCard = ({ note, onUpdate }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold mb-2">{note.fileName}</h3>
        <p className="text-gray-600 mb-4">{note.fileDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
              #{tag}
            </span>
          ))}
        </div>
        <NoteActions note={note} onUpdate={onUpdate} />
      </div>
    );
  };

export default NoteCard