import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Flex direction="column" gap="5">
        <IssueSummary closed={closed} inProgress={inProgress} open={open} />
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "Welcome to the Issue Tracker Dashboard. Here you can view the latest issues, their status, and track their progress.",
  openGraph: {
    title: "Issue Tracker - Dashboard",
    description:
      "Welcome to the Issue Tracker Dashboard. Here you can view the latest issues, their status, and track their progress.",
    url: "https://your-website.com/dashboard",
    siteName: "Issue Tracker",
    images: [
      {
        url: "https://your-website.com/dashboard-image.jpg",
        width: 800,
        height: 600,
        alt: "Issue Tracker Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker - Dashboard",
    description:
      "Welcome to the Issue Tracker Dashboard. Here you can view the latest issues, their status, and track their progress.",
    site: "@your_twitter_handle",
    images: [
      {
        url: "https://your-website.com/dashboard-image.jpg",
        width: 800,
        height: 600,
        alt: "Issue Tracker Dashboard",
      },
    ],
  },
};
