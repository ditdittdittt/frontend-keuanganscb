(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{393:function(t,e,n){"use strict";var r=n(1);e.a=r.a.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},400:function(t,e,n){"use strict";n(11),n(9),n(10);var r=n(2),o=(n(51),n(7),n(5),n(136),n(21),n(23),n(6)),l=n(53),c=n(79);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(l.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:v({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},417:function(t,e,n){"use strict";n(11),n(9),n(7),n(5),n(10);var r=n(2),o=(n(418),n(15)),l=n(6);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(l.a)(o.a).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:d({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},418:function(t,e,n){var content=n(419);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("e8b41e5e",content,!0,{sourceMap:!1})},419:function(t,e,n){(e=n(12)(!1)).push([t.i,".theme--light.v-subheader{color:rgba(0,0,0,.6)}.theme--dark.v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px}.v-subheader--inset{margin-left:56px}",""]),t.exports=e},423:function(t,e,n){var content=n(424);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(13).default)("5276b867",content,!0,{sourceMap:!1})},424:function(t,e,n){(e=n(12)(!1)).push([t.i,'.theme--light.v-badge .v-badge__badge:after{border-color:#fff}.theme--dark.v-badge .v-badge__badge:after{border-color:#1e1e1e}.v-badge{position:relative}.v-badge,.v-badge__badge{display:inline-block;line-height:1}.v-badge__badge{border-radius:10px;color:#fff;font-size:12px;height:20px;letter-spacing:0;min-width:20px;padding:4px 6px;pointer-events:auto;position:absolute;text-align:center;text-indent:0;top:auto;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap}.v-application--is-ltr .v-badge__badge{right:auto}.v-application--is-rtl .v-badge__badge{left:auto}.v-badge__badge .v-icon{color:inherit;font-size:12px;margin:0 -2px}.v-badge__badge .v-img{height:12px;width:12px}.v-badge__wrapper{flex:0 1;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.v-badge--avatar .v-badge__badge{padding:0}.v-badge--avatar .v-badge__badge .v-avatar{height:20px!important;min-width:0!important;max-width:20px!important}.v-badge--bordered .v-badge__badge:after{border-radius:inherit;border-width:2px;border-style:solid;bottom:0;content:"";left:0;position:absolute;right:0;top:0;transform:scale(1.15)}.v-badge--dot .v-badge__badge{border-radius:4.5px;height:9px;min-width:0;padding:0;width:9px}.v-badge--dot .v-badge__badge:after{border-width:1.5px}.v-badge--icon .v-badge__badge{padding:4px 6px}.v-badge--inline{align-items:center;display:inline-flex;justify-content:center}.v-badge--inline .v-badge__badge,.v-badge--inline .v-badge__wrapper{position:relative}.v-badge--inline .v-badge__wrapper{margin:0 4px}.v-badge--tile .v-badge__badge{border-radius:0}',""]),t.exports=e},598:function(t,e,n){"use strict";n(11),n(9),n(7),n(5),n(10);var r=n(76),o=n(2),l=(n(18),n(423),n(138)),c=n(19),d=n(15),v=n(31),f=n(393),h=n(67),m=n(6),_=n(0);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}e.a=Object(m.a)(c.a,Object(h.b)(["left","bottom"]),d.a,v.a,f.a).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(_.g)(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,label=this.$attrs["aria-label"]||t.t(this.label),data=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":label,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),e=this.$createElement("span",data,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e},genBadgeContent:function(){if(!this.dot){var slot=Object(_.r)(this,"badge");return slot||(this.content?String(this.content):this.icon?this.$createElement(l.a,this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var e=[this.genBadgeWrapper()],n=[Object(_.r)(this)],o=this.$attrs,l=(o["aria-atomic"],o["aria-label"],o["aria-live"],o.role,o.title,Object(r.a)(o,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?n.unshift(e):n.push(e),t("span",{staticClass:"v-badge",attrs:l,class:this.classes},n)}})},617:function(t,e,n){"use strict";n.r(e);n(33),n(34),n(5),n(38);var r=n(14),o=(n(26),n(40),{filters:{beauty:function(t){return null==t||""===t?"":t.replace(/[\W_]+/g," ").toUpperCase()}},data:function(){var t=this;return{alert:!1,success:!1,messages:"",loading:{logOut:!1,updateProfile:!1},user:{name:"",username:"",email:"",division:"",roles_list:[]},edit:{name:!1,username:!1,email:!1,division:!1},input:{name:"",username:"",email:"",division:"",roles_list:[]},valid:!1,rules:{required:function(e){return!!e||"".concat(t.$translate("text.required","capitalize"))},confirm:function(e){return e===t.input.password||"".concat(t.$translate("helper.different_password","capitalize"))},min6:function(t){return!!t&&t.length>=6||"Minimum 6"},min3:function(t){return!!t&&t.length>=3||"Minimum 3"},alphabetic:function(e){return/^[a-zA-Z0-9\s]+$/.test(e)||"".concat(t.$translate("alert.validation.alphabetic","capitalize"))},username:function(e){return/^[a-zA-Z0-9_-]+$/.test(e)||"".concat(t.$translate("alert.validation.alphabetic","capitalize"))},email:function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)||"".concat(t.$translate("helper.wrong_email","capitalize"))},toolong:function(e){return!!e&&e.length<=20||"".concat(t.$translate("alert.validation.textTooLong")," maximum 20")}}}},computed:{roleList:function(){return this.input.roles_list?this.input.roles_list.join(", "):null},notInEdit:function(){return this.edit.name||this.edit.username||this.edit.email||this.edit.division}},mounted:function(){this.initValue()},methods:{different:function(a,b){return a!==b},initValue:function(){this.user=this.$copy(this.$auth.$state.user),this.input=this.$copy(this.user)},reset:function(){this.input=this.$copy(this.user)},updateUser:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading.updateProfile=!0,e.next=4,t.$api("user","update",t.input,t.user).finally((function(){t.loading.updateProfile=!1}));case 4:200===(n=e.sent).status?(r=t.$copy(t.user.roles_list),t.user=t.$copy(n.data.user),t.user.roles_list=t.$copy(r),t.success=!0,t.messages="".concat(t.$translate("alert.update.success")),t.alert=!0):(t.success=!1,t.messages="".concat(t.$translate("alert.update.error")),t.alert=!0),e.next=14;break;case 8:e.prev=8,e.t0=e.catch(0),t.success=!1,t.messages="".concat(t.$translate("alert.error"))+e.t0.toString(),t.alert=!0,t.loading.updateProfile=!1;case 14:case"end":return e.stop()}}),e,null,[[0,8]])})))()},logOut:function(){var t=this;try{this.loading.logOut=!0,this.$api("user","logout").finally((function(){return t.loading.logOut=!1}))}catch(t){this.success=!1,this.messages="".concat(this.$translate("alert.error"))+t.toString(),this.alert=!0,this.loading.logOut=!0}}}}),l=n(30),c=n(39),d=n.n(c),v=n(598),f=n(167),h=n(157),m=n(57),_=n(374),y=n(377),x=n(365),O=n(400),$=n(158),w=n(99),j=n(159),P=n(70),C=n(375),k=n(384),B=n(417),V=n(401),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-card",{attrs:{raised:""}},[n("v-row",{staticClass:"ma-0",attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"12"}},[n("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-list",{attrs:{"two-line":"",subheader:""}},[n("v-subheader",{staticClass:"primary--text caption text-capitalize"},[t._v("\n              "+t._s(t.$translate("text.account"))+"\n              "),n("v-spacer")],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"overline font-weight-bold"},[n("v-badge",{attrs:{value:t.different(t.user.name,t.input.name),dot:"",color:"red","offset-x":-4,"offset-y":8}},[t._v(t._s(t.$translate("text.name")))])],1),t._v(" "),t.edit.name?n("v-list-item-subtitle",[n("v-text-field",{attrs:{dense:"",type:"text",autofocus:"",rules:[t.rules.required,t.rules.min3,t.rules.alphabetic],placeholder:t.$translate("text.name","capitalize")},model:{value:t.input.name,callback:function(e){t.$set(t.input,"name",e)},expression:"input.name"}})],1):n("v-list-item-subtitle",{staticClass:"py-2"},[t._v(t._s(t.input.name))])],1),t._v(" "),n("v-list-item-action",[t.edit.name?n("v-btn",{attrs:{color:"secondary",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.name=!1}}},[t._v(t._s(t.$translate("components.button.done")))]):n("v-btn",{attrs:{text:"",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.name=!0}}},[t._v("Edit")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"overline font-weight-bold"},[n("v-badge",{attrs:{value:t.different(t.user.username,t.input.username),dot:"",color:"red","offset-x":-4,"offset-y":8}},[t._v(t._s(t.$translate("text.username")))])],1),t._v(" "),t.edit.username?n("v-list-item-subtitle",[n("v-text-field",{attrs:{dense:"",type:"text",autofocus:"",rules:[t.rules.required,t.rules.min3,t.rules.username],placeholder:t.$translate("text.username","capitalize")},model:{value:t.input.username,callback:function(e){t.$set(t.input,"username",e)},expression:"input.username"}})],1):n("v-list-item-subtitle",{staticClass:"py-2"},[t._v("\n                  "+t._s(t.input.username)+"\n                ")])],1),t._v(" "),n("v-list-item-action",[t.edit.username?n("v-btn",{attrs:{color:"secondary",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.username=!1}}},[t._v(t._s(t.$translate("components.button.done")))]):n("v-btn",{attrs:{text:"",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.username=!0}}},[t._v("Edit")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"overline font-weight-bold"},[n("v-badge",{attrs:{value:t.different(t.user.email,t.input.email),dot:"",color:"red","offset-x":-4,"offset-y":8}},[t._v(t._s(t.$translate("text.email")))])],1),t._v(" "),t.edit.email?n("v-list-item-subtitle",[n("v-text-field",{attrs:{dense:"",type:"email",autofocus:"",rules:[t.rules.required,t.rules.min3,t.rules.email],placeholder:t.$translate("text.email","capitalize")},model:{value:t.input.email,callback:function(e){t.$set(t.input,"email",e)},expression:"input.email"}})],1):n("v-list-item-subtitle",{staticClass:"py-2"},[t._v("\n                  "+t._s(t.input.email)+"\n                ")])],1),t._v(" "),n("v-list-item-action",[t.edit.email?n("v-btn",{attrs:{color:"secondary",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.email=!1}}},[t._v(t._s(t.$translate("components.button.done")))]):n("v-btn",{attrs:{text:"",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.email=!0}}},[t._v("Edit")])],1)],1),t._v(" "),n("div",{staticClass:"spacing-small"}),t._v(" "),n("v-subheader",{staticClass:"primary--text caption text-capitalize"},[t._v("\n              "+t._s(t.$translate("text.job"))+"\n              "),n("v-spacer")],1),t._v(" "),n("v-divider"),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"overline font-weight-bold"},[n("v-badge",{attrs:{value:t.different(t.user.division,t.input.division),dot:"",color:"red","offset-x":-4,"offset-y":8}},[t._v(t._s(t.$translate("text.division")))])],1),t._v(" "),t.edit.division?n("v-list-item-subtitle",[n("v-text-field",{attrs:{dense:"",type:"text",autofocus:"",counter:"",rules:[t.rules.required,t.rules.toolong,t.rules.min3],placeholder:t.$translate("text.division","capitalize")},model:{value:t.input.division,callback:function(e){t.$set(t.input,"division",e)},expression:"input.division"}})],1):n("v-list-item-subtitle",{staticClass:"py-2"},[t._v(t._s(t.input.division))])],1),t._v(" "),n("v-list-item-action",[t.edit.division?n("v-btn",{attrs:{color:"secondary",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.division=!1}}},[t._v(t._s(t.$translate("components.button.done")))]):n("v-btn",{attrs:{text:"",small:"",disabled:!t.valid},on:{click:function(e){e.stopPropagation(),t.edit.division=!0}}},[t._v("Edit")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"overline font-weight-bold"},[t._v("\n                  "+t._s(t.$translate("text.role"))+"\n                ")]),t._v(" "),n("v-list-item-subtitle",{staticClass:"text-uppercase py-2"},[t._v("\n                  "+t._s(t.roleList)+"\n                ")])],1)],1),t._v(" "),n("div",{staticClass:"spacing-small"})],1)],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12"}},[t.loading.updateProfile?[n("circular-loading")]:[n("v-row",[n("v-col",[n("v-btn",{attrs:{color:"accent",block:""},on:{click:function(e){return e.stopPropagation(),t.reset()}}},[t._v("\n                "+t._s(t.$translate("components.button.reset"))+"\n              ")])],1),t._v(" "),n("v-col",[n("v-btn",{attrs:{color:"secondary",block:"",disabled:t.notInEdit},on:{click:function(e){return e.stopPropagation(),t.updateUser()}}},[t._v("\n                "+t._s(t.$translate("components.button.save"))+"\n              ")])],1)],1)]],2)],1)],1),t._v(" "),n("div",{staticClass:"spacing-small"}),t._v(" "),t.loading.logOut?[n("circular-loading")]:[n("v-card",{attrs:{raised:""}},[n("v-card-actions",{staticClass:"pa-0"},[n("v-btn",{attrs:{block:"",color:"accent","x-large":""},on:{click:function(e){return t.logOut()}}},[t._v("\n          "+t._s(t.$translate("components.button.logout"))+"\n        ")])],1)],1)],t._v(" "),n("div",{staticClass:"spacing-medium"}),t._v(" "),n("snackbar-alert",{attrs:{success:t.success,messages:t.messages},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}})],2)}),[],!1,null,"26b4f5de",null);e.default=component.exports;d()(component,{VBadge:v.a,VBtn:f.a,VCard:h.a,VCardActions:m.a,VCol:_.a,VContainer:y.a,VDivider:x.a,VForm:O.a,VList:$.a,VListItem:w.a,VListItemAction:j.a,VListItemContent:P.a,VListItemSubtitle:P.b,VListItemTitle:P.c,VRow:C.a,VSpacer:k.a,VSubheader:B.a,VTextField:V.a})}}]);