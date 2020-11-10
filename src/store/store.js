import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    currentUser: null,
    commondialog: false,
    usertype:null,
    X_Token:'',
    formobj: {},
  },
  getters: {},
  mutations: {
    X_Token_mutation(state,usertype){
      if (usertype) {
        state.X_Token = usertype;
      }
    },
    reset_mutation(state, usertype) {
      Object.assign(state, usertype)
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
      } else if (user == null) {
        state.currentUser = null;

      }
    },
    commondialogfunction(state, isyes) {
      state.commondialog = isyes
    },
    submit_formdata_mutation(state, obj) {
      if (obj) {
        state.formobj={};
        state.formobj = obj
        //    state.isLogin = true
      }
    },
    usertype_mutation(state,usertype){
      if (usertype || usertype===0) {
        state.usertype = usertype
      } else  {
        state.usertype = null;
      }
    },
  },
  actions: {
    X_Token_actions(context,obj) {
      context.commit('X_Token_mutation',obj)
    },
    reset_actions(context,obj) {
      // console.log('test')
      context.commit('reset_mutation',obj)
    },
    usertype_action(context,obj){
      context.commit('usertype_mutation',obj)
    },
    submit_formdata_action(context, obj) {
      context.commit('submit_formdata_mutation', obj)
    },
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    commondialogfunctionaysn(context, status) {
      // console.log(context, status);
      context.commit('commondialogfunction', status)
    },

  }
});
