<template lang="pug">
  div.upload-modal-wrap(v-if="isUploadModal")
    div.columns.upload-modal(@mouseup.stop @dragenter="dragEnter" @dragleave="dragLeave" @dragover.prevent @drop.prevent="dropFile")
      input(type="file" accept="image/*" ref="file_upload" style="display: none" @change="onFileChange" multiple)
      img#CloseBtn(@click="closeModal" src="/close.png")
      div.column.is-5#EditField(v-if="!isUploading")
        div#UploadBox( @click="$refs.file_upload.click()")
          img#UploadIcon( src="/upload.png")
          p#UploadInfo Click or Drop a Image(s)
        div#SubmitBtn
          img(@click="submit" src="/upload_btn.png")
          p#UploadBtnLabel Upload
      div.column.is-7(v-if="!isUploading")
        p#ImageCounter {{ this.files.length }} images
        div.upload-img
          div.is-flex(v-for="(file,index) in files" :key="index" )
            div.is-flex-1
              img(:src="getFileUrl(file)")
            div.is-flex-3.is-flex
              textarea.is-flex-grow-1#commentField(type="text" :value="file.comment" @change="(text) => changeComment({text,index})" placeholder="comment")
              img#deleteBtn(@click="deleteFile(index)" src="/delete.png")
      div.h100.p0.center#uploadingAnims(v-if="isUploading")
        div
          img#loadIcon(src="/load.png")
          p#uploadingInfo uploading...  {{ uploadCount }} / {{ files.length }}
</template>
<script>
import axios from "axios";
import EXIF from "exif-js";
import {mapActions, mapState, mapMutations} from "vuex";
// import crc32 from "png-metadata/crc32";
import auth from "@/plugins/auth";

export default {
  name: "UploadModal",
  data() {
    return {
      isEnter: false,
      files: [],
      title: new Date().toLocaleDateString(),
      tags: [],
      uid: "",
      tmpTag: "",
      uploadCount: 0,
      isUploading: false
    }
  },
  computed: {
    ...mapState(["endpoint"]),
    ...mapState("upload", ["isUploadModal"]),
  },
  async mounted() {
    this.uid = await this.getUserInfo();
  },
  methods: {
    ...mapActions('auth', ['getUserInfo', "twitterLogin"]),
    ...mapMutations('upload', ['closeModal']),
    getComment(file) {
      return new Promise((resolve) => {
        EXIF.getData(file, function () {
          const allMetaData = EXIF.getAllTags(this);
          console.log(allMetaData)
          console.log(allMetaData.UserComment)
          if (allMetaData.UserComment) {
            const binary = allMetaData.UserComment.slice(8)
            const result = []
            for (let j = 0; j < binary.length; j += 2) {
              result.push(binary[j] * 256 + binary[j + 1])
            }
            console.log(String.fromCharCode(...result))
            resolve(JSON.parse(String.fromCharCode(...result)))
          }
          resolve(null)
        });
      })
    },
    dragEnter() {
      this.isEnter = true;
    },
    dragLeave() {
      this.isEnter = false;
    },
    dropFile: async function () {
      const files = event.dataTransfer.files
      const fileArray = Array.from(files)
      for (const f of fileArray) {
        const i = fileArray.indexOf(f);
        console.log("file", f)
        const reader = new FileReader();
        reader.readAsArrayBuffer(f);
        reader.onload = () => {
          const metadata = this.readMetadata(reader.result)
          console.log(metadata.tEXt)
          console.log(JSON.parse(metadata.tEXt.Comment))
        };
        // const blob = new Blob("blob",f)
        const result = await this.getComment(f)
        if (result) {
          fileArray[i].comment = "taken at " + result.locationName
          result.presentUserNameArray.forEach(k => {
            console.log(k)
            if (!this.tags.includes(k)) {
              this.tags.push(k)
            }
          })
        } else {
          fileArray[i].comment = ""
        }
      }
      this.files.push(...fileArray)
      this.isEnter = false;
    },
    deleteFile(index) {
      this.files.splice(index, 1)
    },
    changeComment({index, text}) {
      console.log(text.target.value)
      this.files[index].comment = text.target.value
    },
    getFileUrl(file) {
      return URL.createObjectURL(file)
    },
    async submit() {
      if (!this.files.length) return
      const user = await auth()
      const token = await user.getIdToken(true)
      await axios.post(`${this.endpoint}/v1/user`, {}, {headers: {token}})
      this.isUploading = true
      Promise.all(this.files.map(f => this.uploadImage(f, token))).then(async (w) => {
        // const photos = w.map(res => res.data.id)
        // // this.$router.push("/")
        // const {data} = await axios.post(`${this.endpoint}/v1/moment`, {title: this.title, photos}, {headers: {token}})
        // this.closeModal()
        // this.uploadCount = 0
        // this.$router.push("/moment/" + data.id)
      }).catch(() => {
        alert("アップロードに失敗しました")
      }).finally(() => {
        this.files = []
        this.tags = []
        this.isUploading = false
        this.closeModal()
        this.$router.push("/")
      })
    },
    uploadImage(file, token) {
      return new Promise((resolve, reject) => {
        try {
          axios.get(`${this.endpoint}/v1/imageReq`, {headers: {token}}).then(data => {
            const params = new FormData();
            console.log(file)
            const words = file.name.split(",").map(t => t.trim())
            console.log(words)
            let w = []
            try {
              if (words.length > 1) {
                if (words[words.length - 1].startsWith("s-")) {
                  w = [...(words.map(t => t.replace(".png", "").replace(".jpg", "")))]
                } else {
                  const _seed = (words[words.length - 1]).split("s-")
                  const seed = _seed[1].replace(".png", "").replace(".jpg", "")
                  console.log(_seed, seed)
                  words.pop()
                  w = [...words, _seed[0], "s-" + seed]
                }
              }
            } catch (e) {
              console.log(e)
            }

            params.append('file', file);
            axios.post(data.data.result.uploadURL, params, {headers: {"content-type": 'multipart/form-data'}}).then(t => {
              axios.post(`${this.endpoint}/v1/photo`, {
                  url: t.data.result.variants.filter(k => k.includes("public"))[0],
                  comment: file.name.replace(".png", "").replace(".jpg", ""),
                  tags: JSON.stringify([...this.tags, ...w])
                },
                {
                  headers: {
                    token
                  }
                }
              ).then(re => {
                resolve(re)
                this.uploadCount++
              }).catch(reject)
            }).catch(reject)
          }).catch(reject)
        } catch (e) {
          reject(e)
        }
      })
    },
    async onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      const fileArray = Array.from(files)
      for (const f of fileArray) {
        const i = fileArray.indexOf(f);
        const result = await this.getComment(f)
        if (result) {
          fileArray[i].comment = "taken at " + result.locationName
          result.presentUserNameArray.forEach(k => {
            console.log(k)
            if (!this.tags.includes(k)) {
              this.tags.push(k)
            }
          })
        } else {
          fileArray[i].comment = ""
        }
      }
      this.files.push(...fileArray)
    },
    addTag() {
      if (this.tmpTag.trim() && !this.tags.includes(this.tmpTag)) {
        this.tags.push(this.tmpTag)
      }
    },
    deleteTag(index) {
      this.tags.splice(index, 1)
    },
    loadFileAsBlob(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
          if (this.status === 200) {
            resolve(this.response);
            // myBlob is now the blob that the object URL pointed to.
          } else {
            reject(this.response);
          }
        };
        xhr.send();
      })
    },
    readMetadata(buffer) {
      const result = {};
      const chunks = this.extractChunks(buffer);
      chunks.forEach(chunk => {
        switch (chunk.name) {
          case 'tEXt':
            if (!result.tEXt) {
              result.tEXt = {};
            }
            // eslint-disable-next-line no-case-declarations
            const textChunk = this.textDecode(chunk.data);
            result.tEXt[textChunk.keyword] = textChunk.text;
            break
          case 'pHYs':
            result.pHYs = {
              // Pixels per unit, X axis: 4 bytes (unsigned integer)
              "x": this.readUint32(chunk.data, 0),
              // Pixels per unit, Y axis: 4 bytes (unsigned integer)
              "y": this.readUint32(chunk.data, 4),
              "unit": chunk.data[8],
            }
            break
          case 'gAMA':
          case 'cHRM':
          case 'sRGB':
          case 'IHDR':
          case 'iCCP':
          default:
            result[chunk.name] = true;
        }
      })
      return result;
    },
    extractChunks(_data) {
      const data = new Uint8Array(_data)
      if (data[0] !== 0x89) throw new Error('Invalid .png file header')
      if (data[1] !== 0x50) throw new Error('Invalid .png file header')
      if (data[2] !== 0x4E) throw new Error('Invalid .png file header')
      if (data[3] !== 0x47) throw new Error('Invalid .png file header')
      if (data[4] !== 0x0D) throw new Error('Invalid .png file header: possibly caused by DOS-Unix line ending conversion?')
      if (data[5] !== 0x0A) throw new Error('Invalid .png file header: possibly caused by DOS-Unix line ending conversion?')
      if (data[6] !== 0x1A) throw new Error('Invalid .png file header')
      if (data[7] !== 0x0A) throw new Error('Invalid .png file header: possibly caused by DOS-Unix line ending conversion?')

      let ended = false
      const chunks = []
      let idx = 8

      const uint8 = new Uint8Array(4)
      // const int32 = new Int32Array(uint8.buffer)
      const uint32 = new Uint32Array(uint8.buffer)

      while (idx < data.length) {
        // Read the length of the current chunk,
        // which is stored as a Uint32.
        uint8[3] = data[idx++]
        uint8[2] = data[idx++]
        uint8[1] = data[idx++]
        uint8[0] = data[idx++]

        // Chunk includes name/type for CRC check (see below).
        const length = uint32[0] + 4
        const chunk = new Uint8Array(length)
        chunk[0] = data[idx++]
        chunk[1] = data[idx++]
        chunk[2] = data[idx++]
        chunk[3] = data[idx++]

        // Get the name in ASCII for identification.
        const name = (
          String.fromCharCode(chunk[0]) +
          String.fromCharCode(chunk[1]) +
          String.fromCharCode(chunk[2]) +
          String.fromCharCode(chunk[3])
        )

        // The IHDR header MUST come first.
        if (!chunks.length && name !== 'IHDR') {
          throw new Error('IHDR header missing')
        }

        // The IEND header marks the end of the file,
        // so on discovering it break out of the loop.
        if (name === 'IEND') {
          ended = true
          chunks.push({
            name,
            data: new Uint8Array(0)
          })

          break
        }

        // Read the contents of the chunk out of the main buffer.
        for (let i = 4; i < length; i++) {
          chunk[i] = data[idx++]
        }

        // Read out the CRC value for comparison.
        // It's stored as an Int32.
        uint8[3] = data[idx++]
        uint8[2] = data[idx++]
        uint8[1] = data[idx++]
        uint8[0] = data[idx++]

        // const crcActual = int32[0]
        // const crcExpect = crc32.buf(chunk)
        // if (crcExpect !== crcActual) {
        //   throw new Error(
        //     'CRC values for ' + name + ' header do not match, PNG file is likely corrupted'
        //   )
        // }

        // The chunk data is now copied to remove the 4 preceding
        // bytes used for the chunk name/type.
        const chunkData = new Uint8Array(chunk.buffer.slice(4))

        chunks.push({
          name,
          data: chunkData
        })
      }

      if (!ended) {
        throw new Error('.png file ended prematurely: no IEND header was found')
      }

      return chunks
    },
    textDecode(data) {
      if (data.data && data.name) {
        data = data.data
      }

      let naming = true
      let text = ''
      let name = ''

      for (let i = 0; i < data.length; i++) {
        const code = data[i]

        if (naming) {
          if (code) {
            name += String.fromCharCode(code)
          } else {
            naming = false
          }
        } else if (code) {
          text += String.fromCharCode(code)
        } else {
          throw new Error('Invalid NULL character found. 0x00 character is not permitted in tEXt content')
        }
      }

      return {
        keyword: name,
        text
      }
    },
    readUint32(uint8array, offset) {
      const byte1 = uint8array[offset++];
      const byte2 = uint8array[offset++];
      const byte3 = uint8array[offset++];
      const byte4 = uint8array[offset];
      return 0 | (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
    }
  }
}
</script>

<style scoped>
.upload-img {
  max-height: 85%;
  overflow-y: scroll;
}

.upload-img::-webkit-scrollbar {
  width: 10px;
}

.upload-img::-webkit-scrollbar-track {
  background: #505050;
  border-radius: 5px;
}

.upload-img::-webkit-scrollbar-thumb {
  background: #aaaaaa;
  border-radius: 5px;
}

.is-flex-1 {
  flex: 1
}

.is-flex-3 {
  flex: 3
}

.upload-modal-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 42;
}

.upload-modal {
  width: 90%;
  max-width: 900px;
  min-width: 300px;
  height: 100%;
  max-height: 550px;
  background-color: #050505;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  margin: auto;
}

p {
  color: #FFFFFF;
}

.h100 {
  height: 100%;
}

.p0 {
  padding: 0;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

#EditField {
  position: relative;
}

#UploadBox {
  opacity: 0.2;;
  min-height: 200px;
  max-height: 300px;
  -webkit-user-drag: none;
  text-align: center;
  padding-top: 3em;
  background-color: #202020;
  margin-bottom: 1em;
}

#UploadBox:hover {
  opacity: 0.5;;
}

#UploadIcon {
  width: 100px;
}

#UploadInfo {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#label {
  text-align: left;
  margin-right: 2em;
}

#textbox {
  opacity: 0.5;;
  max-width: 500px;
  border-right: none;
  border-left: none;
  border-top: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  bottom: 0;
  color: #FFFFFF;
}

#textbox:hover {
  opacity: 0.8;;
}

#textbox::placeholder {
  color: #202020;
}

#SubmitBtn {
  position: absolute;
  opacity: 0.5;;
  width: 50px;
  right: 0;
  bottom: 0;
  margin-bottom: 0.3em;
}

#SubmitBtn:hover {
  opacity: 0.8;;
}

#UploadBtnLabel {
  margin-top: -1em;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#CloseBtn {
  position: absolute;
  bottom: 0%;
  right: 0%;
  margin-bottom: 0.8em;
  margin-right: 0.8em;
  max-width: 30px;
  opacity: 0.2;
}

#TagBtnField {
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  max-width: 100%;
}

#TagBtnField::-webkit-scrollbar {
  display: none;
}

#TagBtn {
  opacity: 0.2;;
  margin-right: 3px;
  margin-bottom: 3px;
  height: 1.2em;
  border-radius: 5px;
}

#TagBtn:hover {
  opacity: 0.5;;
}

#AddTagBtn {
  opacity: 0.2;;
  width: 1em;
  margin-left: 0.5em;
  top: 0.5em;
}

#TagBtn:hover {
  opacity: 0.5;;
}

#ImageCounter {
  opacity: 0.5;;
  margin-bottom: 0.5em;
}

#commentField {
  display: block;
  opacity: 0.5;;
  width: auto;
  border-right: none;
  border-left: none;
  border-top: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  bottom: 0;
  color: #FFFFFF;
  padding-left: 10px;
  padding-right: 10px;
}

#commentField::-webkit-scrollbar {
  width: 10px;
}

#commentField::-webkit-scrollbar-track {
  background: #505050;
  border-radius: 5px;
}

#commentField::-webkit-scrollbar-thumb {
  background: #aaaaaa;
  border-radius: 5px;
}

#deleteBtn {
  opacity: 0.2;;
  height: 30px;
  padding-left: 5px;
}

#deleteBtn:hover {
  opacity: 0.5;;
}

#CloseBtn:hover {
  opacity: 0.5;;
}

#uploadingAnims {
  text-align: center;
  margin: 0px auto;
}

#loadIcon {
  opacity: 0.5;;
  width: 80px;
  max-height: 30%;
  padding: 0px;
}

#uploadingInfo {
  text-align: center;
  opacity: 0.5;;
}
</style>
