import { CardDataNode } from "interfaces";
import { Node, Edge, ReactFlowInstance } from "reactflow";

export interface ReducerState {
    data: CardDataNode[];
    nodes: Node<any>[];
    edges: Edge<any>[];
    reactFlowInstance: ReactFlowInstance<any, any> | null;
    dataToUpdate: CardDataNode | null;
}

type DiagramActionType =
    | {
          type: "SET_REACT_FLOW_INSTANCE";
          payload: ReactFlowInstance<any, any>;
      }
    | {
          type: "CHANGE_NODES";
          payload: Node<{ data: CardDataNode }>[];
      }
    | {
          type: "CHANGE_EDGES";
          payload: Edge<any>[];
      }
    | {
          type: "SET_DATA_TO_UPDATE";
          payload: CardDataNode | any;
      }
    | {
          type: "REMOVE_DATA_TO_UPDATE";
      }
    | {
          type: "UPDATE_DATA";
          payload: CardDataNode;
      };

export const diagramReducer = (
    state: ReducerState,
    action: DiagramActionType
): ReducerState => {
    switch (action.type) {
        case "SET_REACT_FLOW_INSTANCE":
            return {
                ...state,
                reactFlowInstance: action.payload,
            };
        case "CHANGE_EDGES":
            return {
                ...state,
                edges: action.payload,
            };
        case "CHANGE_NODES":
            return {
                ...state,
                nodes: action.payload,
            };
        case "SET_DATA_TO_UPDATE":
            return {
                ...state,
                dataToUpdate: action.payload,
            };
        case "REMOVE_DATA_TO_UPDATE":
            return {
                ...state,
                dataToUpdate: null,
            };
        case "UPDATE_DATA":
            return {
                ...state,
                data: state.data.map((item) => {
                    if (item.id === action.payload.id) return action.payload;
                    return item;
                }),
                nodes: state.nodes.map((item) => {
                    if (item.data.id === action.payload.id) return {...item, data: action.payload};
                    return item;
                })
            };
        default:
            return state;
    }
};
