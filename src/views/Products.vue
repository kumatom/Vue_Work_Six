<template>
  <h1>產品頁</h1>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>產品名稱</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td align="right">
          <button type="button" class="btn btn-warning" @click="goToProduct(product)">
            看更多
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    // 取得產品列表
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            // alert(res.data.message);
          }
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          console.log(errMsg);
        });
    },
    goToProduct(product) {
      this.$router.push(`/product/${product.id}`);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
