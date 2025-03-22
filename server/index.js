const express = require("express");
const marked = require("marked");
const fs = require("node:fs");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/posts/:id", (req, res) => {
  console.log(req.params.id);
  fs.readdir("./posts", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    arr = data.values;
    console.log(arr);


	fs.readFile(
		"./posts/" + data[req.params.id],
		"utf8",
		(err, file) => {
		  if (err) {
			console.error(err);
			return;
		  }
		  console.log(file);
	
		  res.send(marked.parse(file));
		}
	  );
  });


});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
