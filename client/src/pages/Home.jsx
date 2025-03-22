import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import api from '../api';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [notesByTag, setNotesByTag] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAndCategorizeNotes = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await api.get('/notes/getFiles');
          const categorized = categorizeNotes(data.data);
          setNotesByTag(categorized);
          setError('');
        } catch (err) {
          setError('Failed to fetch notes');
          console.error('Error fetching notes:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    const categorizeNotes = (notes) => {
      return notes.reduce((acc, note) => {
        note.tags.forEach(tag => {
          if (!acc[tag]) acc[tag] = [];
          acc[tag].push(note);
        });
        return acc;
      }, {});
    };

    fetchAndCategorizeNotes();
  }, [isAuthenticated]);

  return (
    <div className='min-h-screen'>
      <Hero />
      
      {isAuthenticated && (
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Notes by Category</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : Object.keys(notesByTag).length === 0 ? (
            <div className="text-gray-500 text-center py-8">No notes found</div>
          ) : (
            Object.entries(notesByTag).map(([tag, notes]) => (
              <section key={tag} className="mb-12">
                <h3 className="text-lg font-semibold mb-4 border-b-2 border-teal-500 pb-2">
                  #{tag}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {notes.map(note => (
                    <div key={note._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-bold mb-2">{note.fileName}</h4>
                      <p className="text-gray-600 mb-4 text-sm">{note.fileDescription}</p>
                      <button
                        onClick={() => window.open(note.files.url, '_blank')}
                        className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
                      >
                        View Document
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;