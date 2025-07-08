import { postSchema } from "@/types/Post";
import { fetcher } from "../helpers/fetchers";

const responseSchema = postSchema.array();

export default async function getPosts() {
  const posts = await fetcher("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
    next: {
      tags: ["all", "posts"],
    },
  });

  const parsedPosts = responseSchema.safeParse(posts);

  if (!parsedPosts.success) {
    throw new Error("Failed to parse posts");
  }

  return parsedPosts.data;
}
