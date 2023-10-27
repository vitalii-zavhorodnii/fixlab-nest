export interface IPaginationAnswer<T> {
  items: Array<T>;
  itemsCount: number;
  totalItems: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
}
