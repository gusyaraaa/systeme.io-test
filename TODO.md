- basic setup

* router

* intall tailwind
* table basics

```
interface Table<T> {
    columns: Array<Cell<T>>;
    headColumns: Array<Cell<T>>;
    data: Array<T>;
}

interface Cell<T> {
    minWidth: number;
    flexGrowth: number;
    cellRenderer: ComponentType<CellRendererProps<T>>;
}
```

- base modal window view
  - modal for each product (for now change only 1 text field)
- text search
- dropdown filter by active status
- button to apply filters
