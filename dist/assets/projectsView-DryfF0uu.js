import{l as v,D as w}from"./progress-C44N0zir.js";import{_,o as r,c as o,b as e,t as u,F as d,e as f,f as k,g as y,w as P,a as g,r as m}from"./index-IkDxNFUH.js";const S={props:{images:Array,title:String},data(){return{previewImage:"",load:v}},methods:{showPreview(n){this.previewImage=n},closePreview(){this.previewImage=""}}},D={class:"title-center"},B={class:"image-container"},C=["onClick"],V={key:0,class:"modal"},b=["src"],F=e("footer",{class:"title-center"},[e("a",{href:"https://github.com/linushh/todo-standalone",target:"_blank"}," Frontend "),e("a",{href:"https://github.com/linushh/todo-standalone-admin",target:"_blank"}," Backend ")],-1);function x(n,c,i,p,t,a){const l=y("lazy");return r(),o(d,null,[e("h1",D,u(i.title),1),e("div",B,[(r(!0),o(d,null,f(i.images,(s,h)=>P((r(),o("img",{key:h,onClick:Z=>a.showPreview(s.src)},null,8,C)),[[l,{src:s.src,loading:t.load,error:"../assets/loading.png"}]])),128))]),t.previewImage?(r(),o("div",V,[e("span",{class:"close",onClick:c[0]||(c[0]=(...s)=>a.closePreview&&a.closePreview(...s))}," × "),e("img",{src:t.previewImage,alt:"Preview"},null,8,b)])):k("",!0),F],64)}const A=_(S,[["render",x]]),I="/cv/assets/Login-BZgtgNZF.png",N="/cv/assets/LoginSwedish-XVPfSiRA.png",L="/cv/assets/RegistreraSwedish-BSSSxnUP.png",M="/cv/assets/AttG%C3%B6ra-c5kYA6Om.png",E="/cv/assets/HoverEffect-D2j9fMtV.png",H="/cv/assets/Calendar-DqQ-MFFN.png",$="/cv/assets/HaschedPasswords-DpHMmkL6.png",j=[{src:I},{src:N},{src:L},{src:M},{src:H},{src:E},{src:$}],q={data(){return{images:j}},components:{drawer:w,gallery:A}},z={class:"background-color"};function R(n,c,i,p,t,a){const l=m("drawer"),s=m("gallery");return r(),o("div",z,[g(l),g(s,{title:"Todo Application: Java, Vue, MySql",images:t.images},null,8,["images"])])}const O=_(q,[["render",R]]);export{O as default};
