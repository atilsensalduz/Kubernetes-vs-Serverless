/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","moment","require","app/core/config"],function(a,b,c,d,e,f){"use strict";var g=a.module("grafana.controllers");g.controller("ShareModalCtrl",["$scope","$rootScope","$location","$timeout","timeSrv","templateSrv","linkSrv",function(b,c,e,g,h,i,j){b.options={forCurrent:!0,includeTemplateVars:!0,theme:"current"},b.editor={index:b.tabIndex||0},b.init=function(){b.modeSharePanel=!!b.panel,b.tabs=[{title:"Link",src:"shareLink.html"}],b.modeSharePanel?(b.modalTitle="Share Panel",b.tabs.push({title:"Embed",src:"shareEmbed.html"})):b.modalTitle="Share",b.dashboard.meta.isSnapshot||b.tabs.push({title:"Snapshot",src:"shareSnapshot.html"}),b.dashboard.meta.isSnapshot||b.modeSharePanel||b.tabs.push({title:"Export",src:"shareExport.html"}),b.buildUrl()},b.buildUrl=function(){var c=e.absUrl(),g=c.indexOf("?");g!==-1&&(c=c.substring(0,g));var k=a.copy(e.search()),l=h.timeRange();k.from=l.from.valueOf(),k.to=l.to.valueOf(),k.orgId=f.bootData.user.orgId,b.options.includeTemplateVars&&i.fillVariableValuesForUrl(k),b.options.forCurrent||(delete k.from,delete k.to),"current"!==b.options.theme&&(k.theme=b.options.theme),b.modeSharePanel?(k.panelId=b.panel.id,k.fullscreen=!0):(delete k.panelId,delete k.fullscreen),b.shareUrl=j.addParamsToUrl(c,k);var m=c.replace(f.appSubUrl+"/dashboard/",f.appSubUrl+"/dashboard-solo/");delete k.fullscreen,delete k.edit,m=j.addParamsToUrl(m,k),b.iframeHtml='<iframe src="'+m+'" width="450" height="200" frameborder="0"></iframe>',b.imageUrl=m.replace(f.appSubUrl+"/dashboard-solo/",f.appSubUrl+"/render/dashboard-solo/"),b.imageUrl+="&width=1000",b.imageUrl+="&height=500",b.imageUrl+="&tz=UTC"+encodeURIComponent(d().format("Z"))}}]),g.directive("clipboardButton",function(){return function(a,b){e(["vendor/clipboard/dist/clipboard"],function(c){a.clipboard=new c(b[0])}),a.$on("$destroy",function(){a.clipboard&&a.clipboard.destroy()})}})});