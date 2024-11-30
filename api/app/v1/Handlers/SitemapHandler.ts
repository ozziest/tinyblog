import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import SitemapService from "../Services/SitemapService";

export default async (req: AxeRequest, res: AxeResponse) => {
  const redis = await IoCService.use<RedisAdaptor>("Redis");

  let content = await redis.get("sitemap.index");
  if (!content) {
    content = SitemapService.getIndex();
    await redis.set("sitemap.index", content, 60 * 60);
  }

  res.original.writeHead(200, { "Content-Type": "application/xml" });
  res.original.end(content);
};
