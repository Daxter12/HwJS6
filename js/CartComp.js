const cartItem = {
  props: ['cart_item', 'img'],
  template: `
    <div class="cart-item">
      <div class="goods-bio">
        <img :src="img" alt="Some image">
        <div class="goods-desc">
          <p class="goods-title">{{ cart_item.product_name }}</p>
          <p class="goods-quantity">Quantity: {{ cart_item.quantity }}</p>
          <p class="goods-single-price">$ {{ cart_item.price }} each</p>
        </div>
      </div>
      <div class="right-block">
          <p class="goods-price">{{ cart_item.quantity * cart_item.price }}</p>
          <button class="del-btn" @click="$root.$refs.cart.removeItem(cart_item)">&times;</button>
      </div>
    </div>`,
}

const cart = {
  components: { 'cart-item': cartItem },
  data() {
    return {
      cartItems: [],
      cartUrl: '/getBasket.json',
      imgCart: 'https://placehold.it/50x100',
      showCart: false,
    }
  },
  mounted() {
    console.log(2)
  },
  methods: {
    addItem(element) {
      const promise = makeGETRequest(`${API_URL}/addToBasket.json`)
      promise.then((goods) => {
        let ans = JSON.parse(goods)
        if (ans.result === 1) {
          let productId = +element.id_product
          let find = this.cartItems.find(
            (product) => product.id_product === productId
          )
          if (find) {
            find.quantity++
          } else {
            let product = {
              id_product: productId,
              price: +element.price,
              product_name: element.product_name,
              quantity: 1,
            }
            this.cartItems.push(product)
          }
        } else {
          alert('Error')
        }
      })
    },
    removeItem(element) {
      const promise = makeGETRequest(`${API_URL}/deleteFromBasket.json`)
      promise.then((goods) => {
        let ans = JSON.parse(goods)
        if (ans.result === 1) {
          if (element.quantity > 1) {
            element.quantity--
          } else {
            this.cartItems.splice(this.cartItems.indexOf(element), 1)
          }
        } else {
          alert('Error')
        }
      })
    },
  },
  template: `
  <div>
    <button class="cart-button" type="button" @click="showCart = !showCart">Корзина</button>
    <div class="cart-block" v-show="showCart">
      <cart-item v-for="product of cartItems"
      :key="product.id_product"
      :img="imgCart"
      :cart_item="product"></cart-item>
    </div>
  </div>
`,
}
