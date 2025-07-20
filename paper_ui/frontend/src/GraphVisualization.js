import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const GraphVisualization = ({ onClose }) => {
    const svgRef = useRef();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/graph/")
            .then((response) => {
                console.log("Graph Data:", response.data);
                setGraphData(response.data);
            })
            .catch((error) => console.error("Error fetching graph data:", error));
    }, []);

    useEffect(() => {
        if (!graphData) return;

        let { nodes, relationships } = graphData;

        const nodeMap = new Map(nodes.map(node => [node.id, node]));
        const links = relationships
            .map(rel => ({
                source: nodeMap.get(rel.start),
                target: nodeMap.get(rel.end),
            }))
            .filter(link => link.source && link.target);

        console.log("Processed Nodes:", nodes);
        console.log("Processed Links:", links);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = window.innerWidth * 0.7;
        const height = window.innerHeight * 0.7;

        svg.attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", width)
            .attr("height", height);

        const container = svg.append("g");
        const zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on("zoom", (event) => {
                container.attr("transform", event.transform);
            });
        svg.call(zoom);

        const colorScale = {
            "Paper": "steelblue",
            "Author": "green",
            "Keyword": "orange",
            "Venue": "purple",
            "Year": "red"
        };

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX(width / 2).strength(0.1))
            .force("y", d3.forceY(height / 2).strength(0.1));

        const link = container.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-width", 2);

        const node = container.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", 10)
            .attr("fill", d => colorScale[d.label] || "gray")
            .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded)
            );

        const text = container.append("g")
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .text(d => d.label)
            .attr("x", 15)
            .attr("y", 5)
            .style("font-size", "12px")
            .style("fill", "#333");

        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        simulation.on("tick", () => {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);

            text.attr("x", d => d.x + 10)
                .attr("y", d => d.y + 5);
        });

    }, [graphData]);

    return (
        <div className="flex flex-col items-center w-full mt-6">
            <h3 className="text-xl font-semibold mb-4">Graph Visualization</h3>
            <div className="w-full flex justify-start">
                <svg 
                    ref={svgRef} 
                    className="max-w-[80%] h-auto border rounded-lg shadow-lg"
                ></svg>
            </div>
            <button 
                onClick={onClose} 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Close
            </button>
        </div>
    );
};

export default GraphVisualization;
