import { useEffect, useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import NoteActions from '../components/NoteActions';

const Profile = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.userData);
  const profileImageUrl = user?.profileImage || '/default-profile.png';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await api.get(`/notes/getFiles/${user._id}`);
        setUserNotes(data.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) fetchNotes();
  }, [user]);

  const handleNoteUpdate = (updatedNote) => {
    setUserNotes(prevNotes => 
      prevNotes.map(note => 
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  const handleNoteDelete = (deletedNoteId) => {
    setUserNotes(prevNotes => 
      prevNotes.filter(note => note._id !== deletedNoteId)
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Profile Card */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover border-4 border-teal-100"
                  onError={(e) => {
                    e.target.src = '/default-profile.png';
                  }}
                />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600 mt-1">@{user?.userName}</p>
              
              <div className="mt-4 text-center">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {user?.userBio || "No bio available"}
                </p>
              </div>

              {/* Stats Container */}
              <div className="w-full mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600">
                      {userNotes.length}
                    </p>
                    <p className="text-sm text-gray-600">Uploads</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uploads Section */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Uploads</h2>
            
            {loading ? (
              <p>Loading...</p>
            ) : userNotes.length === 0 ? (
              <p>Nothing Available!</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {userNotes.map((note) => (
                  <div key={note._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {note.fileName}
                    </h3>
                    
                    {note.fileDescription && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {note.fileDescription}
                      </p>
                    )}

                    {note.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <NoteActions 
                        note={note} 
                        onUpdate={(updatedNote, isDeleted) => {
                          if (isDeleted) {
                            handleNoteDelete(note._id);
                          } else {
                            handleNoteUpdate(updatedNote);
                          }
                        }}
                      />
                      <button
                        onClick={() => window.open(note.files.url, '_blank')}
                        className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;