import { HandlerTypes } from "axe-api";

export const FEED_ITEMS_PER_PAGE = 10;

export const USER_ITEMS_PER_PAGE = 25;

export const NOTIFICATION_ITEMS_PER_PAGE = 25;

export const DATA_MANIPULATION_HANDLERS = [
  HandlerTypes.DELETE,
  HandlerTypes.FORCE_DELETE,
  HandlerTypes.INSERT,
  HandlerTypes.UPDATE,
  HandlerTypes.PATCH,
];

export const DEFAULT_RATE_LIMITTER_WINDOW = 15 * 60;

export const SUPPORTED_LOCATIONS = ["WW", "TR"];
