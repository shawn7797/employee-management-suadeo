export default class PaginationComponent {
  constructor(onPageChange) {
    this.currentPage = 1;
    this.pageSize = 10;
    this.onPageChange = onPageChange;
  }

  getPaginated(data) {
    const start = (this.currentPage - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }
}
