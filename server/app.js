require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db.js");
let journal = require("./controllers/journalcontroller"); // Notice the no .js it is not needed as it assumes that it is a js file.
let user = require("./controllers/usercontroller");
// Comment out the test route
// app.use("/test", function (req, res) {
//   res.send("This is a message from the test endpoint.");
// });
sequelize.sync();
app.use(require("./middleware/headers.js"));
app.use(express.json());
app.use("/user", user);
app.use("/journal", journal);

app.listen(3000, () => console.log("App is listening on port 3000"));
