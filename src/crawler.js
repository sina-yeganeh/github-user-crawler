const cheerio = require("cheerio")
const rp = require("request-promise")
const colors = require("colors")
const prompt = require("prompt-sync")({
  sigint: true,
})

const { newErrorLog } = require("./log.js")
const { smallBanner } = require("./banner.js")

const GITHUB_URL = "https://github.com/"
const GITHUB_USER_PAGE_CLASS = [
  ".p-name", // Nickname
  ".p-nickname", // Username
  ".p-note", // Description
  ".repo", // Pinned repo
  ".Counter", // Number of repo 
  ".p-label", // Location
  // ".Link--primary ", // Description link
  // ".js-calendar-graph-svg", Activity graph
]

var usernamePage
var username

smallBanner()

setTimeout(() => {
  var alertStruct = "[".red + "!".white + "]".red
  var msgStruct = "[".green + "*".white + "]".green
  var findStruct = "[".green + "~".white + "]".green
  console.log(alertStruct + " Enter Username Or Page Link.");
  username = prompt("root@home:~/".blue + " $".white)
  console.log(msgStruct + " Finding Userpage...")

  if (username.startsWith("http://")) console.log(alertStruct + " Use HTTPS For Safe Connection.")

  if (username.startsWith("http")) {
    usernamePage = usernamePage
  } else {
    usernamePage = GITHUB_URL + username
  }

  console.log(msgStruct + " Load Userpage...")
  rp(usernamePage)
  .then(HTMLFile => {
    if (HTMLFile !== undefined) {
      var $ = cheerio.load(HTMLFile)
      
      console.log(msgStruct + " Start Crawling...")
      var i
      for (i = 0; i <= GITHUB_USER_PAGE_CLASS.length; i++) {
        var item = $(GITHUB_USER_PAGE_CLASS[i])
        if (item !== undefined || null) {
          if (GITHUB_USER_PAGE_CLASS[i] === ".Counter") {
            console.log(findStruct + ` Class: ${GITHUB_USER_PAGE_CLASS[i]} | Text: ${item.text().substring(0, 2)}`)
          }
          else console.log(findStruct + ` Class: ${GITHUB_USER_PAGE_CLASS[i]} | Text: ${item.text()}`)
        } else {
          console.log(alertStruct + ` Class: ${GITHUB_USER_PAGE_CLASS} Is NULL`)
        }
      }
    }
    else console.error(alertStruct + " Can't Load Userpage, Check Your Internet Connection.")
  })
  .catch(err => {
    console.error(err)
    newErrorLog(err)
  })
}, 1500);
