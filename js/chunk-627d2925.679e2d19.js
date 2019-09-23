(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-627d2925"],{"088f":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-toolbar",{staticStyle:{height:"200px"},attrs:{dark:"",prominent:"",color:"blue-grey darken-4"}},[s("v-toolbar-title",[e._v("Administración de Clases")])],1),s("v-container",{attrs:{id:"dropdown-example"}},[s("v-row",[s("v-col",{attrs:{cols:"12",sm:"12"}},[s("v-overflow-btn",{staticClass:"my-2",attrs:{label:"Clases",items:e.clases,disabled:1==e.dropdownAble,target:"#dropdown-example"},on:{change:function(t){return e.showClass()}},model:{value:e.seleccionado,callback:function(t){e.seleccionado=t},expression:"seleccionado"}})],1)],1),s("v-row",[s("v-col",{attrs:{cols:"12",sm:"12"}},[s("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",color:" success",disabled:1==e.agregarAble},on:{click:function(t){return e.agregar()}}},[s("v-icon",[e._v("mdi-plus")]),e._v("Agregar\n        ")],1),s("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",disabled:1==e.editarAble,color:"warning"},on:{click:function(t){return e.update()}}},[s("v-icon",{attrs:{left:""}},[e._v("mdi-pencil")]),e._v("Editar\n        ")],1),s("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",disabled:1==e.eliminarAble,color:"error"},on:{click:function(t){return e.eliminar()}}},[s("v-icon",[e._v("mdi-delete")]),e._v("Eliminar\n        ")],1)],1)],1)],1),s("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-container",[s("v-row",[s("v-col",{attrs:{cols:"12",md:"12"}},[s("v-text-field",{attrs:{rules:e.nombreRules,label:"Nombre de la Clase",disabled:1==e.formAble,required:""},model:{value:e.nombre,callback:function(t){e.nombre=t},expression:"nombre"}})],1),s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-select",{attrs:{items:e.instituciones,label:"Institución",disabled:1==e.formAble,required:""},model:{value:e.institucion,callback:function(t){e.institucion=t},expression:"institucion"}})],1),s("v-col",{attrs:{cols:"12",sm:"6"}},[s("v-select",{attrs:{items:e.docentes,label:"Docente",disabled:1==e.formAble,required:""},model:{value:e.docente,callback:function(t){e.docente=t},expression:"docente"}})],1),s("v-col",{attrs:{cols:"12",sm:"12"}},[s("v-select",{attrs:{items:e.alumnos,label:"Alumnos",chips:"",multiple:"",disabled:1==e.formAble,required:""},model:{value:e.alumnos_seleccionados,callback:function(t){e.alumnos_seleccionados=t},expression:"alumnos_seleccionados"}})],1),s("v-col",{attrs:{cols:"12",md:"3"}},[s("v-text-field",{attrs:{rules:e.gradoRules,type:"number",label:"Grado",disabled:1==e.formAble,required:""},model:{value:e.grado,callback:function(t){e.grado=t},expression:"grado"}})],1),s("v-col",{attrs:{cols:"12",md:"3"}},[s("v-text-field",{attrs:{rules:e.seccionRules,label:"Sección",disabled:1==e.formAble,required:""},model:{value:e.seccion,callback:function(t){e.seccion=t},expression:"seccion"}})],1),s("v-col",{attrs:{cols:"12",md:"3"}},[s("v-text-field",{attrs:{rules:e.parcialRules,type:"number",label:"Parcial",disabled:1==e.formAble,required:""},model:{value:e.parcial,callback:function(t){e.parcial=t},expression:"parcial"}})],1),s("v-col",{attrs:{cols:"12",md:"3"}},[s("v-text-field",{attrs:{type:"number",rules:e.anioRules,label:"Año",disabled:1==e.formAble,required:""},model:{value:e.anio,callback:function(t){e.anio=t},expression:"anio"}})],1)],1)],1)],1),s("v-btn",{staticClass:"blue-grey darken-4 white--text",attrs:{width:"100%",disabled:1==e.formAble,primary:""},on:{click:function(t){return e.guardar()}}},[s("v-icon",[e._v("mdi-sd")]),e._v("Guardar\n  ")],1),s("div",{staticClass:"text-center ma-2"},[s("v-snackbar",{model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n      "+e._s(e.text)+"\n      "),s("v-btn",{attrs:{color:e.snackColor,text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1)],1),s("div",[s("v-dialog",{attrs:{"max-width":"290"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[s("v-card",[s("v-card-title",{staticClass:"headline"},[e._v("Eliminar definitivamente la Clase?")]),s("v-card-text",[e._v("Al eliminar la Clase, la misma dejará de existir en la base de datos y ya no estará disponible.")]),s("v-card-actions",[s("div",{staticClass:"flex-grow-1"}),s("v-btn",{attrs:{color:"red",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("Cancelar")]),s("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){return e.deleteClass()}}},[e._v("Aceptar")])],1)],1)],1)],1)],1)},a=[],n=s("dc59"),o={data:()=>({isLoading:!1,nombre:"",grado:0,seccion:"",institucion:"",instituciones:[],idInst:[],alumnos_seleccionados:[],alumnos:[],my_alumnos:[],docente:"",docentes:[],parcial:0,anio:0,clases:[],base:[],seleccionado:"",idseleccionado:"",formAble:1,dropdownAble:0,opcionSeleccionada:"",agregarAble:0,editarAble:0,eliminarAble:0,valid:!1,snackColor:"red",dialog:!1,nombreRules:[e=>!!e||"El nombre es requerido."],seccionRules:[e=>!!e||"La sección es requerido."],gradoRules:[e=>!!e||"El grado es requerido.",e=>0!=e||"El grado no puede ser cero."],anioRules:[e=>!!e||"El año es requerido.",e=>e>=2e3||"El año debe ser mayor que 2000."],parcialRules:[e=>!!e||"El parcial es requerido.",e=>0!=e||"El parcial no puede ser cero."],snackbar:!1,text:""}),mounted:function(){this.getClasses()},methods:{agregar:function(){this.dropdownAble=1,this.formAble=0,this.nombre="",this.grado=1,this.anio=2e3,this.seccion="",this.parcial=1,this.alumnos_seleccionados=[],this.institucion="",this.docente="",this.opcionSeleccionada="agregar",this.editarAble=1,this.eliminarAble=1},update(){""==this.seleccionado?(this.text="Debe seleccionar una Institución.",this.snackbar=!0):(this.formAble=0,this.dropdownAble=1,this.agregarAble=1,this.eliminarAble=1,this.opcionSeleccionada="update")},eliminar:function(){this.snackColor="red",""==this.seleccionado?(this.text="Debe seleccionar una Institución.",this.snackbar=!0):(this.dialog=!0,this.editarAble=1,this.agregarAble=1)},guardar:function(){if(this.snackColor="red",""===this.nombre||""===this.grado||0===this.grado||""===this.seccion||""===this.parcial||0===this.parcial||""===this.anio||0===this.anio||0===this.alumnos_seleccionados.length||""===this.institucion||""===this.docente)this.text="No deben haber campos vacíos!",this.snackbar=!0;else if("agregar"===this.opcionSeleccionada){var e=!1,t="";this.idInst.forEach(e=>{this.institucion===e.data&&(t=e.id)}),this.base.forEach(s=>{s.data.nombre===this.nombre&&String(s.data.institucion.id)===t&&s.data.seccion===this.seccion&&s.data.anio===this.anio&&s.data.parcial===this.parcial&&s.data.grado===this.grado&&(e=!0,console.log("Cumple If"))}),!0===e?(this.text="Esa Clase ya existe.",this.snackbar=!0):(console.log("Else"),this.addClass(),this.dropdownAble=0,this.formAble=1)}else this.updateClass(),this.dropdownAble=0,this.formAble=1},getClasses:function(){this.alumnos=[],this.docentes=[],this.my_alumnos=[],this.instituciones=[],this.alumnos_seleccionados=[],this.base=[],this.clases=[],n["a"].firestore().collection("classes").get().then(e=>{e.forEach(e=>{this.clases.push(e.data().nombre+"__________-"+e.id),this.base.push({id:e.id,data:e.data()})})}).catch(function(e){console.log("Error getting Classes: ",e)}),n["a"].firestore().collection("institutions").get().then(e=>{e.forEach(e=>{this.instituciones.push(e.data().nombre),this.idInst.push({id:e.id,data:e.data().nombre})})}).catch(function(e){console.log("Error getting Institutions: ",e)}),n["b"].collection("users").get().then(e=>{e.forEach(e=>{"Profesor"==e.data().userType?this.docentes.push(e.data().email):"Alumno"==e.data().userType&&this.alumnos.push(e.data().email)})}).catch(function(e){console.log("Error getting documents: ",e)})},showClass:function(){this.alumnos_seleccionados=[],this.base.forEach(e=>{e.id===this.seleccionado.split("-")[1]&&(this.nombre=e.data.nombre,this.grado=e.data.grado,this.seccion=e.data.seccion,this.anio=e.data.anio,this.parcial=e.data.parcial,this.idseleccionado=e.id,n["b"].collection("institutions").doc(e.data.institucion.id).get().then(e=>{this.institucion=e.data().nombre}),n["b"].collection("users").doc(e.data.docente.id).get().then(e=>{this.docente=e.data().email}),e.data.alumnos.forEach(e=>{n["b"].collection("users").doc(e.id).get().then(e=>{this.alumnos_seleccionados.push(e.data().email)})}))})},updateClass:function(){var e="institutions/";n["b"].collection("institutions").where("nombre","==",this.institucion).get().then(t=>{t.forEach(t=>{e+=t.id});var s="users/";n["b"].collection("users").where("email","==",this.docente).get().then(t=>{t.forEach(e=>{s+=e.id});var i=[];this.alumnos_seleccionados.forEach(e=>{n["b"].collection("users").where("email","==",e).get().then(e=>{e.forEach(e=>{i.push(n["b"].doc("users/"+e.id)),this.my_alumnos=i})}).catch(function(e){console.log("Error getting alumnos: ",e)})}),n["b"].collection("classes").doc(this.idseleccionado).update({nombre:this.nombre,grado:parseInt(this.grado),seccion:this.seccion,anio:parseInt(this.anio),parcial:parseInt(this.parcial),institucion:n["b"].doc(e),docente:n["b"].doc(s)}).then(()=>{console.log(this.my_alumnos),console.log("Clase Actualizada!"),this.text="Clase actualizada correctamente.",this.snackColor="green",this.snackbar=!0,this.agregarAble=0,this.eliminarAble=0,this.dropdownAble=0,n["b"].collection("classes").doc(this.idseleccionado).update({alumnos:this.my_alumnos}).then(()=>{this.getClasses(),this.showClass()})}).catch(e=>{console.error("Error updating Clase: ",e),this.text="Error actualizando Clase.",this.snackbar=!0,this.agregarAble=0,this.eliminarAble=0,this.dropdownAble=0})}).catch(function(e){console.log("Error getting docente: ",e)})}).catch(function(e){console.log("Error getting institution: ",e)})},addClass:function(){var e="institutions/";n["b"].collection("institutions").where("nombre","==",this.institucion).get().then(t=>{t.forEach(t=>{e+=t.id});var s="users/";n["b"].collection("users").where("email","==",this.docente).get().then(t=>{t.forEach(e=>{s+=e.id});var i=[];this.alumnos_seleccionados.forEach(e=>{n["b"].collection("users").where("email","==",e).get().then(e=>{e.forEach(e=>{i.push(n["b"].doc("users/"+e.id)),this.my_alumnos=i})}).catch(function(e){console.log("Error getting alumnos: ",e)})}),n["b"].collection("classes").add({nombre:this.nombre,grado:parseInt(this.grado),seccion:this.seccion,parcial:parseInt(this.parcial),anio:parseInt(this.anio),institucion:n["b"].doc(e),docente:n["b"].doc(s),alumnos:this.my_alumnos}).then(e=>{console.log("Document written with ID: ",e.id),this.seleccionado=this.nombre+"-"+this.grado+"-"+this.seccion+"-"+this.parcial+"-"+this.anio,n["b"].collection("classes").doc(e.id).update({alumnos:this.my_alumnos}).then(()=>{this.text="Institución agregada correctamente.",this.snackColor="green",this.snackbar=!0,this.editarAble=0,this.eliminarAble=0,this.dropdownAble=0,this.nombre="",this.grado=1,this.anio=2e3,this.seccion="",this.parcial=1,this.alumnos_seleccionados=[],this.institucion="",this.docente="",this.opcionSeleccionada="agregar",this.getClasses()})}).catch(e=>{console.error("Error adding document: ",e),this.text="Error agregando Clase.",this.snackbar=!0,this.editarAble=0,this.eliminarAble=0,this.dropdownAble=0})}).catch(function(e){console.log("Error getting docente: ",e)})}).catch(function(e){console.log("Error getting institution: ",e)})},deleteClass:function(){this.dialog=!1,n["b"].collection("classes").doc(this.idseleccionado).delete().then(e=>{console.log("Deleted: ",e),this.text="Institución eliminada correctamente.",this.snackColor="green",this.snackbar=!0,this.editarAble=0,this.agregarAble=0,this.nombre="",this.grado=1,this.anio=2e3,this.seccion="",this.parcial=1,this.alumnos_seleccionados=[],this.institucion="",this.docente="",this.opcionSeleccionada="agregar",this.getClasses()}).catch(e=>{console.error("Error deleting document: ",e),this.text="Error eliminando Institución.",this.snackbar=!0,this.editarAble=0,this.agregarAble=0})}}},l=o,r=s("2877"),c=s("6544"),d=s.n(c),h=s("8336"),u=s("b0af"),m=s("99d9"),b=s("62ad"),p=s("a523"),g=s("169a"),v=s("4bd4"),f=s("132d"),I=s("de8e"),w=s("0fd9"),x=s("b974"),k=s("2db4"),A=s("8654"),S=s("71d9"),C=s("2a7f"),_=Object(r["a"])(l,i,a,!1,null,null,null);t["default"]=_.exports;d()(_,{VBtn:h["a"],VCard:u["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VCol:b["a"],VContainer:p["a"],VDialog:g["a"],VForm:v["a"],VIcon:f["a"],VOverflowBtn:I["a"],VRow:w["a"],VSelect:x["a"],VSnackbar:k["a"],VTextField:A["a"],VToolbar:S["a"],VToolbarTitle:C["a"]})},"2bfd":function(e,t,s){},"2db4":function(e,t,s){"use strict";s("ca71");var i=s("a9ad"),a=s("f2e7"),n=s("fe6c"),o=s("58df"),l=s("d9bd");t["a"]=Object(o["a"])(i["a"],a["a"],Object(n["b"])(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive(){this.setTimeout()}},created(){this.$attrs.hasOwnProperty("auto-height")&&Object(l["d"])("auto-height",this)},mounted(){this.setTimeout()},methods:{setTimeout(){window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout(()=>{this.isActive=!1},this.timeout))}},render(e){return e("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&e("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[e("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper"}),[e("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}})},"3a0b":function(e,t,s){},"4bd4":function(e,t,s){"use strict";var i=s("3206");t["a"]=Object(i["b"])("form").extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>{return e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0})},s={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?s.shouldValidate=e.$watch("shouldValidate",i=>{i&&(this.errorBag.hasOwnProperty(e._uid)||(s.valid=t(e)))}):s.valid=t(e),s},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const s=this.watchers.find(e=>e._uid===t._uid);s&&(s.valid(),s.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.$attrs},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})},ca71:function(e,t,s){},de8e:function(e,t,s){"use strict";s("3a0b");var i=s("b974"),a=(s("2bfd"),s("8654")),n=s("80d2");const o={...i["b"],offsetY:!0,offsetOverflow:!0,transition:!1};var l=i["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,s)=>{return s.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:i["a"].options.props.menuProps.type,default:()=>o},noFilter:Boolean,searchInput:{type:String,default:void 0}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...i["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(e=>this.getValue(e))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(e=>!this.hasItem(e)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(e=>this.filter(e,String(this.internalSearch),String(this.getText(e))))},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch=e,this.$emit("update:search-input",e)}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=i["a"].options.computed.$_menuProps.call(this);return e.contentClass=`v-autocomplete__content ${e.contentClass||""}`.trim(),{...o,...e}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(e=>{return this.valueComparator(this.getValue(e),this.getValue(this.internalValue))})},listData(){const e=i["a"].options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?this.$refs.input&&this.$refs.input.select():this.updateSelf()},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=void 0)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},methods:{onFilteredItemsChanged(e,t){e!==t&&(this.setMenuIndex(-1),this.$nextTick(()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.setMenuIndex(0))}))},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){if(this.searchIsDirty)return;if(![n["w"].backspace,n["w"].left,n["w"].right,n["w"].delete].includes(e))return;const t=this.selectedItems.length-1;if(e===n["w"].left)-1===this.selectedIndex?this.selectedIndex=t:this.selectedIndex--;else if(e===n["w"].right)this.selectedIndex>=t?this.selectedIndex=-1:this.selectedIndex++;else if(-1===this.selectedIndex)return void(this.selectedIndex=t);const s=this.selectedItems[this.selectedIndex];if([n["w"].backspace,n["w"].delete].includes(e)&&!this.getDisabled(s)){const e=this.selectedIndex===t?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===e?this.setValue(this.multiple?[]:void 0):this.selectItem(s),this.selectedIndex=e}},clearableCallback(){this.internalSearch=void 0,i["a"].options.methods.clearableCallback.call(this)},genInput(){const e=a["a"].options.methods.genInput.call(this);return e.data=e.data||{},e.data.attrs=e.data.attrs||{},e.data.domProps=e.data.domProps||{},e.data.domProps.value=this.internalSearch,e},genInputSlot(){const e=i["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?i["a"].options.methods.genSelections.call(this):[]},onClick(){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,s=t.value;t.value&&this.activateMenu(),this.internalSearch=s,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;i["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){i["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(){this.activateMenu()},selectItem(e){i["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){i["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1}}}),r=l,c=s("afdd"),d=s("d9bd");t["a"]=r.extend({name:"v-overflow-btn",props:{editable:Boolean,segmented:Boolean},computed:{classes(){return{...r.options.computed.classes.call(this),"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable}},isAnyValueAllowed(){return this.editable||r.options.computed.isAnyValueAllowed.call(this)},isSingle(){return!0},computedItems(){return this.segmented?this.allItems:this.filteredItems}},methods:{genSelections(){return this.editable?r.options.methods.genSelections.call(this):i["a"].options.methods.genSelections.call(this)},genCommaSelection(e,t,s){return this.segmented?this.genSegmentedBtn(e):i["a"].options.methods.genCommaSelection.call(this,e,t,s)},genInput(){const e=a["a"].options.methods.genInput.call(this);return e.data=e.data||{},e.data.domProps.value=this.editable?this.internalSearch:"",e.data.attrs.readonly=!this.isAnyValueAllowed,e},genLabel(){if(this.editable&&this.isFocused)return null;const e=a["a"].options.methods.genLabel.call(this);return e?(e.data=e.data||{},e.data.style={},e):e},genSegmentedBtn(e){const t=this.getValue(e),s=this.computedItems.find(e=>this.getValue(e)===t)||e;return s.text&&s.callback?this.$createElement(c["a"],{props:{text:!0},on:{click(e){e.stopPropagation(),s.callback(e)}}},[s.text]):(Object(d["c"])("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}})}}]);
//# sourceMappingURL=chunk-627d2925.679e2d19.js.map