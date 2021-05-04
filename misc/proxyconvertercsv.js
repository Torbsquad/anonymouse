var fs = require("fs")

var content = "Custom Name,Host,Port,Username,Password,Tags\n"
var targetFile = process.argv[2]
var outputFile = "proxylist.csv"

console.log("reading "+targetFile+"...")
fs.readFile(targetFile, "utf8", (err, data) => {
	if(err)console.log(err)
	console.log("writing "+outputFile+"...")
	data = data.split("\n")
	for(i in data){
		console.log(d)
		var d = data[i].split(":")
		d[1] = Number(d[1])
		if(d[0])content += `ID ${i},${d[0]},${d[1]},,,\n`
	}
	fs.writeFile(outputFile, content, ()=>{})
})
