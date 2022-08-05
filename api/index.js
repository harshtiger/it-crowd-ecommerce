const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const {
  bulkCreateBrands,
  bulkCreateProducts,
  bulkCreateUsers,
} = require("../api/src/utils/fillScript");

const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`Listening at port ${PORT}`);

    // Fill database from here. Disable the second time if force: false is activated, as it'd drop it all from DB

    await bulkCreateBrands();

    await bulkCreateProducts();

    // just for testing, we create an admin user automatically
    await bulkCreateUsers();
  });
});
