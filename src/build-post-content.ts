import { setFailed } from "@actions/core";
import { Bookmark } from "./get-bookmarks";

export function buildReviewPost({
  bookmarks,
  dateFrom,
  dateTo,
}: {
  bookmarks: Bookmark[];
  dateFrom: Date;
  dateTo: Date;
}): string {
  try {
    const links = bookmarks.map(({ title, url }, index) => {
      return `${index + 1}. [${title}](${url})`;
    });
    return `
  ---
  title: Assorted links (${dateFrom} - ${dateTo})
  date: ${dateTo}
  ---

  ${links.join("\n")}
  `;
  } catch (error) {
    setFailed(error);
    throw error;
  }
}
