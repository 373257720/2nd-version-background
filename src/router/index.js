import Vue from "vue";
import Router from "vue-router";

const home = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/home"
  );
const login = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/login"
  );
// industry_lists
const industry = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/industry_lists/industry"
  );
const industry_alter = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/industry_lists/industry_alter"
  );
const industry_lists = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/industry_lists/industry_lists"
  );
// import industry from "../components/industry_lists/industry";
// import industry_alter from "../components/industry_lists/industry_alter";
// import industry_lists from "../components/industry_lists/industry_lists";

// project
const tosignuproot = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/tosignuproot"
  );
const project = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/project"
  );
const contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/contract"
  );
const addproject_ch = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/addproject_ch"
  );
const addproject_eng = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/addproject_eng"
  );
const tosignup_check = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/tosignup_check"
  );
const investor_infor = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/investor_infor"
  );
const contract_terms = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/project/contract_terms"
  );

// import tosignuproot from '@/components/project/tosignuproot'
// import project from '@/components/project/project'
// import contract from '@/components/project/contract'
// import addproject_ch from '@/components/project/addproject_ch'
// import addproject_eng from '@/components/project/addproject_eng'
// import tosignup_check from '@/components/project/tosignup_check'
// import investor_infor from '@/components/project/investor_infor'
// Contractlist
const contractItem = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/contract_list/contractItem"
  );
  const contractClause = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/contract_list/contractClause"
  );
   
const contractListsRoot = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/contract_list/contractListsRoot"
  );
  const add_contract = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/contract_list/add_contract"
  );
  const contract_alter = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/contract_list/contract_alter"
  );
// userslist
const check_pending = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/check_pending"
  );
const check_pendingroot = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/check_pendingroot"
  );
const verified_user = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/verified_user"
  );
const userroot = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/verified_useroot"
  );
const verified_usercheck = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/verified_usercheck"
  );
const check_pendingcheck = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/check_pendingcheck"
  );
const userlist = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/userlist/userlist"
  );

// Recommand
const Recommand = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/Recommand/Recommand"
  );
const RecommandList = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/Recommand/RecommandList"
  );
// membership

const Exchange = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/Exchange"
  );

const addLevel = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/addLevel"
  );
const customPoints = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/customPoints"
  );

const pointsSetting = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/pointsSetting"
  );
  const pointsSettingHistory=()=>import(
     /* webpackChunkName: "project_owner" */
     "@/components/membership/pointsSettingHistory"
  )
const addGift = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/addGift"
  );
const membership = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/membership"
  );
const giftSetting = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/giftSetting"
  );
const MembershipSystemArrangment = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/MembershipSystemArrangment"
  );
  const rankingList = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/rankingList"
  );
  const exchangeHistory=()=>
    import(
      /* webpackChunkName: "project_owner" */
      "@/components/membership/exchangeHistory"
    );
    const exchangeDetails=()=>
    import(
      /* webpackChunkName: "project_owner" */
      "@/components/membership/exchangeDetails"
    );
const membershipList = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/membership/membershipList"
  );

// coin_category
const coin_category_lists = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/coin_category/coin_category_lists"
  );
// import coin_category_lists from "../components/coin_category/coin_category_lists";
const coin_category = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/coin_category/coin_category"
  );
const coin_category_alter = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/coin_category/coin_category_alter"
  );
// import coin_category from '../components/coin_category/coin_category'
// import coin_category_alter from '../components/coin_category/coin_category_alter'
// 2级路由userlist/

// 用户管理
const user_managementlists = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/user_management/user_managementlists"
  );
const user_management = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/user_management/user_management"
  );
const add_user = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/user_management/add_user"
  );
const change_password = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/user_management/change_password"
  );
  const tag = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/tag/tag"
  );
  const tagList = () =>
  import(
    /* webpackChunkName: "project_owner" */
    "@/components/tag/tag_list"
  );


// import user_managementlists from "../components/user_management/user_managementlists";
// import user_management from '../components/user_management/user_management'
// import add_user from '../components/user_management/add_user'
// import change_password from "@/components/user_management/change_password"
// import store from "../store/store";
// import  coin_category_alter from '../components/coin_category/coin_category_alter'
// moblie

Vue.use(Router);
const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      // title: '首页',
      requireAuth: true
    },
    redirect: "/home/project",
    children: [
      {
        path: "project",
        name: "project",
        component: project,
        meta: {
          title: "Home.Itemlist"
        },
        redirect: "/home/project/tosignuproot",
        children: [
          {
            path: "tosignuproot",
            name: "tosignuproot",
            component: tosignuproot
          },
          {
            path: "tosignup_check",
            name: "tosignup_check",
            component: tosignup_check
          },
          {
            path: "contract",
            name: "contract",
            component: contract
          },
          {
            path: "investor_infor",
            name: "investor_infor",
            component: investor_infor
          },
          {
            path: "addproject_ch",
            name: "addproject_ch",
            component: addproject_ch
          },
          {
            path: "contract_terms",
            name: "contract_terms",
            component: contract_terms
          },
          {
            path: "addproject_eng",
            name: "addproject_eng",
            component: addproject_eng
          }
        ]
      },
      {
        path: "userlist",
        name: "userlist",
        component: userlist,
        meta: {
          title: "Home.userlist"
        },
        redirect: "/home/userlist/verified_user",
        children: [
          {
            path: "check_pending",
            name: "check_pending",
            component: check_pending,
            redirect: "/home/userlist/check_pending",
            meta: {
              title: "Home.Pendingusers"
            },
            children: [
              {
                path: "/",
                name: "",
                component: check_pendingroot
              },
              {
                // 发现
                path: "check",
                name: "check",
                component: check_pendingcheck
              }
            ]
          },
          {
            path: "verified_user",
            name: "verified_user",
            component: verified_user,
            redirect: "/home/userlist/verified_user/userroot",
            meta: {
              title: "Home.Authenticateduser"
            },
            children: [
              {
                path: "userroot",
                name: "userroot",
                component: userroot
              },
              {
                path: "usercheck",
                name: "usercheck",
                component: verified_usercheck
              }
            ]
          }
        ]
      },
      {
        path: "contractListsRoot",
        name: "contractListsRoot",
        component: contractListsRoot,
        meta: {
          title: "Home.ContractList"
        },
        redirect: "/home/contractListsRoot/contractItem",
        children: [
          {
            path: "contractItem",
            name: "contractItem",
            component: contractItem
          },
          {
            path: "contractClause",
            name: "contractClause",
            component: contractClause
          },
          
          {
            path: "add_contract",
            name: "add_contract",
            component: add_contract
          },
          {
            path: "contract_alter",
            name: "contract_alter",
            component: contract_alter
          }
        ]
      },
      {
        path: "industry",
        name: "industry",
        component: industry,
        meta: {
          title: "Home.Industrylist"
        },
        redirect: "/home/industry/industry_lists",
        children: [
          {
            path: "industry_lists",
            name: "industry_lists",
            component: industry_lists
          },
          {
            path: "industry_alter",
            name: "industry_alter",
            component: industry_alter,
            meta: {
              title: "project.Addproject"
            }
          }
        ]
      },
      {
        path: "Recommand",
        name: "Recommand",
        component: Recommand,
        meta: {
          title: "Home.RecommandList"
        },
        redirect: "/home/Recommand/RecommandList",
        children: [
          {
            path: "RecommandList",
            name: "RecommandList",
            component: RecommandList
          }
        ]
      },

      {
        path: "coin_category",
        name: "coin_category",
        component: coin_category,
        meta: {
          title: "Home.Currencylist"
        },
        redirect: "/home/coin_category/coin_category_lists",
        children: [
          {
            path: "coin_category_lists",
            name: "coin_category_lists",
            component: coin_category_lists
          },
          {
            path: "coin_category_alter",
            name: "coin_category_alter",
            component: coin_category_alter
            // meta: {
            //   title: '添加币种'i18n.t('project.Currencylist')
            // },
          }
        ]
      },
      {
        path: "membership",
        name: "membership",
        component: membership,
        meta: {
          title: "Home.membershipList"
        },
        redirect: "/home/membership/membershipList",
        children: [
          {
            path: "membershipList",
            name: "membershipList",
            component: membershipList
          },
          {
            path: "giftSetting",
            name: "giftSetting",
            component: giftSetting
          },
          {
            path: "addGift",
            name: "addGift",
            component: addGift
          },
          {
            path: "pointsSetting",
            name: "pointsSetting",
            component: pointsSetting
          },
          
          {
            path: "addLevel",
            name: "addLevel",
            component: addLevel
          },
          {
            path: "MembershipSystemArrangment",
            name: "MembershipSystemArrangment",
            component: MembershipSystemArrangment
            // meta: {
            //   title: '添加币种'i18n.t('project.Currencylist')
            // },
          },
          {
            path: "exchangeHistory",
            name: "exchangeHistory",
            component: exchangeHistory
          },
          {
            path: "exchangeDetails",
            name: "exchangeDetails",
            component: exchangeDetails
          },
          {
            path: "pointsSettingHistory",
            name: "pointsSettingHistory",
            component: pointsSettingHistory
          },
          {
            path: "rankingList",
            name: "rankingList",
            component: rankingList
          },
          {
            path: "Exchange",
            name: "Exchange",
            component: Exchange
          },
          {
            path: "customPoints",
            name: "customPoints",
            component: customPoints
            // meta: {
            //   title: '添加币种'i18n.t('project.Currencylist')
            // },
          }
        ]
      },

      {
        path: "user_management",
        name: "user_management",
        component: user_management,
        meta: {
          title: "Home.Backgroundusermanagement"
        },
        redirect: "/home/user_management/user_managementlists",
        children: [
          {
            path: "user_managementlists",
            name: "user_managementlists",
            component: user_managementlists
          },
          {
            path: "change_password",
            name: "change_password",
            component: change_password,
            meta: {
              title: "UserManagement.changePassword"
            }
          },
          {
            path: "add_user",
            name: "add_user",
            component: add_user,
            meta: {
              title: "UserManagement.Addnewbackgrounduser"
            }
          }
        ]
      },
      {
        path: "tag",
        name: "tag",
        component: tag,
        redirect: "/home/tag/tagList",
        children: [
          {
            path: "tagList",
            name: "tagList",
            component: tagList,
            meta: {
              title: "Home.tagList"
            }
          },
        ]
      }
    ]
  },
  {
    path: "*",
    // name: 'login',
    component: login
  },
  {
    path: "/",
    redirect: {
      name: "login"
    }
  }
];

let router = new Router({
  // mode:'history',
  routes
});
// router.beforeEach((to, from, next) => {
//   console.log(store)
//   store.commit('toprightt', to.name)
//   next();
// })
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// router.beforeEach((to, from, next) => {
//   let token;
//   if(JSON.parse(sessionStorage.getItem("store"))){
//       token =  JSON.parse(sessionStorage.getItem("store")).currentUser;
//   }else{
//      token =  store.state.currentUser
//   }
//   console.log(token)
//   if (to.name=='login') {
//     // 判断是否登录
//     if (token) {
//       next({
//         path: '/home'
//       });
//     } else {
//       next();
//     }
//   } else {
//     if (token) {
//       next();
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//     // 要进入to路由，必须调用next()方法
//   }
// });
export default router;
