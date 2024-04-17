import{D as E,v as z,w as R}from"./chunk-PJCGEGZQ.js";import{A as x,B as m,Z as d,_ as v,aa as k,bb as S,ca as a,f as y,g as l,i as b,ja as w,l as p,pc as C,y as D}from"./chunk-DDVAE6N3.js";var A=(()=>{let e=class e{constructor(){this._loading=new l}get loadingEvents(){return this._loading}showLoading(){this._loading.next(!0)}hideLoading(){this._loading.next(!1)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=d({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var V=class{};function H(n){return n&&typeof n.connect=="function"&&!(n instanceof b)}var g=function(n){return n[n.REPLACED=0]="REPLACED",n[n.INSERTED=1]="INSERTED",n[n.MOVED=2]="MOVED",n[n.REMOVED=3]="REMOVED",n}(g||{}),U=new k("_ViewRepeater"),O=class{applyChanges(e,s,t,i,r){e.forEachOperation((o,c,h)=>{let u,f;if(o.previousIndex==null){let _=t(o,c,h);u=s.createEmbeddedView(_.templateRef,_.context,_.index),f=g.INSERTED}else h==null?(s.remove(c),f=g.REMOVED):(u=s.get(c),s.move(u,h),f=g.MOVED);r&&r({context:u?.context,operation:f,record:o})})}detach(){}};var I=class{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(e=!1,s,t=!0,i){this._multiple=e,this._emitChanges=t,this.compareWith=i,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new l,s&&s.length&&(e?s.forEach(r=>this._markSelected(r)):this._markSelected(s[0]),this._selectedToEmit.length=0)}select(...e){this._verifyValueAssignment(e),e.forEach(t=>this._markSelected(t));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}deselect(...e){this._verifyValueAssignment(e),e.forEach(t=>this._unmarkSelected(t));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}setSelection(...e){this._verifyValueAssignment(e);let s=this.selected,t=new Set(e);e.forEach(r=>this._markSelected(r)),s.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(e){return this.isSelected(e)?this.deselect(e):this.select(e)}clear(e=!0){this._unmarkAll();let s=this._hasQueuedChanges();return e&&this._emitChangeEvent(),s}isSelected(e){return this._selection.has(this._getConcreteValue(e))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){e=this._getConcreteValue(e),this.isSelected(e)||(this._multiple||this._unmarkAll(),this.isSelected(e)||this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){e=this._getConcreteValue(e),this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){e.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(e,s){if(this.compareWith){s=s??this._selection;for(let t of s)if(this.compareWith(e,t))return t;return e}else return e}};var L=20,Fe=(()=>{let e=class e{constructor(t,i,r){this._ngZone=t,this._platform=i,this._scrolled=new l,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=r}register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let i=this.scrollContainers.get(t);i&&(i.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=L){return this._platform.isBrowser?new y(i=>{this._globalSubscription||this._addGlobalListener();let r=t>0?this._scrolled.pipe(m(t)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):p()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((t,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(t,i){let r=this.getAncestorScrollContainers(t);return this.scrolled(i).pipe(x(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(t){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,t)&&i.push(o)}),i}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(t,i){let r=z(i),o=t.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{let t=this._getWindow();return D(t.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}};e.\u0275fac=function(i){return new(i||e)(a(S),a(R),a(C,8))},e.\u0275prov=d({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var B=20,Me=(()=>{let e=class e{constructor(t,i,r){this._platform=t,this._change=new l,this._changeListener=o=>{this._change.next(o)},this._document=r,i.runOutsideAngular(()=>{if(t.isBrowser){let o=this._getWindow();o.addEventListener("resize",this._changeListener),o.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){let t=this._getWindow();t.removeEventListener("resize",this._changeListener),t.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+r,right:t.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,i=this._getWindow(),r=t.documentElement,o=r.getBoundingClientRect(),c=-o.top||t.body.scrollTop||i.scrollY||r.scrollTop||0,h=-o.left||t.body.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:c,left:h}}change(t=B){return t>0?this._change.pipe(m(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}};e.\u0275fac=function(i){return new(i||e)(a(R),a(S),a(C,8))},e.\u0275prov=d({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var T=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=w({type:e}),e.\u0275inj=v({});let n=e;return n})(),Le=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=w({type:e}),e.\u0275inj=v({imports:[E,T,E,T]});let n=e;return n})();export{A as a,V as b,H as c,g as d,U as e,O as f,I as g,Fe as h,Me as i,T as j,Le as k};