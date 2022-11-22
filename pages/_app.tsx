import { NextUIProvider } from "@nextui-org/react";
import { NextPage } from "next";
import 'react-base-table/styles.css'

const MyApp: NextPage<any> = ({ Component, pageProps }) => {
    return (
        // 2. Use at the root of your app
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    );
};

export default MyApp;
