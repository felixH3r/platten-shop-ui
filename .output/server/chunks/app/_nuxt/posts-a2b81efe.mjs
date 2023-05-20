import { gql } from 'graphql-tag';
import { d as defineStore, b as useAsyncQuery, e as useMutation } from '../server.mjs';

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
          name
          productId
          id
          image {
            mediaItemUrl
          }
          description(format: RAW)
        }
    }
  }`;
gql`
  mutation addToCartMutation($productId: Int!, $extraData: String!) {
    addToCart(input: {productId: $productId, extraData: $extraData}) {
      cartItem {
        product {
          node {
            id
          }
        }
        extraData
      }
    }
  }`;
const myMutation = gql`
mutation MyMutation {
  addToCart(input: {productId: 24, extraData: "{width:1000}"}) {
    cartItem {
      product {
        node {
          id
        }
      }
      extraData {
        id
      }
    }
  }
}
`;
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
      var _a;
      const { data } = await useAsyncQuery(productsQuery);
      if (!data.value) {
        return;
      }
      this.products = (_a = data.value) == null ? void 0 : _a.products.nodes;
    },
    async addToCart(productID, width, length) {
      const { mutate } = useMutation(myMutation);
      console.log(await mutate());
    }
  }
});

export { usePostStore as u };
//# sourceMappingURL=posts-a2b81efe.mjs.map
