<!--<template>
  <div>
    <input type="file" id="myFile" name="filename">
    <input type="submit" @click="upload">
  </div>
</template>
-->
<template>
  <div>
    <p>Vous pouvez ici déposer vos documents afin d'aider la communauté d'Horizon !</p>
    <label for="file" class="label-file">Choisir un Document</label>
    <input type="file" id="file" accept=".pdf"  class="dropfile">
  </div>
</template>
<script lang="js">
import { defineComponent } from 'vue'
import fetch from 'node-fetch'

export default defineComponent({
  name: 'FileUpload',
  props: {
  },
  methods: {
    upload: async () => {
      const input = document.getElementById('myFile')
      const file = input.files[0]
      console.log('FILE', file)
      if (file) {
        const data = new FormData()
        data.append('file', file)
        console.log('DATA', data)
        const res = fetch('http://localhost:5000/files/course-docs/upload', {
          method: 'POST',
          body: data,
          headers: {
            'X-Api-Version': 1,
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTU5YjE0MzY3NmIwOGViZWRlYzAyODQiLCJ1c2VybmFtZSI6InVzcm5fZWxsaW90IiwiaWF0IjoxNjMzNjE1ODczLCJleHAiOjE2MzM2MTk0NzN9.idt9dDlVDPBdyuNK00D1NcORDJDpLgeYOhge8PUZ7Ns'
          }
        })
        console.log(await res)
      }
    }
  }
})
</script>

<style scoped>
p{
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
}
.label-file {
    cursor: pointer;
    color: #00090a;
    font-weight: bold;
    position: relative;
    left : 40%;
    top: 200px;
    font-size: 37px;
}
.label-file:hover {
    color: #c2ced1;
}
.dropfile {
  display: none;
}
</style>
