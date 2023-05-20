import { u as useNuxtApp, a as useRuntimeConfig, v as vo } from '../server.mjs';
import { defineComponent, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrInterpolate } from 'vue/server-renderer';
import { u as usePostStore } from './posts-a2b81efe.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'axios';
import 'retry-axios';
import 'qs';
import 'ts-invariant';
import 'zen-observable-ts';
import 'ohash';
import 'cookie-es';
import 'graphql';
import 'optimism';
import '@wry/equality';
import '@wry/trie';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'crypto';
import 'graphql-tag';

const useMedusaClient = () => {
  const nuxtApp = useNuxtApp();
  const { medusa: config } = useRuntimeConfig().public;
  if (config.global)
    return nuxtApp.$medusa;
  if (!nuxtApp._medusaClient) {
    nuxtApp._medusaClient = new vo(config);
  }
  return nuxtApp._medusaClient;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const postStore = usePostStore();
    [__temp, __restore] = withAsyncContext(() => postStore.getProducts()), await __temp, __restore();
    const client = useMedusaClient();
    const { products } = ([__temp, __restore] = withAsyncContext(() => client.products.list()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>main page</h1><div>${ssrInterpolate(unref(products))}</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-84c28b34.mjs.map
