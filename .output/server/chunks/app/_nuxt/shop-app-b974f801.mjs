import { useSSRContext, defineComponent, computed, mergeProps, unref, withAsyncContext, ref } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { d as defineStore, _ as _export_sfc } from '../server.mjs';
import { u as usePostStore } from './posts-a2b81efe.mjs';
import { T as TC } from './text-content-2ff7f78e.mjs';
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

const DEFAULT_THICKNESS = 0;
const DEFAULT_LENGTH = 2e3;
const DEFAULT_WIDTH = 1e3;
const useMainStore = defineStore("main", {
  state: () => ({
    panelConfigurator: {
      thickness: DEFAULT_THICKNESS,
      length: DEFAULT_LENGTH,
      width: DEFAULT_WIDTH
    },
    selectedProduct: null
  }),
  actions: {
    setThickness(thickness) {
      this.panelConfigurator.thickness = thickness;
    },
    setLength(length) {
      this.panelConfigurator.length = length;
    },
    setWidth(width) {
      this.panelConfigurator.width = width;
    },
    setSelectedProduct(selectedProduct) {
      this.selectedProduct = selectedProduct;
    }
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "PanelOptionCard",
  __ssrInlineRender: true,
  props: {
    product: null,
    selected: null
  },
  setup(__props) {
    const props = __props;
    const mainStore = useMainStore();
    const mediaItemUrl = computed(() => {
      if (!props.product.image || !props.product.image.mediaItemUrl) {
        return "";
      }
      return props.product.image.mediaItemUrl;
    });
    const isSelected = computed(() => {
      var _a;
      return props.product.productId === ((_a = mainStore.selectedProduct) == null ? void 0 : _a.productId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["panel-option-card", { "selected": unref(isSelected) }]
      }, _attrs))} data-v-491416f4><div class="panel-option-img-wrapper" data-v-491416f4><img${ssrRenderAttr("src", unref(mediaItemUrl))} class="panel-option-img" data-v-491416f4></div><span class="panel-option-name" data-v-491416f4>${ssrInterpolate(props.product.name)}</span></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/panel-content/PanelOptionCard.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-491416f4"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PanelOptionsSlider",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const postStore = usePostStore();
    const mainStore = useMainStore();
    [__temp, __restore] = withAsyncContext(() => postStore.getProducts()), await __temp, __restore();
    const products = computed(() => {
      return postStore.products;
    });
    mainStore.setSelectedProduct(products.value[0]);
    const selectedProductId = (_a = mainStore.selectedProduct) == null ? void 0 : _a.productId;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PanelOptionCard = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "panel-option-slider" }, _attrs))} data-v-378888bc><!--[-->`);
      ssrRenderList(unref(products), (product) => {
        _push(ssrRenderComponent(_component_PanelOptionCard, {
          product,
          selected: product.productId === unref(selectedProductId)
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/panel-content/PanelOptionsSlider.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const PanelOptionsSlider = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-378888bc"]]);
const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "300",
    viewBox: "0 0 140 350",
    fill: "#f1f1f1"
  }, _attrs))}><path fill-rule="evenodd" d="M118 165v2h-2v1l1 8-2-1c1 4 0 7-1 10l-2 3-1 2a193 193 0 0 0-6 5c0 6 0 13-2 18-1 6-4 9-5 14-1 6 1 13-1 19l-2 7c1 5 6 9 5 14 0 3-2 5-3 8v13l-2 10c-1 4-1 9-3 13s-4 7-2 10l1 2c1 3-2 5-2 7s3 4 3 5c1 3-3 6-6 7h-1l1 2 5 8 3 12v4l-2 4-5 1a72 72 0 0 0-6-1c-2 0-3-1-4-3l-1-4-2-4c-2-4-5-9-5-13a13 13 0 0 1 2-7c-2 0-2-3-2-5 1-1 2-3 1-5l-1-3v-3c5-15-2-32 1-48 1-4 2-9 0-13l-2-3 1-5v-2l-1-6-6-39-9 31c-3 1-4 4-5 6l-2 5 3 3c-2-1-3 1-4 2-4 9-3 20-5 30l-3 10a465 465 0 0 0-9 35l2 2c1 2-2 4-2 6l2 4c1 3-1 5-3 7v5l-1 6-2 3-2 7-2 7c-2 2-4 4-6 4h-3a46 46 0 0 1-9-1l-1-3v-3l2-12 5-9 3-7a165 165 0 0 1-3-7l2-2c3-2 2-7 2-11a217 217 0 0 1 2-53l2-7 3-6c1-1 2-4 1-6l-1-2 2-3-1-1-1-8c1-13 5-26 1-39-1-4-3-8-2-12v-1a21 21 0 0 1-5-14l-1 1c-2 0-2-2-2-4l-2-16c-1-10-3-20-1-30s3-20 3-31c0-5 0-11 3-15l4-7 1-2 1-1 19-8 6-2 5-6c1-1 2-3 4-3l-1-9c-1 1-2-1-3-2-2-3-2-8-1-12v-8c1-4 2-7 5-10l2-4v2c2-4 7-5 11-7l-1 1 11-1-1 1c3 0 7 2 10 4h-2l5 6-2-1c2 2 2 6 1 9 1 2-1 7-1 7v5l-1 9-1 1-2 1-1 5-3 4h-1v1l5 8 3 1a391 391 0 0 1 21 12c-1 2 4 5 3 7l2 10c3 10 4 20 5 30v4l1 1v5l1 7v27Zm-92 9-1-2h-1l1 3 1-1Zm73-35c-2-6-3-13-3-20v-2l-2 14a164 164 0 0 0 7 49c3-3 4-6 4-9h-1v-6l-1 1c-3-4-2-9-2-14l-2-13Zm-74 10c0 7 0 14 2 21l1-7-1-39c0-1 0 0 0 0l-1 3-1 22Z" clip-rule="evenodd"></path></svg>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icons/HumanSVG.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const HumanSVG = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PanelView",
  __ssrInlineRender: true,
  setup(__props) {
    const mainStore = useMainStore();
    const panelViewWrapper = ref(null);
    const panelTexture = computed(() => {
      var _a;
      return (_a = mainStore.selectedProduct) == null ? void 0 : _a.image.mediaItemUrl;
    });
    const panelMeasureFactor = computed(() => {
      return mainStore.panelConfigurator.width / mainStore.panelConfigurator.length;
    });
    const longerSide = computed(() => {
      if (mainStore.panelConfigurator.width - mainStore.panelConfigurator.length < 1) {
        return mainStore.panelConfigurator.length / 6 + "px";
      }
      return mainStore.panelConfigurator.width / 6 + "px";
    });
    const panelHeightFactor = computed(() => {
      if (panelMeasureFactor.value > 1) {
        return "100%";
      }
      return panelMeasureFactor.value * 100 + "%";
    });
    const panelWidthFactor = computed(() => {
      if (panelMeasureFactor.value <= 1) {
        return "100%";
      }
      return mainStore.panelConfigurator.length / mainStore.panelConfigurator.width * 100 + "%";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--3f444f8c": unref(longerSide),
        "--aba8a106": unref(panelWidthFactor),
        "--656c4d8e": unref(panelHeightFactor)
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "panel-view-wrapper",
        ref_key: "panelViewWrapper",
        ref: panelViewWrapper
      }, _attrs, _cssVars))} data-v-3b8eef92><div class="human-and-panel-wrapper" data-v-3b8eef92>`);
      _push(ssrRenderComponent(HumanSVG, { class: "human-svg" }, null, _parent));
      _push(`<div class="panel-img-wrapper" data-v-3b8eef92><img${ssrRenderAttr("src", unref(panelTexture))} class="panel-img" data-v-3b8eef92></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/panel-content/PanelView.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const PanelView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-3b8eef92"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PanelContentWrapper",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "panel-content-wrapper" }, _attrs))} data-v-93f6c0a8>`);
      _push(ssrRenderComponent(PanelView, null, null, _parent));
      _push(ssrRenderComponent(PanelOptionsSlider, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/panel-content/PanelContentWrapper.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-93f6c0a8"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ToggleButton",
  __ssrInlineRender: true,
  props: {
    value: Number,
    onSelect: Function
  },
  setup(__props) {
    const props = __props;
    const mainStore = useMainStore();
    const toggled = computed(() => {
      return mainStore.panelConfigurator.thickness === props.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["toggle-button flex-center", { "toggled": unref(toggled) }]
      }, _attrs))} data-v-d1fd3059><span data-v-d1fd3059>${ssrInterpolate(props.value)}</span><span data-v-d1fd3059>${ssrInterpolate(unref(TC).dimensions.MM)}</span></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/ToggleButton.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ToggleButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-d1fd3059"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ThicknessWrapper",
  __ssrInlineRender: true,
  setup(__props) {
    const mainStore = useMainStore();
    const thicknessValues = ref([8, 19, 25, 32]);
    mainStore.setThickness(thicknessValues.value[0]);
    const onSelect = (value) => {
      mainStore.setThickness(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-thickness" }, _attrs))} data-v-38b3e5ff><h4 data-v-38b3e5ff>Material Dicke:</h4><div class="thickness-options" data-v-38b3e5ff><!--[-->`);
      ssrRenderList(unref(thicknessValues), (value, index) => {
        _push(ssrRenderComponent(ToggleButton, {
          value,
          onSelect
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/sidebar/ThicknessWrapper.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ThicknessWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-38b3e5ff"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MeasurementsWrapper",
  __ssrInlineRender: true,
  props: {
    header: String,
    inputPlaceholder: String,
    usage: {
      type: String,
      required: true,
      validator(value) {
        return ["length", "width"].includes(value);
      }
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    useMainStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h4 data-v-b245c501>${ssrInterpolate(__props.header)}</h4><input${ssrRenderAttr("placeholder", props.inputPlaceholder)} class="measurement-input" data-v-b245c501><!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/sidebar/MeasurementsWrapper.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MeasurementsWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b245c501"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DescrWrapper",
  __ssrInlineRender: true,
  setup(__props) {
    const mainStore = useMainStore();
    const descr = computed(() => {
      var _a;
      return (_a = mainStore.selectedProduct) == null ? void 0 : _a.description;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h4>${ssrInterpolate(unref(TC).pcSidebar.descrHeader)}</h4><span>${ssrInterpolate(unref(descr))}</span><!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/sidebar/DescrWrapper.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-wrapper" }, _attrs))} data-v-16c04e54><h3 data-v-16c04e54>${ssrInterpolate(unref(TC).pcSidebar.header)}</h3>`);
      _push(ssrRenderComponent(ThicknessWrapper, null, null, _parent));
      _push(ssrRenderComponent(MeasurementsWrapper, {
        header: unref(TC).pcSidebar.lengthHeader,
        "input-placeholder": unref(TC).pcSidebar.lengthPlaceholder,
        usage: "length"
      }, null, _parent));
      _push(ssrRenderComponent(MeasurementsWrapper, {
        header: unref(TC).pcSidebar.widthHeader,
        "input-placeholder": unref(TC).pcSidebar.widthPlaceholder,
        usage: "width"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/sidebar/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-16c04e54"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PanelConfigurator",
  __ssrInlineRender: true,
  setup(__props) {
    usePostStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PanelContentWrapper = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "panel-configurator-wrapper" }, _attrs))} data-v-6c4acc3c>`);
      _push(ssrRenderComponent(Sidebar, null, null, _parent));
      _push(ssrRenderComponent(_component_PanelContentWrapper, null, null, _parent));
      _push(`<button data-v-6c4acc3c>add to cart</button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel-configurator/PanelConfigurator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6c4acc3c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shop-app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PanelConfigurator = __nuxt_component_0;
      _push(ssrRenderComponent(_component_PanelConfigurator, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop-app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shop-app-b974f801.mjs.map
