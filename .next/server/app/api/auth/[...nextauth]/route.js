"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_billy_Desktop_Web_app_clients_fitma_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.js */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\billy\\\\Desktop\\\\Web-app\\\\clients\\\\fitma\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_billy_Desktop_Web_app_clients_fitma_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNiaWxseSU1Q0Rlc2t0b3AlNUNXZWItYXBwJTVDY2xpZW50cyU1Q2ZpdG1hJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNiaWxseSU1Q0Rlc2t0b3AlNUNXZWItYXBwJTVDY2xpZW50cyU1Q2ZpdG1hJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNnRDtBQUM3SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvbmRhdGlvbi1maXRtYS8/ZDY3NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxiaWxseVxcXFxEZXNrdG9wXFxcXFdlYi1hcHBcXFxcY2xpZW50c1xcXFxmaXRtYVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcYmlsbHlcXFxcRGVza3RvcFxcXFxXZWItYXBwXFxcXGNsaWVudHNcXFxcZml0bWFcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.js\");\n// src/app/api/auth/[...nextauth]/route.js\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwwQ0FBMEM7QUFDVjtBQUNRO0FBQ3hDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFDTSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvbmRhdGlvbi1maXRtYS8uL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qcz8yMzJkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qc1xuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.js":
/*!*************************!*\
  !*** ./src/lib/auth.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        // Google OAuth\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        // Email + Password\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                motDePasse: {\n                    label: \"Mot de passe\",\n                    type: \"password\"\n                },\n                isAdmin: {\n                    label: \"Admin\",\n                    type: \"text\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.motDePasse) return null;\n                // Connexion admin\n                if (credentials.isAdmin === \"true\") {\n                    const admin = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.admin.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (!admin) return null;\n                    const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.motDePasse, admin.password);\n                    if (!ok) return null;\n                    return {\n                        id: admin.id,\n                        email: admin.email,\n                        name: \"Admin\",\n                        role: \"ADMIN\"\n                    };\n                }\n                // Connexion membre\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.utilisateur.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) return null;\n                if (!user.actif) throw new Error(\"Compte d\\xe9sactiv\\xe9\");\n                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.motDePasse, user.password);\n                if (!ok) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: `${user.prenom} ${user.nom}`,\n                    role: user.role,\n                    avatar: user.avatar\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    callbacks: {\n        async signIn ({ user, account }) {\n            // Connexion Google — créer/récupérer le membre\n            if (account?.provider === \"google\") {\n                const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.utilisateur.findFirst({\n                    where: {\n                        OR: [\n                            {\n                                email: user.email\n                            },\n                            {\n                                googleId: user.id\n                            }\n                        ]\n                    }\n                });\n                if (!existing) {\n                    const parts = (user.name || \"\").split(\" \");\n                    await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.utilisateur.create({\n                        data: {\n                            email: user.email,\n                            prenom: parts[0] || \"\",\n                            nom: parts.slice(1).join(\" \") || \"\",\n                            avatar: user.image,\n                            googleId: user.id,\n                            role: \"MEMBRE\"\n                        }\n                    });\n                } else if (!existing.googleId) {\n                    await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.utilisateur.update({\n                        where: {\n                            id: existing.id\n                        },\n                        data: {\n                            googleId: user.id,\n                            avatar: user.image\n                        }\n                    });\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role || \"MEMBRE\";\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvbmRhdGlvbi1maXRtYS8uL3NyYy9saWIvYXV0aC5qcz84N2JkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIlxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgLy8gR29vZ2xlIE9BdXRoXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6ICAgICBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICB9KSxcblxuICAgIC8vIEVtYWlsICsgUGFzc3dvcmRcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiAgICAgIHsgbGFiZWw6IFwiRW1haWxcIiwgICAgICAgIHR5cGU6IFwiZW1haWxcIiAgICB9LFxuICAgICAgICBtb3REZVBhc3NlOiB7IGxhYmVsOiBcIk1vdCBkZSBwYXNzZVwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgICAgaXNBZG1pbjogICAgeyBsYWJlbDogXCJBZG1pblwiLCAgICAgICAgdHlwZTogXCJ0ZXh0XCIgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ubW90RGVQYXNzZSkgcmV0dXJuIG51bGxcblxuICAgICAgICAvLyBDb25uZXhpb24gYWRtaW5cbiAgICAgICAgaWYgKGNyZWRlbnRpYWxzLmlzQWRtaW4gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgY29uc3QgYWRtaW4gPSBhd2FpdCBwcmlzbWEuYWRtaW4uZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9IH0pXG4gICAgICAgICAgaWYgKCFhZG1pbikgcmV0dXJuIG51bGxcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLm1vdERlUGFzc2UsIGFkbWluLnBhc3N3b3JkKVxuICAgICAgICAgIGlmICghb2spIHJldHVybiBudWxsXG4gICAgICAgICAgcmV0dXJuIHsgaWQ6IGFkbWluLmlkLCBlbWFpbDogYWRtaW4uZW1haWwsIG5hbWU6IFwiQWRtaW5cIiwgcm9sZTogXCJBRE1JTlwiIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbm5leGlvbiBtZW1icmVcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51dGlsaXNhdGV1ci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0gfSlcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSByZXR1cm4gbnVsbFxuICAgICAgICBpZiAoIXVzZXIuYWN0aWYpIHRocm93IG5ldyBFcnJvcihcIkNvbXB0ZSBkw6lzYWN0aXbDqVwiKVxuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLm1vdERlUGFzc2UsIHVzZXIucGFzc3dvcmQpXG4gICAgICAgIGlmICghb2spIHJldHVybiBudWxsXG4gICAgICAgIHJldHVybiB7IGlkOiB1c2VyLmlkLCBlbWFpbDogdXNlci5lbWFpbCwgbmFtZTogYCR7dXNlci5wcmVub219ICR7dXNlci5ub219YCwgcm9sZTogdXNlci5yb2xlLCBhdmF0YXI6IHVzZXIuYXZhdGFyIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgc2Vzc2lvbjogeyBzdHJhdGVneTogXCJqd3RcIiB9LFxuICBwYWdlczogeyBzaWduSW46IFwiL2xvZ2luXCIsIGVycm9yOiBcIi9sb2dpblwiIH0sXG5cbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2lnbkluKHsgdXNlciwgYWNjb3VudCB9KSB7XG4gICAgICAvLyBDb25uZXhpb24gR29vZ2xlIOKAlCBjcsOpZXIvcsOpY3Vww6lyZXIgbGUgbWVtYnJlXG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09IFwiZ29vZ2xlXCIpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBwcmlzbWEudXRpbGlzYXRldXIuZmluZEZpcnN0KHtcbiAgICAgICAgICB3aGVyZTogeyBPUjogW3sgZW1haWw6IHVzZXIuZW1haWwgfSwgeyBnb29nbGVJZDogdXNlci5pZCB9XSB9LFxuICAgICAgICB9KVxuICAgICAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICAgICAgY29uc3QgcGFydHMgPSAodXNlci5uYW1lIHx8IFwiXCIpLnNwbGl0KFwiIFwiKVxuICAgICAgICAgIGF3YWl0IHByaXNtYS51dGlsaXNhdGV1ci5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBlbWFpbDogICAgdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgcHJlbm9tOiAgIHBhcnRzWzBdIHx8IFwiXCIsXG4gICAgICAgICAgICAgIG5vbTogICAgICBwYXJ0cy5zbGljZSgxKS5qb2luKFwiIFwiKSB8fCBcIlwiLFxuICAgICAgICAgICAgICBhdmF0YXI6ICAgdXNlci5pbWFnZSxcbiAgICAgICAgICAgICAgZ29vZ2xlSWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICAgIHJvbGU6ICAgICBcIk1FTUJSRVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFleGlzdGluZy5nb29nbGVJZCkge1xuICAgICAgICAgIGF3YWl0IHByaXNtYS51dGlsaXNhdGV1ci51cGRhdGUoeyB3aGVyZTogeyBpZDogZXhpc3RpbmcuaWQgfSwgZGF0YTogeyBnb29nbGVJZDogdXNlci5pZCwgYXZhdGFyOiB1c2VyLmltYWdlIH0gfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgICA9IHVzZXIuaWRcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZSB8fCBcIk1FTUJSRVwiXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkICAgPSB0b2tlbi5pZFxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uXG4gICAgfSxcbiAgfSxcblxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwibW90RGVQYXNzZSIsImlzQWRtaW4iLCJhdXRob3JpemUiLCJhZG1pbiIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsIm9rIiwiY29tcGFyZSIsInBhc3N3b3JkIiwiaWQiLCJyb2xlIiwidXNlciIsInV0aWxpc2F0ZXVyIiwiYWN0aWYiLCJFcnJvciIsInByZW5vbSIsIm5vbSIsImF2YXRhciIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJjYWxsYmFja3MiLCJhY2NvdW50IiwicHJvdmlkZXIiLCJleGlzdGluZyIsImZpbmRGaXJzdCIsIk9SIiwiZ29vZ2xlSWQiLCJwYXJ0cyIsInNwbGl0IiwiY3JlYXRlIiwiZGF0YSIsInNsaWNlIiwiam9pbiIsImltYWdlIiwidXBkYXRlIiwiand0IiwidG9rZW4iLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.js":
/*!***************************!*\
  !*** ./src/lib/prisma.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// src/lib/prisma.js\n\nconst g = globalThis;\nconst prisma = g.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"error\"\n    ] : 0\n});\nif (true) g.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvQkFBb0I7QUFDeUI7QUFDN0MsTUFBTUMsSUFBSUM7QUFDSCxNQUFNQyxTQUFTRixFQUFFRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLENBQUM7SUFBRUksS0FBS0MsS0FBc0MsR0FBRztRQUFDO0tBQVEsR0FBRyxDQUFTO0FBQUMsR0FBRTtBQUMzSCxJQUFJQSxJQUFxQyxFQUFFSixFQUFFRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZm9uZGF0aW9uLWZpdG1hLy4vc3JjL2xpYi9wcmlzbWEuanM/ZWNlMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvbGliL3ByaXNtYS5qc1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcbmNvbnN0IGcgPSBnbG9iYWxUaGlzXG5leHBvcnQgY29uc3QgcHJpc21hID0gZy5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCh7IGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IFtcImVycm9yXCJdIDogW1wiZXJyb3JcIl0gfSlcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGcucHJpc21hID0gcHJpc21hXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZyIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbilly%5CDesktop%5CWeb-app%5Cclients%5Cfitma&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();