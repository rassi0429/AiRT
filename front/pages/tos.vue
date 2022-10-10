<template lang="pug">
  div
    img#TopGradation(src="/top_gradation.png")
    img#uploadBtn(v-show="uid" @click="openModal" tag="img" src="/upload_btn.png")
    nuxt-link#loginBtn(v-show="uid" :to="'/user/'+uid" tag="img" :src="photoUrl")
    img#uploadBtn(v-show="!uid" @click="twitterLogin" src="/login_btn.png")
    a#CodeBtn(target="_blank" href="https://github.com/rassi0429/AiRT")
      img(src="/code.png")
    div#imageroot.has-text-white
      h1.title.has-text-white 利用規約
      p この利用規約（以下、「本規約」といいます。）は、rassi0429（以下、「サービス提供者」といいます。）がこのウェブサイト上で提供するサービス AiRT（以下、「本サービス」といいます。）の利用条件を定めるものです。  登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
      br
      h2.subtitle.has-text-white 第1条（適用）
      p 本規約は、ユーザーとサービス提供者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
      p サービス提供者は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
      p 本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
      br
      h2.subtitle.has-text-white 第2条（利用登録）
      p 本サービスにおいては、登録希望者が本規約に同意の上、サービス提供者の定める方法によって利用登録を申請し、サービス提供者がこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
      p サービス提供者は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
      p 利用登録の申請に際して虚偽の事項を届け出た場合
      p 本規約に違反したことがある者からの申請である場合
      p その他、サービス提供者が利用登録を相当でないと判断した場合
      br
      h2.subtitle.has-text-white 第3条（ユーザーIDおよびパスワードの管理）
      p ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
      p ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。サービス提供者は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
      p ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、サービス提供者に故意又は重大な過失がある場合を除き、サービス提供者は一切の責任を負わないものとします。
      br
      h2.subtitle.has-text-white 第4条（利用料金および支払方法）
      p ユーザーは、本サービスの有料部分の対価として、サービス提供者が別途定め、本ウェブサイトに表示する利用料金を、サービス提供者が指定する方法により支払うものとします。
      br
      h2.subtitle.has-text-white 第5条（ユーザの責任）
      p ユーザーは、自己の責任において、本サービスを利用するものとし、本サービスを利用してなされた一切の行為およびその結果についての責任を負います。
      p 本サービスを利用してユーザーが投稿した情報に関する責任は、すべてユーザーに帰属し、サービス提供者はユーザーが本サービスを利用して投稿した情報の内容について、責任を負いません。
      p ユーザーが本規約に違反したことにより、サービス提供者または第三者に損害が生じた場合、ユーザーはその損害を賠償する責任を負います。
      br
      h2.subtitle.has-text-white 第6条（禁止事項）
      p ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。

      p 第三者の著作権、意匠権等の知的財産権、肖像権、プライバシー、名誉その他の権利を侵害する行為、または侵害するおそれのある行為
      p 本サービスおよび個別サービスに投稿等されている投稿情報を、当該著作者（創作者）の同意なくして転載する行為
      p 本サービスもしくは本サービスの一部（コンテンツ・情報・機能・システム・プログラム等）を使用・転用・転売・複製・送信・翻訳・翻案・改変などして、いかなる手法を問わず商業・営業目的の活動、営利を目的とした利用およびその準備を目的とした利用をすること、その他本サービスの2次利用や複製行為。但し、ユーザー本人による投稿情報は除きます。
      p サービス提供者、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
      p サービス提供者のサービスの運営を妨害するおそれのある行為
      p 他のユーザーに関する個人情報等を収集または蓄積する行為
      p 不正アクセスをし、またはこれを試みる行為
      p 他のユーザーに成りすます行為
      p サービス提供者のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
      p 児童ポルノ若しくは児童虐待に相当する投稿情報のデータ
      p 人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現
      p 自殺、自傷行為、薬物乱用を誘引または助長する表現
      p その他反社会的な内容を含み他人に不快感を与える表現

      p 以下を目的とし、または目的とするとサービス提供者が判断する行為
      p 営業、宣伝、広告、勧誘、その他営利を目的とする行為（サービス提供者の認めたものを除きます。）
      p 他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為

      p サービス提供者、本サービスの他のユーザー、または第三者に不利益、損害または不快感を与えることを目的とする行為
      p その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為
      p 宗教活動または宗教団体への勧誘行為
      p 運営者または第三者に成りすます行為

      p 商業用の広告、宣伝または勧誘を目的とする投稿情報（当社が特に認めたものを除く。）、アフィリエイトのリンクを含む投稿情報、MLM・リードメール等他人を勧誘する内容の投稿情報、アダルトサイト・ワンクリック詐欺サイト・ウィルス等の有害なコンピュータプログラム等を流布させることを目的とするサイト等当社が不適切と判断するサイトに誘導する投稿情報（単にリンクを張る行為を含む。）、その他当社が不適切と判断する投稿情報を投稿等する行為
      p 通常の範囲を超えて本サービスのサーバーに負担をかける行為、もしくは、本サービスの運営やネットワーク・システムに支障を与える行為、またはこれらのおそれのある行為

      p その他、サービス提供者が不適切と判断する行為
      br
      h2.subtitle.has-text-white 第7条（本サービスの提供の停止等）
      p サービス提供者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
      p 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
      p 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
      p コンピュータまたは通信回線等が事故により停止した場合
      p その他、サービス提供者が本サービスの提供が困難と判断した場合
      p サービス提供者は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
      br
      h2.subtitle.has-text-white 第8条（著作権）
      p ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、本サービスを利用し、投稿ないしアップロードすることができるものとします。
      p ユーザーが本サービスを利用して投稿ないしアップロードした文章、画像、映像等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、サービス提供者は、本サービスを利用して投稿ないしアップロードされた文章、画像、映像等について、本サービスの改良、品質の向上、または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
      p 前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべてサービス提供者またはサービス提供者にその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
      br
      h2.subtitle.has-text-white 第9条（利用制限および登録抹消）
      p サービス提供者は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
      p 本規約のいずれかの条項に違反した場合
      p 登録事項に虚偽の事実があることが判明した場合
      p 決済手段として当該ユーザーが届け出たクレジットカードが利用停止となった場合
      p 料金等の支払債務の不履行があった場合
      p サービス提供者からの連絡に対し、一定期間返答がない場合
      p 本サービスについて、最終の利用から一定期間利用がない場合
      p その他、サービス提供者が本サービスの利用を適当でないと判断した場合
      p 前項各号のいずれかに該当した場合、ユーザーは、当然にサービス提供者に対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
      p サービス提供者は、本条に基づきサービス提供者が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
      br
      h2.subtitle.has-text-white 第10条（退会）
      p ユーザーは、サービス提供者の定める退会手続により、本サービスから退会できるものとします。
      br
      h2.subtitle.has-text-white 第11条（保証の否認および免責事項）
      p サービス提供者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
      p サービス提供者は、本サービスに起因してユーザーに生じたあらゆる損害について、サービス提供者の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関するサービス提供者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
      p 前項ただし書に定める場合であっても、サービス提供者は、サービス提供者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（サービス提供者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、サービス提供者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
      p サービス提供者は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
      br
      h2.subtitle.has-text-white 第12条（サービス内容の変更等）
      p サービス提供者は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
      br
      h2.subtitle.has-text-white 第13条（利用規約の変更）
      p サービス提供者は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
      p 本規約の変更がユーザーの一般の利益に適合するとき。
      p 本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
      p サービス提供者はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
      br
      h2.subtitle.has-text-white 第14条（個人情報の取扱い）
      p サービス提供者は、本サービスの利用によって取得する個人情報については、サービス提供者「プライバシーポリシー」に従い適切に取り扱うものとします。
      br
      h2.subtitle.has-text-white 第15条（通知または連絡）
      p ユーザーとサービス提供者との間の通知または連絡は、サービス提供者の定める方法によって行うものとします。サービス提供者は,ユーザーから,サービス提供者が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
      br
      h2.subtitle.has-text-white 第16条（権利義務の譲渡の禁止）
      p ユーザーは、サービス提供者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
      br
      h2.subtitle.has-text-white 第18条（準拠法・裁判管轄）
      p 本規約の解釈にあたっては、日本法を準拠法とします。
      p 本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。


</template>
<script>
import {mapActions, mapState, mapMutations} from "vuex";
import axios from "axios";
import auth from "@/plugins/auth";
import PhotoViewModal from "@/components/modal";
import UploadModal from "@/components/upload";

export default {
  name: 'TeamOfService',
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
    await this.getImage()
    window.addEventListener('scroll', this.handleScroll);
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
    async handleScroll(e) {
      const lasts = document.getElementsByClassName("last")
      let min = lasts[0].offsetTop
      for(let i = 0; i < lasts.length; i++) {
        min = Math.min(min, lasts[i].offsetTop)
      }
      const currentHeight = window.pageYOffset
      if ((currentHeight + window.innerHeight) > min && !this.tmpScrollState) {
        console.log(this.tmpScrollState)
        this.tmpScrollState = true
        await this.addImage()
      }
      if (Math.abs((currentHeight + window.innerHeight) -  min) > 300) {
        this.tmpScrollState = false
      }
    }
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
