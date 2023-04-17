import "../styles/globals.css";
import store from "store";
import { ThemeProvider } from "theme";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "theme/createEmotionCache";
import { Layout } from "components/Layout";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    );
}
