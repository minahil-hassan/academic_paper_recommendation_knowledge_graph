
// // import React, { useState } from "react";
// // import axios from "axios";

// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [metadata, setMetadata] = useState(null);
// //   const [recommendations, setRecommendations] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [showAll, setShowAll] = useState(false);

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select a file to upload.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     setLoading(true);
// //     setError(null);
// //     setShowAll(false);

// //     try {
// //       const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       console.log("API Response:", response);

// //       if (response.data.error) {
// //         console.error("Server Error:", response.data.error);
// //         setError(`Server Error: ${response.data.error}`);
// //       } else {
// //         setMetadata(response.data.metadata);
// //         setRecommendations(response.data.recommendations?.recommended_papers || []);
// //       }
// //     } catch (error) {
// //       console.error("Error uploading file:", error);
// //       setError(`Error uploading file: ${error.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="App" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#333", marginBottom: "50px" }}>📚 Academic Paper Recommendation System</h1>

// //       {/* Upload Section */}
// //       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
// //         <input type="file" onChange={handleFileChange} style={{ padding: "10px", fontSize: "16px" }} />
// //         <button 
// //           onClick={handleUpload} 
// //           disabled={loading} 
// //           style={{ 
// //             padding: "10px 20px", 
// //             fontSize: "16px", 
// //             cursor: "pointer", 
// //             background: "#007bff", 
// //             color: "#fff", 
// //             border: "none", 
// //             borderRadius: "5px",
// //             minWidth: "180px",
// //             textAlign: "center"
// //           }}
// //         >
// //           {loading ? "⏳ Processing..." : "📤 Upload and Analyze"}
// //         </button>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
// //           <strong>⚠️ {error}</strong>
// //         </div>
// //       )}

// //       {/* Metadata Display */}
// //       {metadata && (
// //         <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" }}>
// //           <h2>📄 Extracted Metadata:</h2>
// //           <p><strong>🔹 Title:</strong> {metadata.title || "N/A"}</p>
// //           <p><strong>📄 Abstract:</strong> {metadata.abstract || "N/A"}</p>
// //           <p><strong>✍️ Authors:</strong> {metadata.authors || "N/A"}</p>
// //           <p><strong>📅 Year:</strong> {metadata.year || "N/A"}</p>
// //         </div>
// //       )}

// //       {/* Recommendations Section */}
// //       {recommendations.length > 0 && (
// //         <div style={{ marginTop: "30px" }}>
// //           <h2>📌 Recommended Papers:</h2>
// //           {recommendations.slice(0, showAll ? recommendations.length : 2).map((paper, index) => (
// //             <div key={index} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#eef2ff", marginBottom: "10px" }}>
// //               <h3>🔹 Paper {index + 1}: {paper.title || "Untitled Paper"}</h3>
// //               <p><strong>📄 Abstract:</strong> {paper.abstract || "No abstract available."}</p>
// //               <p><strong>🏛️ Venue:</strong> {paper.venue || "Unknown Venue"}</p>
// //               <p><strong>📅 Year:</strong> {paper.year || "N/A"}</p>
// //               <hr style={{ border: "0.5px solid #ccc" }} />
// //             </div>
// //           ))}

// //           {/* View More / View Less Button */}
// //           {recommendations.length > 2 && (
// //             <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
// //               <button 
// //                 onClick={() => setShowAll(!showAll)} 
// //                 style={{ 
// //                   padding: "10px 20px", 
// //                   fontSize: "16px", 
// //                   background: "#007bff", 
// //                   color: "#fff", 
// //                   border: "none", 
// //                   borderRadius: "5px", 
// //                   cursor: "pointer", 
// //                   minWidth: "180px",
// //                   textAlign: "center"
// //                 }}
// //               >
// //                 {showAll ? "View Less" : "View More.."}
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* No Recommendations Message */}
// //       {!loading && recommendations.length === 0 && metadata && (
// //         <div style={{ marginTop: "30px", color: "#666", textAlign: "center" }}>
// //           <p>⚠️ No relevant recommendations found.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;









// // //with visualisation
// // import React, { useState } from "react";
// // import axios from "axios";
// // import GraphVisualization from "./GraphVisualization"; // Import the Graph Visualization component

// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [metadata, setMetadata] = useState(null);
// //   const [recommendations, setRecommendations] = useState([]);
// //   const [pathData, setPathData] = useState(null); // Store path data for graph visualization
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [showAll, setShowAll] = useState(false);
// //   const [showGraph, setShowGraph] = useState(false); // Toggle Graph Visualization

// //   // Handle file selection
// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   // Handle file upload and fetch recommendations
// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select a file to upload.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     setLoading(true);
// //     setError(null);
// //     setShowAll(false);
// //     setShowGraph(false); // Reset graph state

// //     try {
// //       const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       console.log("API Response:", response);

// //       if (response.data.error) {
// //         console.error("Server Error:", response.data.error);
// //         setError(`Server Error: ${response.data.error}`);
// //       } else {
// //         setMetadata(response.data.metadata);
// //         setRecommendations(response.data.recommendations?.recommended_papers || []);
// //         setPathData(response.data.recommendations?.path || null); // Store path data
// //       }
// //     } catch (error) {
// //       console.error("Error uploading file:", error);
// //       setError(`Error uploading file: ${error.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="App" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //       <h1 style={{ textAlign: "center", color: "#333", marginBottom: "50px" }}>📚 Academic Paper Recommendation System</h1>

// //       {/* Upload Section */}
// //       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
// //         <input type="file" onChange={handleFileChange} style={{ padding: "10px", fontSize: "16px" }} />
// //         <button 
// //           onClick={handleUpload} 
// //           disabled={loading} 
// //           style={{ 
// //             padding: "10px 20px", 
// //             fontSize: "16px", 
// //             cursor: "pointer", 
// //             background: "#007bff", 
// //             color: "#fff", 
// //             border: "none", 
// //             borderRadius: "5px",
// //             minWidth: "180px",
// //             textAlign: "center"
// //           }}
// //         >
// //           {loading ? "⏳ Processing..." : "📤 Upload and Analyze"}
// //         </button>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
// //           <strong>⚠️ {error}</strong>
// //         </div>
// //       )}

// //       {/* Metadata Display */}
// //       {metadata && (
// //         <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" }}>
// //           <h2>📄 Extracted Metadata:</h2>
// //           <p><strong>🔹 Title:</strong> {metadata.title || "N/A"}</p>
// //           <p><strong>📄 Abstract:</strong> {metadata.abstract || "N/A"}</p>
// //           <p><strong>✍️ Authors:</strong> {metadata.authors || "N/A"}</p>
// //           <p><strong>📅 Year:</strong> {metadata.year || "N/A"}</p>
// //         </div>
// //       )}

// //       {/* Recommendations Section */}
// //       {recommendations.length > 0 && (
// //         <div style={{ marginTop: "30px" }}>
// //           <h2>📌 Recommended Papers:</h2>
// //           {recommendations.slice(0, showAll ? recommendations.length : 2).map((paper, index) => (
// //             <div key={index} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#eef2ff", marginBottom: "10px" }}>
// //               <h3>🔹 Paper {index + 1}: {paper.title || "Untitled Paper"}</h3>
// //               <p><strong>📄 Abstract:</strong> {paper.abstract || "No abstract available."}</p>
// //               <p><strong>🏛️ Venue:</strong> {paper.venue || "Unknown Venue"}</p>
// //               <p><strong>📅 Year:</strong> {paper.year || "N/A"}</p>
// //               <hr style={{ border: "0.5px solid #ccc" }} />
// //             </div>
// //           ))}

// //           {/* View More / View Less Button */}
// //           {recommendations.length > 2 && (
// //             <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
// //               <button 
// //                 onClick={() => setShowAll(!showAll)} 
// //                 style={{ 
// //                   padding: "10px 20px", 
// //                   fontSize: "16px", 
// //                   background: "#007bff", 
// //                   color: "#fff", 
// //                   border: "none", 
// //                   borderRadius: "5px", 
// //                   cursor: "pointer", 
// //                   minWidth: "180px",
// //                   textAlign: "center"
// //                 }}
// //               >
// //                 {showAll ? "View Less" : "View More.."}
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Graph Visualization Button (Only if path data exists) */}
// //       {pathData && pathData.nodes && pathData.nodes.length > 0 && (
// //         <div style={{ textAlign: "center", marginTop: "20px" }}>
// //           <button 
// //             onClick={() => setShowGraph(true)} 
// //             style={{ 
// //               padding: "10px 20px", 
// //               fontSize: "16px", 
// //               background: "#28a745", 
// //               color: "#fff", 
// //               border: "none", 
// //               borderRadius: "5px", 
// //               cursor: "pointer",
// //               minWidth: "200px"
// //             }}
// //           >
// //             🔍 Visualize Graph
// //           </button>
// //         </div>
// //       )}

// //       {/* Graph Visualization Component */}
// //       {showGraph && pathData && (
// //         <GraphVisualization pathData={pathData} onClose={() => setShowGraph(false)} />
// //       )}

// //       {/* No Recommendations Message */}
// //       {!loading && recommendations.length === 0 && metadata && (
// //         <div style={{ marginTop: "30px", color: "#666", textAlign: "center" }}>
// //           <p>⚠️ No relevant recommendations found.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useState } from "react";
// import axios from "axios";


// function App() {
//   const [file, setFile] = useState(null);
//   const [metadata, setMetadata] = useState(null);
//   const [recommendations, setRecommendations] = useState([]);
//   const [pathData, setPathData] = useState(null); // Store path data for graph visualization
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showGraph, setShowGraph] = useState(false); // Toggle Graph Visualization
//   const [showAll, setShowAll] = useState(false); // ✅ Added this missing state

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const fetchGraphData = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/graph/");
//       setPathData(response.data);
//       console.log("Graph Data Fetched:", response.data);
//     } catch (error) {
//       console.error("Error fetching graph data:", error);
//     }
//   };

//   <button onClick={fetchGraphData}>Load Graph Data</button>




//   // Handle file upload and fetch recommendations
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true);
//     setError(null);
//     setShowGraph(false); // Reset graph state

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("API Response:", response);

//       if (response.data.error) {
//         setError(`Server Error: ${response.data.error}`);
//       } else {
//         setMetadata(response.data.metadata);
//         setRecommendations(response.data.recommendations?.recommended_papers || []);
//         setPathData(response.data.recommendations?.path || null); // Store path data
//       }
//     } catch (error) {
//       setError(`Error uploading file: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#333", marginBottom: "50px" }}>📚 Academic Paper Recommendation System</h1>

//       {/* Upload Section */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//         <input type="file" onChange={handleFileChange} style={{ padding: "10px", fontSize: "16px" }} />
//         <button 
//           onClick={handleUpload} 
//           disabled={loading} 
//           style={{ 
//             padding: "10px 20px", 
//             fontSize: "16px", 
//             cursor: "pointer", 
//             background: "#007bff", 
//             color: "#fff", 
//             border: "none", 
//             borderRadius: "5px",
//             minWidth: "180px",
//             textAlign: "center"
//           }}
//         >
//           {loading ? "⏳ Processing..." : "📤 Upload and Analyze"}
//         </button>

//         <button onClick={fetchGraphData}>Load Graph Data</button>

//       </div>

//        {/* Error Message */}
//        {error && (
//         <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
//           <strong>⚠️ {error}</strong>
//         </div>
//       )}

//       {/* Metadata Display */}
//       {metadata && (
//         <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" }}>
//           <h2>📄 Extracted Metadata:</h2>
//           <p><strong>🔹 Title:</strong> {metadata.title || "N/A"}</p>
//           <p><strong>📄 Abstract:</strong> {metadata.abstract || "N/A"}</p>
//           <p><strong>✍️ Authors:</strong> {metadata.authors || "N/A"}</p>
//           <p><strong>📅 Year:</strong> {metadata.year || "N/A"}</p>
//         </div>
//       )}

//       {/* Recommendations Section */}
//       {recommendations.length > 0 && (
//         <div style={{ marginTop: "30px" }}>
//           <h2>📌 Recommended Papers:</h2>
//           {recommendations.slice(0, showAll ? recommendations.length : 2).map((paper, index) => (
//             <div key={index} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#eef2ff", marginBottom: "10px" }}>
//               <h3>🔹 Paper {index + 1}: {paper.title || "Untitled Paper"}</h3>
//               <p><strong>📄 Abstract:</strong> {paper.abstract || "No abstract available."}</p>
//               <p><strong>🏛️ Venue:</strong> {paper.venue || "Unknown Venue"}</p>
//               <p><strong>📅 Year:</strong> {paper.year || "N/A"}</p>
//               <hr style={{ border: "0.5px solid #ccc" }} />
//             </div>
//           ))}

//           {/* View More / View Less Button */}
//           {recommendations.length > 2 && (
//             <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
//               <button 
//                 onClick={() => setShowAll(!showAll)} 
//                 style={{ 
//                   padding: "10px 20px", 
//                   fontSize: "16px", 
//                   background: "#007bff", 
//                   color: "#fff", 
//                   border: "none", 
//                   borderRadius: "5px", 
//                   cursor: "pointer", 
//                   minWidth: "180px",
//                   textAlign: "center"
//                 }}
//               >
//                 {showAll ? "View Less" : "View More.."}
//               </button>
//             </div>
//           )}
//         </div>
//       )}



//       {/* Graph Visualization Button */}
//       {pathData && pathData.nodes && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button 
//             onClick={() => setShowGraph(true)} 
//             style={{ 
//               padding: "10px 20px", 
//               fontSize: "16px", 
//               background: "#28a745", 
//               color: "#fff", 
//               border: "none", 
//               borderRadius: "5px", 
//               cursor: "pointer",
//               minWidth: "200px"
//             }}
//           >
//             🔍 Visualize Graph
//           </button>
//         </div>
//       )}

//       {/* Graph Visualization Component */}
//       {showGraph && pathData && (
//         <GraphVisualization pathData={pathData} onClose={() => setShowGraph(false)} />
//       )}
//     </div>
//   );
// }

// export default App;













