/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CKEditor5"] = factory();
	else
		root["CKEditor5"] = root["CKEditor5"] || {}, root["CKEditor5"]["demoPlugin"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ckeditor5_plugins/demoPlugin/src/PlaceholderCommand.js":
/*!****************************************************************!*\
  !*** ./ckeditor5_plugins/demoPlugin/src/PlaceholderCommand.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlaceholderCommand)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/**\n * @file defines InsertSimpleBoxCommand, which is executed when the simpleBox\n * toolbar button is pressed.\n */\n// cSpell:ignore simpleboxediting\n\n\n\nclass PlaceholderCommand extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Command {\n  execute( { value } ) {\n    const editor = this.editor;\n    const selection = editor.model.document.selection;\n\n    editor.model.change( writer => {\n      // Create a <placeholder> elment with the \"name\" attribute (and all the selection attributes)...\n      const placeholder = writer.createElement( 'placeholder', {\n        ...Object.fromEntries( selection.getAttributes() ),\n        name: value\n      } );\n\n      // ... and insert it into the document.\n      editor.model.insertContent( placeholder );\n\n      // Put the selection on the inserted element.\n      writer.setSelection( placeholder, 'on' );\n    } );\n  }\n\n  refresh() {\n    const model = this.editor.model;\n    const selection = model.document.selection;\n\n    const isAllowed = model.schema.checkChild( selection.focus.parent, 'placeholder' );\n\n    this.isEnabled = isAllowed;\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/./ckeditor5_plugins/demoPlugin/src/PlaceholderCommand.js?");

/***/ }),

/***/ "./ckeditor5_plugins/demoPlugin/src/PlaceholderEditing.js":
/*!****************************************************************!*\
  !*** ./ckeditor5_plugins/demoPlugin/src/PlaceholderEditing.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlaceholderEditing)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/widget */ \"ckeditor5/src/widget.js\");\n/* harmony import */ var _PlaceholderCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlaceholderCommand */ \"./ckeditor5_plugins/demoPlugin/src/PlaceholderCommand.js\");\n\n\n\n\n\n\n// cSpell:ignore simplebox insertsimpleboxcommand\n\n/**\n * CKEditor 5 plugins do not work directly with the DOM. They are defined as\n * plugin-specific data models that are then converted to markup that\n * is inserted in the DOM.\n *\n * CKEditor 5 internally interacts with simpleBox as this model:\n * <simpleBox>\n *    <simpleBoxTitle></simpleBoxTitle>\n *    <simpleBoxDescription></simpleBoxDescription>\n * </simpleBox>\n *\n * Which is converted for the browser/user as this markup\n * <section class=\"simple-box\">\n *   <h2 class=\"simple-box-title\"></h1>\n *   <div class=\"simple-box-description\"></div>\n * </section>\n *\n * This file has the logic for defining the simpleBox model, and for how it is\n * converted to standard DOM markup.\n */\nclass PlaceholderEditing extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  static get requires() {\n    return [ ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.Widget ];\n  }\n\n  init() {\n    console.log( 'PlaceholderEditing#init() got called1' );\n\n    this._defineSchema();\n    this._defineConverters();\n\n    this.editor.commands.add( 'placeholder', new _PlaceholderCommand__WEBPACK_IMPORTED_MODULE_2__[\"default\"]( this.editor ) );\n\n    this.editor.editing.mapper.on(\n      'viewToModelPosition',\n      (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.viewToModelPositionOutsideModelElement)( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )\n    );\n    this.editor.config.define( 'placeholderConfig', {\n      types: [ 'date', 'first name', 'surname' ]\n    } );\n  }\n\n  _defineSchema() {\n    const schema = this.editor.model.schema;\n\n    schema.register( 'placeholder', {\n      // Allow wherever text is allowed:\n      allowWhere: '$text',\n\n      // The placeholder will act as an inline node:\n      isInline: true,\n\n      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:\n      isObject: true,\n\n      // The inline widget can have the same attributes as text (for example linkHref, bold).\n      allowAttributesOf: '$text',\n\n      // The placeholder can have many types, like date, name, surname, etc:\n      allowAttributes: [ 'name' ]\n    } );\n  }\n\n  _defineConverters() {\n    const conversion = this.editor.conversion;\n\n    conversion.for( 'upcast' ).elementToElement( {\n      view: {\n        name: 'span',\n        classes: [ 'placeholder' ]\n      },\n      model: ( viewElement, { writer: modelWriter } ) => {\n        // Extract the \"name\" from \"{name}\".\n        const name = viewElement.getChild( 0 ).data.slice( 1, -1 );\n\n        return modelWriter.createElement( 'placeholder', { name } );\n      }\n    } );\n\n    conversion.for( 'editingDowncast' ).elementToElement( {\n      model: 'placeholder',\n      view: ( modelItem, { writer: viewWriter } ) => {\n        const widgetElement = createPlaceholderView( modelItem, viewWriter );\n\n        // Enable widget handling on a placeholder element inside the editing view.\n        return (0,ckeditor5_src_widget__WEBPACK_IMPORTED_MODULE_1__.toWidget)( widgetElement, viewWriter );\n      }\n    } );\n\n    conversion.for( 'dataDowncast' ).elementToElement( {\n      model: 'placeholder',\n      view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )\n    } );\n\n    // Helper method for both downcast converters.\n    function createPlaceholderView( modelItem, viewWriter ) {\n      const name = modelItem.getAttribute( 'name' );\n\n      const placeholderView = viewWriter.createContainerElement( 'span', {\n        'data-attribute': name,\n      }, {\n        isAllowedInsideAttributeElement: true\n      } );\n\n      let range = viewWriter.document.selection.getFirstRange()\n      for (const item of range.getItems()) {\n        console.log(item.data) //return the selected text\n      }\n\n      // Insert the placeholder name (as a text).\n      const innerText = viewWriter.createText( '{' + name + '}' );\n      viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );\n\n      console.log(777777);\n      debugger\n      console.log(viewWriter);\n\n      return placeholderView;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/./ckeditor5_plugins/demoPlugin/src/PlaceholderEditing.js?");

/***/ }),

/***/ "./ckeditor5_plugins/demoPlugin/src/PlaceholderUI.js":
/*!***********************************************************!*\
  !*** ./ckeditor5_plugins/demoPlugin/src/PlaceholderUI.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PlaceholderUI)\n/* harmony export */ });\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/* harmony import */ var ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ckeditor5/src/ui */ \"ckeditor5/src/ui.js\");\n/* harmony import */ var ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/utils */ \"ckeditor5/src/utils.js\");\n/**\n * @file registers the simpleBox toolbar button and binds functionality to it.\n */\n\n\n\n\n\n\nclass PlaceholderUI extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_0__.Plugin {\n  init() {\n    const editor = this.editor;\n    const t = editor.t;\n    const placeholderNames = editor.config.get( 'placeholderConfig.types' );\n\n    // The \"placeholder\" dropdown must be registered among the UI components of the editor\n    // to be displayed in the toolbar.\n    editor.ui.componentFactory.add( 'placeholder', locale => {\n      const dropdownView = (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.createDropdown)( locale );\n\n      // Populate the list in the dropdown with items.\n      (0,ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.addListToDropdown)( dropdownView, getDropdownItemsDefinitions( placeholderNames ) );\n\n      dropdownView.buttonView.set( {\n        // The t() function helps localize the editor. All strings enclosed in t() can be\n        // translated and change when the language of the editor changes.\n        label: t( 'Placeholder' ),\n        tooltip: true,\n        withText: true\n      } );\n\n      // Disable the placeholder button when the command is disabled.\n      const command = editor.commands.get( 'placeholder' );\n      dropdownView.bind( 'isEnabled' ).to( command );\n\n      // Execute the command when the dropdown item is clicked (executed).\n      this.listenTo( dropdownView, 'execute', evt => {\n        editor.execute( 'placeholder', { value: evt.source.commandParam } );\n        editor.editing.view.focus();\n      } );\n\n      return dropdownView;\n    } );\n  }\n}\n\nfunction getDropdownItemsDefinitions( placeholderNames ) {\n  const itemDefinitions = new ckeditor5_src_utils__WEBPACK_IMPORTED_MODULE_2__.Collection();\n\n  for ( const name of placeholderNames ) {\n    const definition = {\n      type: 'button',\n      model: new ckeditor5_src_ui__WEBPACK_IMPORTED_MODULE_1__.Model( {\n        commandParam: name,\n        label: name,\n        withText: true\n      } )\n    };\n\n    // Add the item definition to the collection.\n    itemDefinitions.add( definition );\n  }\n\n  return itemDefinitions;\n}\n\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/./ckeditor5_plugins/demoPlugin/src/PlaceholderUI.js?");

/***/ }),

/***/ "./ckeditor5_plugins/demoPlugin/src/index.js":
/*!***************************************************!*\
  !*** ./ckeditor5_plugins/demoPlugin/src/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _placeholder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./placeholder */ \"./ckeditor5_plugins/demoPlugin/src/placeholder.js\");\n/**\n * @file The build process always expects an index.js file. Anything exported\n * here will be recognized by CKEditor 5 as an available plugin. Multiple\n * plugins can be exported in this one file.\n *\n * I.e. this file's purpose is to make plugin(s) discoverable.\n */\n// cSpell:ignore simplebox\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  placeholder: _placeholder__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n});\n\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/./ckeditor5_plugins/demoPlugin/src/index.js?");

/***/ }),

/***/ "./ckeditor5_plugins/demoPlugin/src/placeholder.js":
/*!*********************************************************!*\
  !*** ./ckeditor5_plugins/demoPlugin/src/placeholder.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ placeholder)\n/* harmony export */ });\n/* harmony import */ var _PlaceholderEditing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlaceholderEditing */ \"./ckeditor5_plugins/demoPlugin/src/PlaceholderEditing.js\");\n/* harmony import */ var _PlaceholderUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlaceholderUI */ \"./ckeditor5_plugins/demoPlugin/src/PlaceholderUI.js\");\n/* harmony import */ var ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor5/src/core */ \"ckeditor5/src/core.js\");\n/**\n * @file This is what CKEditor refers to as a master (glue) plugin. Its role is\n * just to load the “editing” and “UI” components of this Plugin. Those\n * components could be included in this file, but\n *\n * I.e, this file's purpose is to integrate all the separate parts of the plugin\n * before it's made discoverable via index.js.\n */\n// cSpell:ignore simpleboxediting simpleboxui\n\n// The contents of SimpleBoxUI and SimpleBox editing could be included in this\n// file, but it is recommended to separate these concerns in different files.\n\n\n\n\nclass placeholder extends ckeditor5_src_core__WEBPACK_IMPORTED_MODULE_2__.Plugin {\n  // Note that SimpleBoxEditing and SimpleBoxUI also extend `Plugin`, but these\n  // are not seen as individual plugins by CKEditor 5. CKEditor 5 will only\n  // discover the plugins explicitly exported in index.js.\n  static get requires() {\n    return [ _PlaceholderEditing__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _PlaceholderUI__WEBPACK_IMPORTED_MODULE_1__[\"default\"] ];\n  }\n}\n\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/./ckeditor5_plugins/demoPlugin/src/placeholder.js?");

/***/ }),

/***/ "ckeditor5/src/core.js":
/*!************************************************************!*\
  !*** delegated ./core.js from dll-reference CKEditor5.dll ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ \"dll-reference CKEditor5.dll\"))(\"./src/core.js\");\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/delegated_./core.js_from_dll-reference_CKEditor5.dll?");

/***/ }),

/***/ "ckeditor5/src/ui.js":
/*!**********************************************************!*\
  !*** delegated ./ui.js from dll-reference CKEditor5.dll ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ \"dll-reference CKEditor5.dll\"))(\"./src/ui.js\");\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/delegated_./ui.js_from_dll-reference_CKEditor5.dll?");

/***/ }),

/***/ "ckeditor5/src/utils.js":
/*!*************************************************************!*\
  !*** delegated ./utils.js from dll-reference CKEditor5.dll ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ \"dll-reference CKEditor5.dll\"))(\"./src/utils.js\");\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/delegated_./utils.js_from_dll-reference_CKEditor5.dll?");

/***/ }),

/***/ "ckeditor5/src/widget.js":
/*!**************************************************************!*\
  !*** delegated ./widget.js from dll-reference CKEditor5.dll ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference CKEditor5.dll */ \"dll-reference CKEditor5.dll\"))(\"./src/widget.js\");\n\n//# sourceURL=webpack://CKEditor5.demoPlugin/delegated_./widget.js_from_dll-reference_CKEditor5.dll?");

/***/ }),

/***/ "dll-reference CKEditor5.dll":
/*!********************************!*\
  !*** external "CKEditor5.dll" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = CKEditor5.dll;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ckeditor5_plugins/demoPlugin/src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});