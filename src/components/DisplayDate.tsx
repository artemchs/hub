import { useDatesContext } from "@mantine/dates";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export function DisplayDate({ date }: { date: string | Date }) {
  const { locale } = useDatesContext();

  dayjs.extend(localizedFormat);

  return dayjs(date).locale(locale).format("LLL");
}
