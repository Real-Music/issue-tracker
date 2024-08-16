import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import prisma from "@/prisma/client";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (Number.isInteger(params.id)) notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <IssueDetails {...issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: `Issue Tracker - ${issue?.title} Detail`,
    description:
      "Welcome to the Issue Detail page. Here you can view the details of a specific issue, including its status, assignee, and other attributes.",
    openGraph: {
      title: `Issue Tracker - ${issue?.title} Detail`,
      description:
        "Welcome to the Issue Detail page. Here you can view the details of a specific issue, including its status, assignee, and other attributes.",
      url: "https://your-website.com/issue-detail",
      siteName: "Issue Tracker",
      images: [
        {
          url: "https://your-website.com/issue-detail-image.jpg",
          width: 800,
          height: 600,
          alt: "Issue Detail Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Issue Tracker - ${issue?.title} Detail`,
      description:
        "Welcome to the Issue Detail page. Here you can view the details of a specific issue, including its status, assignee, and other attributes.",
      site: "@your_twitter_handle",
      images: [
        {
          url: "https://your-website.com/issue-detail-image.jpg",
          width: 800,
          height: 600,
          alt: "Issue Detail Page",
        },
      ],
    },
  };
}

export default IssueDetailPage;
