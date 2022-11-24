import React, { useContext } from "react";
import ReactFlow, { ReactFlowProvider, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

import { Grid } from "@nextui-org/react";
import { CardNode, SideBar, ModalCard } from "components";
import { DiagramContext } from "context/diagram";

const nodeTypes = {
    card: CardNode,
};

const Diagram = () => {
    const {
        data,
        edges,
        nodes,
        onConnect,
        onDragOver,
        onDrop,
        reactFlowWrapper,
        onEdgesChange,
        onNodesChange,
        setFlowInstance,
        dataToUpdate,
    } = useContext(DiagramContext);

    return (
        <Grid.Container css={{ height: "100vh", overflow: "hidden" }}>
            <Grid
                xs={2}
                css={{
                    background: "$accents4",
                    overflowY: "auto",
                    maxH: "100%",
                    p: 0,
                }}
            >
                <SideBar data={data} />
            </Grid>
            <Grid xs={10}>
                <ReactFlowProvider>
                    <div
                        style={{ width: "100%", height: "100vh" }}
                        ref={reactFlowWrapper}
                    >
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            onInit={(init) => setFlowInstance(init)}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            fitView
                        >
                            <Background />
                            <Controls />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
                {dataToUpdate && <ModalCard />}
            </Grid>
        </Grid.Container>
    );
};

export default Diagram;
