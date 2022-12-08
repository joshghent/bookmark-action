import { readFile } from "fs/promises";

export async function getLinksFromDays({
  bookmarksFile,
  dateFrom,
  dateTo,
}: {
  bookmarksFile: string;
  dateFrom: Date;
  dateTo: Date;
}): Promise<Bookmark[]> {
  const file = await readFile(bookmarksFile, "utf-8");
  const json = JSON.parse(file.toString());

  const linksForDateRange: Bookmark[] = json
    .map((item) => {
      if (item.date >= dateFrom && item.date <= dateTo) {
        return item;
      }
      // Filter out null
    })
    .filter((item) => item);

  return linksForDateRange;
}

export type Bookmark = {
  title: string;
  site: string;
  date: string;
  description: string;
  url: string;
  image?: string;
  notes?: string;
};
