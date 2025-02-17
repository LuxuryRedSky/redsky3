const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  // Get the full URL including query parameters
  const queryString = req.url.includes("?")
    ? req.url.substring(req.url.indexOf("?"))
    : "";

  // Base URL where you want to redirect (replace with your target domain)
  const targetDomain = "https://siteoficial.com";

  // Construct the full redirect URL
  const redirectUrl = `${targetDomain}${queryString}`;

  // Perform 301 (permanent) redirect
  res.redirect(301, redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
