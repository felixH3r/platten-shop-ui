import { defineComponent, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrInterpolate } from 'vue/server-renderer';
import { gql } from 'graphql-tag';
import { d as defineStore, u as useAsyncQuery } from '../server.mjs';
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

const postsQuery = gql`
  fragment pageInfoData on WPPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
  fragment listPostData on Post {
    id
    slug
    title
    content
    excerpt
    uri
    status
  }
  query GetPosts(
    $where: RootQueryToPostConnectionWhereArgs
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    posts(
      where: $where
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        ...pageInfoData
      }
      nodes {
        ...listPostData
      }
    }
  }
`;
const postQuery = gql`
  fragment postData on Post {
    id
    slug
    title
    content
    uri
    status
  }
  fragment pageData on Page {
    id
    slug
    title
    content
    uri
    status
  }
  query GetContentNode($id: ID!) {
    contentNode(id: $id, idType: URI) {
      ... on Post {
        ...postData
      }
      ... on Page {
        ...pageData
      }
    }
  }
`;
const productsQuery = gql`
  query GetProducts {
    products {
    nodes {
     id
     name
     productId
     description
     slug
    }
    }
  }`;
const usePostStore = defineStore("post", {
  state: () => ({
    nodes: [],
    pageInfo: {
      endCursor: "",
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: ""
    },
    post: {
      id: "",
      slug: "",
      title: "",
      content: "",
      excerpt: "",
      uri: "",
      status: ""
    },
    products: []
  }),
  actions: {
    async getPosts(variables) {
      const { data } = await useAsyncQuery(postsQuery, variables);
      if (!data.value) {
        return;
      }
      const { nodes, pageInfo } = data.value;
      this.nodes = nodes;
      this.pageInfo = pageInfo;
    },
    async getPost(slug) {
      const { data } = await useAsyncQuery(postQuery, { id: slug });
      if (!data.value) {
        return;
      }
      this.post = data.value;
    },
    async getProducts() {
      const { data } = await useAsyncQuery(productsQuery);
      if (!data.value) {
        return;
      }
      this.products = data.value;
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const postStore = usePostStore();
    [__temp, __restore] = withAsyncContext(() => postStore.getProducts()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>main page</h1><div>${ssrInterpolate(unref(postStore).products)}</div><!--]-->`);
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
//# sourceMappingURL=index-5dfcd16a.mjs.map
