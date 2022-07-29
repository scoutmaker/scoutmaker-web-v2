import { SortingOrder } from '@/services/api/types'

import { useLocalStorage } from './use-local-storage'

interface ITableSettings {
  page: number
  rowsPerPage: number
  sortBy: string
  order: SortingOrder
}

export function useTable(key: string, initialSortBy?: string) {
  const [tableSettings, setTableSettings] = useLocalStorage<ITableSettings>({
    key,
    initialValue: {
      page: 0,
      rowsPerPage: 20,
      sortBy: initialSortBy || 'id',
      order: 'desc',
    },
  })

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setTableSettings({
      ...tableSettings,
      page: newPage,
    })
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTableSettings({
      ...tableSettings,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    })
  }

  function handleSort(id: string) {
    const isAsc = tableSettings.sortBy === id && tableSettings.order === 'asc'
    setTableSettings({
      ...tableSettings,
      page: 0,
      sortBy: id,
      order: isAsc ? 'desc' : 'asc',
    })
  }

  return {
    tableSettings,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  }
}
