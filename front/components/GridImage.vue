<template lang="pug">
  div
    div.grid-parent
      div.grid( v-for="(a, k) in  separate(images, rows)" :key="k" :style="{'max-width': `${100 / rows}%`}")
        div(v-for="(img, i) in a" :key="i")
          img.grid-image(:src="getlink(img)"  :class="{'last': i === (a.length - 1)}" @click="openModal(img)")
          // sbutton(@click="toggleFav(img.id)") ♡
    div.bottom_point(ref="bottomPoint")
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import axios from "axios";
import auth from "@/plugins/auth";

export default {
  name: "GridImage",
  props: {
    images: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  data() {
    return {
      imagerow: [],
      rows: 4
    }
  },
  computed: {
    ...mapState(["endpoint"]),
    ...mapState("modal", ["isModalOpen", "modalData"])
  },
  mounted() {
    window.addEventListener('resize', this.calcRows)
    this.calcRows()
  },
  methods: {
    ...mapMutations('modal', ['openModal', "closeModal","setWidth"]),
    ...mapActions('auth', ['getUserInfo', "twitterLogin"]),
    ...mapMutations('upload', ['closeModal']),
    async toggleFav(id) {
      console.log(id)
      const user = await auth()
      const token = await user.getIdToken(true)
      await axios.post(`${this.endpoint}/v1/user/fav/${id}`, {}, {headers: {token}})
    },
    getlink(image) {
      // const nsfwTags = ['nsfw', 'r18'];
      // const name = image.prompt.map(t => t.name)
      // if(name.includes(nsfwTags[0]) || name.includes(nsfwTags[1])) {
      //   return image.url.replace('public','nsfw')
      // } else {
        return image.url.replace('public','thumbnail')
      // }
    },
    separate(_, rows) {
      const img = []
      for (let i = 0; i < this.images.length; i++) {
        if (img[i % (this.rows)]) {
          img[i % rows].push(this.images[i])
        } else {
          img[i % rows] = [this.images[i]]
        }
      }
      return img
    },
    calcRows() {
      this.setWidth(window.innerWidth)
      if (window.innerWidth > 1800) {
        this.rows = 5
      } else if (window.innerWidth > 1000) {
        this.rows = 4
      } else if (window.innerWidth > 700) {
        this.rows = 3
      } else if (window.innerWidth > 500) {
        this.rows = 2
      } else {
        this.rows = 1
      }
    }
  }
}
</script>

<style scoped>
.grid-parent {
  display: flex;
  flex-direction: row;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  gap: 4px 0;
  margin-right: 4px;
}

.grid-image {
  width: 100%;
  max-height: 2000px;
}
</style>
