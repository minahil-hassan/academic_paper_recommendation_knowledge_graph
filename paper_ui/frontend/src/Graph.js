// import React, { useRef, useState, useEffect } from 'react';
// import ForceGraph2D from 'react-force-graph-2d';

// const Graph = ({ queryPaperId, topPaperId, onClose }) => {
//   const fgRef = useRef();
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [graphData, setGraphData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getColorByLabel = (label) => {
//     switch (label) {
//       case "Paper": return "#ba68c8";
//       case "Author": return "#f57c00";
//       case "Keyword": return "#ef5350";
//       case "Venue": return "#29b6f6";
//       case "Year": return "#d4af7f";
//       default: return "#ccc";
//     }
//   };

//   const renderNodeLabel = (node, ctx, globalScale) => {
//     const label = (
//       node.properties?.title ||
//       node.properties?.keyword ||
//       node.properties?.name ||
//       node.properties?.venue ||
//       node.properties?.year?.toString() ||
//       node.id
//     );

//     const truncated = typeof label === 'string' && label.length > 12 ? label.slice(0, 10) + "..." : label;
//     const fontSize = 14 / globalScale;
//     const radius = 8;

//     ctx.beginPath();
//     ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
//     ctx.fillStyle = getColorByLabel(node.label);
//     ctx.fill();
//     ctx.lineWidth = 0.5;
//     ctx.strokeStyle = '#333';
//     ctx.stroke();
//     ctx.closePath();

//     ctx.font = `${fontSize}px Sans-Serif`;
//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(truncated, node.x, node.y);
//   };

//   const renderLinkLabel = (link, ctx, globalScale) => {
//     if (!link || !link.source || !link.target) return;

//     const label = link.type;
//     if (!label) return;

//     const fontSize = 10 / globalScale;
//     ctx.font = `${fontSize}px Sans-Serif`;
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';

//     const x = (link.source.x + link.target.x) / 2;
//     const y = (link.source.y + link.target.y) / 2;
//     ctx.fillText(label, x, y);
//   };

//   useEffect(() => {
//     const fetchGraphPath = async () => {
//       if (!queryPaperId || !topPaperId) return;
//       setLoading(true);
//       console.log("📡 Fetching graph path for:", queryPaperId, topPaperId);
//       try {
//         const response = await fetch('/api/graph-path/', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ query_paper_id: queryPaperId, top_paper_id: topPaperId })
//         });

//         const text = await response.text();
//         try {
//           const data = JSON.parse(text);
//           console.log("✅ Graph data received:", data);
//           if (data && data.nodes && data.links) {
//             const idMap = new Map(data.nodes.map(n => [n.id, n]));
//             const resolvedLinks = data.links.map(l => ({
//               ...l,
//               source: idMap.get(l.start),
//               target: idMap.get(l.end)
//             })).filter(l => l.source && l.target);
//             setGraphData({ nodes: data.nodes, links: resolvedLinks });
//           } else {
//             console.error('Invalid graph data format:', data);
//           }
//         } catch (err) {
//           console.error('❌ Failed to parse graph JSON. Raw response:', text);
//         }
//       } catch (error) {
//         console.error('Error fetching graph data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGraphPath();
//   }, [queryPaperId, topPaperId]);

//   if (loading) return <p>Loading graph...</p>;
//   if (!graphData) return null;

//   return (
//     <div style={{ position: 'relative', height: '800px', width: '100%', display: 'flex', justifyContent: 'center' }}>
//       <ForceGraph2D
//         ref={fgRef}
//         graphData={graphData}
//         nodeLabel={(node) => (
//           node.properties?.title ||
//           node.properties?.keyword ||
//           node.properties?.name ||
//           node.properties?.venue ||
//           node.properties?.year?.toString() ||
//           node.id
//         )}
//         nodeCanvasObject={renderNodeLabel}
//         linkCanvasObject={renderLinkLabel}
//         linkCanvasObjectMode={() => 'after'}
//         nodeAutoColorBy={null}
//         linkDirectionalArrowLength={6}
//         linkDirectionalArrowRelPos={1}
//         linkColor={() => '#ccc'}
//         linkWidth={() => 1.2}
//         cooldownTicks={100}
//         onEngineStop={() => fgRef.current.zoomToFit(400)}
//         onNodeClick={setSelectedNode}
//         enableNodeDrag={true}
//       />

//       {onClose && (
//         <button
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: 20,
//             left: 20,
//             padding: '0.5rem 1rem',
//             backgroundColor: '#d32f2f',
//             color: 'white',
//             border: 'none',
//             borderRadius: '1px',
//             cursor: 'pointer',
//             zIndex: 10
//           }}
//         >
//           Close Graph
//         </button>
//       )}

//       {selectedNode && (
//         <div
//           className="popup"
//           style={{
//             position: 'absolute',
//             top: 20,
//             right: 20,
//             padding: '1rem',
//             backgroundColor: 'white',
//             border: '1px solid #ccc',
//             borderRadius: '2px',
//             maxWidth: '300px',
//             zIndex: 10
//           }}
//         >
//           <h3 style={{ marginBottom: '0.5rem' }}>{selectedNode.label}</h3>
//           <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
//             {JSON.stringify(selectedNode.properties, null, 2)}
//           </pre>
//           <button onClick={() => setSelectedNode(null)} style={{ marginTop: '0.5rem' }}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Graph;

import React, { useRef, useState, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';

const Graph = ({ queryPaperId, topPaperId, onClose }) => {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getColorByLabel = (label) => {
    switch (label) {
      case "Paper": return "#ba68c8";
      case "Author": return "#f57c00";
      case "Keyword": return "#ef5350";
      case "Venue": return "#29b6f6";
      case "Year": return "#d4af7f";
      default: return "#ccc";
    }
  };

  const renderNodeLabel = (node, ctx, globalScale) => {
    const label = (
      node.properties?.title ||
      node.properties?.keyword ||
      node.properties?.name ||
      node.properties?.venue ||
      node.properties?.year?.toString() ||
      node.id
    );

    const truncated = typeof label === 'string' && label.length > 8 ? label.slice(0, 6) + "..." : label;
    const fontSize = 10 / globalScale;
    const radius = 7;

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = getColorByLabel(node.label);
    ctx.fill();
    ctx.lineWidth = 0.5; // Reduced border weight
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.closePath();

    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(truncated, node.x, node.y);
  };

  const renderLinkLabel = (link, ctx, globalScale) => {
    if (!link || !link.source || !link.target) return;

    const label = link.type;
    if (!label) return;

    const fontSize = 10 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = (link.source.x + link.target.x) / 2;
    const y = (link.source.y + link.target.y) / 2;
    ctx.fillText(label, x, y);
  };

  useEffect(() => {
    const fetchGraphPath = async () => {
      if (!queryPaperId || !topPaperId) return;
      setLoading(true);
      console.log("📡 Fetching graph path for:", queryPaperId, topPaperId);
      try {
        const response = await fetch('/api/graph-path/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query_paper_id: queryPaperId, top_paper_id: topPaperId })
        });

        const text = await response.text();
        try {
          const data = JSON.parse(text);
          console.log("✅ Graph data received:", data);
          if (data && data.nodes && data.links) {
            const idMap = new Map(data.nodes.map(n => [n.id, n]));
            const resolvedLinks = data.links.map(l => ({
              ...l,
              source: idMap.get(l.start),
              target: idMap.get(l.end)
            })).filter(l => l.source && l.target);
            setGraphData({ nodes: data.nodes, links: resolvedLinks });
          } else {
            console.error('Invalid graph data format:', data);
          }
        } catch (err) {
          console.error('❌ Failed to parse graph JSON. Raw response:', text);
        }
      } catch (error) {
        console.error('Error fetching graph data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphPath();
  }, [queryPaperId, topPaperId]);

  if (loading) return <p>Loading graph...</p>;
  if (!graphData) return null;

  return (
    <div style={{ position: 'relative', height: '800px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={(node) => (
          node.properties?.title ||
          node.properties?.keyword ||
          node.properties?.name ||
          node.properties?.venue ||
          node.properties?.year?.toString() ||
          node.id
        )}
        nodeCanvasObject={renderNodeLabel}
        linkCanvasObject={renderLinkLabel}
        linkCanvasObjectMode={() => 'after'}
        nodeAutoColorBy={null}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkColor={() => '#ccc'}
        linkWidth={() => 1.2}
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(400)}
        onNodeClick={setSelectedNode}
        enableNodeDrag={true}
        d3ForceEngine={engine => {
          engine
            .force("charge", d3.forceManyBody().strength(-200))
            .force("link", d3.forceLink().distance(140));
        }}
      />

      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '0.5rem 1rem',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '1px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          Close Graph
        </button>
      )}

      {selectedNode && (
        <div
          className="popup"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '2px',
            maxWidth: '300px',
            zIndex: 10
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>{selectedNode.label}</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(selectedNode.properties, null, 2)}
          </pre>
          <button onClick={() => setSelectedNode(null)} style={{ marginTop: '0.5rem' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Graph;


