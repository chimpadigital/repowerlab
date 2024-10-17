"use client"
import { title } from "@/components/primitives";
import React, { useState, useEffect } from "react";
import ModalDelete from "@/components/modals/ModalDelete";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ChipProps, Button, Spinner, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { DeleteIcon, EditIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { BlogI } from "@/models/blog";
import { MenuIcon } from "@/components/icons";
import Link from "next/link";
import { useGetBlogEntries } from "@/services/blog/blog";
import { useRouter } from "next/navigation";
import { useDebouncedSearch } from "@/utils/debounce";
const statusColorMap: Record<string, ChipProps["color"]> = {
  published: "success",
  paused: "danger",
  draft: "warning",
};



export default function BlogPage() {
  const { data, error, isLoading, refetch } = useGetBlogEntries("/entries")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter()
  const [deleteUrl, setDeleteUrl] = useState<string>("")
  const [titleDelete, setTitleDelete] = useState<string>("")
  const [debouncedQuery, setQuery] = useDebouncedSearch('_', 500);
  const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
  const [sortField, setSortField] = useState<string>("title");
  const columns = [
    { name: "TITLE", uid: "title" },
    { name: "PUBLISH DATE", uid: "published_at" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ]

  const handleSortChange = (columnKey: string) => {
    const newDirection = sortDirection === "ascending" ? "descending" : "ascending";
    setSortField(columnKey);
    setSortDirection(newDirection);
    refetch({
      sort: `${newDirection === "ascending" ? '' : '-'}${columnKey}`,
    });
  };

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
        const deleteFunc = () => {
          onOpen()
          setDeleteUrl(`/entries/${blog.id}`)
          setTitleDelete(blog.title)
        }
        return (
          <div className="relative flex items-center justify-center  gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-transparent"
                >
                  <MenuIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">

                <DropdownItem
                  key="edit"
                  startContent={<EditIcon />}
                >
                  <Link href={'/blog/edit/' + blog.id}>
                    Edit blog
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => { deleteFunc() }}
                  startContent={<DeleteIcon />}
                >
                  Delete blog
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [data]);

  const handleSearch = () => {
    if (debouncedQuery == "") refetch()
    refetch({ filter: { ["title"]: debouncedQuery } })
    console.log('Searching for:', debouncedQuery);
  }


  useEffect(() => {
    if (debouncedQuery != "_") {
      handleSearch();
    }
  }, [debouncedQuery]);

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
            onChange={(e) => setQuery(e.target.value)}
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

      <Table
        sortDescriptor={{ column: sortField, direction: sortDirection }}

        onSortChange={(e) => {
          if(e.column) handleSortChange((e.column as string))
        }} aria-label="Table blog entries data backend">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn allowsSorting key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={data.data}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}>
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalDelete isOpen={isOpen} title={titleDelete} afterDelete={() => { refetch() }} onOpenChange={onOpenChange} onOpen={onOpen} url={deleteUrl} />
    </>
  );

}
