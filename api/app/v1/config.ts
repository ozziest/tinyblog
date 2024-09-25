import { IVersionConfig, QueryFeature, allow } from "axe-api";

const config: IVersionConfig = {
  /**
   * The general database transaction configuration.
   *
   * @link https://axe-api.com/reference/version-configs.html#transactions
   */
  transaction: [],

  /**
   * The general response serializers.
   *
   * @link https://axe-api.com/reference/version-configs.html#serializers
   */
  serializers: [],

  /**
   * All supported languages by the API.
   *
   * @link https://axe-api.com/reference/version-configs.html#supportedlanguages
   */
  supportedLanguages: ["en"],

  /**
   * The default language if the HTTP client doesn't specify any.
   *
   * @link https://axe-api.com/reference/version-configs.html#defaultlanguage
   */
  defaultLanguage: "en",

  /**
   * The default Axe API Query Configurations.
   *
   * @link https://axe-api.com/reference/version-configs.html#query
   */
  query: {
    /**
     * The query limits. You can decide which query features are enabled or not.
     *
     * @link https://axe-api.com/reference/version-configs.html#query-limits
     */
    limits: [allow(QueryFeature.All)],

    /**
     * The default query parameters.
     *
     * @link https://axe-api.com/reference/version-configs.html#query-default
     */
    defaults: {
      perPage: 10,
      minPerPage: 5,
      maxPerPage: 100,
    },
  },
};

export default config;
