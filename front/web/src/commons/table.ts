const table = {
  data: [],
  columns: [],
  pagination: {
    sortBy: '',
    descending: 'false',
    page: 1,
    // rowsNumber: 0, // Para DataTable
    rowsPerPage: 25
  },
  rowsOptions: [7, 10, 50, 100, 200, 500],
  selected: [],
  filter: '',
  loading: false,
  column(label, name, align, sortable = true) {
    return {
      name: name,
      align: align,
      label: label,
      field: name,
      sortable: sortable
    }
  }
}

export default table
