import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import IssueStaticFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStaticFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
