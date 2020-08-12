const express = require("express");
const app = require("./server/server");
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
