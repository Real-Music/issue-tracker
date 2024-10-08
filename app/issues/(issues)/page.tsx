import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description:
    "Welcome to the Issue Tracker Issues page. Here you can view, search, and filter issues based on their status and other attributes.",
  openGraph: {
    title: "Issue Tracker - Issues",
    description:
      "Welcome to the Issue Tracker Issues page. Here you can view, search, and filter issues based on their status and other attributes.",
    url: "https://your-website.com/issues",
    siteName: "Issue Tracker",
    images: [
      {
        url: "https://your-website.com/issues-image.jpg",
        width: 800,
        height: 600,
        alt: "Issue Tracker Issues Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker - Issues",
    description:
      "Welcome to the Issue Tracker Issues page. Here you can view, search, and filter issues based on their status and other attributes.",
    site: "@your_twitter_handle",
    images: [
      {
        url: "https://your-website.com/issues-image.jpg",
        width: 800,
        height: 600,
        alt: "Issue Tracker Issues Page",
      },
    ],
  },
};
