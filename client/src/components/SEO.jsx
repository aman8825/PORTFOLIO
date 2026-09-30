import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  author = 'Aman',
  seoSettings = null
}) => {
  const siteTitle = seoSettings?.seoMetaTitle || 'Aman | Portfolio';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  const defaultDescription = seoSettings?.seoMetaDescription || "Aman's professional portfolio and showcase. Discover my projects, skills, and experience in web development.";
  const metaDescription = description || defaultDescription;
  
  const siteUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  const metaImage = image || seoSettings?.seoOpenGraphImage || `${siteUrl}/og-default.jpg`; // Fallback image

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {seoSettings?.seoTwitterHandle && (
        <meta name="twitter:site" content={seoSettings.seoTwitterHandle} />
      )}
      
      {seoSettings?.seoEnableJsonLd && (
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "${author}",
              "url": "${canonicalUrl}",
              "jobTitle": "Full-Stack MERN Developer",
              "sameAs": []
            }
          `}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
