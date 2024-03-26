import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";

const NetworkGraph = ({ graph }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    const nodes = Array.from(graph.contacts.values()).map((contact) => ({
      id: contact.name,
      label: contact.name,
      color: contact.canHelp ? "#7BE141" : "#97C2FC",
    }));

    const edges = [];
    graph.contacts.forEach((contact, name) => {
      contact.connections.forEach((connection) => {
        if (
          edges.find(
            (edge) => edge.from === connection.name && edge.to === name
          )
        )
          return;
        edges.push({
          from: name,
          to: connection.name,
        });
      });
    });

    const data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges),
    };

    const options = {};

    new Network(networkRef.current, data, options);
  }, [graph]);

  return <div ref={networkRef} style={{ height: "500px" }} />;
};

export default NetworkGraph;
