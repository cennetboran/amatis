import Vue from "vue";
import AddClinic from "./components/AddClinic"
import Clinics from "./components/Clinics"
import Home from "./components/Home"
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path : "/", component : Home },
  { path : "/AddClinic", component: AddClinic},
  { path : "/Clinics", component : Clinics },
  { path : "*", redirect : "/"}
];

export const router = new VueRouter({
  mode : "history",
  routes
});
