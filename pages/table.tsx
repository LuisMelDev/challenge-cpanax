import { useState } from "react";
import BaseTable, { ColumnShape } from "react-base-table";
import { Card, Container, Image, Pagination, Table as TableUI, Text } from "@nextui-org/react";
import { useGetData } from "hooks";
import { getUsers } from "services";
import { Loading } from "components";

const columns: ColumnShape<unknown>[] = [
    {
        key: "firstName",
        title: "First Name",
        dataKey: "firstName",
        resizable: true,
        width: 150,
    },
    {
        key: "lastName",
        title: "Last Name",
        dataKey: "lastName",
        resizable: true,
        width: 150,
    },
    {
        key: "age",
        title: "Age",
        dataKey: "age",
        resizable: true,
        width: 150,
    },
    {
        key: "username",
        title: "Username",
        dataKey: "username",
        resizable: true,
        width: 150,
    },
    {
        key: "ip",
        title: "Ip Address",
        dataKey: "ip",
        resizable: true,
        width: 150,
    },
    {
        key: "image",
        title: "Image",
        dataKey: "image",
        resizable: true,
        cellRenderer: ({ cellData }: { cellData: string }) => (
            <Image
                width={320}
                height={180}
                src={cellData}
                alt="Default Image"
            />
        ),
        width: 150,
    },
];

const take = 15

const Table = () => {
    const [page, setPage] = useState(1);

    const { data, loading, onPagination } = useGetData({
        service: getUsers
    });


    if (loading) return <Loading />;
    console.log(page);
    return (
        <Container display="flex" justify="center">
            <Card variant="flat" css={{ maxWidth: "1200px", pt: 5 }}>
                <Text h2 css={{pl:10}}>User Table</Text>
                <BaseTable
                    fixed
                    columns={columns}
                    data={data.users}
                    width={1200}
                    height={800}
                />
                <TableUI.Pagination onPageChange={onPagination} total={data.total/take} initialPage={1} />
            </Card>
        </Container>
    );
};

export default Table;
