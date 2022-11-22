import { AxiosResponse } from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { PaginationProps } from "../interfaces/index";

interface Props {
    service: (props?: any) => Promise<AxiosResponse<any, any>>;
}

export const useGetData = ({ service }: Props) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    const onPagination = (currentPage: number) => {
        setPage(currentPage);
    };

    useEffect(() => {
        service({ limit: 15, skip: (page - 1) * 15 })
            .then((dataResponse) => {
                setData(dataResponse.data);
            })
            .catch((err) => {
                setError(err.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return {
        loading: !data && !error,
        error,
        data,
        onPagination,
    };
};
