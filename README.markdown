konfu
===

config from files, env vars, args

installation
---

```
npm install konfu
```

usage
---

```
var config = require('konfu')
database.connect(config.database_url)
```

where to put stuff
---

configuration is read, in order, from:

- `config.json` and `.js`
- `config.[NODE_ENV].json` and `.js` where `[NODE_ENV]` is `process.env NODE_ENV`. If `NODE_ENV` is not set, it defaults to `dev`
- `config.travis.json`, if `process.env.TRAVIS`
- `process.env` (lowercased, so that if you `export DB_URL="something"`, `konfu.db_url` is set)
- `process.argv`, parsed with [optimist](https://github.com/substack/node-optimist), without `argv.$0` and `argv._`

keep in mind that process.env can, depending on your system, contain a lot of weird stuff. name carefully!

license
---

MIT