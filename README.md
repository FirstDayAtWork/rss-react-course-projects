# Performance

<p>So I use some optimisation technics and here's the results.

## First render

### Before

<img src="./public/screens/table_load.JPG" />
<img src="./public/screens/table_load_2.JPG" />

### After

<img src="./public/screens/after/table.JPG" />

## Filter by Year

### Before

<img src="./public/screens/years.JPG" />

### After

<img src="./public/screens/after/years.JPG" />

## Sort

### Before

<img src="./public/screens/sort.JPG" />

### After

<img src="./public/screens/after/sort.JPG" />

## Search by name

### Before

<img src="./public/screens/search.JPG" />

### After

<img src="./public/screens/after/search.JPG" />

## Add cells to the table

### Before

<img src="./public/screens/add_cells.JPG" />

### After

<img src="./public/screens/after/cells.JPG" />

<p>So it gets sligtly worse everywhere except Search component! We get 4 rerenders instead of 7! WOWZERS!!! </p>
