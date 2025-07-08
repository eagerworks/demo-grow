"use client";

import { createPostAction } from "@/api/actions/posts";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form";
import { TextArea } from "@/components/TextArea";

const createPostDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  userId: z.number().min(1),
});

type CreatePostData = z.infer<typeof createPostDataSchema>;

export default function CreatePostForm() {
  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostDataSchema),
    defaultValues: {
      userId: 1,
      title: "",
      body: "",
    },
  });

  const [, startTransition] = useTransition();

  const [state, action, isPending] = useActionState(createPostAction, {
    status: "INITIAL" as const,
    message: "",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(() => {
      action(data);
    });
  });

  useEffect(() => {
    if (state.status === "ERROR") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <h1>Create New Post</h1>

      <Form {...form}>
        <form onSubmit={onSubmit} className="w-100 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <TextArea placeholder="Enter body" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} variant="outline">
            Submit
            {isPending && <LoaderIcon className="size-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
