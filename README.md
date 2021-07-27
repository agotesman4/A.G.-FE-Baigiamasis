<h1>This is a simple Invoice app</h1>

### About the project

Using this app you can:

- create new Invoice (insert billers information, clients information, choose invoice payment terms options(generates automatically after you press), create product description, add an item list(item name, quantity, price, total will be shown as quantity X price))

- detailed Invoice view (by clicking on the Invoice you will be given a bit detailed preview. You will see Status, the Invoice unique number from db-Firebase, invoice information, a bit easier view of item list table, and total amount)

- save as Draft (same as create new Invoice just different status)

- edit current Invoice (can edit any information given in the invoice) (by clicking on Invoice -> Edit -> Update invoice (instant update))

- filter by Status (Draft/Pending/Paid/Clear filter)

- delete Invoice (instantly deletes Invoices from app and from db - Firebase )

### Additional tech info

- for Front-End i used Vue3 as main project app
- for Back-End i used Firebase (automatically creates collection in Firebase as "invoices" if no current invoices in db)
- app is not supported on Mobile phones!

### To test the project do the following:

1. Download or Clone and delete .gitignore file and run:

### `npm i`

2. After all modules installed run:

### `npm run serve`

3. ENJOY :)

<h1>© A.G. 2021</h1>
