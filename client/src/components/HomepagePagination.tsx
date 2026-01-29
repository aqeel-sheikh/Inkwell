import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HomepagePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const HomepagePagination: React.FC<HomepagePaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-12">
      <PaginationContent className="gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handlePageChange(currentPage - 1)}
            className={`cursor-pointer transition-all duration-300 bg--700 ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:text-white hover:bg-primary-900 "
            }`}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <Button
                onClick={() => handlePageChange(page)}
                variant="outline"
                size="sm"
                className={`cursor-pointer transition-all duration-300 shadow-none ${isActive ? "text-primary-100 bg-primary-700 hover:bg-primary-800 hover:text-white" : "hover:bg-stone-100 text-stone-700"}`}
              >
                {page}
              </Button>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handlePageChange(currentPage + 1)}
            className={`cursor-pointer transition-all duration-300 ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "hover:text-white hover:bg-primary-900 "
            }`}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
