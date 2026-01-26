import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BlogFilterButtons({
  setFilterPosts,
  filterPosts,
}: {
  setFilterPosts: (filter: string) => void;
  filterPosts: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer ">
          {filterPosts === "Published"
            ? "Published"
            : filterPosts === "Drafts"
              ? "Drafts"
              : "Filter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter Posts</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={filterPosts}
            onValueChange={setFilterPosts}
          >
            <DropdownMenuRadioItem value="All" className="cursor-pointer">
              All
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Published" className="cursor-pointer">
              Published
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Drafts" className="cursor-pointer">
              Drafts
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
