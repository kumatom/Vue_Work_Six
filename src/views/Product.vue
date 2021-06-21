<template>
  <h1>{{ product.title }}</h1>
  <div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-sm-6">
                <img class="img-fluid" :src="product.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill mb-3">{{ product.category }}</span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      product: [],
      qty: 1,
    };
  },
  methods: {
    // 取得單一產品
    getSingalProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
          } else {
            // alert(res.data.message);
          }
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          console.log(errMsg);
        });
    },
  },
  created() {
    const { id } = this.$route.params;
    this.id = id;
    this.getSingalProduct();
  },
};
</script>
