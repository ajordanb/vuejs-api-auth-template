import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import SelectButton from "primevue/selectbutton";
import "./index.css";
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import Sidebar from "primevue/sidebar";
import ScrollPanel from "primevue/scrollpanel";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import ScrollTop from "primevue/scrolltop";
import OverlayPanel from "primevue/overlaypanel";
import VueApexCharts from "vue3-apexcharts";
import InputSwitch from "primevue/inputswitch";
import Dialog from "primevue/dialog";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Card from "primevue/card";
import TabMenu from "primevue/tabmenu";
import setupInterceptors from "./services/setupIntercepters";
import ProgressSpinner from "primevue/progressspinner";
import MultiSelect from "primevue/multiselect";
import Tooltip from "primevue/tooltip";
import moment from "moment";
import ProgressBar from "primevue/progressbar";
import RadioButton from "primevue/radiobutton";

const app = createApp(App);
setupInterceptors(app);

app
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(moment)
  .use(VueApexCharts)
  .use(ToastService)
  .component("MultiSelect", MultiSelect)
  .component("FileUpload", FileUpload)
  .component("SelectButton", SelectButton)
  .component("Button", Button)
  .component("Sidebar", Sidebar)
  .component("Dropdown", Dropdown)
  .component("AutoComplete", AutoComplete)
  .component("ScrollPanel", ScrollPanel)
  .component("Splitter", Splitter)
  .component("SplitterPanel", SplitterPanel)
  .component("ScrollTop", ScrollTop)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("OverlayPanel", OverlayPanel)
  .component("InputSwitch", InputSwitch)
  .component("Dialog", Dialog)
  .component("Toast", Toast)
  .component("TabMenu", TabMenu)
  .component("Card", Card)
  .component("ProgressBar", ProgressBar)
  .component("ProgressSpinner", ProgressSpinner)
  .component("RadioButton", RadioButton)
  .directive("tooltip", Tooltip)

  .mount("#app");
