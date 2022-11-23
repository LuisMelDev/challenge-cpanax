import { createContext, Ref } from "react";
import { CardDataNode } from "interfaces";
import { Node, Edge, ReactFlowInstance, Connection } from "reactflow";

interface ContextProps {
    data: CardDataNode[];
    nodes: Node<{ data: CardDataNode } | { label: string }>[];
    edges: Edge<any>[];
    reactFlowWrapper: Ref<any>;
    reactFlowInstance: ReactFlowInstance<any, any> | null;
    onConnect: (params: Edge<any> | Connection) => void;
    onDragOver: (event: {
        preventDefault: () => void;
        dataTransfer: {
            dropEffect: string;
        };
    }) => void;
    onDrop: (event: {
        preventDefault: () => void;
        dataTransfer: {
            getData: (arg0: string) => any;
        };
        clientX: number;
        clientY: number;
    }) => void;
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    setFlowInstance: (instance: ReactFlowInstance<any, any>) => void;
    dataToUpdate: CardDataNode | null;
    setDataToUpdate: (id: string) => void;
    removeDataToUpdate: () => void;
    updateItemOfData: (item: CardDataNode) => void;
}

export const DiagramContext = createContext({} as ContextProps);
