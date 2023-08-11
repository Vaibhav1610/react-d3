import React, { Component } from 'react';
import * as d3 from 'd3';
//import './TreeVisualization.css'; // Add your CSS styles here

class TreeVisualization extends Component {
  componentDidMount() {
    this.drawTree();
  }

  drawTree() {
    const data = {
      name: "Root",
      children: [
        {
          name: "Node 1",
          children: [
            { name: "Leaf 1" },
            { name: "Leaf 2" }
          ]
        },
        {
          name: "Node 2",
          children: [
            { name: "Leaf 3" },
            { name: "Leaf 4" }
          ]
        }
      ]
    };

    const width = 900;
    const height = 600;

    const svg = d3.select(this.refs.chart)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");

    const treeLayout = d3.tree().size([height, width-200]);

    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    const nodes = treeData.descendants();
    const links = treeData.links();

    const link = svg.selectAll(".link")
      .data(links)
      .enter().append("path")
      
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)).attr("fill","none").attr("stroke","darkblue").attr("stroke-width","2px");

    const node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
      .attr("r", 10);

    node.append("text")
      .attr("dy", "0.35em")
      .attr("x", d => d.children ? -13 : 13)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name);
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default TreeVisualization;
