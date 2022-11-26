# api-keys

A trivial mechanism for a browser app or test suite to get a use key for an API, without embedding keys in source code.

## Exports

### async getKey(keyName, url = \`/apiKey/${keyName}\`)

Returns a promise that resolves to the product/use key for the service indicated by `keyName`.

When not in a browser (i.e., NodeJS), returns a meaningless string, but does not fail. (I have non-networked NodeJS stubbs for all the services I use, so no key is necessary. But by having `getKey()` still there, I can run my tests in browsers or in NodeJS.)

If the browser has something truthy for `localStorage.getItem(keyName)`, that value is used. So, for example, a developer can set this manually in the browser they use for testing.

Otherwise, a fetch is made to the given url. The response is assumed to be the naked text of the key. Thus a server can define a trivial route that supplies the service key to authorized users.

When running in a browser, the key is cached in memory for the session, so several modules in the same app can call getKey(name), but at most one fetch is made. (It is not put into localStorage, which would not be very safe if accidentally done for production users.)


