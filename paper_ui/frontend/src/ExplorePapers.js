// import React, { useState } from 'react';
// import axios from 'axios';

// const ExplorePapers = () => {
//   const [filters, setFilters] = useState({ keyword: '', author: '', year: '', journal: '' });
//   const [results, setResults] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [modalData, setModalData] = useState(null);

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = async () => {
//     const params = new URLSearchParams();

//     Object.entries(filters).forEach(([k, v]) => {
//       if (v) {
//         if (k === 'keyword') {
//           const keywords = v.split(/[,\\s]+/).filter(Boolean);
//           keywords.forEach(kw => params.append('keyword', kw.toLowerCase()));
//         } else {
//           params.append(k, v);
//         }
//       }
//     });

//     const res = await axios.get(`http://127.0.0.1:8000/api/explore-papers?${params.toString()}`);
//     setResults(res.data);
//     setVisibleCount(6);
//   };

//   return (
//     <div style={{ padding: '40px', maxWidth: '800px', marginTop: '80px', margin: '0 auto', fontFamily: 'Comfortaa, sans-serif' }}>
      
//       <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>
//         📄 Explore Papers
//       </h1>

//       <div style={sectionBox}>
//         <input name="keyword" placeholder="Keywords" onChange={handleChange} style={inputStyle} />
//         <input name="author" placeholder="Author" onChange={handleChange} style={inputStyle} />
//         <input name="year" placeholder="Year" onChange={handleChange} style={inputStyle} />
//         <input name="journal" placeholder="Journal" onChange={handleChange} style={inputStyle} />
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
//           <button onClick={handleSearch} style={queryButton}>Query Graph 🔍</button>
//         </div>
//       </div>

//       {/* Results Grid */}
//       <div style={gridContainer}>
//         {results.slice(0, visibleCount).map((paper, index) => (
//           <div key={index} style={gridItem}>
//             <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
//               {`${index + 1}. ${
//                 paper.title
//                   ? paper.title
//                       .toLowerCase()
//                       .split(' ')
//                       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                       .join(' ')
//                   : "Untitled Paper"
//               }`}
//             </h3>
//             <button style={viewButton} onClick={() => setModalData(paper)}>View</button>
//           </div>
//         ))}
//       </div>

//       {/* View More Button */}
//       {visibleCount < results.length && (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//           <button onClick={() => setVisibleCount(visibleCount + 3)} style={viewMoreButton}>
//             View More
//           </button>
//         </div>
//       )}

//       {/* Modal Popup */}
//       {modalData && (
//         <div style={modalOverlay} onClick={() => setModalData(null)}>
//           <div style={modalContent} onClick={(e) => e.stopPropagation()}>
//             <h2>{modalData.title && modalData.title.replace(/\b\w/g, char => char.toUpperCase())}</h2>
//             <p><strong>📄 Abstract:</strong> {modalData.abstract}</p>
//             <p><strong>🏛️ Venue:</strong> {modalData.venue}</p>
//             <p><strong>📅 Year:</strong> {modalData.year}</p>
//             <p><strong>👨‍🔬 Authors:</strong> {modalData.authors?.join(', ')}</p>
//             <button onClick={() => setModalData(null)} style={closeButton}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const inputStyle = {
//   width: '94%',
//   height: '25px',
//   marginBottom: '10px',
//   marginTop: '10px',
//   marginLeft: '10px',
//   padding: '10px 10px 10px 10px',
//   borderRadius: '5px',
//   border: '3px solid #ccc',
//   fontSize: '16px',
//   display: 'block'
// };

// // const inputStyle = {
// //   width: '100%',
// //   height: '25px',
// //   marginBottom: '15px',
// //   padding: '10px 1px 10px 10px',
// //   borderRadius: '5px',
// //   border: '1px solid #ccc',
// //   fontSize: '16px',
// //   display: 'block'
// // };

// const sectionBox = {
//   border: '1px solid #ddd',
//   borderRadius: '10px',
//   padding: '20px',
//   background: '#f9f9f9',
//   marginBottom: '30px'
// };

// const queryButton = {
//   padding: '10px 20px',
//   background: '#007bff',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '5px',
//   fontWeight: 'bold',
//   cursor: 'pointer'
// };

// const gridContainer = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//   gap: '20px'
// };

// const gridItem = {
//   background: '#eef2ff',
//   padding: '15px',
//   borderRadius: '10px',
//   border: '1px solid #ccc',
//   textAlign: 'left',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between'
// };

// const viewButton = {
//   marginTop: '10px',
//   background: '#007bff',
//   color: '#fff',
//   padding: '8px 12px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// const viewMoreButton = {
//   marginTop: '10px',
//   background: '#28a745',
//   color: '#fff',
//   padding: '10px 20px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// const modalOverlay = {
//   position: 'fixed',
//   top: 0, left: 0, right: 0, bottom: 0,
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1000
// };

// const modalContent = {
//   background: '#fff',
//   padding: '30px',
//   borderRadius: '10px',
//   maxWidth: '600px',
//   width: '100%'
// };

// const closeButton = {
//   marginTop: '20px',
//   background: '#333',
//   color: '#fff',
//   padding: '10px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer'
// };

// export default ExplorePapers;

import React, { useState } from 'react';
import axios from 'axios';

const ExplorePapers = ({ onSelectPaper }) => {
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Inject spinner CSS
  if (typeof window !== 'undefined') {
    const spinnerStyle = `
      @keyframes spin { to { transform: rotate(360deg); } }
      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-top: 2px solid #007bff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = spinnerStyle;
    document.head.appendChild(style);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const keywordRaw = formData.get('keyword') || '';
    const author = formData.get('author') || '';
    const year = formData.get('year') || '';
    const journal = formData.get('journal') || '';

    const params = new URLSearchParams();

    if (keywordRaw) {
      const keywords = keywordRaw.split(/[,\s]+/).filter(Boolean);
      keywords.forEach(kw => params.append('keyword', kw.toLowerCase()));
    }
    if (author) params.append('author', author);
    if (year) params.append('year', year);
    if (journal) params.append('journal', journal);

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/explore-papers?${params.toString()}`);
      setResults(res.data);
      setVisibleCount(6);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', marginTop: '80px', margin: '0 auto', fontFamily: 'Comfortaa, sans-serif' }}>

      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>
        📄 Explore Papers
      </h1>

      <form onSubmit={handleSearch} style={sectionBox}>
        <input name="keyword" placeholder="Keywords" style={inputStyle} />
        <input name="author" placeholder="Author" style={inputStyle} />
        <input name="year" placeholder="Year" style={inputStyle} />
        <input name="journal" placeholder="Journal" style={inputStyle} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button type="submit" disabled={loading} style={{ ...queryButton, opacity: loading ? 0.7 : 1 }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="spinner" /> Searching...
              </span>
            ) : 'Query Graph 🔍'}
          </button>
        </div>
      </form>

      {/* Results Grid */}
      <div style={gridContainer}>
        {results.slice(0, visibleCount).map((paper, index) => (
          <div key={index} style={gridItem}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{`${index + 1}. ${paper.title}`}</h3>
        
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={viewButton} onClick={() => setModalData(paper)}>View Paper Details</button>
            <button style={viewButton} onClick={() => onSelectPaper(paper)}>
              Save Details to Find Similar Papers
            </button>
          </div>
        </div>
        
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < results.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setVisibleCount(visibleCount + 3)} style={viewMoreButton}>
            View More
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {modalData && (
        <div style={modalOverlay} onClick={() => setModalData(null)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{modalData.title && modalData.title.replace(/\b\w/g, char => char.toUpperCase())}</h2>
            <p><strong>📄 Abstract:</strong> {modalData.abstract}</p>
            <p><strong>🏫 Venue:</strong> {modalData.venue}</p>
            <p><strong>📅 Year:</strong> {modalData.year}</p>
            <p><strong>👨‍🔬 Authors:</strong> {modalData.authors?.join(', ')}</p>
            <button onClick={() => setModalData(null)} style={closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const inputStyle = {
  width: '94%',
  height: '25px',
  marginBottom: '10px',
  marginTop: '10px',
  marginLeft: '10px',
  padding: '10px',
  borderRadius: '5px',
  border: '3px solid #ccc',
  fontSize: '16px',
  display: 'block'
};

const sectionBox = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  background: '#f9f9f9',
  marginBottom: '30px'
};

const queryButton = {
  padding: '10px 20px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px'
};

// const gridItem = {
//   background: '#eef2ff',
//   padding: '15px',
//   borderRadius: '10px',
//   border: '1px solid #ccc',
//   textAlign: 'left',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between'
// };

const gridItem = {
  background: '#eef2ff',
  padding: '15px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '250px'  // <-- Add this for consistency
};


const viewButton = {
  marginTop: '10px',
  background: '#007bff',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const viewMoreButton = {
  marginTop: '10px',
  background: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContent = {
  background: '#fff',
  padding: '30px',
  borderRadius: '10px',
  maxWidth: '600px',
  width: '100%'
};

const closeButton = {
  marginTop: '20px',
  background: '#333',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default ExplorePapers;