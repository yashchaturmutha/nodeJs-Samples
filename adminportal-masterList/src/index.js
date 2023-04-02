const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');

const v1adminRouter = require("./v1/routes/adminRoutes");
const v1userRouter = require("./v1/routes/userRoutes");
const v1uploadRouter = require("./v1/routes/uploadRoute");

const app = express();
const PORT = process.env.PORT || 3009;

// enable CORS
app.use(cors(
    {
        // methods: ['GET','POST','DELETE','UPDATE','PATCH',],
        // origin: ["axe-throw", "http://localhost:3004", "http://localhost:3001"]
        origin: "*"
    }
)); 

// app.use(helmet({
//     // crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: false,
//   })
// );

app.use(bodyParser.json());
app.use("/admin/v1/axe", v1adminRouter);
app.use("/api/v1/axe", v1userRouter);
app.use("/admin/v1/uploadfile", v1uploadRouter);

app.listen(PORT, () => {
    console.log(`Node js Server is running on port ${PORT}`);
});