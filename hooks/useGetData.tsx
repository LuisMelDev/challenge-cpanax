import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Props {
    service: () => Promise<AxiosResponse<any, any>>;
    props?: any;
}

export const useGetData = ({ service, props }: Props) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        service()
            .then((dataResponse) => {
                setData(dataResponse.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return {
        loading: !data && !error,
        error,
        data,
    };
};
