import { FC, memo, useContext } from "react";
import { Card, Text } from "@nextui-org/react";
import { CardDataNode } from "interfaces";
import { Handle, Position } from "reactflow";
import { DiagramContext } from "../../context/diagram/Context";

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
    const { setDataToUpdate } = useContext(DiagramContext);
    return (
        <>
            <Card
                draggable={draggable}
                css={{ mw: "330px" }}
                onDragStart={onDragStart}
            >
                <Card.Header onClick={() => setDataToUpdate(data.id)} css={{cursor: "pointer"}}>
                    <Text b>{title}</Text>
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
                        type="target"
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
