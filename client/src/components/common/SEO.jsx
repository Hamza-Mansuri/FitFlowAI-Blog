import { Helmet } from "react-helmet-async";

function SEO({
  title = "Fitness Blog",
  description = "Fitness tips, nutrition guides and workout articles.",
  image = "",
  url = window.location.href,
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}

      <meta
        property="og:url"
        content={url}
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      {image && (
        <meta
          name="twitter:image"
          content={image}
        />
      )}

      <link
        rel="canonical"
        href={url}
      />
    </Helmet>
  );
}

export default SEO;