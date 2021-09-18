const colors = require("colors")
const fs = require("fs")
const path = require("path")

const { newErrorLog } = require("./log.js")

async function smallBanner() {
  var smallBannerPath = path.join(__dirname, "banners", "small.txt")

  fs.readFile(smallBannerPath, async (err, banner) => {
    if (err) newErrorLog(err)
    else {
      console.log(banner.toString().cyan)
      console.log("\t\t\tPower by Sina yeganeh\n".yellow.bold)
    }
  })  
}

module.exports = {
  smallBanner
}
