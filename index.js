const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Base URLs for different routes
const MAIN_URL = "https://www.ajudasolidariedade.site";
const CHECKOUT_URL = "https://ajudasolidariedade.site";

app.get("/checkout/:value", (req, res) => {
  // Get the checkout value from the URL
  const checkoutValue = req.params.value;

  // Get any additional query parameters
  const queryString = req.url.includes("?")
    ? req.url.substring(req.url.indexOf("?"))
    : "";

  // Construct the full redirect URL using CHECKOUT_URL
  const redirectUrl = `${CHECKOUT_URL}/checkout/${checkoutValue}${queryString}`;

  // Perform 301 (permanent) redirect
  res.redirect(301, redirectUrl);
});

// Special route for /up1
app.get("/up1", (req, res) => {
  // Get any additional query parameters
  const queryString = req.url.includes("?")
    ? req.url.substring(req.url.indexOf("?"))
    : "";

  // Construct the full redirect URL using CHECKOUT_URL
  const redirectUrl = `${CHECKOUT_URL}/up1${queryString}`;

  // Perform 301 (permanent) redirect
  res.redirect(301, redirectUrl);
});

// Default route for any other path
app.get("*", (req, res) => {
  // Redirect to main URL with the full path and query parameters
  const fullPath = req.url;
  const redirectUrl = `${MAIN_URL}${fullPath}`;
  res.redirect(301, redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
