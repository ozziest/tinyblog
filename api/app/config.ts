import { CacheStrategies, IApplicationConfig } from "axe-api";
import errorHandler from "./v1/Handlers/ErrorHandler";

const config: IApplicationConfig = {
  /**
   * This is the default API prefix that will be used in all routes.
   *
   * @example GET /api/v1/users
   * @link https://axe-api.com/reference/api-configs.html#prefix
   */
  prefix: "api",

  /**
   * Enable or disable auto-created API documentation.
   *
   *
   * @link https://axe-api.com/learn/documentation.html#auto-created-api-docs
   */
  docs: process.env.DOCS === "true" || true,

  /**
   * It means which environment your API will work. Some examples; are
   * development, testing, staging, and production.
   *
   * You SHOULD use production for the production environment to protect
   * sensitive data.
   *
   * @link https://axe-api.com/reference/api-configs.html#env
   */
  env: process.env.NODE_ENV || "production",

  /**
   * It means in which port the application will run. You can select any port
   * that is available for your setup.
   *
   * @example 3000
   * @link https://axe-api.com/reference/api-configs.html#port
   */
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,

  /**
   * Error handler is a routine or mechanism in software that manages and
   * responds to errors or exceptions during program execution, ensuring
   * graceful handling and potentially preventing program termination.
   *
   * You can set a global error handler in here.
   *
   * @link https://axe-api.com/learn/error-handling.html#error-handler
   */
  errorHandler: errorHandler,

  /**
   * Axe API uses pino for logging.
   *
   * "pino-pretty" is a basic prettifier for Pino log lines. You don't have to
   * use it in your project.
   *
   * @link https://getpino.io
   * @link https://github.com/pinojs/pino-pretty
   * @link https://axe-api.com/reference/pino-logger-configs.html
   */
  pino: {
    level: process.env.LOG_LEVEL || "debug",
    transport: {
      target: process.env.LOG_TRANSPORT || "pino-pretty",
    },
  },

  /**
   * Axe API uses knex.js for database operations. All of the database
   * configurations are the same as the original documentation.
   *
   * @link https://axe-api.com/reference/database-configs.html
   * @link https://knexjs.org/guide/#configuration-options
   */
  database: {
    client: process.env.DB_CLIENT || "mysql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "database",
    },
    searchPath: [process.env.DB_USER || "user", "public"],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  /**
   * Axe API provides an internal rate limiter. You can set the rate limiter
   * options here.
   *
   * @link https://axe-api.com/reference/rate-limit-configs.html
   */
  rateLimit: {
    /**
     * The rate limiter can be enabled or disabled via the configuration item.
     * It should be boolean.
     *
     * @link https://axe-api.com/reference/rate-limit-configs.html#enabled
     */
    enabled: false,

    /**
     * The data storing adaptor. You can select memory or redis.
     *
     * @link https://axe-api.com/reference/rate-limit-configs.html#adaptor
     */
    adaptor: "memory",

    /**
     * It is an option to be able to trust the X-Forwarded-For HTTP header
     * value if the API is running behind a proxy server.
     *
     * The default value is false.
     *
     * @link https://axe-api.com/reference/rate-limit-configs.html#trustproxyip
     */
    trustProxyIP: false,

    /**
     * The maximum acceptable request count during the time window for the
     * generated key.
     *
     * @link https://axe-api.com/reference/rate-limit-configs.html#maxrequests
     */
    maxRequests: 100,

    /**
     * The request time window. The value must be specified in seconds.
     *
     * @link https://axe-api.com/reference/rate-limit-configs.html#windowinseconds
     */
    windowInSeconds: 10,
  },

  /**
   * Axe API uses redis library to connect to the Redis to be able to manage
   * Auto-caching and Rate limiting features.
   *
   * You can use the library's configuration.
   *
   * @link https://github.com/redis/node-redis/blob/HEAD/docs/client-configuration.md
   * @link https://axe-api.com/reference/redis-configs.html
   */
  redis: {},

  /**
   * Auto-caching feature configurations.
   *
   * @link https://axe-api.com/reference/cache-configs.html
   * @link https://axe-api.com/learn/caching.html
   */
  cache: {
    /**
     * You can use this configuration to enable or disable the auto-caching
     * across all endpoints.
     *
     * @link https://axe-api.com/reference/cache-configs.html#enable
     */
    enable: false,

    /**
     * The default invalidation time in seconds.
     *
     * @link https://axe-api.com/reference/cache-configs.html#ttl
     */
    ttl: 10,

    /**
     * The cache invalidation strategy.
     *
     * @link https://axe-api.com/reference/cache-configs.html#invalidation
     */
    invalidation: CacheStrategies.TimeBased,

    /**
     * The cache prefix that used on all cache keys. You can use your
     * application name.
     *
     * @link https://axe-api.com/reference/cache-configs.html#cacheprefix
     */
    cachePrefix: "axe-api",

    /**
     * The tag prefix that used for all tagged items in `TagBased`
     * invalidation strategies.
     *
     * @link https://axe-api.com/reference/cache-configs.html#tagprefix
     */
    tagPrefix: "tag",

    /**
     * Axe API exposes the cache information in HTTP Response headers if it is
     * Missed or Hit. You should set as NULL if you want to hide that information.
     *
     * @link https://axe-api.com/reference/cache-configs.html#responseheader
     */
    responseHeader: "X-Axe-API-Cache",
  },

  /**
   * Elasticsearch configuration for the Full-text search feature.
   *
   * @link https://axe-api.com/learn/full-text-search.html
   * @link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html
   */
  elasticSearch: {},

  /**
   * Axe API provides an full-text search configuration
   *
   * @link https://axe-api.com/reference/search-configs.html
   */
  search: {
    /**
     * You can set a prefix for the model index name prefix.
     *
     * @link https://axe-api.com/reference/search-configs.html#indexprefix
     */
    indexPrefix: "axe",
  },

  /**
   * You can change the validator library.
   *
   * @link https://axe-api.com/blog/2024-02-18-axe-api-v1-is-out.html#supporting-robus-validator-library
   */
  validator: "robust-validator",
};

export default config;
