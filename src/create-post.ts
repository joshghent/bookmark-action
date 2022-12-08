import { setFailed } from "@actions/core";
import { writeFile } from "fs/promises";

export async function createPost({ fileName, content }): Promise<boolean> {
  try {
    await writeFile(fileName, JSON.stringify(content, null, 2), "utf-8");
    return true;
  } catch (error) {
    setFailed(error.message);
    throw error;
  }
}
