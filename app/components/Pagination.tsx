"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    console.log(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => changePage(1)}
        value="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage - 1)}
        value="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage + 1)}
        value="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        onClick={() => changePage(pageCount)}
        value="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
