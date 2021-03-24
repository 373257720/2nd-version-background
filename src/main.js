// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import './css/base.css'
import qs from 'qs'
// import ElementUI from 'element-ui'
import Locale from 'element-ui/lib/locale'

// translation
// import MD5 from  "../md5"
// var appid = '20200615000495980'
// var key = 'ioT1P2UGZoGv7tkUu0lE'
// Vue.prototype.$MD5 = MD5
// Vue.prototype.$appid = appid
// Vue.prototype.$key = key

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
import global from '@/components/global.js'
import { i18n } from './language'

// Vue.use(ElementUI)
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  Cascader,
  MenuItem,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  Select,
  Option,
  popover,
  InputNumber,
  Button,
  Upload,
  Table,
  TableColumn,
  DatePicker,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Aside,
  Main,
  Loading,
  MessageBox,
  Message,
  ColorPicker
  // Notification
} from 'element-ui'
// Locale.i18n((key, value) => i18n.t(key, value))

import pagevue from './components/pagevue.vue'
const url = process.env.BASE_API
axios.defaults.baseURL = url
Vue.prototype.$global = global

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(popover)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
// Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
Vue.use(Checkbox)
// Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
// Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
// Vue.use(OptionGroup)
Vue.use(Button)
// Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
// Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(TabPane)
Vue.use(Loading.directive)
// Vue.use(Tag)
// Vue.use(Tree)
// Vue.use(Alert)
// Vue.use(Slider)
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Upload)
// Vue.use(Progress)
// Vue.use(Spinner)
// Vue.use(Badge)
// Vue.use(Card)
// Vue.use(Rate)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Carousel)
// Vue.use(CarouselItem)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
Vue.use(Cascader)
// Vue.use(ColorPicker)
// Vue.use(Transfer)
// Vue.use(Container)
// Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(ColorPicker)

// Vue.use(Footer)
// Vue.use(Timeline)
// Vue.use(TimelineItem)
// Vue.use(Link)
// Vue.use(Divider)
// Vue.use(Image)
// Vue.use(Calendar)
// Vue.use(Backtop)
// Vue.use(PageHeader)
// Vue.use(CascaderPanel)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$msgbox = MessageBox
Vue.config.productionTip = false
let loadingCount = 0
let isShowLoading = true
Vue.prototype.$isShowLoading = isShowLoading
const restore_obj = deepCopy(store._modules.root.state)
Vue.prototype.$restore_obj = restore_obj
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
Vue.prototype.$routerto = function routerTo(name, obj) {
  this.$router.push({
    name: name,
    query: obj
  })
}
Vue.prototype.$qs = qs
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    loadingCount++
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  res => {
    if (res.data && res.data.resultCode) {
      let code = res.data.resultCode
      loadingCount--
      if (code === 10090 || code === 10001) {
        if (isShowLoading) {
          isShowLoading = false
          let mes
          if (code === 10090) {
            if (i18n.locale === 'en_US') {
              mes = res.data.resultDesc.slice(11, -1)
            } else {
              mes = res.data.resultDesc.slice(0, 10)
            }
          } else if (code === 10001) {
            mes = res.data.resultDesc
          }
          MessageBox({
            title: i18n.t('project.Reminder'),
            message: mes
          }).then(() => {
            if (code === 10090) {
              store.dispatch('reset_actions', restore_obj)
              sessionStorage.clear()
              router.push({ name: 'login' })
            }
          })
        }
      }
    }
    if (loadingCount === 0) {
      isShowLoading = true
    }
    return res
  },
  error => {
    if (isShowLoading) {
      isShowLoading = false
      MessageBox({
        title: i18n.t('project.Reminder'),
        message: i18n.t('Home.network')
      }).then(() => {
        store.dispatch('reset_actions', restore_obj)
        sessionStorage.clear()
        router.push({ name: 'login' })
      })
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = axios
// //设置baseurl
var baseurl = {
  // api:'http://czw.mynatapp.cc',
  // api: "http://192.168.1.37:80",
  api: 'http://47.90.62.114:8086' // (后台正式服务器)
}
// Vue.prototype.$axios.defaults.baseURL = baseurl.api
function locales(a) {
  if (a === 'en_US') {
    Locale.use(enLocale)
  }
  if (a === 'zh_CN') {
    Locale.use(zhLocale)
  }
}
// Vue.use(ElementUI, {en_US})
Vue.prototype.$Local = locales
// 多语言设置
let z = window.localStorage.getItem('lan')
  ? window.localStorage.getItem('lan')
  : 'en_US'
locales(z)
i18n.locale = window.localStorage.getItem('lan')
  ? window.localStorage.getItem('lan')
  : 'en_US'
Vue.component('pagevue', pagevue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
