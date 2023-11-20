const app = require("./servidor");
require("dotenv").config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(process.env.PORT);
