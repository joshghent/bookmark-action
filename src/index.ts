import { getInput, setFailed } from "@actions/core";
import * as github from "@actions/github";
import { buildReviewPost } from "./build-post-content";
import { getLinksFromDays } from "./get-bookmarks";
import { createPost } from "./create-post";

export async function action() {
  try {
    // Get inputs
    const payload = github.context.payload.inputs;

    const bookmarksFile = getInput("bookmarksFile");
    const numberOfDays = Number(getInput("numberOfDays"));
    const todaysDate = new Date();
    const xNumberOfDaysAgo = new Date();
    xNumberOfDaysAgo.setDate(xNumberOfDaysAgo.getDate() - numberOfDays);

    const bookmarks = await getLinksFromDays({
      bookmarksFile,
      dateFrom: xNumberOfDaysAgo,
      dateTo: todaysDate,
    });

    const postFileName = getInput("postFileName");
    const content = await buildReviewPost({
      bookmarks,
      dateFrom: xNumberOfDaysAgo,
      dateTo: todaysDate,
    });
    await createPost({ fileName: postFileName, content });
  } catch (error) {
    setFailed(error.message);
  }
}

export default action();
