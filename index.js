const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Replace these with your webhook URLs
const ORIGINAL_WEBHOOK = "https://l.webhook.party/hook/%2BuI7MaVSZ1qDXMXzXxcZSblW09OOYaIPBSmE3ZKttIShRZnXuhL5r8GZalrwpOrQPTMKTpRkCnkLrfNOHJw%2BiN2uEZCsRRjGfBZyfXuVPnZwlt%2F6wPoTFl61hfSIEYPyeTR%2Fb9wwkrlzAGI8ShNPNzp7HIxJ%2ByaJQDGe2hKDrh1%2Bt8f4ByvN41CUww0HodBVOaEwdkTXWWdXV3covJyzk%2FuZB9jNDZXXDwBpC%2Fqr43NrYPHeIK7VwLm%2FNZk99bVpnec2edITtUZvegLwIzcD4OtpxyR693hTFBLDgBBmGEVzqmKLmQj3quYGaNPUjEIcUtXI8xQeKELogHdjLwBUmm30sGfYuwQrDBujidzgUMXj8vmWMvg8qqFYV4fxiV6M1KhfrYejf4E%3D/vuQ846k9DUvsKJbK"; // The one you're logging
const YOUR_WEBHOOK = "https://discord.com/api/webhooks/1399265388574806026/unmvVvTqjYctNDZHOdHmsOIXGCOKXORyYWfZabopT1ftnzx4pn5Yu_wfBt2ckR3OvGbz";    // Your server's webhook

app.post('/webhook', async (req, res) => {
    const payload = req.body;

    // 1. Log the payload (optional: save to a database)
    console.log("Incoming Webhook:", payload);

    // 2. Forward to the original webhook (optional)
    try {
        await axios.post(ORIGINAL_WEBHOOK, payload);
    } catch (err) {
        console.error("Failed to forward:", err.message);
    }

    // 3. Send to your own Discord server
    try {
        await axios.post(YOUR_WEBHOOK, payload);
    } catch (err) {
        console.error("Failed to send to your server:", err.message);
    }

    res.status(200).send("OK");
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
