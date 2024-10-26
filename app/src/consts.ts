import { IOption } from "./interfaces";

export const PER_PAGE = 10;

export const DEFAULT_LANG = navigator.language || "en";

export const SUPPORTED_LOCATIONS: IOption[] = [
  {
    label: "World Wide",
    value: "WW",
  },
  {
    label: "Turkey",
    value: "TR",
  },
];
