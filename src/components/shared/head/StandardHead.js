import React from "react";
import { Helmet } from "react-helmet-async";
import getSharedHeadProperties from "../../../constants/head";

export default function StandardHead() {
  const sharedHeadProperties = getSharedHeadProperties();
  return (
    <Helmet>
      <title>Web3 is going just great</title>
      <meta
        name="description"
        content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021."
      />
      {sharedHeadProperties.meta.map((entry) => (
        <meta key={entry.name || "charset"} {...entry} />
      ))}
      {sharedHeadProperties.link.map((entry) => (
        <link key={entry.rel} {...entry} />
      ))}
      <meta property="og:url" content="https://web3isgoinggreat.com/" />
      <meta property="og:title" content="Web3 is going just great" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021"
      />
      <meta
        property="og:image"
        content="https://storage.googleapis.com/web3-334501.appspot.com/monkey-og.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@molly0xfff" />
      <meta name="twitter:title" content="Web3 is going just great" />
      <meta
        name="twitter:description"
        content="A timeline of some of the greatest hits in cryptocurrencies, NFTs, and other web3 projects since the beginning of 2021."
      />
      <meta
        name="twitter:image"
        content="https://storage.googleapis.com/web3-334501.appspot.com/monkey-twitter.png"
      />
      <meta
        name="twitter:image:alt"
        content="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames. Text next to it says 'Web3 is going just great.'"
      />
    </Helmet>
  );
}
