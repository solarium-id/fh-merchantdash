import React from "react";
import Head from "next/head";

function HtmlHead(props: { title: string }) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
    </>
  );
}

export default HtmlHead;
