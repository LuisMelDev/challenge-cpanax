import {
    FC,
    MutableRefObject,
    ReactNode,
    useCallback,
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

const UI_INITIAL_STATE: ReducerState = {
    nodes: [
        {
            id: "1",
            type: "input",
            data: { label: "input node" },
            position: { x: 250, y: 5 },
        },
    ],
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
    const [state, dispatch] = useReducer(diagramReducer, UI_INITIAL_STATE);
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

    const onConnect = useCallback(
        (params: Edge<any> | Connection) => {
            dispatch({
                type: "CHANGE_EDGES",
                payload: addEdge(params, edges),
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

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
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
