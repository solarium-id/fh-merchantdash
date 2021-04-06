import "../styles/globals.css";
// custom font for chakra-ui
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import Router, { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import HtmlHead from "../components/HtmlHead";
import Layout from "../components/Layout";
import theme from "../lib/theme";

// nprogress config
Router.events.on("routeChangeStart", (url: string) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// init react-query client
const queryClient = new QueryClient();

// main component
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HtmlHead title="Next Dashboard" />

        <ChakraProvider theme={theme} resetCSS>
          {/* jika menuju route login, tdk perlu merender Layout */}
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
