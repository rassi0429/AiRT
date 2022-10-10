<template lang="pug">
  div
    img#TopGradation(src="/top_gradation.png")
    img#uploadBtn(v-show="uid" @click="openModal" tag="img" src="/upload_btn.png")
    nuxt-link#loginBtn(v-show="uid" :to="'/user/'+uid" tag="img" :src="photoUrl")
    img#uploadBtn(v-show="!uid" @click="twitterLogin" src="/login_btn.png")
    a#CodeBtn(target="_blank" href="https://github.com/rassi0429/AiRT")
      img(src="/code.png")
    div#imageroot.has-text-white
      h1.title.has-text-white プライバシーポリシー
      p rassi0429（以下、「サービス提供者」といいます。）は、本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      br
      h2.subtitle.has-text-white 第1条（個人情報）
      p 「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
      br
      h2.subtitle.has-text-white 第2条（個人情報の収集方法）
      p サービス提供者は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,サービス提供者の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
      br
      h2.subtitle.has-text-white 第3条（個人情報を収集・利用する目的）
      p サービス提供者が個人情報を収集・利用する目的は、以下のとおりです。
      p サービス提供者サービスの提供・運営のため
      p ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
      p ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及びサービス提供者が提供する他のサービスの案内のメールを送付するため
      p メンテナンス、重要なお知らせなど必要に応じたご連絡のため
      p 利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
      p ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
      p 有料サービスにおいて、ユーザーに利用料金を請求するため
      p 上記の利用目的に付随する目的
      br
      h2.subtitle.has-text-white 第4条（利用目的の変更）
      p サービス提供者は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
      p 利用目的の変更を行った場合には、変更後の目的について、サービス提供者所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
      br
      h2.subtitle.has-text-white 第5条（個人情報の第三者提供）
      p サービス提供者は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
      p 人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
      p 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
      p 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
      p 予め次の事項を告知あるいは公表し、かつサービス提供者が個人情報保護委員会に届出をしたとき
      p 利用目的に第三者への提供を含むこと
      p 第三者に提供されるデータの項目
      p 第三者への提供の手段または方法
      p 本人の求めに応じて個人情報の第三者への提供を停止すること
      p 本人の求めを受け付ける方法
      p 前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
      p サービス提供者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
      p 合併その他の事由による事業の承継に伴って個人情報が提供される場合
      p 個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
      br
      h2.subtitle.has-text-white 第6条（個人情報の開示）
      p サービス提供者は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。なお、個人情報の開示に際しては、1件あたり1、000円の手数料を申し受けます。
      p 本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
      p サービス提供者の業務の適正な実施に著しい支障を及ぼすおそれがある場合
      p その他法令に違反することとなる場合
      p 前項の定めにかかわらず、履歴情報および特性情報などの個人情報以外の情報については、原則として開示いたしません。
      br
      h2.subtitle.has-text-white 第7条（個人情報の訂正および削除）
      p ユーザーは、サービス提供者の保有する自己の個人情報が誤った情報である場合には、サービス提供者が定める手続きにより、サービス提供者に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
      p サービス提供者は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
      p サービス提供者は、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
      br
      h2.subtitle.has-text-white 第8条（個人情報の利用停止等）
      p サービス提供者は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。
      p 前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
      p サービス提供者は、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。
      p 前2項にかかわらず、利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策を講じるものとします。
      br
      h2.subtitle.has-text-white 第9条（プライバシーポリシーの変更）
      p 本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
      p サービス提供者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
      br
      h2.subtitle.has-text-white 第10条（お問い合わせ窓口）
      p 本ポリシーに関するお問い合わせは、kokoa[at]ciebus.netか、Twitter: @ciel_vr までお願いいたします。

</template>
<script>
import {mapActions, mapState, mapMutations} from "vuex";
import axios from "axios";
import auth from "@/plugins/auth";
import PhotoViewModal from "@/components/modal";
import UploadModal from "@/components/upload";

export default {
  name: 'PrivacyPolicy',
  components: {PhotoViewModal, UploadModal},
  layout: "normal",
  async asyncData({params, query}) {
    try {
      if (query.modal) {
        const photo = await axios.get("https://api.airt.cc/v1/photo/" + query.modal.replace("%3Fnsfw%3Dtrue","").replace("?nsfw=true",""))
        return {prePhotoData: photo.data}
      }
    } catch {}
  },
  data() {
    return {
      hoge: "hage",
      images: [],
      rows: 4,
      isLoggedin: false,
      uid: "",
      photoUrl: "",
      tmpScrollState: false,
      page: 0
    }
  },
  head() {
    if (this.$route.query.modal) {
      return {
        meta: [
          {hid: 'description', name: 'description', content: this.prePhotoData?.comment},
          {hid: 'og:type', property: 'og:type', content: 'website'},
          {hid: 'og:title', property: 'og:title', content: `${this.prePhotoData?.comment} - AiRT`},
          {hid: 'og:url', property: 'og:url', content: `${this.endpoint}/?modal=${this.$route.query.modal}`},
          {hid: 'og:description', property: 'og:description', content: this.prePhotoData?.comment},
          {
            hid: 'og:image',
            property: 'og:image',
            content: this.prePhotoData?.url.replace("public","ogp")
          },
          {hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image'},
          {hid: 'twitter:title', property: 'twitter:title', content: `${this.prePhotoData?.comment} - AiRT`},
          {hid: 'twitter:description', property: 'twitter:description', content: this.prePhotoData?.comment},
          {
            hid: 'twitter:image',
            property: 'twitter:image',
            content: this.prePhotoData?.url.replace("public","ogp")
          },
        ]
      }
    } else {
      return {
        titleTemplate : "AiRT"
      }
    }
  },
  computed: {
    ...mapState(["endpoint"]),
    ...mapState("modal", ["isModalOpen"]),
    ...mapState("upload", ["isUploadModal"])
  },
  async mounted() {
    this.uid = (await this.getUserInfo())
    const user = await auth()
    if(user) {
      this.photoUrl = user?.providerData[0]?.photoURL
    }
    // await this.getImage()
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions('auth', ['getUserInfo', "twitterLogin", "LogOut"]),
    ...mapMutations('upload', ['openModal', "closeModal"]),
    async getImage() {
      const {data} = await axios.get(`${this.endpoint}/v1/photos?page=${this.page}&nsfw=${this.$route.query.nsfw || false}`)
      this.images = data
    },
    async addImage() {
      this.page += 1
      const {data} = await axios.get(`${this.endpoint}/v1/photos?page=${this.page}&nsfw=${this.$route.query.nsfw || false}`)
      if (data.length === 0) {
        this.page -= 1
      }
      this.images.push(...data)
    },
    shuffle(array) {
      let currentIndex = array.length
      let randomIndex = 0;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    },
  }
}
</script>

<style scoped>

#TopGradation {
  position: fixed;
  height: 5em;
  width: 100vw;
  z-index: 10;
}

#loginBtn {
  position: fixed;
  right: 10px;
  bottom: 60px;
  width: 50px;
  max-width: 50px;
  opacity: 0.5;;
  border-radius: 100%;
}

#loginBtn:hover {
  opacity: 90%
}

#uploadBtn {
  position: fixed;
  right: 10px;
  bottom: 110px;
  max-width: 50px;
  opacity: 0.2;
}

#uploadBtn:hover {
  opacity: 0.5;
}

#CodeBtn {
  position: fixed;
  right: 10px;
  bottom: 0;
  max-width: 50px;
  opacity: 0.2;;
  border-radius: 100%;
}

#CodeBtn:hover {
  opacity: 0.5;;
}

#imageroot {
  width: 80vw;
  margin: auto;
  padding-top: 5em;
}

</style>
