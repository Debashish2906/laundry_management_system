import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import laundryRoutes from "./routes/laundry.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//  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
app.use("/laundry", laundryRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL =
  "mongodb+srv://Debashish:manager@cluster0.brhww5f.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
