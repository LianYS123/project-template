class Cookie {
  set(name, val, ops = {}) {
    // eslint-disable-next-line no-console
    if (!name) return console.error("请输入 Cookie 的名称");

    const { maxage, path, domain, secure } = ops;
    let { expires } = ops;
    let cookieVal = `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

    if (maxage) expires = new Date(+new Date() + maxage).toUTCString();
    if (path) cookieVal += `; path=${path}`;
    if (domain) cookieVal += `; domain=${domain}`;
    if (expires) cookieVal += `; expires=${expires}`;
    if (secure) cookieVal += `; secure=${secure}`;

    document.cookie = cookieVal;
  }

  getAll() {
    const cookies = document.cookie.split(/ *; */);
    const all = {};

    if (!cookies[0]) return all;

    for (let item of cookies) {
      const [key, val] = item.split("=");
      all[decodeURIComponent(key)] = decodeURIComponent(val);
    }

    return all;
  }

  get(name) {
    const allCookies = this.getAll();

    return name ? allCookies[name] : allCookies;
  }

  remove(name) {
    this.set(name, "", { maxage: -86400000 });
  }
}

export default new Cookie();
