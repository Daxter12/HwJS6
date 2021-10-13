const filter_el = {
  data() {
    return {
      userSearch: '',
    }
  },
  mounted() {
    console.log(2)
  },

  template: `
              <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
                <input type="text" class="search-field" v-model="userSearch" />
                <button type="submit" class="btn-search">
                   <i class="fas fa-search"></i>
                </button>
              </form>
            `,
}
