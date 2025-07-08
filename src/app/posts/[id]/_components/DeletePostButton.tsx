"use client";

import { deletePostAction } from "@/api/actions/posts";
import { Button } from "@/components/Button";
import { LoaderIcon } from "lucide-react";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function DeletePostButton({ id }: Props) {
  const [, startTransition] = useTransition();
  const [state, action, isPending] = useActionState(deletePostAction, {
    status: "INITIAL" as const,
    message: "",
  });

  useEffect(() => {
    if (state.status === "ERROR") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Button variant="destructive" disabled={isPending} onClick={() => startTransition(() => action(id))}>
      Delete Post
      {isPending && <LoaderIcon className="size-4 animate-spin" />}
    </Button>
  );
}
