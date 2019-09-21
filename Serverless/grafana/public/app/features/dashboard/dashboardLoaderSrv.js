/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","moment","lodash","jquery","app/core/utils/kbn","app/core/utils/datemath","./impression_store","app/core/config"],function(a,b,c,d,e,f,g){"use strict";var h=a.module("grafana.services");h.service("dashboardLoaderSrv",["backendSrv","dashboardSrv","datasourceSrv","$http","$q","$timeout","contextSrv","$routeParams","$rootScope",function(a,h,i,j,k,l,m,n,o){var p=this;this._dashboardLoadFailed=function(a,b){return b=b||!1,{meta:{canStar:!1,isSnapshot:b,canDelete:!1,canSave:!1,canEdit:!1,dashboardNotFound:!0},dashboard:{title:a}}},this.loadDashboard=function(b,c){var d;return d="script"===b?this._loadScriptedDashboard(c):"snapshot"===b?a.get("/api/snapshots/"+n.slug).catch(function(){return p._dashboardLoadFailed("Snapshot not found",!0)}):a.getDashboard(n.type,n.slug).catch(function(){return p._dashboardLoadFailed("Not found")}),d.then(function(a){return a.meta.dashboardNotFound!==!0&&g.impressions.addDashboardImpression(a.dashboard.id),a}),d},this._loadScriptedDashboard=function(a){var b="public/dashboards/"+a.replace(/\.(?!js)/,"/")+"?"+(new Date).getTime();return j({url:b,method:"GET"}).then(this._executeScript).then(function(a){return{meta:{fromScript:!0,canDelete:!1,canSave:!1,canStar:!1},dashboard:a.data}},function(a){return console.log("Script dashboard error "+a),o.appEvent("alert-error",["Script Error","Please make sure it exists and returns a valid dashboard"]),p._dashboardLoadFailed("Scripted dashboard")})},this._executeScript=function(a){var g={dashboardSrv:h,datasourceSrv:i,$q:k},j=new Function("ARGS","kbn","dateMath","_","moment","window","document","$","jQuery","services",a.data),m=j(n,e,f,c,b,window,document,d,d,g);if(c.isFunction(m)){var o=k.defer();return m(function(a){l(function(){o.resolve({data:a})})}),o.promise}return{data:m}}}])});