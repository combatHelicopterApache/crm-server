require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const mongo = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/v1/group", require("./routes/groupRoutes"))
app.use("/api/v1/user", require("./routes/userRoutes"))
app.use("/api/v1/lead", require("./routes/leadRoutes"))
app.use("/api/v1/company", require("./routes/companyRoutes"))
app.use("/api/v1/brand", require("./routes/brandRoutes"))
app.use("/api/v1/office", require("./routes/officeRoutes"))

const serverStart = async () => {
  const PORT = process.env.PORT || 6000
  try {
    await mongo.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => console.log(`Started at port ${PORT}`))
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

serverStart()
