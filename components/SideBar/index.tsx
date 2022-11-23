import { FC } from "react";
import { Card, Container, Grid } from "@nextui-org/react";
import { CardDataNode } from "interfaces";
import { CardNode } from "..";

interface Props {
    data: CardDataNode[];
}

export const SideBar: FC<Props> = ({ data }) => {
    const onDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: string
    ) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <Container >
            <Grid.Container gap={2} justify="center">
                {data.map((item: CardDataNode) => (
                    <Grid xs={12} key={item.id}>
                        <CardNode
                            data={item}
                            draggable
                            onDragStart={(event) =>
                                onDragStart(event, JSON.stringify(item))
                            }
                        />
                    </Grid>
                ))}
            </Grid.Container>
        </Container>
    );
};
