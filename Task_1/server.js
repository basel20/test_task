const express = require('express');
const inventoryApp = require('./inventory/app');
const historyApp = require('./history/app');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/inventory', inventoryApp);
app.use('/history', historyApp);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


