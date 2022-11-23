import { NextUIProvider } from "@nextui-org/react";
import { DiagramProvider } from "context/diagram";
import { NextPage } from "next";
import "react-base-table/styles.css";

const MyApp: NextPage<any> = ({ Component, pageProps }) => {
    return (
        <NextUIProvider>
            <DiagramProvider>
                <Component {...pageProps} />
            </DiagramProvider>
        </NextUIProvider>
    );
};

export default MyApp;
