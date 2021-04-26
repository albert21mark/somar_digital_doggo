<template>
  <div class="park" v-if="park">
    <a href="/" @click.exact.prevent="$router.push('/')">Close</a>
    <h2>{{ park.Title }}</h2>
    <ul class="park__features">
      <li>{{ park.FeatureOnOffLeash }}</li>
    </ul>
    <p class="park__notes">{{ park.Notes }}</p>
    <p class="park__provider">Managed by <strong>{{ park.Provider }}</strong></p>
    
    <input type="file" @change="uploadPhotos($event)" :id="`${park.ID}`"> 
    <p>Photos uploaded by users</p>
    <img :src="`${park.photosURL}`" id="uploadedPhotos"/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  computed: {
    park() {
      return this.$store.state.parks.find(park => park.ID === parseInt(this.$route.params.id, 10));
    },
    parks() {
      return this.$store.state.parks;
    },
  },
  methods:{
    uploadPhotos(e){
      const URL = '//192.168.20.51/doggo/doggo/public/assets/upload_images'; 
     
      const formData = new FormData();
      formData.append(e.target.files[0], e.target.files[0].name)
      axios.post(URL, formData)
      this.$store.dispatch("uploadPhotos", e)
    }
  }
};
</script>

<style>
  .park {
    padding: 20px;
  }
</style>
