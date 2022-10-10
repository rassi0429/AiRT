import axios from "axios";
import auth from "@/plugins/auth";

export const state = () => ({
  favs: [],
  r18: false
})

export const getters = {
  isFav: (state) => (id) => {
    console.log(id)
    return state.favs.filter(p => p.id === id).length >= 1
  }
}

export const actions = {
  async updateFavs({commit, rootState}) {
    console.log("update favs")
    try {
      const user = await auth()
      const token = await user.getIdToken(true)
      const {data} = await axios.get(`${rootState.endpoint}/v1/user/${user.uid}`, {headers: {token}})
      commit("setFavs", data.user.favs)
    } catch (e) {
      console.log("maybe not logged in")
    }
  },
  toggleR18({commit, rootState}) {
    if (!rootState.store.r18) {
      const result = confirm("あなたは18歳以上ですか？一般的な作品に加えて性描写など 18歳未満の方は閲覧できない情報が含まれています。")
      if (result) {
        commit("setR18", true)
      }
    }
    commit("setR18", false)
  },
  onR18({commit, rootState}) {
    const result = confirm("あなたは18歳以上ですか？一般的な作品に加えて性描写など 18歳未満の方は閲覧できない情報が含まれています。")
    if (result) {
      commit("setR18", true)
    }
  },
  offR18({commit, rootState}) {
    commit("setR18", false)
  }
}

export const mutations = {
  setFavs(state, data) {
    state.favs = data
  },
  setR18(state, data) {
    console.log("setR18", data)
    state.r18 = data
  }
}
