import Head from "next/head";
import { string } from "prop-types";

const Subtitle = (props) => {
  const { title, subtitle } = props;
  return (
    <Head>
      <title>{`${title} | ${subtitle}`}</title>
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="/meta/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/meta/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/meta/favicon-16x16.png"
      />
      <link rel="manifest" href="/meta/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/meta/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

Subtitle.propTypes = {
  title: string,
  subtitle: string,
};

Subtitle.defaultProps = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  subtitle: "Home |",
};

export default Subtitle;
