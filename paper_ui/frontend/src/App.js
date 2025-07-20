import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ExplorePapers from './ExplorePapers';
import Graph from './Graph';


const buttonStyle = (bgColor) => ({
  width: '180px',
  height: '170px',
  fontSize: '48px',
  fontWeight: 'normal',
  cursor: 'pointer',
  background: bgColor,
  color: '#000',
  border: 'none',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center'
});

const buttonLabel = {
  fontSize: '16px',
  marginTop: '8px',
  fontWeight: 'bold'
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/explore" element={<ExplorePapers />} />
        <Route path="/" element={<FindSimilarPapers />} /> 
      </Routes>
    </Router>
  );
}

export default App;


// ✨ Modified FindSimilarPapers component
function FindSimilarPapers() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [processingSteps, setProcessingSteps] = useState([]);
  const [viewCount, setViewCount] = useState(3);
  const [modalData, setModalData] = useState(null);
  const [showExplore, setShowExplore] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  //new code
  const [showGraph, setShowGraph] = useState(false);
  const [queryPaperId, setQueryPaperId] = useState(null);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleUpload(selectedFile);
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return alert("Please select a file to upload.");
    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);
    setProgress(20);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        }
      });
      if (response.data.error) {
        alert(`Server Error: ${response.data.error}`);
      } else {
        setMetadata(response.data.metadata);
      }
    } catch (error) {
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
      setProgress(100);
    }
  };

  const handleAnalyze = async () => {
    if (!metadata) return alert("Please upload or select a paper first.");
    setAnalyzing(true);
    setAnalysisProgress(0);
    setProcessingSteps([]);
    const steps = ["Extracting keywords...", "Traversing knowledge graph and updating scores..."];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setProcessingSteps((prev) => [...prev, steps[i]]);
      setAnalysisProgress((prev) => prev + 25);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingSteps((prev) => [...prev, "Calculating recommendations..."]);

    // try {
    //   const response = await axios.post("http://127.0.0.1:8000/api/analyze/", {
    //     title: metadata.title,
    //     abstract: metadata.abstract
    //   });
    //   if (response.data.error) {
    //     alert(`Error analyzing: ${response.data.error}`);
    //   } else {
    //     setRecommendations(response.data.recommended_papers);
    //   }
    // } catch (error) {
    //   alert(`Error analyzing paper: ${error.message}`);
    // } finally {
    //   setAnalysisProgress(100);
    //   setAnalyzing(false);
    //   //new code
    //   setRecommendations(response.data.recommended_papers);
    //   setQueryPaperId(response.data.query_paper_id);
    //   setShowGraph(false); // Reset any previous graph

    // }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/analyze/", {
        title: metadata.title,
        abstract: metadata.abstract
      });
    
      if (response.data.error) {
        alert(`Error analyzing: ${response.data.error}`);
      } else {
        setRecommendations(response.data.recommended_papers);
        setQueryPaperId(response.data.query_paper_id); // ✅ Move here
        setShowGraph(false); // ✅ Reset graph here
      }
    } catch (error) {
      alert(`Error analyzing paper: ${error.message}`);
    } finally {
      setAnalysisProgress(100);
      setAnalyzing(false);
    }
    
  };

  const displayed = recommendations.slice(0, viewCount);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Comfortaa, sans-serif' }}>
    <div
  style={{
    background: '#f3f3f3',
    padding: '32px',
    borderRadius: '20px',
    marginBottom: '40px',
    textAlign: 'center',
    
    backdropFilter: 'blur(6px)',
    border: '3px solid rgba(255, 255, 255, 0.3)'
  }}
>
  <h1
    style={{
      fontSize: '42px',
      fontWeight: 700,
      color: '#023047',
      margin: 0,
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
      letterSpacing: '1px',
      marginRight: '12px'
    }}
  >
    Academic Paper Recommender
  </h1>
  <p
    style={{
      fontSize: '19px',
      fontWeight: 500,
      color: '#000',
      marginTop: '12px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6'
    }}
  >
    Upload a paper or explore our knowledge graph for highly relevant recommendations.
  </p>
</div>
      <div style={sectionBox}>
        <h2 style={sectionTitle}>1️⃣ Upload File or Explore Papers</h2>
        <div style={{ display: 'flex', alignItems: 'left', gap: '30px', marginTop: '30px', marginBottom: '20px' }}>
          <button onClick={() => setShowExplore(true)} style={analyzeButtonStyle}>📚 Explore Papers</button>

          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#666' }}>OR</span>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setShowFileInput(true)} style={uploadButtonStyle} disabled={uploading}>
              {uploading ? "⏳ Uploading..." : "📤 Upload Paper"}
            </button>
            {showFileInput && <input type="file" onChange={handleFileChange} />}
          </div>
        </div>


        {!showExplore && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginTop: '25px', marginBottom: '20px' }}>
              
              
            </div>

            
            <div style={progressBar(progress, '#007bff')} />
          </>
        )}

        {showExplore && (
          <div style={modalOverlay} onClick={() => setShowExplore(false)}>
            <div style={modalContent} onClick={(e) => e.stopPropagation()}>
              <ExplorePapers onSelectPaper={(paper) => {
                setMetadata({
                  title: paper.title,
                  abstract: paper.abstract,
                  authors: paper.authors?.join(", ") || "N/A",
                  year: paper.year || "N/A"
                });
                setShowExplore(false);
              }} />
              <button onClick={() => setShowExplore(false)} style={closeButton}>Close</button>
            </div>
          </div>
        )}

        {metadata && !showExplore && (
          <div style={metadataBox}>
            <h3>📄 Extracted Metadata:</h3>
            <p><strong>🔹 Title:</strong> {metadata.title}</p>
            <p><strong>📄 Abstract:</strong> {metadata.abstract}</p>
            <p><strong>✍️ Authors:</strong> {metadata.authors}</p>
            <p><strong>📅 Year:</strong> {metadata.year}</p>
          </div>
        )}
      </div>

      {!showExplore && (
        <div style={sectionBox}>
          <h2 style={sectionTitle}>2️⃣ Get Similar Paper Recommendations</h2>
          <button onClick={handleAnalyze} style={TraverseButtonStyle} disabled={analyzing}>
            {analyzing ? "🔄 Processing..." : "⚡ Traverse & Analyze"}
          </button>
          <div style={progressBar(analysisProgress, '#28a745')} />
          <div style={metadataBox}>
            {processingSteps.map((step, index) => (
              <p key={index}>⏳ {step}</p>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && !showExplore && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ marginBottom: '15px' }}>📌 Recommended Papers:</h2>
          <div style={gridContainer}>
            {displayed.map((paper, index) => (
              <div key={index} style={gridItem}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {`${index + 1}. ${paper.title.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())}`}
              </h3>

            
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button style={viewButton} onClick={() => setModalData(paper)}>
                  View Paper Details
                </button>
              </div>
            </div>
            
            ))}
          </div>
          {recommendations.length > 3 && (
            <button onClick={() => setViewCount(viewCount === 3 ? 9 : 3)} style={toggleButton}>
              {viewCount === 3 ? "🔽 View More" : "🔼 View Less"}
            </button>
          )}
        </div>
      )}

      {recommendations.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => setShowGraph(true)}
            style={{ ...TraverseButtonStyle, background: '#6c63ff' }}
          >
            🕸️ Visualise Graph
          </button>
        </div>
      )}


      {modalData && (
        <div style={modalOverlay} onClick={() => setModalData(null)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
          <h2>{modalData.title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())}</h2>

            <p><strong>📄 Abstract:</strong> {modalData.abstract}</p>
            <p><strong>🏛️ Venue:</strong> {modalData.venue}</p>
            <p><strong>✍️ Authors:</strong> {modalData.authors?.join(", ") || "N/A"}</p>
            <p><strong>📅 Year:</strong> {modalData.year}</p>
            {modalData.url && (
              <p>
                <strong>🔗 Link:</strong>{' '}
                <a href={modalData.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>
                  View Full Paper
                </a>
              </p>
            )}
            <button onClick={() => setModalData(null)} style={closeButton}>Close</button>
          </div>
        </div>
      )}
      {/* {showGraph && queryPaperId && recommendations[0]?.paper_id && (
        <div style={{ marginTop: '40px' }}>
          <Graph
            queryPaperId={queryPaperId}
            topPaperId={recommendations[0].paper_id}
          />
        </div>
      )} */}
      {showGraph && (
        <div style={{ marginTop: '40px' }}>
          <h3>🧠 Visualising Graph...</h3>
          <Graph
            queryPaperId={queryPaperId}
            topPaperId={recommendations[0]?.paper_id}
          />
        </div>
      )}
    </div>
    
  );
  
  
}


const sectionBox = {
  marginBottom: '40px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  background: '#f9f9f9'
};

const sectionTitle = {
  fontSize: '20px',
  fontWeight: 'bold'
};

const progressBar = (value, color) => ({
  marginTop: '10px',
  height: '10px',
  width: '100%',
  background: '#ddd',
  borderRadius: '5px',
  overflow: 'hidden',
  position: 'relative',
  marginBottom: '10px',
  ...(value > 0 && {
    backgroundImage: `linear-gradient(to right, ${color} ${value}%, transparent ${value}%)`
  })
});

const uploadButtonStyle = {
  padding: '10px 15px',
  fontSize: '14px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const analyzeButtonStyle = {
  
  padding: '10px 15px',
  fontSize: '14px',
  background: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const TraverseButtonStyle = {
  
  padding: '10px 15px',
  marginTop: '15px',
  marginBottom: '30px',
  fontSize: '14px',
  background: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const metadataBox = {
  marginTop: '20px',
  padding: '10px',
  background: '#eef2ff',
  borderRadius: '5px'
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px'
};

const gridItem = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '15px',
  background: '#eef2ff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const viewButton = {
  marginTop: '10px',
  padding: '8px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const toggleButton = {
  marginTop: '20px',
  padding: '10px 15px',
  background: '#007bff',
  color: '#fff',
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
  maxWidth: '900px',
  width: '95%',
  maxHeight: '90vh',
  overflowY: 'auto'
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


