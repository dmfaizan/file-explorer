# `File Explorer`

1. **Component Mock Up**

1.1 **Top Level**

```
<Page>
  // Get items in form of an object, see 5
  // Use logic like selectedId from state structure to dynamically display column based on selection
  <ExplorerHeader title={title}/>
    // Map function for the columns
    <Column items={items}/>
    <Column items={items}/>
    <Column items={items}/>
</Page>
```

1.2 **Column**

```
<Column>
  // Make conditional, if folder then have selectId logic to select continue to new column
  // If file, display the file information
  // Basically check if selected is folder or file.
  // Also include sorting logic and pass to column header, set what to sort, then sort items
  // as selected.
  <ColumnHeader title={title}/>
  // Map function for the items
  <Item item={item}/>
  <Item item={item}/>
  <Item item={item}/>
</Column>
```

1.3 **Item**

```
<Item>
  <Icon />
  <span>
    {item.title}
  </span>
  <PointerIcon /> // If folder display, if file don't display
</Item>
```

1.4 **Header**

Explorer Header

```
<ExplorerHeader>
  <BackButton>
    <BackIcon />
  </BackButton>
  <span>
    {title}
  </span>
</ExplorerHeader>
```

Column Header

```
<ExplorerHeader>
  <span>
    {title}
  </span>
  <SortDropdown>
    // Map enum
  </SortDropdown>
</ExplorerHeader>
```

2. **Data**

2.1 **Types** // Might wanna just dynamically determine the type based on the file name

- Folders (Folder)
- Text (.txt)
- Docx (.docx)
- PDF (.pdf)
- JSON (.json)

2.2 **Enums**

- Name
- Size
- Created

2.3 **JSON Examples**

(https://react.dev/learn/choosing-the-state-structure)

```
{
  "id" : 0,
  "name": "notes.txt",
  "type": "txt", // Should be displayed in capital later, might be dynamically determined from name
  "size": "24.5", // In KB, should be float, display as MB when it reaches 1 MB
  "path": TBD,
  "created": TBD, // Standardize format, has to look like this -> 1/12/2025 05:45 AM
}
```
