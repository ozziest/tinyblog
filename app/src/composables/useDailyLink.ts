import { format } from "date-fns";
import { DEFAULT_LANG } from "@/consts";
import * as locales from "date-fns/locale";
import useAuthStore from "@/stores/authStore";

const useDailyLink = () => {
  const authStore = useAuthStore();
  const userLocale = authStore.state?.user?.location?.toLowerCase();
  const dailyHashtag = format(new Date(), "ddMMMMyyyy", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locale: (locales as any)[userLocale || DEFAULT_LANG],
  });

  const dailyLink = `/tags/${dailyHashtag}`;
  return { dailyLink, dailyHashtag };
};

export default useDailyLink;
