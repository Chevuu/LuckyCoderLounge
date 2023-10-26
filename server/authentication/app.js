const express = require('express');
const app = express();

// Add middleware and route handlers here

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Authentication service is running on port ${port}`);
});
