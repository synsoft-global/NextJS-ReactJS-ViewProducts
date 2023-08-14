import ProductsMain from "components/page-specific/products";
import { productsService } from "services";
import Layout from "layouts/Main";

const pageSize = 30;
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;
  const search = query?.search || "";
  let sub;
  if (context?.req) {
    if (context.req?.headers?.host) {
      let host = context.req?.headers?.host; // will give you localhost:3000
      const subDomain = host?.split(".");
      if (subDomain && (subDomain.length == 2 || subDomain.length > 3)) {
        sub = subDomain[0];
      }
    }
  }
  return productsService
    .getProducts({ page: 1, pageSize, search, subDomain: sub })
    .then((data) => {
      // let newProduct = [];
      const newProduct = data.products.map((item) => {
        item["images"] = item.Product_Images.map((p) => p.src);
        return item;
      });
      return {
        props: {
          data: newProduct,
          totalCount: data.total,
          search: search,
        },
      };
    })
    .catch((err) => {
      console.log("err", err);
      return { props: { data: [], search } };
    });
  // Pass data to the page via props
}

const Products = ({ data, totalCount, search }) => {
  return (
    <Layout>
      <section className="products-page search-products">
        <ProductsMain data={data} totalCount={totalCount} search={search} />
      </section>
    </Layout>
  );
};

export default Products;
