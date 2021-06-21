<template>
  <div v-if="isCheck" class="d-flex justify-content-center w-100">
    <h1>後台頁面</h1>
    <br />
    <button type="button" class="btn btn-danger" @click="signOut">
      登出
    </button>
  </div>
  <div class="d-flex justify-content-center w-100">
    <Alert v-if="!isCheck" :customClass="alertClass" :content="alertMsg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCheck: false,
      alertClass: 'alert-danger',
      alertMsg: '驗證中，請稍後...',
    };
  },
  methods: {
    checkLogin() {
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.isCheck = true;
            // ...
          } else {
            this.isCheck = false;
            this.alertMsg = '授權無效，請先登入!';
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
          }
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          console.log(errMsg);
        });
    },
    signOut() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.isCheck = false;
            this.alertClass = 'alert-success';
            this.alertMsg = '登出成功，請重新登入!';
            document.cookie = `hexToken='';expires=${new Date(-1)}; path=/`;
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
          } else {
            // ...
          }
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          console.log(errMsg);
        });
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
