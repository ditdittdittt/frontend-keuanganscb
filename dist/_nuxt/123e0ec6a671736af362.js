(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{378:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(46),l=n(0),o=Object(l.h)("v-toolbar__title"),c=Object(l.h)("v-toolbar__items");r.a},391:function(t,e){t.exports={MenungguPersetujuan:"Menunggu Persetujuan",MenungguPembayaran:"Menunggu Pembayaran",Terbayarkan:"Terbayarkan",MenungguSubmisi:"Menunggu Submisi",VerifikasiSubmisi:"Verifikasi Submisi",Selesai:"Selesai",Ditolak:"Ditolak"}},465:function(t,e,n){"use strict";n.r(e);n(39);var r=n(11),l=(n(22),n(24),n(84),n(54),n(55),n(4),n(28),n(19),n(391)),o={filters:{currency:function(t){var e=Number(t)<0;if(null==t||""===t)return"Rp 0";if(t.toString().split(".").length>2)return"Rp ~";t.toString().split(".").length>1&&(t=(t=t.toString().split("."))[0]);try{return"Rp "+(!0===e?"-":"")+t.toString().match(/\d{1,3}(?=(\d{3})*$)/g).join(".")}catch(t){return"Rp ~"}}},data:function(){return{alert:!1,success:!1,rawData:!1,messages:"",search:"",dialogDelete:!1,currentId:null,loading:{onDelete:!1},headers:[{text:"".concat(this.$translate("text.created_at","capitalize")),value:"created_at"},{text:"".concat(this.$translate("text.allocation","capitalize")),value:"allocation"},{text:"".concat(this.$translate("text.pic","capitalize")),value:"pic.name"},{text:"".concat(this.$translate("text.status","capitalize")),value:"status.status"},{text:"".concat(this.$translate("text.amount","capitalize")),value:"amount"},{text:"".concat(this.$translate("text.number","capitalize")),value:"number"},{text:"".concat(this.$translate("text.action","capitalize")),value:"id",sortable:!1,align:"center"}],items:[]}},computed:{isAdmin:function(){return this.$auth.user.roles_list.map((function(t){return t.toLowerCase()})).includes("admin")}},mounted:function(){this.getAllPettyCashForms()},methods:{popupDialogDelete:function(t){this.dialogDelete=!0,this.currentId=t},isAllowedToDelete:function(t){return![l.Terbayarkan,l.MenungguSubmisi,l.VerifikasiSubmisi].includes(t)},getAllPettyCashForms:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$api("petty","index",null);case 3:t.items=e.sent,e.next=11;break;case 6:e.prev=6,e.t0=e.catch(0),t.success=!1,t.messages="".concat(t.$translate("alert.error","capitalize"))+e.t0.toString(),t.alert=!0;case 11:case"end":return e.stop()}}),e,null,[[0,6]])})))()},deletePetty:function(){var t=this;try{this.loading.onDelete=!0,this.$api("petty","delete",this.currentId).finally((function(){t.getAllPettyCashForms(),t.dialogDelete=!1,t.loading.onDelete=!1}))}catch(t){this.success=!1,this.messages="".concat(this.$translate("alert.error","capitalize"))+t.toString(),this.alert=!0}}}},c=n(29),d=n(34),v=n.n(d),m=n(163),_=n(151),h=n(53),f=n(366),x=n(458),y=n(376),k=n(133),D=n(153),$=n(94),V=n(68),w=n(417),C=n(373),S=n(387),z=n(46),P=n(378),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{staticClass:"mx-5 py-5 front-card",attrs:{color:"primary",dark:"",raised:""}},[n("v-card-title",{staticClass:"text-uppercase"},[n("span",[t._v(t._s(t.$translate("components.table.title.petty_cash")))]),t._v(" "),n("v-spacer"),t._v(" "),n("v-menu",{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{dark:"",icon:""}},r),[n("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[t._v(" "),n("v-list",[n("v-list-item",{on:{click:function(e){return e.stopPropagation(),t.$export("pdf","petty",null)}}},[n("v-list-item-title",{staticClass:"text-capitalize"},[t._v("\n              "+t._s(t.$translate("export.pdf"))+"\n            ")])],1),t._v(" "),n("v-list-item",{on:{click:function(e){return e.stopPropagation(),t.$export("excel","petty",null)}}},[n("v-list-item-title",{staticClass:"text-capitalize"},[t._v("\n              "+t._s(t.$translate("export.excel"))+"\n            ")])],1),t._v(" "),n("v-list-item",{on:{click:function(e){e.stopPropagation(),t.rawData=!0}}},[n("v-list-item-title",{staticClass:"text-capitalize"},[t._v("\n              "+t._s(t.$translate("text.rawData"))+"\n            ")])],1)],1)],1)],1),t._v(" "),n("v-card-subtitle",{staticClass:"overline"},[t._v("\n      "+t._s(t.$translate("components.table.subtitle.petty_cash"))+"\n    ")]),t._v(" "),n("v-card-text",{staticClass:"px-5"},[n("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:t.$translate("text.search","capitalize"),solo:"","single-line":"",light:!t.$vuetify.theme.dark,"hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),t._v(" "),n("v-card",{staticClass:"back-card px-md-5",attrs:{raised:""}},[n("v-card-text",[n("div",{staticClass:"spacing-medium"}),t._v(" "),n("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search},scopedSlots:t._u([{key:"item.amount",fn:function(e){var n=e.item;return[t._v(t._s(t._f("currency")(n.amount)))]}},{key:"item.id",fn:function(e){var r=e.item;return[n("v-btn",{attrs:{color:"secondary",small:"",text:"",to:"/detail/petty/"+r.id}},[t._v("Detail")]),t._v(" "),t.isAdmin&&t.isAllowedToDelete(r.status.status)?n("v-btn",{attrs:{color:"red",small:"",text:""},on:{click:function(e){return e.stopPropagation(),t.popupDialogDelete(r.id)}}},[t._v(t._s(t.$translate("components.button.delete")))]):t._e()]}}])})],1)],1),t._v(" "),n("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.rawData,callback:function(e){t.rawData=e},expression:"rawData"}},[n("v-card",[n("v-toolbar",{attrs:{dark:"",color:"accent"}},[n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.rawData=!1}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("v-toolbar-title",[t._v(t._s(t.$translate("text.rawData")))]),t._v(" "),n("v-spacer")],1),t._v(" "),n("v-card-text",[n("pre",[t._v(t._s(t.items))])])],1)],1),t._v(" "),n("snackbar-alert",{attrs:{success:t.success,messages:t.messages},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}}),t._v(" "),n("dialog-alert",{attrs:{title:t.$translate("text.sure_delete_head"),message:t.$translate("text.sure_delete_body"),load:t.loading.onDelete},on:{no:function(e){t.dialogDelete=!1},yes:t.deletePetty},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[n("circular-loading")],1)],1)}),[],!1,null,"5a21aab2",null);e.default=component.exports;v()(component,{VBtn:m.a,VCard:_.a,VCardSubtitle:h.b,VCardText:h.c,VCardTitle:h.d,VContainer:f.a,VDataTable:x.a,VDialog:y.a,VIcon:k.a,VList:D.a,VListItem:$.a,VListItemTitle:V.c,VMenu:w.a,VSpacer:C.a,VTextField:S.a,VToolbar:z.a,VToolbarTitle:P.a})}}]);