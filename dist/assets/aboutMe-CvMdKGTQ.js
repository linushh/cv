import{p as m,d as h}from"./selfie-CsXYgRee.js";import{_ as i,o as l,c,b as n,e as $,t as f,a as u,F as g,r as d}from"./index-iH-qDQyE.js";const k={},b=$('<li><a><p>CV</p></a></li><li><a><p>Projects</p></a></li><li><a><p>Skills</p></a></li><li><a><p>Contact</p></a></li><li><a href="https://github.com/linushh"><p>Github</p></a></li><li><a href="https://www.facebook.com/linus.hakansson.98478"><p>Facebook</p></a></li><li><a href="https://www.linkedin.com/in/linus-håkansson-4584ab251"><p>Linkedin</p></a></li>',7);function w(t,e,a,p,s,o){return l(),c("ul",null,[n("li",null,[n("a",null,[n("p",{onClick:e[0]||(e[0]=r=>t.$router.push("/"))},"Home")])]),n("li",null,[n("a",null,[n("p",{onClick:e[1]||(e[1]=r=>t.$router.push("/about"))},"About me")])]),b])}const v=i(k,[["render",w]]),C={props:{name:String},data(){return{selfie:m}}},x={class:"card"},B=["src"],S={class:"container"},V=n("h4",null,[n("b",null," Linus Håkansson ")],-1);function F(t,e,a,p,s,o){return l(),c("div",x,[n("img",{src:s.selfie,class:"img margin"},null,8,B),n("div",S,[V,n("p",null,f(a.name),1)])])}const H=i(C,[["render",F]]),N={components:{card:H,navigation:v,drawer:h},data(){return{}},methods:{getCardText(){return`
        Hello World!
        `}}},L={class:"centering margin"};function T(t,e,a,p,s,o){const r=d("drawer"),_=d("card");return l(),c(g,null,[u(r),n("div",L,[u(_,{name:o.getCardText()},null,8,["name"])])],64)}const A=i(N,[["render",T]]);export{A as a,H as c,v as n};