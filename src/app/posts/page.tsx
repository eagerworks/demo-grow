import getPosts from "@/api/fetchers/getPosts";
import { Link } from "@/components/Link";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1>Posts</h1>

        <Link href="/posts/create" variant="filled">
          + Create New Post
        </Link>
      </div>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} variant="link">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
