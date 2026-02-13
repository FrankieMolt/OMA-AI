# 🎮 Discord Bot Setup Guide

## 1. Invite the Bot
Use this link to invite the OpenClaw bot to your server:
*(You need to generate this from the Discord Developer Portal using your Application ID)*

**Permissions Required:**
- Send Messages
- Read Message History
- Add Reactions
- Manage Messages (for deleting own)
- Embed Links
- Attach Files

## 2. Get Your Guild ID (Server ID)
1. Open Discord Settings → Advanced → Enable **Developer Mode**.
2. Right-click your server icon on the left sidebar.
3. Click **Copy Server ID**.
4. Save this ID.

## 3. Configure OpenClaw
We need to tell OpenClaw which guild (server) to listen to or default to.

**Update `openclaw.json` (or ask Frankie):**
```json
"discord": {
  "enabled": true,
  "token": "YOUR_BOT_TOKEN",
  "guildId": "YOUR_GUILD_ID"  <-- Optional default
}
```

## 4. Usage
- **DM the Bot:** Direct message the bot to start a private session.
- **Mention in Channel:** `@OpenClaw help` to interact in public channels.
- **Allowed Channels:** Check `groupPolicy` in config (default: `allowlist`).

## Troubleshooting
- **Bot Offline?** Check if the process is running (`openclaw status`).
- **No Response?** Check if the bot has permission to read the channel.
- **Gateway Intents:** Ensure "Message Content Intent" is enabled in the Discord Developer Portal.
