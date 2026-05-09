import { useState } from 'react';

interface PaginationState {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

export function usePagination(): PaginationState {
  const [page, setPageState] = useState(1);
  const [limit, setLimitState] = useState(20);

  const setPage = (p: number) => setPageState(p);
  const setLimit = (l: number) => {
    setLimitState(l);
    setPageState(1);
  };
  const reset = () => {
    setPageState(1);
    setLimitState(20);
  };

  return { page, limit, setPage, setLimit, reset };
}
