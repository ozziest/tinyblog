import { format } from "date-fns";
import { DEFAULT_LANG } from "@/consts";
import * as locales from "date-fns/locale";

const useDailyLink = () => {
  const dailyHashtag = format(new Date(), "ddMMMMyyyy", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: (locales as any)[DEFAULT_LANG],
  });

  const dailyLink = `/tags/${dailyHashtag}`;
  return { dailyLink, dailyHashtag };
};

export default useDailyLink;
