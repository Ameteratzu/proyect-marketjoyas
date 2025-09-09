// src/features/products/components/ResultsDisplay.tsx

import React from 'react';

interface ResultsDisplayProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function ResultsDisplay({ totalItems, itemsPerPage, currentPage }: ResultsDisplayProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <span className="text-graphite font-sans font-bold">
      {startItem} - {endItem} de {totalItems} resultados
    </span>
  );
}