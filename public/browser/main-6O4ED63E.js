import{a as Y,i as J}from"./chunk-7QUOAZAF.js";import{$ as K,aa as Q,c as Z,d as G,da as $,e as U,ea as ee,f as H,j as W,k as X,n as S,o as v,p as q}from"./chunk-PJCGEGZQ.js";import{Ab as O,Cb as V,Db as C,Fa as E,Mb as k,Ua as m,Va as l,W as I,Wa as D,Ya as F,Z as R,_ as g,_a as P,ab as z,bb as u,da as h,ia as T,ja as c,jb as j,la as N,lb as d,pc as L,q as A,qa as w,ra as b,ub as f,vb as _,wb as y,yc as B}from"./chunk-DDVAE6N3.js";function se(r,e){r&1&&y(0,"router-outlet")}function ae(r,e){r&1&&y(0,"app-loading")}function le(r,e){if(r&1){let t=O();f(0,"app-alert-dialog",2),V("no",function(o){w(t);let n=C();return b(n.dialogConfig.noClick(o))})("yes",function(o){w(t);let n=C();return b(n.dialogConfig.yesClick(o))}),_()}if(r&2){let t=C();d("title",t.dialogConfig.title)("message",t.dialogConfig.message)("noEnable",t.dialogConfig.noEnable)("noText",t.dialogConfig.noText)("yesText",t.dialogConfig.yesText)("noStyle",t.dialogConfig.noStyle)("yesStyle",t.dialogConfig.yesStyle)("noColor",t.dialogConfig.noColor)("yesColor",t.dialogConfig.yesColor)("data",t.dialogConfig.data)}}function de(r,e){r&1&&(f(0,"div"),y(1,"div",3),f(2,"div",4)(3,"p"),k(4,"Visualiz\xE1 esta web en una computadora de escritorio. No fue dise\xF1ada para dispositivos m\xF3viles."),_()()())}var te=(()=>{let e=class e{constructor(i,o,n,s,a){this.auth=i,this.loadingService=o,this.alertDialogService=n,this.viewportRuler=s,this.ngZone=a,this.showLoading=!1,this.showSizeMessage=!1,this.dialogConfig={message:""},this.loadingEventsSubs=this.loadingService.loadingEvents.subscribe(p=>{this.showLoading=p}),this.dialogConfigSubs=this.alertDialogService.dialogConfig.subscribe(p=>{this.dialogConfig=p}),this.viewportRuler.getViewportRect().width<1400?this.showSizeMessage=!0:this.showSizeMessage=!1,this.viewportRuler.change(300).subscribe(()=>{this.ngZone.run(()=>{this.viewportRuler.getViewportRect().width<1400?this.showSizeMessage=!0:this.showSizeMessage=!1})})}ngOnInit(){this.auth.autoLogin()}ngOnDestroy(){this.loadingEventsSubs.unsubscribe(),this.dialogConfigSubs.unsubscribe()}};e.\u0275fac=function(o){return new(o||e)(l(v),l(Y),l(q),l(J),l(u))},e.\u0275cmp=T({type:e,selectors:[["app-root"]],decls:4,vars:4,consts:[[4,"ngIf"],[3,"title","message","noEnable","noText","yesText","noStyle","yesStyle","noColor","yesColor","data","no","yes",4,"ngIf"],[3,"no","yes","title","message","noEnable","noText","yesText","noStyle","yesStyle","noColor","yesColor","data"],[1,"backdrop"],[1,"dialog-box"]],template:function(o,n){o&1&&j(0,se,1,0,"router-outlet",0)(1,ae,1,0,"app-loading",0)(2,le,1,10,"app-alert-dialog",1)(3,de,5,0,"div",0),o&2&&(d("ngIf",!n.showSizeMessage),m(),d("ngIf",n.showLoading&&!n.showSizeMessage),m(),d("ngIf",n.dialogConfig.show&&!n.showSizeMessage),m(),d("ngIf",n.showSizeMessage))},dependencies:[B,W,K,Q],styles:[".backdrop[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000bf;z-index:200}.dialog-box[_ngcontent-%COMP%]{position:fixed;text-align:center;top:40vh;left:40vw;width:20vw;padding:16px;z-index:300;background:#fff;box-shadow:0 2px 8px #000000bf}"]});let r=e;return r})();var pe="@",he=(()=>{let e=class e{constructor(i,o,n,s,a){this.doc=i,this.delegate=o,this.zone=n,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=h(F,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-K3QP5QDM.js")).catch(o=>{throw new I(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:n})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(i,o){let n=this.delegate.createRenderer(i,o);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new M(n);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let p=a.createRenderer(i,o);s.use(p)}).catch(a=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){D()},e.\u0275prov=R({token:e,factory:e.\u0275fac});let r=e;return r})(),M=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,i,o){this.delegate.insertBefore(e,t,i,o)}removeChild(e,t,i){this.delegate.removeChild(e,t,i)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,i,o){this.delegate.setAttribute(e,t,i,o)}removeAttribute(e,t,i){this.delegate.removeAttribute(e,t,i)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,i,o){this.delegate.setStyle(e,t,i,o)}removeStyle(e,t,i){this.delegate.removeStyle(e,t,i)}setProperty(e,t,i){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,i)),this.delegate.setProperty(e,t,i)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,i){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,i)),this.delegate.listen(e,t,i)}shouldReplay(e){return this.replay!==null&&e.startsWith(pe)}};function ie(r="animations"){return z("NgAsyncAnimations"),N([{provide:P,useFactory:(e,t,i)=>new he(e,t,i,r),deps:[L,G,u]},{provide:E,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var oe=(r,e)=>{let t=h(v),i=h(X);return t.user.pipe(A(o=>o?!0:i.createUrlTree(["/login"])))};var ge=[{path:"",redirectTo:"/dashboard",pathMatch:"full"},{path:"login",loadChildren:()=>import("./chunk-44JKN2E2.js").then(r=>r.LoginModule)},{path:"dashboard",canActivate:[oe],loadChildren:()=>import("./chunk-BOVUC7GG.js").then(r=>r.DashboardModule)}],re=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=c({type:e}),e.\u0275inj=g({imports:[S.forRoot(ge),S]});let r=e;return r})();var ne=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=c({type:e,bootstrap:[te]}),e.\u0275inj=g({providers:[ie()],imports:[H,$,re,Z,ee]});let r=e;return r})();U().bootstrapModule(ne).catch(r=>console.error(r));
