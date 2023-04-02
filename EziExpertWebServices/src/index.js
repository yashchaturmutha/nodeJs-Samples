const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');

const v1adminRouter = require('./v1/routes/adminRoutes');

// Set up Global configuration access
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8080;

// for react port use 8080

app.use(cors(
  {
    // methods: ['GET','POST','DELETE','UPDATE','PATCH',],
    // origin: ["axe-throw", "http://localhost:3004", "http://localhost:3001"]
    origin: '*',
  },
));

app.use(bodyParser.json());
app.use(cookieparser());
app.use('/admin/v1/ezi', v1adminRouter);
// app.use("/api/v1/ezi", )

app.listen(PORT, () => {
  console.log(`Node js Server is running on port ${PORT}`);
});
