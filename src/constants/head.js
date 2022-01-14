const getSharedHeadProperties = () => {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return {
    meta: [
      {
        charset: "utf-8",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#5948a4" },
      { name: "author", content: "Molly White" },
      { name: "msapplication-TileColor", content: "#5948a4" },
      {
        name: "msapplication-config",
        content: `${PUBLIC_URL}/browserconfig.xml`,
      },
      { name: "twitter:site", content: "@web3isgreat" },
      { name: "twitter:creator", content: "@molly0xfff" },
    ],
    link: [
      { rel: "shortcut icon", href: `${PUBLIC_URL}/favicon.ico` },
      { rel: "apple-touch-icon", href: `${PUBLIC_URL}/logo192.png` },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${PUBLIC_URL}/favicon-32x32.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `${PUBLIC_URL}/favicon-16x16.png`,
      },
      {
        rel: "mask-icon",
        href: `${PUBLIC_URL}/safari-pinned-tab.svg`,
        color: "#5948a4",
      },
      {
        rel: "manifest",
        href: `${PUBLIC_URL}/manifest.json`,
      },
      {
        rel: "alternate",
        type: "application/xml",
        title: "Subscribe to this timeline",
        href: "https://web3isgoinggreat.com/feed.xml",
      },
    ],
  };
};

export default getSharedHeadProperties;
