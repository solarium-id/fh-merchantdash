import "../styles/globals.css";
import Router, { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import HtmlHead from "../components/HtmlHead";
import Layout from "../components/Layout";

Router.events.on("routeChangeStart", (url: string) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <HtmlHead title="Next Dashboard" />

      <ChakraProvider resetCSS>
        {/* jika menuju route login, tdk perlu merender Layout */}
        {router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </>
  );
}

export default MyApp;
