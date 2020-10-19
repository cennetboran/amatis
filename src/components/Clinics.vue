
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-6 card mt-5 shadow" >
        <div class="card-body">
          <h3>Klinik Listesi</h3>
          <hr>
          <table class="table table-hover table-striped table-bordered" v-if="clinics.length > 0">
            <thead>
            <th>id</th>
            <th>Klinik Adı</th>
            </thead>
            <tbody>
              <tr v-for="clinic in clinics" :key="clinic.id">
                <td class="align-middle text-center"><span class="badge badge-info"> {{ clinic.id }} </span></td>
                <td class="align-middle text-center"> {{ clinic.name }}</td>
                <td><button @click="handleClick(clinic)"> Detay</button></td>

              </tr>
            </tbody>
          </table>
          <div class="alert alert-warning" v-else>
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br>
            <small>Kayıt Eklemek için Klinik İşlemleri menüsünden yararlanabilirsiniz
            </small>
          </div>
        </div>
        <button style="margin-bottom: 15px;" @click="klinikEkle">Klinik Ekle</button>
      </div>

    </div>
    <modal v-if="showModal" @close="showModal = false" name="equipments">
        <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  {{this.clinic.name}}
                </slot>
                <button @click="showEquipmentModal">Ekipman Ekle</button>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <table class="table table-hover table-striped table-bordered">
            <thead>
            <th>id</th>
            <th>Ekipman Adı</th>
            <th>Temin Edilme Tarihi</th>
            <th>Adet Bilgisi</th>
            <th>Birim Fiyatı</th>
            <th>Kullanım Oranı</th>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="align-middle text-center"><span class="badge badge-info"> {{ product.id }} </span></td>
                <td class="align-middle text-center"> {{ product.name }}</td>
                <td class="align-middle text-center"> {{ product.time }}</td>
                <td class="align-middle text-center">{{ product.total }}</td>
                <td style="width: 120px;">{{ product.price}}</td>
                <td class="align-middle"> %{{ product.rate}}</td>
              </tr>
            </tbody>
          </table>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="closeModal">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
      </modal>
      {{/*------------------------------------------------------------------------*/}}
      <addmodal v-if="showAddModal" @close="showAddModal = false" name="add-equipments">
        <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  Ekipman Ekle
                </slot>
              </div>

              <div class="modal-body">
                <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ekipman Ekleme</h3>
          <hr>
          <form @submit="saveEquipment">
          <div class="form-group">
            <label>Ekipman Adı</label>
            <input v-model="equipment.name" required type="text" class="form-control" placeholder="Ekipman adını giriniz..">
          </div>
          <div class="form-group">
            <label>Temin Edilme Tarihi</label>
            <input v-model="equipment.time" type="date" class="form-control" placeholder="Temin Edilme Tarihi giriniz..">
          </div>
          <div class="form-group">
            <label>Adet Bilgisi</label>
            <input v-model="equipment.total" required type="number" min="1" step="1" class="form-control" placeholder="Adet Bilgisi giriniz..">
          </div>
          <div class="form-group">
            <label>Birim Fiyatı</label>
            <input v-model="equipment.price" required type="number" min="0.01" step="0.01" class="form-control" placeholder="Birim Fiyatı giriniz..">
          </div><div class="form-group">
            <label>Kullanım Oranı</label>
            <input v-model="equipment.rate" required type="number" min="0.0" max="100" step="0.1" class="form-control" placeholder="Kullanım Oranı giriniz..">
          </div>
          
          <hr>
          <button class="btn btn-primary" type="submit">Kaydet</button>
          </form>
        </div>
      </div>
    </div>
  </div>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="closeAddModal">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
      </addmodal>
  </div>
</template>


<script>
  import "./style.css"
  import {router} from "../router"
  import {firestore} from "../firebase/firebase"
  import {v4 as uuidv4} from "uuid";

  
  export default {
    data(){
      return{
        clinic : {},
        clinics : [],
        products : [],
        equipment : {
          id :  uuidv4(),
          name : "",
          time : "",
          total : null,
          price : null,
          rate : null,
          clinicId : null
        },
        showModal : false,
        showAddModal : false
      }
    },
    created(){
        console.log("burdayımm")
        let temp = [];
        firestore.collection("clinics").get().then(querySnapshots => {
               querySnapshots.docs.map(doc =>{
                    if(doc.data().blob){
                      console.log("blob file")
                    }else{
                      temp.push(doc.data())
                    }
                      
               })
        }).then(() => {
          this.clinics = temp;
        })
    },
    methods : {
      klinikEkle(){
        router.push( {path:"/AddClinic"})
      },
      getCountClasses(count){
        return {
          'btn-danger text-white' : count == 0 || count == null,
          'btn-success text-white' : count > 0,
        }
      },

      closeModal(){
        this.showModal = false
      },

      closeAddModal(){
        this.equipment = {
          id :  uuidv4(),
          name : "",
          time : "",
          total : null,
          price : null,
          rate : null,
          clinicId : this.clinic.id
        }
        this.showAddModal = false
      },

      handleClick(clinic1){
        this.clinic = clinic1
        this.equipment.clinicId = clinic1.id;
        console.log(this.clinic)
        let temp = [];
        firestore.collection("equipments").get().then(querySnapshots => {
          querySnapshots.docs.map(doc => {
            if(!doc.data().blob && doc.data().clinicId == clinic1.id){
              temp.push(doc.data())
            }
          })
        }).then(() => {
          this.products = temp
        })
        this.showModal = true
      },
      showEquipmentModal(){
        this.showAddModal = true
      },
      saveEquipment(){
        firestore.collection("equipments").add(this.equipment).then(() => {
          this.closeAddModal();
          this.handleClick(this.clinic)
        })
      }
    }
  }
</script>
<style></style>
