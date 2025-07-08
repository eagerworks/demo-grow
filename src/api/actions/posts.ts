"use server";

import { revalidateTag } from "next/cache";
import createPost from "../fetchers/createPost";
import { redirect } from "next/navigation";
import deletePost from "../fetchers/deletePost";

type FormState = {
  status: "SUCCESS" | "ERROR" | "INITIAL";
  message: string;
};

type CreatePostData = {
  title: string;
  body: string;
  userId: number;
};

export async function createPostAction(_prevState: FormState, data: CreatePostData): Promise<FormState> {
  let redirectUrl;

  try {
    await createPost(data);
    revalidateTag("posts");
    redirectUrl = "/posts";

    return { status: "SUCCESS", message: "Post created successfully" };
  } catch (error) {
    return { status: "ERROR", message: `Failed to create post: ${error}` };
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }
}

export async function deletePostAction(_prevState: FormState, id: string): Promise<FormState> {
  let redirectUrl;

  try {
    await deletePost(id);

    revalidateTag("posts");
    revalidateTag(`post-${id}`);

    redirectUrl = "/posts";

    return { status: "SUCCESS", message: "Post deleted successfully" };
  } catch (error) {
    return { status: "ERROR", message: `Failed to delete post: ${error}` };
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }
}
