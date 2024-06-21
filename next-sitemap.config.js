// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
//   changefreq: "weekly",
//   priority: 1,
//   sitemapSize: 5000,
//   exclude: ["/admin/*", "/login/*"],
//   routes: [
//     {
//       loc: "/",
//       priority: 1.0,
//     },
//     {
//       loc: "/series/*",
//       priority: 0.9,
//     },
//   ],
// };
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_CLIENT_URL || "https://holotv.space",
  changefreq: "weekly",
  priority: 1,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  exclude: ["/admin*", "/login*"],
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    if (path.startsWith("/series")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    };
  },
};
