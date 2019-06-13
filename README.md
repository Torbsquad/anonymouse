## Anonymouse

Sourcecode for a Discord-Bot named Anonymouse

### ./scripts/\*\*

all exported Script-instances within the folder will get executed after the bot has successfully logged in.

### ./commands/\*\*

all exported Command-instances within the folder will get loaded and can be called with the prefix "."

### requirements:

- `process.env.anon` as discord-bot-token

### optional:

- `process.env.cleverbot_user`, `process.env.cleverbot_key` as cleverbot.io login
- `process.env.admins` with comma separated discord-user-ids for access for the eval code injection
