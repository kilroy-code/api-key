const apiKeys = {}; // cache keys in memory for the session.
var getKey;
if (typeof window === 'undefined') {
  getKey = async function getKey() { return Promise.resolve("1"); };
} else {
  getKey = async function getKey(name, url = `/apiKey/${name}`) {
    let key = apiKeys[name];
    if (key) return key;

    // Even if not the first choice, it's an easier check that a fetch.
    // Might be set by some other authorization or click-through on the site.
    key = localStorage.getItem(name); 
    if (key) return key;

    let response = await fetch(url);
    key = await response.text();
    if (key) {
      apiKeys[name] = key;
      return key;
    }
  };
}
export { getKey };
