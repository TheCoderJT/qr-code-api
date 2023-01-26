const express = require("express");
const qr = require("qr-image");
const app = express();

app.get("/qr", (req, res) => {
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

app.listen(3000, () => {
  console.log("QR code server listening on port 3000!");
});
