globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"medusa":{"baseUrl":"<http://localhost:9000>","maxRetries":3,"publishableApiKey":"","global":true}},"private":{"apiKey":""}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-05-15T07:50:52.362Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1fec-hELUBD5zLSJNHJKf5YgK3pDTYnw\"",
    "mtime": "2023-05-15T07:50:52.358Z",
    "size": 8172,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/_nuxt/Montserrat-100-1.3fef5946.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 23516,
    "path": "../public/_nuxt/Montserrat-100-1.3fef5946.woff2"
  },
  "/_nuxt/Montserrat-100-2.a8447cde.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 21276,
    "path": "../public/_nuxt/Montserrat-100-2.a8447cde.woff2"
  },
  "/_nuxt/Montserrat-100-3.56544b89.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 7764,
    "path": "../public/_nuxt/Montserrat-100-3.56544b89.woff2"
  },
  "/_nuxt/Montserrat-100-4.cffe1393.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 25036,
    "path": "../public/_nuxt/Montserrat-100-4.cffe1393.woff2"
  },
  "/_nuxt/Montserrat-100-5.ae919a7c.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 30928,
    "path": "../public/_nuxt/Montserrat-100-5.ae919a7c.woff2"
  },
  "/_nuxt/default.223fdfb9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c5-KZ6KArg792tGlq3Bsq8dV3WM5us\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 197,
    "path": "../public/_nuxt/default.223fdfb9.css"
  },
  "/_nuxt/default.f2e88582.js": {
    "type": "application/javascript",
    "etag": "\"417-GYt9dex3SKNZZsCz6PqcxoAjU5U\"",
    "mtime": "2023-05-15T07:50:52.361Z",
    "size": 1047,
    "path": "../public/_nuxt/default.f2e88582.js"
  },
  "/_nuxt/entry.3fbd1169.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b2e-9M0K5sDuX14i3XIfl1EQvBoaNLo\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 6958,
    "path": "../public/_nuxt/entry.3fbd1169.css"
  },
  "/_nuxt/entry.5f83f8e8.js": {
    "type": "application/javascript",
    "etag": "\"6565b-RxWVHVgbsJd26M80Wvuzmr40UjQ\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 415323,
    "path": "../public/_nuxt/entry.5f83f8e8.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.d67cb108.js": {
    "type": "application/javascript",
    "etag": "\"8d2-0o4tOcx5L7j4ZY70NYulp7aV4Hw\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 2258,
    "path": "../public/_nuxt/error-404.d67cb108.js"
  },
  "/_nuxt/error-500.8c7663b6.js": {
    "type": "application/javascript",
    "etag": "\"756-Gyf2OTXrxCgX7QceEPeWTwGcn7I\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.8c7663b6.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-05-15T07:50:52.360Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.415d0a0c.js": {
    "type": "application/javascript",
    "etag": "\"478-bqfAFprCFd6u8HT9VBJf7tEhAMo\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 1144,
    "path": "../public/_nuxt/error-component.415d0a0c.js"
  },
  "/_nuxt/index.77ab4114.js": {
    "type": "application/javascript",
    "etag": "\"23b-f453AZJK8wvQkR1H2i0Ndp5Wq/Y\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 571,
    "path": "../public/_nuxt/index.77ab4114.js"
  },
  "/_nuxt/nuxt-link.fc2c4604.js": {
    "type": "application/javascript",
    "etag": "\"1095-WjEU8TIU6gR1FPij4asB9u3yJ6U\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 4245,
    "path": "../public/_nuxt/nuxt-link.fc2c4604.js"
  },
  "/_nuxt/posts.f998caad.js": {
    "type": "application/javascript",
    "etag": "\"75d9-4cx+UVNlMHaG5LeqeGgjSdEkDxY\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 30169,
    "path": "../public/_nuxt/posts.f998caad.js"
  },
  "/_nuxt/shop-app.8ca86a5a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7b3-caGW+m7uJlYiPG0WxoAqQTji/vg\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 1971,
    "path": "../public/_nuxt/shop-app.8ca86a5a.css"
  },
  "/_nuxt/shop-app.d059449f.js": {
    "type": "application/javascript",
    "etag": "\"1b29-jn1MVHS2IBjJnFnyNm//QXWcXtw\"",
    "mtime": "2023-05-15T07:50:52.359Z",
    "size": 6953,
    "path": "../public/_nuxt/shop-app.d059449f.js"
  },
  "/_nuxt/text-content.a09db183.js": {
    "type": "application/javascript",
    "etag": "\"2dd-S3wsjBT7vhfz5NPiDF6XEqn8epo\"",
    "mtime": "2023-05-15T07:50:52.358Z",
    "size": 733,
    "path": "../public/_nuxt/text-content.a09db183.js"
  },
  "/fonts/Montserrat-100-1.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.357Z",
    "size": 23516,
    "path": "../public/fonts/Montserrat-100-1.woff2"
  },
  "/fonts/Montserrat-100-2.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.357Z",
    "size": 21276,
    "path": "../public/fonts/Montserrat-100-2.woff2"
  },
  "/fonts/Montserrat-100-3.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.357Z",
    "size": 7764,
    "path": "../public/fonts/Montserrat-100-3.woff2"
  },
  "/fonts/Montserrat-100-4.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.357Z",
    "size": 25036,
    "path": "../public/fonts/Montserrat-100-4.woff2"
  },
  "/fonts/Montserrat-100-5.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.356Z",
    "size": 30928,
    "path": "../public/fonts/Montserrat-100-5.woff2"
  },
  "/fonts/Montserrat-300-10.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.356Z",
    "size": 30928,
    "path": "../public/fonts/Montserrat-300-10.woff2"
  },
  "/fonts/Montserrat-300-6.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.356Z",
    "size": 23516,
    "path": "../public/fonts/Montserrat-300-6.woff2"
  },
  "/fonts/Montserrat-300-7.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.356Z",
    "size": 21276,
    "path": "../public/fonts/Montserrat-300-7.woff2"
  },
  "/fonts/Montserrat-300-8.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.356Z",
    "size": 7764,
    "path": "../public/fonts/Montserrat-300-8.woff2"
  },
  "/fonts/Montserrat-300-9.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.355Z",
    "size": 25036,
    "path": "../public/fonts/Montserrat-300-9.woff2"
  },
  "/fonts/Montserrat-400-11.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.355Z",
    "size": 23516,
    "path": "../public/fonts/Montserrat-400-11.woff2"
  },
  "/fonts/Montserrat-400-12.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.355Z",
    "size": 21276,
    "path": "../public/fonts/Montserrat-400-12.woff2"
  },
  "/fonts/Montserrat-400-13.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.355Z",
    "size": 7764,
    "path": "../public/fonts/Montserrat-400-13.woff2"
  },
  "/fonts/Montserrat-400-14.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.354Z",
    "size": 25036,
    "path": "../public/fonts/Montserrat-400-14.woff2"
  },
  "/fonts/Montserrat-400-15.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.354Z",
    "size": 30928,
    "path": "../public/fonts/Montserrat-400-15.woff2"
  },
  "/fonts/Montserrat-500-16.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.354Z",
    "size": 23516,
    "path": "../public/fonts/Montserrat-500-16.woff2"
  },
  "/fonts/Montserrat-500-17.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.353Z",
    "size": 21276,
    "path": "../public/fonts/Montserrat-500-17.woff2"
  },
  "/fonts/Montserrat-500-18.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.353Z",
    "size": 7764,
    "path": "../public/fonts/Montserrat-500-18.woff2"
  },
  "/fonts/Montserrat-500-19.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.353Z",
    "size": 25036,
    "path": "../public/fonts/Montserrat-500-19.woff2"
  },
  "/fonts/Montserrat-500-20.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.352Z",
    "size": 30928,
    "path": "../public/fonts/Montserrat-500-20.woff2"
  },
  "/fonts/Montserrat-700-21.woff2": {
    "type": "font/woff2",
    "etag": "\"5bdc-kbe4RlHmqrInHAVi3fvZNQdiT5w\"",
    "mtime": "2023-05-15T07:50:52.352Z",
    "size": 23516,
    "path": "../public/fonts/Montserrat-700-21.woff2"
  },
  "/fonts/Montserrat-700-22.woff2": {
    "type": "font/woff2",
    "etag": "\"531c-dxeQt3a14bwwOcM3Ak5ACXQYQgg\"",
    "mtime": "2023-05-15T07:50:52.352Z",
    "size": 21276,
    "path": "../public/fonts/Montserrat-700-22.woff2"
  },
  "/fonts/Montserrat-700-23.woff2": {
    "type": "font/woff2",
    "etag": "\"1e54-dJzudLExOctQcGmkF1KSCCW86mQ\"",
    "mtime": "2023-05-15T07:50:52.352Z",
    "size": 7764,
    "path": "../public/fonts/Montserrat-700-23.woff2"
  },
  "/fonts/Montserrat-700-24.woff2": {
    "type": "font/woff2",
    "etag": "\"61cc-Zkq/xJQQVGACE92lGj1vDQWzwxI\"",
    "mtime": "2023-05-15T07:50:52.352Z",
    "size": 25036,
    "path": "../public/fonts/Montserrat-700-24.woff2"
  },
  "/fonts/Montserrat-700-25.woff2": {
    "type": "font/woff2",
    "etag": "\"78d0-f2wX4+WSzYvTRrnMJh2N2WG4rvc\"",
    "mtime": "2023-05-15T07:50:52.351Z",
    "size": 30928,
    "path": "../public/fonts/Montserrat-700-25.woff2"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_2kGUnq = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_2kGUnq, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_2kGUnq, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
