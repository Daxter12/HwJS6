const product = {
  props: ['img', 'prod'],

  template: ` <div class="goods-item">
                <div class="desc">
                  <img src="img" alt="Some img" /> 
                  <h3>{{prod.product_name}}</h3>
                  <p>{{prod.price}}</p>
                  <button class="buy-btn" @click="$root.$refs.cart.addItem(prod)">Купить</button>
                </div>
              </div>

`,
  mounted() {
    console.log(2)
  },
}

const products = {
  components: { product },
  data() {
    return {
      imgProduct: 'https://placehold.it/200x150',
      catalogUrl: '/catalogData.json',
      filtered: [],
      goods: [],
    }
  },
  mounted() {
    const promise = makeGETRequest(`${API_URL}/catalogData.json`)
    promise.then((ans) => {
      jsonAns = JSON.parse(ans)
      for (let item of jsonAns) {
        this.goods.push(item)
        this.filtered.push(item)
      }
    })

    makeGETRequest(`getProducts.json`).then((ans) => {
      jsonAns = JSON.parse(ans)
      for (let item of jsonAns) {
        this.goods.push(item)
        this.filtered.push(item)
      }
    })
  },

  methods: {
    filter(userSearch) {
      const regexp = new RegExp(userSearch, 'i')
      this.filtered = this.goods.filter((product) =>
        regexp.test(product.product_name)
      )
    },
  },

  template: `
  <div class="goods">
    <product
      v-for="product of filtered" 
      v-bind:key="product.id_product"
      v-bind:prod="product">
      v-bind:img="imgProduct"
    </product>
  </div>
`,
}
