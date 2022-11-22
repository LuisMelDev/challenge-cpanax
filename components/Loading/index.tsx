import { Loading as LoadingUI } from "@nextui-org/react";
import { relative } from "path";

export const Loading = () => {
    return (
        <div
            style={{
                height: "100vh",
                position: 'relative',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LoadingUI size="lg" />
        </div>
    );
};
