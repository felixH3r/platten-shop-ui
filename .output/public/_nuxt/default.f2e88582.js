import{_ as x}from"./nuxt-link.fc2c4604.js";import{T as _}from"./text-content.a09db183.js";import{e as u,j as d,o as t,f as m,h,c,J as r,M as p,t as g,u as l,x as v,y as w,m as k,s as i,N as y,P as T}from"./entry.5f83f8e8.js";const C=o=>(v("data-v-1e408b16"),o=o(),w(),o),H={class:"main-header"},N={class:"header-content flex-center"},B=C(()=>h("div",null,"Warenkorb",-1)),b=u({__name:"MainHeader",props:{showToConfigurator:Boolean},setup(o){const a=o,n=d(()=>a.showToConfigurator?_.mainHeader.configurator:_.mainHeader.home);return(f,s)=>{const e=x;return t(),m("div",H,[h("div",N,[o.showToConfigurator?(t(),c(e,{key:0,to:"shop-app"},{default:r(()=>[p(g(l(n)),1)]),_:1})):(t(),c(e,{key:1,to:"/"},{default:r(()=>[p("Home")]),_:1})),B])])}}});const I=k(b,[["__scopeId","data-v-1e408b16"]]),S={class:"layout-wrapper"},P=u({__name:"default",setup(o){const a=d(()=>y().path==="/");return(n,f)=>{const s=I,e=T;return t(),m("div",S,[i(s,{"show-to-configurator":l(a),class:"main-header"},null,8,["show-to-configurator"]),i(e)])}}});export{P as default};