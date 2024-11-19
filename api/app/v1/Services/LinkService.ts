const mapLinks = (links: any) => {
  if (!Array.isArray(links)) {
    return [];
  }

  return (links || []).map((postLink: any) => {
    return {
      code: postLink.link.code,
      link: postLink.link.link,
    };
  });
};

export default {
  mapLinks,
};
