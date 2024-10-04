import { IoCService } from "axe-api";
import { describe, expect, test, beforeAll } from "@jest/globals";
import PostService from "../app/v1/Services/PostService";

const DB = {
  table() {
    return this;
  },
  async whereIn(key: string, values: string[]) {
    return values.map((hashtag, index) => {
      return {
        id: index + 1,
        hashtag,
      };
    });
  },
};

describe("PostService", () => {
  beforeAll(async () => {
    IoCService.singleton("Database", () => DB);
  });

  test("toPostContent() simple content", async () => {
    const content = `This is a content`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() simple username", async () => {
    const content = `This is a content! @iozguradem`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(1);
    expect(data.mentions[0]).toBe("@iozguradem");
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() username-ish", async () => {
    const content = `This is an email! test@mail.com`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() username at the end", async () => {
    const content = `Hej @iozguradem!`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(1);
  });

  test("toPostContent() simple hashtag", async () => {
    const content = `This is a content! #tinyblog`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(1);
    expect(data.hashtags[0].original).toBe("#tinyblog");
    expect(data.hashtags[0].cleaned).toBe("#tinyblog");
    expect(data.hashtags[0].id).toBe(1);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() cleaned hashtag", async () => {
    const content = `This is a content! #TinyBlog`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(1);
    expect(data.hashtags[0].original).toBe("#TinyBlog");
    expect(data.hashtags[0].cleaned).toBe("#tinyblog");
    expect(data.hashtags[0].id).toBe(1);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() Turkish hashtag", async () => {
    const content = `This is a content! #SANSÜR`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.hashtags.length).toBe(1);
    expect(data.hashtags[0].original).toBe("#SANSÜR");
    expect(data.hashtags[0].cleaned).toBe("#sansür");
  });

  test("toPostContent() multiple hashtag", async () => {
    const content = `This is a content! #tinyblog #rest`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(2);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() hashtag-ish", async () => {
    const content = `This is a content! https://tinyblog.space/profile#123`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(1);
  });

  test("toPostContent() starts with hashtag", async () => {
    const content = `#tinyblog #api #axeapi Hey!`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(3);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() ends with hashtag", async () => {
    const content = `Hey #tinyblog #api #axeapi`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(3);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() simple links", async () => {
    const content = `This is a content! https://tinyblog.space`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(1);
    expect(data.links[0].link).toBe("https://tinyblog.space");
    expect(data.links[0].uniqueId).toBeTruthy();
  });

  test("toPostContent() multiple items", async () => {
    const content = `This is a simple content! @iozguradme @tinyblog
      
      #tinyblog #rest #social #media

      https://tinyblog.space https://axe-api.com`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(content);
    expect(data.mentions.length).toBe(2);
    expect(data.hashtags.length).toBe(4);
    expect(data.links.length).toBe(2);
  });

  test("toPostContent() should trim the content", async () => {
    const content = `
    
      This is a simple content!
    
    `;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe("This is a simple content!");
    expect(data.mentions.length).toBe(0);
    expect(data.hashtags.length).toBe(0);
    expect(data.links.length).toBe(0);
  });

  test("toPostContent() should remove HTML Tags", async () => {
    const content = `<b>This</b> is a simple content!`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe("This is a simple content!");
  });

  test("toPostContent() should remove script tags", async () => {
    const content = `This is a simple content!
    
    <script>console.log('XSS')</script>
    `;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe("This is a simple content!");
  });

  test("toPostContent() should remove styles", async () => {
    const content = `This is a simple content!
    
    <style>body { background-color: red; }</style>
    `;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe("This is a simple content!");
  });

  test("toPostContent() should multiple lines", async () => {
    const content = `Line 1\n\n\n\n\n\n\n\nLine 2`;
    const data = await PostService.toPostContent(content);
    expect(data.content).toBe(`Line 1\n\nLine 2`);
  });
});
