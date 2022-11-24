
import { FC, memo, useContext } from "react";
import { Card, Text } from "@nextui-org/react";
import { CardDataNode } from "interfaces";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../context/diagram/Context";
import { Plus } from "react-iconly";

interface Props {
    data: CardDataNode;
    draggable?: boolean;
    onDragStart?: (event: any) => void;
    isConnectable?: boolean;
}

const CardNode: FC<Props> = ({
    data,
    draggable = false,
    onDragStart,
    isConnectable,
}) => {
    const { title, subTitle } = data;
    const { setDataToUpdate, addGenericItemOfData } = useContext(DiagramContext);
    return (
        <>
            {!draggable && (
                <Handle
                    type="target"
                    position={Position.Top}
                    isConnectable={isConnectable}
                />
            )}

            <Card
                draggable={draggable}
                // css={{ mw: "330px" }}
                onDragStart={onDragStart}
            >
                <Card.Header
                    css={{
                        cursor: "pointer",
                        background: "$blue500",
                        d: "flex",
                        alignItems: "center",
                        gap: "1rem"
                    }}
                >
                    <Text
                        onClick={() => !draggable && setDataToUpdate(data.id)}
                        b
                        color="white"
                        css={{ flex: 1 }}
                    >
                        {title}
                    </Text>
                    {!draggable && <div onClick={addGenericItemOfData}>
                        <Plus set="light" primaryColor="white" />
                    </div>}
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                    <Text>{subTitle}</Text>
                </Card.Body>
                <Card.Divider />
            </Card>
            {!draggable && (
                <>
                    <Handle
                        type="source"
                        id={data.id + "fdsf"}
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                    />
                </>
            )}
        </>
    );
};
export default memo(CardNode);
