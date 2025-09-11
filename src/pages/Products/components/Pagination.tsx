// src/features/products/components/Pagination.tsx
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function Pagination({ totalItems, itemsPerPage, onPageChange, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex gap-2 items-center">
      {/* Botón de página anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center cursor-pointer justify-center border rounded-md ${currentPage === 1 ? 'border-neutral text-neutral bg-bg-light' : 'border-neutral text-dark bg-white'}`}
      >
        <FaAngleLeft />
      </button>

      {/* Botones de páginas numeradas */}
      {visiblePages.map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`font-semibold w-8 h-8 flex items-center cursor-pointer justify-center border rounded-md ${currentPage === page ? 'bg-primary text-white border-primary' : 'bg-white text-dark border-neutral'}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-graphite">...</span>
        )
      ))}

      {/* Botón de página siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center cursor-pointer border rounded-md ${currentPage === totalPages ? 'border-neutral text-neutral bg-bg-light' : 'border-neutral text-dark bg-white'}`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}