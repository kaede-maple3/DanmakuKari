var game;

//最初に読み込む
window.onload = function(){
    game = new Game();
    init()
    GameReady()
}

function ready(){}
function init(){}
function repeat(){}

function GameReady(){
    game.fps.Init()
    //音楽
    game.AudioLoader.loadAudioes(game.AudioLoader.audioMap)
    //画像ローダーの処理
    game.ImgLoader.loadImages(game.ImgLoader.imgMap)
        .then(() => {
            //ループ開始
            ready()
            loop()
        })
        .catch((error) => {
            // エラーが発生した場合の処理
            console.error('Error loading images:', error);
        });
}

//ループ
function loop(){
    repeat();
    UpdatePoints();
    draw();
    game.fps.Check()
    requestAnimationFrame(loop);
}

//図形のアップデート
function UpdatePoints(){
    game.scene.objects.forEach(object => {
        //console.log(object)
        object.updatePoints();
    })
}


//描画
function draw(){
    //一旦リセット
    game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height)
    game.ctx.globalAlpha = 1
    game.ctx.fillStyle = game.base_color
    game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height)

    game.scene.objects.forEach(object => {
        if(object.material.type == "simple"){
            if(!object.material.color == false){
                game.ctx.fillStyle = object.material.color
            }
            if(!object.material.stroke == false){
                game.ctx.strokeStyle = object.material.stroke
            }
        }

        game.ctx.globalAlpha = object.opacity
        
        game.ctx.beginPath();
        
        switch(object.geometry.type){
            case "square":
                /*
                game.ctx.moveTo(object.points[0].x,object.points[0].y)
                game.ctx.lineTo(object.points[1].x,object.points[1].y)
                game.ctx.lineTo(object.points[2].x,object.points[2].y)
                game.ctx.lineTo(object.points[3].x,object.points[3].y)
                */
                if(!object.material.color == false){
                    game.ctx.fillRect(object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                    //game.ctx.fill()
                    
                }
                if(!object.material.stroke == false){
                    game.ctx.strokeRect(object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                    //game.ctx.stroke()
                }
                break
            case "triangle":
                game.ctx.moveTo(object.points[0].x,object.points[0].y)
                game.ctx.lineTo(object.points[1].x,object.points[1].y)
                game.ctx.lineTo(object.points[2].x,object.points[2].y)
                if(!object.material.color == false){
                    game.ctx.fill()
                }
                if(!object.material.stroke == false){
                    game.ctx.stroke()
                }
                break
            case "circle":
                game.ctx.arc(object.pos.x,object.pos.y,object.geometry.radius,0,Math.PI * 2);
                if(!object.material.color == false){
                    game.ctx.fill();
                }
                if(!object.material.stroke == false){
                    game.ctx.stroke();
                }
                break
            case "ellipse":
                game.ctx.ellipse(object.pos.x,object.pos.y,object.geometry.radius.x,object.geometry.radius.y,getRadian(object.rot),0,Math.PI * 2);
                if(!object.material.color == false){
                    game.ctx.fill();
                }
                if(!object.material.stroke == false){
                    game.ctx.stroke();
                }
                break
            case "image":
                game.ctx.drawImage(object.material.img,object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                break
            case "text":
                game.ctx.font = object.geometry.size + "serif"
                if(!object.material.color == false){
                    game.ctx.fillText(object.geometry.content,object.pos.x,object.pos.y);
                }
                if(!object.material.stroke == false){
                    game.ctx.strokeText(object.geometry.content,object.pos.x,object.pos.y);
                }
                break
        }
        
        game.ctx.closePath();
        
        if(game.dev.display){
            //当たり判定を描画
            for(let i = 0; i<object.col.length; i++){
                game.ctx.beginPath();
                game.ctx.globalAlpha = 0.6
                game.ctx.fillStyle = "purple"
                switch(object.col[i].col.type){
                case "square":
                    /*
                    game.ctx.moveTo(object.col[i].points[0].x,object.col[i].points[0].y)
                    game.ctx.lineTo(object.col[i].points[1].x,object.col[i].points[1].y)
                    game.ctx.lineTo(object.col[i].points[2].x,object.col[i].points[2].y)
                    game.ctx.lineTo(object.col[i].points[3].x,object.col[i].points[3].y)
                    game.ctx.fill()
                    */
                    game.ctx.fillRect(object.col[i].pos.x-object.col[i].col.size.x/2,object.col[i].pos.y-object.col[i].col.size.y/2,object.col[i].col.size.x,object.col[i].col.size.y)
                    break
                case "triangle":
                    game.ctx.moveTo(object.col[i].points[0].x,object.col[i].points[0].y)
                    game.ctx.lineTo(object.col[i].points[1].x,object.col[i].points[1].y)
                    game.ctx.lineTo(object.col[i].points[2].x,object.col[i].points[2].y)
                    game.ctx.fill()
                    break
                case "circle":
                    game.ctx.arc(object.pos.x,object.pos.y,object.col[i].radius,0,Math.PI * 2);
                    game.ctx.fill();
                    break
                case "ellipse":
                    game.ctx.ellipse(object.pos.x,object.pos.y,object.col[i].radius.x,object.col[i].radius.y,getRadian(object.rot),0,Math.PI * 2);
                    game.ctx.fill();
                    break
                }
                game.ctx.closePath();
            }
            
            //座標を描画
            game.ctx.beginPath();
            game.ctx.globalAlpha = 0.5
            game.ctx.fillStyle = "orange"
            game.ctx.arc(object.pos.x,object.pos.y,2,0,Math.PI*2)
            game.ctx.fill();
            game.ctx.globalAlpha = 1
            game.ctx.font = "10px serif";
            game.ctx.fillStyle = "white"
            game.ctx.fillText("X:" + object.pos.x + "\nY:" + object.pos.y,object.pos.x + 5,object.pos.y)
            game.ctx.closePath();
        }

        
    });

    //UIを描画
    game.scene.uis.forEach(object => {
        if(object.material.type == "simple"){
            if(!object.material.color == false){
                game.ctx.fillStyle = object.material.color
            }
            if(!object.material.stroke == false){
                game.ctx.strokeStyle = object.material.stroke
            }
        }
        game.ctx.globalAlpha = object.opacity
        
        game.ctx.beginPath();
        
        switch(object.geometry.type){
            case "square":
                if(!object.material.color == false){
                    game.ctx.fillRect(object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                    //game.ctx.fill()
                    
                }
                if(!object.material.stroke == false){
                    game.ctx.strokeRect(object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                }
                break
            case "circle":
                game.ctx.arc(object.pos.x,object.pos.y,object.geometry.radius,0,Math.PI * 2);
                if(!object.material.color == false){
                    game.ctx.fill();
                }
                if(!object.material.stroke == false){
                    game.ctx.stroke();
                }
                break
            case "image":
                game.ctx.drawImage(object.material.img,object.pos.x-object.geometry.size.x/2,object.pos.y-object.geometry.size.y/2,object.geometry.size.x,object.geometry.size.y)
                break
            case "text":
                game.ctx.font = object.geometry.size + "px serif"
                if(!object.material.color == false){
                    game.ctx.fillText(object.geometry.content,object.pos.x,object.pos.y);
                }
                if(!object.material.stroke == false){
                    game.ctx.strokeText(object.geometry.content,object.pos.x,object.pos.y);
                }
                break
        }
        
        game.ctx.closePath();
    });

    //開発者モードがオンになってるときのやつ
    if(game.dev.display){
        //マウスの座標を描画
        game.ctx.beginPath();
        game.ctx.fillStyle = "orange"
        game.ctx.globalAlpha = 0.5
        game.ctx.arc(game.mousePos.x,game.mousePos.y,5,0,Math.PI*2)
        game.ctx.fill();
        game.ctx.closePath();
        game.ctx.globalAlpha = 1
        game.ctx.fillStyle = "white"
        game.ctx.font = "15px serif";
        game.ctx.fillText("X:" + game.mousePos.x + "\nY:" + game.mousePos.y,game.mousePos.x,game.mousePos.y)

        //FPS描画
        game.ctx.fillText("FPS:" + game.fps.fps + "\nFPSAve:" + game.fps.fpsAve,5,20)
        
    }
}

//キーが入力した
function KeyInput(UorD){
    if(UorD){
        game.dev.update()
    }
}

//開発者モード
class DeveloperMode{
    constructor(){
        this.mode = false
        this.display = false
    }
    update(){
        if(this.mode){
            {//開発者モードでを画面に表示させるかを切り替える
                if(InputKey[32] && InputKey[17]){
                    if(this.display){
                        this.display = false
                    }else{
                        this.display = true
                    }
                }
            }
        }
    }
}

//FPS管理
class FPS{
    constructor(){
        this.Max = 60
        this.fps = 0
        this.fpsAve = 0
        this.totalFps = 0
        this.totalTime = 0

        this.firstTime
        this.nowTime
        this.lastTime
        this.deltaTime
        this.IntervalTime
        this.fpsCount
    }
    Init(){
        this.firstTime = new Date()
        this.nowTime = this.firstTime
        this.lastTime = this.firstTime
        this.IntervalTime = this.firstTime
        this.deltaTime = 0
        this.fpsCount = 0
    }
    Check(){
        this.nowTime = new Date()
        this.deltaTime = this.nowTime - this.lastTime
        this.lastTime = this.nowTime

        //一秒経ったか
        if(this.nowTime - this.IntervalTime >= 1000){
            this.IntervalTime = this.nowTime
            this.fps = this.fpsCount
            this.totalFps += this.fps
            this.totalTime = this.nowTime - this.firstTime
            this.fpsAve = Math.floor(((this.fpsAve + this.fps)/2)*100)/100
            this.fpsCount = 0
            /*
            if(game.dev.display){
                console.log("\nFPSAve:",game.fps.fpsAve,"\nFPS",game.fps.fps)
            }
            */
        }else{
            this.fpsCount++
            
        }
    }
}

//メインゲームクラス
class Game{
    constructor(){
        this.AudioLoader = new AudioLoader()
        this.canvas;
        this.game_size;
        this.ctx;
        this.base_color;
        this.scene;
        this.ImgLoader = new ImageLoader();
        this.fps = new FPS()
        this.mousePos = new Vector2(0,0)
        this.mouseEvent = {click:false,down:false,up:false}
        this.dev = new DeveloperMode()
    }
    make_canvas(width,height,color){
        this.game_size = new Vector2(width,height);
        this.canvas = document.createElement("canvas");
        this.canvas.style = "position:fixed; top:0px; left:0px;"
        document.body.appendChild( this.canvas );
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d")
        this.base_color = color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
    }
    set_scene(scene){
        this.scene = scene
    }
    addScript(url){
        var script = document.createElement("script")
        script.src = url
        document.body.appendChild(script)
    }
    addScripts(arr){
        arr.forEach(url => {
            game.addScript(url)
        });
    }
  }

//シーン
class Scene{
    constructor(){
        this.objects = [];
        this.uis = []
    }
    add(object){
        this.objects.push(object)
    }
    remove(object){
        var tmp = 0;
        this.objects.forEach(_object => {
            if(_object.id == object.id){
                this.objects.splice(tmp,1)
                return;
            }
            tmp++;
        });
    }
    addUI(object){
        this.uis.push(object)
    }
    removeUI(object){
        var tmp = 0;
        this.uis.forEach(_object => {
            if(_object.id == object.id){
                this.uis.splice(tmp,1)
                return;
            }
            tmp++;
        });
    }
}

//マテリアル
//色指定
class SimpleMaterial{
    constructor(color,stroke){
        this.color = color
        this.stroke = false
        this.type = "simple"
    }
    set_stroke(color){
        this.stroke = color
    }
    set_fill(color){
        this.color = color
    }
}
//画像
class ImageMaterial{
    constructor(img){
        this.img = img
        this.type = "img"
    }
}

//ジオメトリ(どの図形でもpositionは図形の中心)
//四角形
class SquareGeometry{
    constructor(width,height){
        this.size = new Vector2(width,height)
        this.type = "square"
    }
}
//円
class CricleGeometry{
    constructor(radius){
        this.radius = radius;
        this.type = "circle"
    }
}
//楕円
class EllipseGeometry{
    constructor(x_radius,y_radius){
        this.radius = {x: x_radius,y:y_radius}
        this.type = "ellipse"
    }
}
//正三角形
class TriangleGeometry{
    constructor(dis){
        this.dis = dis
        this.type = "triangle"
    }
}
//画像
class ImageGeometry{
    constructor(img){
        this.size = new Vector2(img.width,img.height)
        this.type = "image"
    }
}
//テキスト
class TextGeometry{
    constructor(content){
        this.size = 10
        this.type = "text"
        this.content = content
    }
}


//メッシュ
//ノーマル(そのまま描画するタイプ)
class NormalMesh{
    constructor(id,geometry,material){
        this.id = id
        this.geometry = geometry;
        this.material = material;
        this.pos = new Vector2(0,0)
        this.rot = 0
        this.points = getPoints(this.pos,this.rot,this.geometry)
        this.opacity = 1
        this.type = "normal"
        this.col = []
    }
    add(collision){
        this.col.push(collision)
    }
    remove(collision){
        var tmp = 0;
        this.collision.forEach(_collision => {
            if(_collision.id == collision.id){
                this.col.splice(tmp,1)
                return;
            }
            tmp++;
        });
    }
    updatePoints(pos,geometry){
        this.points = getPoints(this.pos,this.rot,this.geometry)
        var isarray = Array.isArray(this.col)
        if(isarray == false){
            this.col.updatePoints(this.pos,this.rot)
        }
    }
}

/*
//中心点からそれぞれの角を求める
function getPoints(cPos,rot,geometry){
    var points = []
    switch(geometry.type){
        case "square" || "image":
            points.push(getRotPoint(cPos,new Vector2((-geometry.size.x / 2),(-geometry.size.y / 2)),rot))
            points.push(getRotPoint(cPos,new Vector2((-geometry.size.x / 2),(geometry.size.y / 2)),rot))
            points.push(getRotPoint(cPos,new Vector2((geometry.size.x / 2),(geometry.size.y / 2)),rot))
            points.push(getRotPoint(cPos,new Vector2((geometry.size.x / 2),(-geometry.size.y / 2)),rot))
            break
        case "triangle":
            var triPoints = getTriPoints(cPos,geometry.dis,rot)
            points.push(triPoints[0])
            points.push(triPoints[1])
            points.push(triPoints[2])
            //console.log(triPoints)
            break
    }
    return points
}

//正三角形の点を取得する
function getTriPoints(cPos,dis,rot){
    var points = []
    var Rad = getRadian(rot)
    for(let i = 0; i<3; i++){
        var rad = getRadian(120*i)
        var x = -dis*Math.sin(rad)
        var y = -dis*Math.cos(rad)
        var nx = x*Math.cos(Rad) - y*Math.sin(Rad) + cPos.x
        var ny = x*Math.sin(Rad) + y*Math.cos(Rad) + cPos.y
        points.push(new Vector2(nx,ny))
    }
    return points
}
*/

//回転した点を入手する
function getRotPoint(pos,size,rot){
    var rad = getRadian(rot)
    var position = new Vector2(size.x, size.y)

    var x = position.x*Math.cos(rad) - position.y*Math.sin(rad) + pos.x
    var y = position.x*Math.sin(rad) + position.y*Math.cos(rad) + pos.y
    var point = new Vector2(x,y)

    
    return point
}

//画像読み込みするやつ
class ImageLoader {
    constructor() {
        this.images = {}
        this.imgMap = {}
    }

    addImg(key,path){
        this.imgMap[key] = path
    }

    addImgs(map){
        for(const [key,path] of Object.entries(map)){
            this.imgMap[key] = path
        }
    }

    async loadImage(key, url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                this.images[key] = image;
                resolve(image);
            };
            image.onerror = (error) => {
                reject(error);
            };
            image.src = url;
        });
    }

    getImage(key) {
        return this.images[key];
    }

    async loadImages(imageList) {
        const promises = [];

        for (const [key, url] of Object.entries(imageList)) {
            const promise = this.loadImage(key, url);
            promises.push(promise);
        }

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error loading images:', error);
            throw error;
        }
    }
}

//音を読み込みするやつ
class AudioLoader{
    constructor() {
        this.audioes = {}
        this.audioMap = {}
    }

    addAudio(key,path){
        this.audioMap[key] = path
    }

    addAudios(map){
        for(const [key,path] of Object.entries(map)){
            this.audioMap[key] = path
        }
    }

    async loadAudio(key, url) {
        const audio = new Audio(url)
        this.audioes[key] = audio
    }

    getAudio(key) {
        return this.audioes[key];
    }

    loadAudioes(audioList) {
        for (const [key, url] of Object.entries(audioList)) {
            this.loadAudio(key,url)
        }
    }
}

//マウス座標
document.body.addEventListener("mousemove", function(e){
    game.mousePos.x = e.pageX
    game.mousePos.y = e.pageY
    /*
    if(game.dev.display){
        console.log("\nMousePos\nX:",game.mousePos.x,"\nY:",game.mousePos.y)
    }
    */
  });


//キーインプット
var InputKey = [];

window.addEventListener("keydown", Keydown);
function Keydown(e) {
    InputKey[e.keyCode] = true;
    KeyInput(true);
}
//キーから手を話した
window.addEventListener("keyup", Keyup);
function Keyup(e) {
    InputKey[e.keyCode] = false;
    KeyInput(false);
}

document.body.addEventListener("mousedown",function(){
    game.mouseEvent["down"] = true
    game.mouseEvent["up"] = false
    game.mouseEvent["click"] = true
})
document.body.addEventListener("mouseup",function(){
    game.mouseEvent["up"] = true
    game.mouseEvent["click"] = false
    game.mouseEvent["down"] = false
})

class NormalUI{
    constructor(id,geometry,material){
        this.id = id
        this.geometry = geometry;
        this.material = material;
        this.pos = new Vector2(0,0)
        this.rot = 0
        this.opacity = 1
        this.type = "normalUI"
        this.disabled = true
        this.col = false
    }
    Col(){
        var hantei = false
        if(this.disabled && !this.col==false){
            if(this.geometry.type=="image"){
                this.col.size = this.geometry.size.copy()
            }
        switch(this.col.type){
            case "square":
                var disPos = this.pos.sub(game.mousePos).abs()
                var dis = this.col.size.div(new Vector2(2,2))
                var hanteiPos = disPos.sub(dis)
                if(hanteiPos.x <= 0 && hanteiPos.y <= 0){
                    hantei = true
                }
                //console.log(dis)
                break
            case "circle":
                var disPos = (this.pos.x-game.mousePos.x)**2 +(this.pos.y-game.mousePos.y)**2
                var dis = this.col.radius**2
                var hanteiPos = disPos - dis
                if(hanteiPos <= 0){
                    hantei = true
                }
                break
        }
        }
        return hantei
    }
    onclick(){
        if(game.mouseEvent["click"] && this.Col()){
            return true
        }else{
            return false
        }
    }
    focus(){
        return this.Col()
    }
}

class ColDet{
    constructor(){
        this.item = {}
        this.keys = []
    }
    add(item,item2,id){
        var hantei = true
        this.keys.forEach(key => {
            if(key == id){
                hantei = false
                return
            }
        });
        if(hantei){
            this.item[id] = [item,item2]
            this.keys.push(id)
        }
    }
    remove(id){
        var tmp = 0;
        this.keys.forEach(key => {
            if(key == id){
                this.keys.splice(tmp,1)
                delete this.item[key][id]
                return
            }
            tmp++
        });
    }
    cal(){
        var HitArr = []
        this.keys.forEach(key => {
            
            //四角形
            if(this.item[key][0].col.col.type == "square"){
                //四角形
                if(this.item[key][1].col.col.type == "square"){
                    var dist = this.item[key][0].pos.sub(this.item[key][1].pos)
                    var distance = dist.abs()
                    var tmpSize1 = new Vector2(this.item[key][0].col.col.size.x/2,this.item[key][0].col.col.size.y/2)
                    var tmpSize2 = new Vector2(this.item[key][1].col.col.size.x/2,this.item[key][1].col.col.size.y/2)
                    var total = tmpSize1.add(tmpSize2)
                    var dis = distance.sub(total)
                    if(dis.x <= 0 && dis.y <= 0){
                        //console.log(dist)
                        HitArr.push(key)
                    }else{
                        //console.log(distance,total,dis)
                    }
                }else if(this.item[key][1].col.col.type == "circle"){//円
                    
                }
            }else if(this.item[key][0].col.col.type == "circle"){//円
                //円
                if(this.item[key][1].col.col.type == "circle"){
                    var tmpTotal = this.item[key][0].col.col.radius + this.item[key][1].col.col.radius
                    var total = tmpTotal**2
                    var tmpDis = this.item[key][0].pos.sub(this.item[key][1].pos)
                    //console.log(tmpDis)
                    var tmpDis2 = new Vector2(tmpDis.x**2,tmpDis.y**2)
                    var distance = tmpDis2.x + tmpDis2.y
                    var dis = distance - total
                    if(dis <= 0){
                        HitArr.push(key)
                    }else{
                        //console.log(distance,total,dis)
                    }
                }

            }
        });
        return HitArr
    }
    calSpecify(key){
        if(this.item[key][0].col.col.type == "square"){
            //四角形
            if(this.item[key][1].col.col.type == "square"){
                var dist = this.item[key][0].pos.sub(this.item[key][1].pos)
                var distance = dist.abs()
                var tmpSize1 = new Vector2(this.item[key][0].col.col.size.x/2,this.item[key][0].col.col.size.y/2)
                var tmpSize2 = new Vector2(this.item[key][1].col.col.size.x/2,this.item[key][1].col.col.size.y/2)
                var total = tmpSize1.add(tmpSize2)
                var dis = distance.sub(total)
                if(dis.x <= 0 && dis.y <= 0){
                    //console.log(dist)
                    return true
                }else{
                    //console.log(distance,total,dis)
                    return false
                }
            }else if(this.item[key][1].col.col.type == "circle"){//円
                
            }
        }
    }
}

//Collision
//Area
class Body{
    constructor(id,collision,type,dis){
        this.id = id
        this.col = collision
        this.type = type
        this.pos = new Vector2(0,0)
        this.rot = 0
        this.dis = dis || new Vector2(0,0)
        this.points = getPoints(this.pos,this.rot,this.col)
        this.sides = getSides(this.points,this.col)
    }
    updatePoints(pos,rot){
        this.pos = pos.add(this.dis)
        this.rot = rot
        this.points = getPoints(this.pos,this.rot,this.col)
        this.sides = getSides(this.points,this.col)
    }
    border(SWidth,SHeight,EWidth,EHeight){
        var border = []
        switch(this.col.type){
            case "square":
                var top = this.pos.y - this.col.size.y/2
                var down = this.pos.y + this.col.size.y/2
                var left = this.pos.x - this.col.size.x/2
                var right = this.pos.x + this.col.size.x/2
                //上
                if(top <= SHeight){
                    border[0] = true
                }else{
                    border[0] = false
                }
                //下
                if(down >= EHeight){
                    border[1] = true
                }else{
                    border[1] = false
                }
                //左
                if(left <= SWidth){
                    border[2] = true
                }else{
                    border[2] = false
                }
                //右
                if(right >= EWidth){
                    border[3] = true
                }else{
                    border[3] = false
                }
                break
        }

        return border
    }
}
//四角
class SquareCollision{
    constructor(width,height){
        this.size = new Vector2(width,height)
        this.type = "square"
        this.side = [[0,1],[1,2],[2,3],[3,0]]
    }
}
//円
class CircleCollision{
    constructor(radius){
        this.radius = radius;
        this.type = "circle"
    }
}
//楕円
class EllipseCollision{
    constructor(x_radius,y_radius){
        this.radius = {x: x_radius,y: y_radius}
        this.type = "ellipse"
    }
}
//正三角形
class TriangleCollision{
    constructor(dis){
        this.dis = dis
        this.type = "triangle"
        this.side = [[0,1],[1,2],[2,0]]
    }
}

//ベクター２次元
class Vector2{
    constructor(x,y){
      this.x = x;
      this.y = y;
    }
    copy(){
        return new Vector2(this.x,this.y)
    }

    //+
    add(vec){
        return new Vector2(this.x + vec.x, this.y + vec.y)
    }
    //-
    sub(vec){
        return new Vector2(this.x - vec.x, this.y - vec.y)
    }
    //*
    mul(vec){
        return new Vector2(this.x * vec.x, this.y * vec.y)
    }
    div(vec){
        return new Vector2(this.x / vec.x, this.y / vec.y)
    }
    abs(){
        return new Vector2(Math.abs(this.x),Math.abs(this.y))
    }
}

//以下は関数系

//角度からラジアンを取得
function getRadian(rot){
    return (rot * Math.PI) / 180
}

//ラジアンから角度を取得
function getRotation(radian){
    return (radian * 180) / Math.PI
}

//点を取得
function getPoints(pos,rot,col){
    var points = []
    switch(col.type){
        case "square":
            var sizeHalf = new Vector2(col.size.x/2,col.size.y/2)
            var vecs = [
                new Vector2(-1,-1),
                new Vector2(1,-1),
                new Vector2(1,1),
                new Vector2(-1,1)
            ]
            vecs.forEach(vec => {
                points.push(getRotPoint(pos,sizeHalf.mul(vec),rot))
            });
        break
        case "triangle":
            var Rad = getRadian(rot)
            for(let i = 0; i<3; i++){
                var rad = getRadian(120*i)
                var x = -col.dis*Math.sin(rad)
                var y = -col.dis*Math.cos(rad)
                points.push(getRotPoint(pos,new Vector2(x,y),rot))
            }
            break
    }
    return points
}

//辺を取得
function getSides(points,col){
    sides = []
    switch(col.type){
        case "square":
            col.side.forEach(line => {
                sides.push([points[line[0]],points[line[1]]])
            });
            break
        case "triangle":
            col.side.forEach(line => {
                sides.push([points[line[0]],points[line[1]]])
            });
    }
    
    return sides
}
