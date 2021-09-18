const fs = require("fs")
const path = require("path")

function newErrorLog(error) {
  var msg = "Error loged"
  var errorLogFilePath = path.join(__dirname, "error.log")

  if (error === null) {
    msg = "Error can't be none"
    console.error(msg)
  } else {
    fs.writeFile(errorLogFilePath, String(error), { encoding: "utf-8" }, (err) => {
      if (err) {
        msg = "Write file faild"
        console.error(`${msg}\n${err}`)
      } else 
      console.log(msg)
    })
  }
}

module.exports = { newErrorLog }
