"use client"
import { title } from "@/components/primitives";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, Button, Spinner } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { columns, blogs } from "./data";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { BlogI } from "@/models/blog";
import Link from "next/link";
import { useGetBlogEntries } from "@/services/blog/blog";
const statusColorMap: Record<string, ChipProps["color"]> = {
  published: "success",
  paused: "danger",
  draft: "warning",
};


export default function BlogPage() {
  const renderCell = React.useCallback((blog: BlogI, columnKey: React.Key) => {
    const cellValue = blog[columnKey as keyof BlogI];

    switch (columnKey) {
      case "title":
        return (
          <div>
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "published_at":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[blog.is_published ? "published" : "draft"]} size="sm" variant="flat">
            {blog.is_published ? "Published" : "Draft"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const { data, error, isLoading } = useGetBlogEntries("/entries")

  console.log(data)

  return (
    <>
      <div className="w-full flex pb-6">
        <h1 className={title({ size: "sm" })}>Success Cases</h1>

      </div>

      <div className="pb-8 flex justify-between">
        <div >
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow",
                "bg-transparent",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/10",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />

        </div>
        <Link href={"blog/new"}>
          <Button color="primary" className='p-4' endContent={<PlusIcon />}>
            Add new
          </Button>
        </Link>
      </div>

      <Table aria-label="Table blog entries data backend">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={data.data} 
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}>
          {(item) => (
            <TableRow  key={item?.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );

}
