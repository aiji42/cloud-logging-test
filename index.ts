import express from "express";

const app = express();

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Start on port ${port} 🚀`);
});

app.get("/foo", (req, res) => {
  res.send(JSON.stringify({ message: "foo" }));
});
