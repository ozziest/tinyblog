import { IoCService } from "axe-api";
import { format } from "date-fns";
import { SitemapStream, streamToPromise } from "sitemap";
import { Knex } from "knex";

const SITEMAP_DOMAIN = process.env.SITEMAP_DOMAIN;
const DOMAIN = process.env.DOMAIN;

const getIndex = (): string => {
  const today = format(new Date(), "yyyy-MM-dd");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${SITEMAP_DOMAIN}/sitemap-static.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${SITEMAP_DOMAIN}/sitemap-users.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${SITEMAP_DOMAIN}/sitemap-tags.xml</loc>
        <lastmod>${today}</lastmod>
    </sitemap>
</sitemapindex>`;
};

const getStaticLinks = async (): Promise<string> => {
  const sitemap = new SitemapStream({ hostname: DOMAIN });
  sitemap.write({ url: "/", changefreq: "always", priority: 1.0 });
  sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.8 });
  sitemap.end();

  const xml = await streamToPromise(sitemap);

  return xml.toString();
};

const getUsersLinks = async (): Promise<string> => {
  const sitemap = new SitemapStream({ hostname: DOMAIN });
  const db = await IoCService.use<Knex>("Database");
  const users = await db.table("users").select("username");

  for (const user of users) {
    sitemap.write({
      url: `/u/${user.username}`,
      changefreq: "weekly",
      priority: 0.8,
    });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  return xml.toString();
};

const getTagsLinks = async (): Promise<string> => {
  const sitemap = new SitemapStream({ hostname: DOMAIN });
  const db = await IoCService.use<Knex>("Database");
  const tags = await db.table("hashtags").select("hashtag");

  for (const tag of tags) {
    sitemap.write({
      url: `/tags/${tag.hashtag.replace("#", "")}`,
      changefreq: "daily",
      priority: 0.8,
    });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  return xml.toString();
};

export default {
  getIndex,
  getStaticLinks,
  getUsersLinks,
  getTagsLinks,
};
