import React, { useEffect, useState } from "react";
import { EntryPropType } from "../../../js/entry";

import { getImageDimensions, stripHtml } from "../../../js/utilities";
import getSharedHeadProperties from "../../../constants/head";
import { STORAGE_URL } from "../../../constants/urls";

import { Helmet } from "react-helmet-async";

export default function EntryHead({ entry }) {
  const [isWaitingForImageDimensions, setIsWaitingForImageDimensions] =
    useState(true);
  const [imageDimensions, setImageDimensions] = useState({
    height: 630,
    width: 1200,
  });
  const title = stripHtml(entry.title);
  const description = stripHtml(entry.body);

  let imageSrc =
    "https://storage.googleapis.com/web3-334501.appspot.com/monkey-og.png";
  let twitterImageSrc =
    "https://storage.googleapis.com/web3-334501.appspot.com/monkey-twitter.png";
  let imageAlt =
    "Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames. Text next to it says 'Web3 is going just great.'";
  if (entry.image?.src) {
    imageSrc = `${STORAGE_URL}/entryAssets/${entry.image.src}`;
    twitterImageSrc = imageSrc;
    imageAlt = entry.image.alt || "Image";
  }

  useEffect(() => {
    if (entry.image?.src) {
      getImageDimensions(imageSrc)
        .then((dimensions) => {
          setImageDimensions(dimensions);
          setIsWaitingForImageDimensions(false);
        })
        .catch((err) => {
          setIsWaitingForImageDimensions(false);
        });
    } else {
      setIsWaitingForImageDimensions(false);
    }
  }, [entry.image, imageSrc]);

  const sharedHeadProperties = getSharedHeadProperties();

  if (isWaitingForImageDimensions) {
    return null;
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {sharedHeadProperties.meta.map((entry) => (
        <meta key={entry.name || "charset"} {...entry} />
      ))}
      {sharedHeadProperties.link.map((entry) => (
        <link key={entry.rel} {...entry} />
      ))}
      <meta property="og:type" content="article" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageSrc} />
      <meta property="og:image:width" content={`${imageDimensions.width}`} />
      <meta property="og:image:height" content={`${imageDimensions.height}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImageSrc} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
}

EntryHead.propTypes = {
  entry: EntryPropType.isRequired,
};
