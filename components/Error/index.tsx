import { Card, Container, Text } from "@nextui-org/react";

export const Error = () => {
    return (
        <Container css={{d: "flex", justifyContent: "center", mt: "1rem"}}>
            <Card css={{ mw: "500px", backgroundColor: "$error" }}>
                <Card.Body>
                    <Text color="white">Ha Ocurrido un Error</Text>
                </Card.Body>
            </Card>
        </Container>
    );
};
