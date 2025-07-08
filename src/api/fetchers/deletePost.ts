import { fetcher } from "../helpers/fetchers";

export default async function deletePost(id: string) {
  await fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
}
