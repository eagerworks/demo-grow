import getPostById from "@/api/fetchers/getPostById";
import DeletePostButton from "./_components/DeletePostButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div className="flex flex-col gap-4 w-100">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <DeletePostButton id={id} />
    </div>
  );
}
