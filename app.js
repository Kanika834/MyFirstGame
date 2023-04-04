(()=>{"use strict";var e,t={562:(e,t,s)=>{var i=s(260),n=s.n(i);class r extends n().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#fff"}}create(){if(this.add.image(0,0,"sky").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let s=0;e.forEach((e=>{const i=[this.screenCenter[0],this.screenCenter[1]+s];e.textGO=this.add.text(...i,e.text,this.fontOptions).setOrigin(.5,1),s+=this.lineHeight,t(e)}))}}const c=r;const a=class extends c{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.pipeHorizontalDistance=0,this.pipeVerticalDistanceRange=[150,250],this.pipeHorizontalDistanceRange=[500,550],this.flapVelocity=300,this.score=0,this.scoreText=""}create(){super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.craeteButton(),this.handleInputs()}update(){this.checkGameStatus(),this.recyclePipes()}createBG(){this.add.image(0,0,"sky").setOrigin(0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setOrigin(0),this.bird.body.gravity.y=-600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore"),t=.02*this.config.width,s=.03*this.config.height,i=s+.05*this.config.height;this.scoreText=this.add.text(t,s,"Score: 0",{fontSize:"32px",fill:"#000"}),this.add.text(t,i,`Best score: ${e||0}`,{fontSize:"18px",fill:"#000"})}createPause(){this.add.image(.99*this.config.width,.99*this.config.height,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}craeteButton(){this.add.image(.99*this.config.width,.1*this.config.height,"openScene").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.scene.start("NewScene")}))}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown-K",this.flap,this)}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}placePipe(e,t){const s=this.getLeftMostPipe(),i=Phaser.Math.Between(...this.pipeVerticalDistanceRange),n=Phaser.Math.Between(20,this.config.height-20-i),r=Phaser.Math.Between(...this.pipeHorizontalDistanceRange);e.x=s-r,e.y=n,t.x=e.x,t.y=e.y+i}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().left>=this.config.width&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore()))}))}getLeftMostPipe(){let e=this.config.width;return this.pipes.getChildren().forEach((function(t){e=Math.min(t.x,e)})),e}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.bird.body.velocity.y=this.flapVelocity}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}};const o=class extends c{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class h extends n().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/BlueSky.png"),this.load.image("bird","assets/bird.png"),this.load.image("pipe","assets/GrassPipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("openScene","assets/button.png"),this.load.image("Scene","assets/newScene.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const p=h;class l extends n().Scene{constructor(e){super("NewScene"),this.config=e}create(){this.add.image(0,0,"Scene").setOrigin(0),this.Text=this.add.text(.23*this.config.width,.4*this.config.height,"Sunrise is a reminder",{fontSize:"32px",fill:"#000"}),this.Text=this.add.text(.24*this.config.width,.5*this.config.height," that we can start a",{fontSize:"32px",fill:"#000"}),this.Text=this.add.text(.18*this.config.width,.6*this.config.height,"new beginning all over again.",{fontSize:"32px",fill:"#000"})}}const d=l;const g=class extends c{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`Best Score: ${e||0}`,this.fontOptions).setOrigin(.5)}};const u=class extends c{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{console.log("Clicking on some option!")}))}},f={width:800,height:600,startPosition:{x:700,y:300}},S=[p,o,a,d,g,u],x=e=>new e(f),y={type:n().AUTO,...f,physics:{default:"arcade",arcade:{debug:!0}},scene:S.map(x)};new(n().Game)(y)}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,n,r)=>{if(!s){var c=1/0;for(p=0;p<e.length;p++){for(var[s,n,r]=e[p],a=!0,o=0;o<s.length;o++)(!1&r||c>=r)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(a=!1,r<c&&(c=r));if(a){e.splice(p--,1);var h=n();void 0!==h&&(t=h)}}return t}r=r||0;for(var p=e.length;p>0&&e[p-1][2]>r;p--)e[p]=e[p-1];e[p]=[s,n,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,r,[c,a,o]=s,h=0;if(c.some((t=>0!==e[t]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);if(o)var p=o(i)}for(t&&t(s);h<c.length;h++)r=c[h],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(p)},s=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[736],(()=>i(562)));n=i.O(n)})();