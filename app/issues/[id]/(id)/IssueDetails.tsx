import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ title, status, createdAt, description }: Issue) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Flex my="2" className="space-x-3">
        <IssueStatusBadge status={status} />
        <Text>{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
