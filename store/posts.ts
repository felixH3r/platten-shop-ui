import {defineStore} from "pinia";
import {Page} from "csstype";


export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  uri: string;
  status: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Product {
  name: string;
  productId: string;
  id: string;
  image: {
    mediaItemUrl: string
  },
  description: string;
}

export interface Products {
  products: {
    nodes: Product[],
  };
}

export interface PostsState {
  nodes: Post[];
  pageInfo: PageInfo;
  post: Post;
  products: Product[];
}

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

export const usePostStore = defineStore('post', {
  state: (): PostsState => (
      {
        nodes: [],
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
        post: {
          id: '',
          slug: '',
          title: '',
          content: '',
          excerpt: '',
          uri: '',
          status: '',
        },
        products: [],
      }
  ),
  actions: {
    async getPosts(variables: any) {
      const {data} = await useAsyncQuery<{ nodes: Post[], pageInfo: PageInfo }>(postsQuery, variables);
      if (!data.value) {
        return;
      }
      const {nodes, pageInfo} = data.value;
      this.nodes = nodes;
      this.pageInfo = pageInfo;
    },

    async getPost(slug: string) {
      const {data} = await useAsyncQuery<Post>(postQuery, {id: slug});
      if (!data.value) {
        return;
      }
      this.post = data.value;
    },
    async getProducts() {
      const {data} = await useAsyncQuery<Products>(productsQuery);
      if (!data.value) {
        return;
      }
      this.products = data.value?.products.nodes;
    }
  }
});
