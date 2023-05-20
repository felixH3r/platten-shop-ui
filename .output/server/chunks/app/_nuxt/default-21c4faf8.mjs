import { _ as __nuxt_component_0$1 } from './nuxt-link-597bfa3a.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { T as TC } from './text-content-2ff7f78e.mjs';
import { f as useRoute, g as __nuxt_component_1, _ as _export_sfc } from '../server.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MainHeader",
  __ssrInlineRender: true,
  props: {
    showToConfigurator: Boolean
  },
  setup(__props) {
    const props = __props;
    const routingTo = computed(() => props.showToConfigurator ? TC.mainHeader.configurator : TC.mainHeader.home);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-header" }, _attrs))} data-v-1e408b16><div class="header-content flex-center" data-v-1e408b16>`);
      if (__props.showToConfigurator) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "shop-app" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(routingTo))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(routingTo)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<div data-v-1e408b16>Warenkorb</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e408b16"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const onHome = computed(() => {
      return useRoute().path === "/";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_main_header = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-wrapper" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_main_header, {
        "show-to-configurator": unref(onHome),
        class: "main-header"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-21c4faf8.mjs.map
