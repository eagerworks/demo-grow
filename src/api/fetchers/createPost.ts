import { postSchema, type Post } from "@/types/Post";
import { fetcher } from "../helpers/fetchers";

type CreatePostData = Pick<Post, "title" | "body" | "userId">;

export default async function createPost(data: CreatePostData) {
  const post = await fetcher("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const parsedPost = postSchema.safeParse(post);

  if (!parsedPost.success) {
    throw new Error("Failed to create post");
  }

  return parsedPost.data;
}
