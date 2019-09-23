(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-983198e0"],{"2bfd":function(t,e,i){},"2db4":function(t,e,i){"use strict";i("ca71");var s=i("a9ad"),a=i("f2e7"),n=i("fe6c"),o=i("58df"),r=i("d9bd");e["a"]=Object(o["a"])(s["a"],a["a"],Object(n["b"])(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive(){this.setTimeout()}},created(){this.$attrs.hasOwnProperty("auto-height")&&Object(r["d"])("auto-height",this)},mounted(){this.setTimeout()},methods:{setTimeout(){window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout(()=>{this.isActive=!1},this.timeout))}},render(t){return t("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&t("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[t("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper"}),[t("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}})},"3a0b":function(t,e,i){},"4bd4":function(t,e,i){"use strict";var s=i("3206");e["a"]=Object(s["b"])("form").extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>{return t.$watch("hasError",e=>{this.$set(this.errorBag,t._uid,e)},{immediate:!0})},i={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",s=>{s&&(this.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))}):i.valid=e(t),i},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find(e=>e._uid===t._uid);if(!e)return;const i=this.watchers.find(t=>t._uid===e._uid);i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==e._uid),this.inputs=this.inputs.filter(t=>t._uid!==e._uid),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.$attrs},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},5311:function(t,e,i){},"56c6":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-toolbar",{staticStyle:{height:"200px"},attrs:{dark:"",prominent:"",color:"blue-grey darken-4"}},[i("v-toolbar-title",[t._v("Administración de Institituciones")])],1),i("v-container",{attrs:{id:"dropdown-example"}},[i("v-row",[i("v-col",{attrs:{cols:"12",sm:"12"}},[i("v-overflow-btn",{staticClass:"my-2",attrs:{label:"Instituciones",items:t.instituciones,disabled:1==t.dropdownAble,target:"#dropdown-example"},on:{change:function(e){return t.showInstitucion()}},model:{value:t.seleccionado,callback:function(e){t.seleccionado=e},expression:"seleccionado"}})],1)],1),i("v-row",[i("v-col",{attrs:{cols:"12",sm:"12"}},[i("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",color:" success",disabled:1==t.agregarAble},on:{click:function(e){return t.agregar()}}},[i("v-icon",[t._v("mdi-plus")]),t._v("Agregar\n        ")],1),i("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",disabled:1==t.editarAble,color:"warning"},on:{click:function(e){return t.update()}}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v("Editar\n        ")],1),i("v-btn",{staticClass:"ma-2 text-center",attrs:{tile:"",width:"30%",disabled:1==t.eliminarAble,color:"error"},on:{click:function(e){return t.eliminar()}}},[i("v-icon",[t._v("mdi-delete")]),t._v("Eliminar\n        ")],1)],1)],1)],1),i("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:t.nombreRules,label:"Nombre de la Institución",disabled:1==t.formAble,required:""},model:{value:t.nombre,callback:function(e){t.nombre=e},expression:"nombre"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:t.direccionRules,label:"Dirección",disabled:1==t.formAble,required:""},model:{value:t.direccion,callback:function(e){t.direccion=e},expression:"direccion"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:t.telefonoRules,counter:8,label:"Número Telefónico",disabled:1==t.formAble,required:""},model:{value:t.telefono,callback:function(e){t.telefono=e},expression:"telefono"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:t.encargadoRules,type:"text",label:"Encargados (Ej: Persona1,Persona2)",disabled:1==t.formAble,required:""},model:{value:t.encargado,callback:function(e){t.encargado=e},expression:"encargado"}})],1)],1)],1)],1),i("v-btn",{staticClass:"blue-grey darken-4 white--text",attrs:{width:"100%",disabled:1==t.formAble,primary:""},on:{click:function(e){return t.guardar()}}},[i("v-icon",[t._v("mdi-sd")]),t._v("Guardar\n  ")],1),i("div",{staticClass:"text-center ma-2"},[i("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n      "+t._s(t.text)+"\n      "),i("v-btn",{attrs:{color:t.snackColor,text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("Close")])],1)],1),i("div",[i("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Eliminar definitivamente la Institución?")]),i("v-card-text",[t._v("Al eliminar la Institución, la misma dejará de existir en la base de datos y ya no estará disponible.")]),i("v-card-actions",[i("div",{staticClass:"flex-grow-1"}),i("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cancelar")]),i("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){return t.deleteInstitucion()}}},[t._v("Aceptar")])],1)],1)],1)],1)],1)},a=[],n=i("dc59"),o={data:()=>({isLoading:!1,nombre:"",direccion:"",telefono:"",encargados:[],encargado:"",instituciones:[],base:[],seleccionado:"",idseleccionado:"",formAble:1,dropdownAble:0,opcionSeleccionada:"",agregarAble:0,editarAble:0,eliminarAble:0,valid:!1,snackColor:"red",dialog:!1,nombreRules:[t=>!!t||"El nombre es requerido."],direccionRules:[t=>!!t||"La dirección es requerida."],telefonoRules:[t=>!!t||"El número es requerido.",t=>t.length>7||"Ingrese un número telefónico válido"],encargadoRules:[t=>!!t||"Al menos un encargado es requerido."],snackbar:!1,text:""}),mounted:function(){this.getInstitutions()},methods:{agregar:function(){this.dropdownAble=1,this.formAble=0,this.nombre="",this.direccion="",this.telefono="",this.encargado="",this.encargados=[],this.opcionSeleccionada="agregar",this.editarAble=1,this.eliminarAble=1},update(){""==this.seleccionado?(this.text="Debe seleccionar una Institución.",this.snackbar=!0):(this.formAble=0,this.agregarAble=1,this.eliminarAble=1,this.opcionSeleccionada="update")},eliminar:function(){this.snackColor="red",""==this.seleccionado?(this.text="Debe seleccionar una Institución.",this.snackbar=!0):(this.dialog=!0,this.editarAble=1,this.agregarAble=1)},guardar:function(){if(this.snackColor="red",""===this.nombre||""===this.direccion||""===this.telefono||""===this.encargado)this.text="No deben haber campos vacíos!",this.snackbar=!0;else if(this.telefono.length<8)this.text="Ingrese un número telefónico válido.",this.snackbar=!0;else if("agregar"===this.opcionSeleccionada){var t=!1;this.instituciones.forEach(e=>{e===this.nombre&&(t=!0)}),!0===t?(this.text="Esa Institución ya existe.",this.snackbar=!0):(this.addInstitucion(),this.dropdownAble=0,this.formAble=1)}else this.updateInstitucion(),this.dropdownAble=0,this.formAble=1},editEncargados:function(){this.encargados=this.encargado.split(","),console.log(this.encargado)},getInstitutions:function(){this.encargados=[],this.base=[],this.instituciones=[],this.isLoading=!0,n["a"].firestore().collection("institutions").get().then(t=>{t.forEach(t=>{this.base.push({id:t.id,data:t.data()}),this.instituciones.push(t.data().nombre)})}).catch(function(t){console.log("Error getting documents: ",t)})},showInstitucion:function(){this.base.forEach(t=>{this.seleccionado===t.data.nombre&&(this.nombre=t.data.nombre,this.direccion=t.data.direccion,this.telefono=t.data.telefono+"",this.encargados=t.data.encargados,this.encargado="",this.encargados.forEach(t=>{t==this.encargados[this.encargados.length-1]?this.encargado+=t:this.encargado+=t+","}),this.idseleccionado=t.id)})},updateInstitucion:function(){console.log(this.encargado),this.editEncargados(),n["b"].collection("institutions").doc(this.idseleccionado).update({nombre:this.nombre,direccion:this.direccion,telefono:this.telefono,encargados:this.encargados}).then(()=>{console.log("Document successfully updated!"),this.text="Institución actualizada correctamente.",this.snackColor="green",this.snackbar=!0,this.agregarAble=0,this.eliminarAble=0}).catch(t=>{console.error("Error updating document: ",t),this.text="Error actualizando Institución.",this.snackbar=!0,this.agregarAble=0,this.eliminarAble=0}),this.getInstitutions()},addInstitucion:function(){this.editEncargados(),n["b"].collection("institutions").add({nombre:this.nombre,direccion:this.direccion,telefono:this.telefono,encargados:this.encargados}).then(t=>{console.log("Document written with ID: ",t.id),this.text="Institución agregada correctamente.",this.snackColor="green",this.snackbar=!0,this.editarAble=0,this.eliminarAble=0}).catch(t=>{console.error("Error adding document: ",t),this.text="Error agregando Institución.",this.snackbar=!0,this.editarAble=0,this.eliminarAble=0}),this.nombre="",this.direccion="",this.telefono="",this.encargado="",this.encargados=[],this.getInstitutions()},deleteInstitucion:function(){this.dialog=!1,n["b"].collection("institutions").doc(this.idseleccionado).delete().then(t=>{console.log("Deleted: ",t),this.text="Institución eliminada correctamente.",this.snackColor="green",this.snackbar=!0,this.editarAble=0,this.agregarAble=0}).catch(t=>{console.error("Error deleting document: ",t),this.text="Error eliminando Institución.",this.snackbar=!0,this.editarAble=0,this.agregarAble=0}),this.nombre="",this.direccion="",this.telefono="",this.encargado="",this.encargados=[],this.getInstitutions()}}},r=o,l=(i("e0d3"),i("2877")),c=i("6544"),d=i.n(c),h=i("8336"),u=i("b0af"),m=i("99d9"),g=i("62ad"),b=i("a523"),p=i("169a"),f=i("4bd4"),v=i("132d"),I=i("de8e"),x=i("0fd9"),w=i("2db4"),k=i("8654"),S=i("71d9"),A=i("2a7f"),y=Object(l["a"])(r,s,a,!1,null,null,null);e["default"]=y.exports;d()(y,{VBtn:h["a"],VCard:u["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VCol:g["a"],VContainer:b["a"],VDialog:p["a"],VForm:f["a"],VIcon:v["a"],VOverflowBtn:I["a"],VRow:x["a"],VSnackbar:w["a"],VTextField:k["a"],VToolbar:S["a"],VToolbarTitle:A["a"]})},ca71:function(t,e,i){},de8e:function(t,e,i){"use strict";i("3a0b");var s=i("b974"),a=(i("2bfd"),i("8654")),n=i("80d2");const o={...s["b"],offsetY:!0,offsetOverflow:!0,transition:!1};var r=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(t,e,i)=>{return i.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:()=>o},noFilter:Boolean,searchInput:{type:String,default:void 0}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...s["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(t=>this.getValue(t))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(t=>!this.hasItem(t)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(t=>this.filter(t,String(this.internalSearch),String(this.getText(t))))},internalSearch:{get(){return this.lazySearch},set(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const t=s["a"].options.computed.$_menuProps.call(this);return t.contentClass=`v-autocomplete__content ${t.contentClass||""}`.trim(),{...o,...t}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(t=>{return this.valueComparator(this.getValue(t),this.getValue(this.internalValue))})},listData(){const t=s["a"].options.computed.listData.call(this);return t.props={...t.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(t){t?this.$refs.input&&this.$refs.input.select():this.updateSelf()},isMenuActive(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},methods:{onFilteredItemsChanged(t,e){t!==e&&(this.setMenuIndex(-1),this.$nextTick(()=>{this.internalSearch&&(1===t.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.setMenuIndex(0))}))},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(t){if(this.searchIsDirty)return;if(![n["w"].backspace,n["w"].left,n["w"].right,n["w"].delete].includes(t))return;const e=this.selectedItems.length-1;if(t===n["w"].left)-1===this.selectedIndex?this.selectedIndex=e:this.selectedIndex--;else if(t===n["w"].right)this.selectedIndex>=e?this.selectedIndex=-1:this.selectedIndex++;else if(-1===this.selectedIndex)return void(this.selectedIndex=e);const i=this.selectedItems[this.selectedIndex];if([n["w"].backspace,n["w"].delete].includes(t)&&!this.getDisabled(i)){const t=this.selectedIndex===e?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===t?this.setValue(this.multiple?[]:void 0):this.selectItem(i),this.selectedIndex=t}},clearableCallback(){this.internalSearch=void 0,s["a"].options.methods.clearableCallback.call(this)},genInput(){const t=a["a"].options.methods.genInput.call(this);return t.data=t.data||{},t.data.attrs=t.data.attrs||{},t.data.domProps=t.data.domProps||{},t.data.domProps.value=this.internalSearch,t},genInputSlot(){const t=s["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick(){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.activateMenu())},onInput(t){if(this.selectedIndex>-1||!t.target)return;const e=t.target,i=e.value;e.value&&this.activateMenu(),this.internalSearch=i,this.badInput=e.validity&&e.validity.badInput},onKeyDown(t){const e=t.keyCode;s["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown(t){},onTabDown(t){s["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown(){this.activateMenu()},selectItem(t){s["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(t){return this.selectedValues.indexOf(this.getValue(t))>-1}}}),l=r,c=i("afdd"),d=i("d9bd");e["a"]=l.extend({name:"v-overflow-btn",props:{editable:Boolean,segmented:Boolean},computed:{classes(){return{...l.options.computed.classes.call(this),"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable}},isAnyValueAllowed(){return this.editable||l.options.computed.isAnyValueAllowed.call(this)},isSingle(){return!0},computedItems(){return this.segmented?this.allItems:this.filteredItems}},methods:{genSelections(){return this.editable?l.options.methods.genSelections.call(this):s["a"].options.methods.genSelections.call(this)},genCommaSelection(t,e,i){return this.segmented?this.genSegmentedBtn(t):s["a"].options.methods.genCommaSelection.call(this,t,e,i)},genInput(){const t=a["a"].options.methods.genInput.call(this);return t.data=t.data||{},t.data.domProps.value=this.editable?this.internalSearch:"",t.data.attrs.readonly=!this.isAnyValueAllowed,t},genLabel(){if(this.editable&&this.isFocused)return null;const t=a["a"].options.methods.genLabel.call(this);return t?(t.data=t.data||{},t.data.style={},t):t},genSegmentedBtn(t){const e=this.getValue(t),i=this.computedItems.find(t=>this.getValue(t)===e)||t;return i.text&&i.callback?this.$createElement(c["a"],{props:{text:!0},on:{click(t){t.stopPropagation(),i.callback(t)}}},[i.text]):(Object(d["c"])("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}})},e0d3:function(t,e,i){"use strict";var s=i("5311"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-983198e0.1d85e7be.js.map