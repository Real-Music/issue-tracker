"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
