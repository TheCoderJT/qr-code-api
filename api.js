const express = require("express");
const port = 3333;
const qr = require("qr-image");
const app = express();

app.get("/qrpng", (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).send({ error: "URL is required" });
    return;
  }

  const qr_svg = qr.image(url, { type: "png" });
  res.setHeader("Content-disposition", "attachment; filename=qr.png");
  res.setHeader("Content-type", "image/png");
  qr_svg.pipe(res);
});

app.get("/qrsvg", (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).send({ error: "URL is required" });
    return;
  }

  const qr_svg = qr.image(url, { type: "svg" });
  res.setHeader("Content-disposition", "attachment; filename=qr.svg");
  res.setHeader("Content-type", "image/svg+xml");
  qr_svg.pipe(res);
});

app.listen(port || "3001", () => {
  console.log(`QR code server listening on port ${port}`);
});
