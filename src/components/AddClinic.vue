<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Klinik Ekleme</h3>
          <hr>
          <div class="form-group">
            <label>Klinik Adı</label>
            <input v-model="clinic.name" type="text" class="form-control" placeholder="Klinik adını giriniz..">
          </div>
          <hr>
          <button class="btn btn-primary" @click="saveProduct">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import {router} from "../router";
import {firestore} from "../firebase/firebase"
  export default {
    data() {
      return {
        clinic: {
          id : uuidv4(),
          name: "",
        }
      }
    },
    methods: {
      saveProduct() {
        if(this.clinic.name.length > 0){
        this.saveButtonClicked = true;
        firestore.collection("clinics").add(this.clinic).then(
          router.push("/Clinics")
        )
        }else{
          alert("klinik adı giriniz")
        }
        
      }
    },
  }
</script>
<style></style>
