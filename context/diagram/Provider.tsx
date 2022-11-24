import {
    FC,
    MouseEventHandler,
    MutableRefObject,
    ReactNode,
    useReducer,
    useRef,
} from "react";

import { ReducerState } from "./reducer";
import { DiagramContext } from "./Context";
import { diagramReducer } from "./reducer";
import { CardDataNode } from "../../interfaces/index";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    ReactFlowInstance,
} from "reactflow";

const INITIAL_STATE: ReducerState = {
    nodes: [],
    edges: [],
    data: [
        {
            id: "inicio",
            title: "Incio",
            subTitle: "Info de la Pagina",
        },
        {
            id: "about",
            title: "Acerca de",
            subTitle: "Info de la Pagina",
            type: "page",
        },
        {
            id: "product",
            title: "Productos",
            subTitle: "Info de la Pagina",
            type: "page",
        },
        {
            id: "shop",
            title: "Tienda",
            subTitle: "Info de la Pagina",
            type: "page",
        },
        {
            id: "blog",
            title: "Blogs",
            subTitle: "Info de la Pagina",
            type: "page",
        },
        {
            id: "header",
            title: "Header",
            subTitle: "Control interno de la pagina",
            type: "element",
        },
        {
            id: "container",
            title: "Container",
            subTitle: "Control interno de la pagina",
            type: "element",
        },
        {
            id: "content",
            title: "Content",
            subTitle: "Control interno de la pagina",
            type: "element-item",
        },
        {
            id: "footer",
            title: "Footer",
            subTitle: "Control interno de la pagina",
            type: "element",
        },
        {
            id: "menu",
            title: "Menu",
            subTitle: "Control interno de la pagina",
            type: "element-item",
        },
    ],
    reactFlowInstance: null,
    dataToUpdate: null,
};

export const DiagramProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(diagramReducer, INITIAL_STATE);
    const reactFlowWrapper = useRef(null);

    const { data, edges, nodes, reactFlowInstance } = state;

    const setFlowInstance = (instance: ReactFlowInstance<any, any>) => {
        dispatch({
            type: "SET_REACT_FLOW_INSTANCE",
            payload: instance,
        });
    };

    const onNodesChange = (changes: any) => {
        dispatch({
            type: "CHANGE_NODES",
            payload: applyNodeChanges(changes, nodes),
        });
    };

    const onEdgesChange = (changes: any) =>
        dispatch({
            type: "CHANGE_EDGES",
            payload: applyEdgeChanges(changes, edges),
        });

    const onConnect = (params: Edge<any> | Connection) => {
        dispatch({
            type: "CHANGE_EDGES",
            payload: addEdge(params, edges),
        });
    };

    const onDragOver = (event: {
        preventDefault: () => void;
        dataTransfer: { dropEffect: string };
    }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = (event: {
        preventDefault: () => void;
        dataTransfer: { getData: (arg0: string) => any };
        clientX: number;
        clientY: number;
    }) => {
        event.preventDefault();

        const reactFlowBounds = (
            reactFlowWrapper as MutableRefObject<any>
        ).current.getBoundingClientRect();
        const type = JSON.parse(
            event.dataTransfer.getData("application/reactflow")
        );

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
            return;
        }
        const position = (
            reactFlowInstance as ReactFlowInstance<any, any>
        ).project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: type.id,
            type: "card",
            target: type.id,
            position,
            data: { ...type, label: type.title },
        };

        dispatch({
            type: "CHANGE_NODES",
            payload: nodes.concat(newNode),
        });
    };

    const setDataToUpdate = (id: string) => {
        dispatch({
            type: "SET_DATA_TO_UPDATE",
            payload: data.find((item) => item.id === id),
        });
    };

    const removeDataToUpdate = () => {
        dispatch({ type: "REMOVE_DATA_TO_UPDATE" });
    };

    const updateItemOfData = (item: CardDataNode) => {
        dispatch({ type: "UPDATE_DATA", payload: item });
        removeDataToUpdate();
    };

    const addGenericItemOfData = (e: any) => {
        
        const reactFlowBounds = (
            reactFlowWrapper as MutableRefObject<any>
        ).current.getBoundingClientRect();
        const position = (
            reactFlowInstance as ReactFlowInstance<any, any>
        ).project({
            x: (e.clientX - reactFlowBounds.left) + 50,
            y: e.clientY - reactFlowBounds.top,
        });

        const item: CardDataNode = {
            id: Date.now() + "dfdsaf",
            subTitle: "subtitle",
            title: "title",
        }

        dispatch({ type: "ADD_DATA", payload: {data: item, position} });
        removeDataToUpdate();
    };

    return (
        <DiagramContext.Provider
            value={{
                ...state,
                onConnect,
                onDragOver,
                onDrop,
                reactFlowWrapper,
                onEdgesChange,
                onNodesChange,
                setFlowInstance,
                removeDataToUpdate,
                setDataToUpdate,
                updateItemOfData,
                addGenericItemOfData
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
