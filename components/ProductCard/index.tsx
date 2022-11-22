import { FC } from "react";
import { Card, Grid, Text, Row,  } from "@nextui-org/react";

export interface Product {
    id: string;
    title: string;
    brand: string;
    thumbnail: string;
    size: number;
}

export const ProductCard: FC<Product> = ({
    brand,
    id,
    thumbnail,
    title,
    size,
}) => {
    return (
        <Grid xs={12 / size} key={id}>
            <Card>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={thumbnail}
                        objectFit="cover"
                        height="20rem"
                        alt={title}
                    />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                        <Text b>{title}</Text>
                        <Text
                            css={{
                                color: "$accents7",
                                fontWeight: "$semibold",
                                fontSize: "$sm",
                            }}
                        >
                            {brand}
                        </Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    );
};
