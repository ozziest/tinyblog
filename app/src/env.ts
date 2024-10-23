type EnvKeys = "TurnstileSiteKey" | "ApiURL";

type Domains = "localhost" | "staging.tinyblog.space";

const VALUES: Record<Domains, Record<EnvKeys, string>> = {
  localhost: {
    TurnstileSiteKey: "1x00000000000000000000AA",
    ApiURL: "http://localhost:3005/api/v1",
  },
  "staging.tinyblog.space": {
    TurnstileSiteKey: "1x00000000000000000000AA",
    ApiURL: "https://api-staging.tinyblog.space/api/v1",
  },
};

const CURRENT_ENV = window.location.hostname as Domains;

export const env = (key: EnvKeys) => {
  return VALUES[CURRENT_ENV][key];
};
