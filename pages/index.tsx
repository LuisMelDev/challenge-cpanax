import { ChangeEvent, useState } from "react";
import {
    Grid,
    Card,
    Text,
    Container,
    Input,
    FormElement,
} from "@nextui-org/react";
import { Product, Loading, Error, ProductCard } from "components";
import { getProducts } from "services";
import { useGetData } from "hooks";

export default function Home() {
    const [quantity, setquantity] = useState(4);

    const { data, error, loading } = useGetData({ service: getProducts });

    const onChangeInput = (e: ChangeEvent<FormElement>) => {
        setquantity(parseInt(e.target.value || "0"));
    };

    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <Container>
            <Card as="div" css={{ my: 4 }}>
                <Card.Body>
                    <Text h3>Productos</Text>
                    <div style={{ marginTop: "2rem" }}>
                        <Input
                            width="20rem"
                            labelPlaceholder="Productos a mostrar por fila"
                            value={quantity}
                            type="number"
                            onChange={onChangeInput}
                        />
                    </div>
                </Card.Body>
            </Card>
            <Grid.Container gap={1} justify="flex-start">
                {data?.products.map((item: Product) => (
                    <ProductCard
                        key={item.id}
                        size={quantity}
                        brand={item.brand}
                        id={item.id}
                        thumbnail={item.thumbnail}
                        title={item.title}
                    />
                ))}
            </Grid.Container>
        </Container>
    );
}
