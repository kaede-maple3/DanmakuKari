//定数
const GEHP = 100//原住民イージーモード体力
const GESPEED = new Vector2(2,0)//原住民イージーモードスピード
const GESCORE = 300//原住民を倒したときのスコア
const GEDROP = 1//原住民ドロップ

//ウサギ
const RAHP = 400
const RASPEED = new Vector2(1,1)
const RASCORE = 800
const RADROP = 2

const PML = 5 //プレイヤー初期HP
const MSP = 8 //スコアの桁の最大値
const MPP = 5 //パワーの桁の最大値
const SPP = 12 //最初のプレイヤーのパワー
const DISPEED = 1//ドロップアイテムの落下速度
const DIPSCORE = 1//ドロップアイテムを拾ったときに増えるパワー
const DAMAGE = 1//敵の弾に当たったときのダメージ
const SPROGRESS = 0
const InvFlame = 180//被ダメージ後の無敵時間(フレーム)
const LifeScore = 5000//残りのHP一つ毎のスコア

//const BSCORE = 5000
const NTSCORE = 8000//ナイストライ
const SSCORE = 20000//そーそー
const VGSCORE = 40000//ベリーグッド


var score
var HighScore

var GameClear

var pause

var nowProgress

var UnConfirming

var colDet
var GameScene

var playerImg
var player
var playerPower
var playerHP
var playerInvFlame

var PlayerSpeed
var BulletBreakFlame
var NowBreakFlame

var nowEnemies = []

//ドロップアイテム
var DIImg
var DropItems = []
var TotalDropItemCount

//原住民
var genImg

//ウサギ
var rabImg

var scoreBoard

//プレイヤー弾
var PBImgs = []
var playerBullets = []
var TotalBulletCount
var PBbody

//原住民玉
var GenBImg
var genbullets = []
var TotalGenBulletCount

//ポーズメニュー
var Pback
var continueImg
var continueB
var menuImg
var menuB
var pauseImg
var pauseText

var GCTextImg
var GCText
var GOTextImg
var COText
var GCOScore
var LSFs = []


function GameInit(){
    UnConfirming = true
    GameClear = false
    NowSCB = SceneChangeBreak
    pause = false
    playerHP = PML
    playerPower = SPP
    nowProgress = SPROGRESS
    playerInvFlame = 0
    score = 0
    Nowscene = "ゲーム"

    GameScene = new Scene()
    game.set_scene(GameScene)

    //画像取得
    playerImg = game.ImgLoader.getImage("player")
    continueImg = game.ImgLoader.getImage("continue")
    menuImg = game.ImgLoader.getImage("menu")
    pauseImg = game.ImgLoader.getImage("pause")

    //ゲームクリアのタイトル
    GCTextImg = game.ImgLoader.getImage("GC")
    GCText = new NormalUI("GC",new ImageGeometry(GCTextImg),new ImageMaterial(GCTextImg))
    GCText.pos = new Vector2(290,100)
    GOTextImg = game.ImgLoader.getImage("GO")
    GOText = new NormalUI("GO",new ImageGeometry(GOTextImg),new ImageMaterial(GOTextImg))
    GOText.pos = new Vector2(290,100)

    //ドロップアイテム
    TotalDropItemCount = 0
    DIImg = game.ImgLoader.getImage("DI")

    //弾
    BulletBreakFlame = 5
    NowBreakFlame = 0
    TotalGenBulletCount = 0
    TotalBulletCount = 0
    PBImgs.push(game.ImgLoader.getImage("PB1"))
    PBImgs.push(game.ImgLoader.getImage("PB2"))
    PBImgs.push(game.ImgLoader.getImage("PB3"))
    PBImgs.push(game.ImgLoader.getImage("PB4"))
    GenBImg = game.ImgLoader.getImage("genB")
    

    //プレイヤー
    PlayerSpeed = 2
    player = new character(PML)
    player.Edata = new NormalMesh("player",new ImageGeometry(playerImg),new ImageMaterial(playerImg))
    player.Edata.pos = new Vector2(300,580)
    player.Edata.geometry.size = new Vector2(15,30)
    player.Edata.col = new Body("player",new SquareCollision(7,10),"test")
    player.calculator = new ColDet()
    GameScene.add(player.Edata)

    //原ちゃん
    genImg = game.ImgLoader.getImage("gen")
    
    //ウサギ
    rabImg = game.ImgLoader.getImage("rab")

    //ポーズ画面
    Pback = new NormalMesh("PB",new SquareGeometry(580,660),new SimpleMaterial("#000000"))
    Pback.pos = new Vector2(290,330)
    Pback.opacity = 0.7
    pauseText = new NormalUI("PT",new ImageGeometry(pauseImg),new ImageMaterial(pauseImg))
    pauseText.pos = new Vector2(290,100)
    continueB = new NormalUI("CB",new ImageGeometry(continueImg),new ImageMaterial(continueImg))
    continueB.pos = new Vector2(290,250)
    continueB.col = new SquareCollision(continueB.geometry.size.x,continueB.geometry.size.y)
    menuB = new NormalUI("MB",new ImageGeometry(menuImg),new ImageMaterial(menuImg))
    menuB.pos = new Vector2(290,350)
    menuB.col = new SquareCollision(menuB.geometry.size.x,menuB.geometry.size.y)

    scoreBoard = new NormalMesh("SB",new SquareGeometry(300,660),new SimpleMaterial("#222222"))
    scoreBoard.pos = new Vector2(730,330)
    GameScene.add(scoreBoard)
    SetScoreBoard()

    GCOScore = new NormalUI("LasrScore",new ImageGeometry(scoreTextImg),new ImageMaterial(scoreTextImg))
    GCOScore.pos = new Vector2(180,180)
    for(let i = 0; i<MSP; i++){
        var tmp = new NormalUI("LscoreTxt" + i,new ImageGeometry(figureImgs[0]),new ImageMaterial(figureImgs[0]))
        tmp.geometry.size = new Vector2(30,40)
        tmp.pos = new Vector2(300+i*28,180)
        LSFs.push(tmp)
    }

    progressReset()
}

function GameRepeat(){
    if(GameClear){
        GameScene.addUI(Pback)
        GameScene.addUI(yo)
        GameScene.addUI(GCText)
        score += playerHP*LifeScore
        if(score >= VGSCORE){
            GameScene.addUI(vg)
        }else if(score >= SSCORE){
            GameScene.addUI(soso)
        }else if(score >= NTSCORE){
            GameScene.addUI(nt)
        }else{
            GameScene.addUI(bad)
        }
        var scoreStr = score.toString().padStart( MSP, '0')
        for(let i = 0; i<MSP; i++){
            var str = scoreStr.charAt(i)
            LSFs[i].material.img = figureImgs[str]
            GameScene.addUI(LSFs[i])
        }

        GameScene.addUI(GCOScore)
        GameScene.addUI(menuB)
        Nowscene = "ゲーム終了"
        if(HighScore<score){
            localStorage.setItem("HighScore",score)
        }
    }else{
    //キーとボタンのブレイクタイム(押したときに連打判定になってるから)
    if(NowSCB <= 0){
    if(InputKey[81]){
        NowSCB = SceneChangeBreak
        if(pause){
            pause = false
            GameScene.removeUI(Pback)
            GameScene.removeUI(pauseText)
            GameScene.removeUI(continueB)
            GameScene.removeUI(menuB)
        }else{
            pause = true
            GameScene.addUI(Pback)
            GameScene.addUI(pauseText)
            GameScene.addUI(continueB)
            GameScene.addUI(menuB)
        }
    }
    }else{
        NowSCB--
    }

    if(pause){
        if(continueB.focus()){
            continueB.opacity = 0.5
        }else{
            continueB.opacity = 1
        }
        if(menuB.focus()){
            menuB.opacity = 0.5
        }else{
            menuB.opacity = 1
        }
        
        if(menuB.onclick()){
            if(UnConfirming){
                UnConfirming = false
                var Hconfirm = confirm("本当に終了しますか")
                if(Hconfirm){
                    location.reload()
                }else{
                    pause = false
                    GameScene.removeUI(Pback)
                    GameScene.removeUI(pauseText)
                    GameScene.removeUI(continueB)
                    GameScene.removeUI(menuB)
                    UnConfirming = true
                }
            }
        }
        if(continueB.onclick()){
            pause = false
            GameScene.removeUI(Pback)
            GameScene.removeUI(pauseText)
            GameScene.removeUI(continueB)
            GameScene.removeUI(menuB)
        }
    }else{
    if(InputKey[87] || InputKey[38]){//上
        player.Edata.pos.y -= PlayerSpeed
    }
    if(InputKey[83] || InputKey[40]){//下
        player.Edata.pos.y += PlayerSpeed
    }
    if(InputKey[68] || InputKey[39]){//右
        player.Edata.pos.x += PlayerSpeed
    }
    if(InputKey[65] || InputKey[37]){//左
        player.Edata.pos.x -= PlayerSpeed
    }
    
    //低速
    if(InputKey[16]){
        
        PlayerSpeed = 1.4
    }else{
        PlayerSpeed = 2
    }
    
    //弾発射
    if(InputKey[32]){
        if(NowBreakFlame <= 0){
            NowBreakFlame = BulletBreakFlame
            var random = Math.floor(Math.random()*4)
            var Pbullet = new bullet(TotalBulletCount,PBImgs[random],player.Edata.pos,random)
            Pbullet.Edata.col = new Body("bullet"+TotalBulletCount,new SquareCollision(Pbullet.Edata.geometry.size.x,Pbullet.Edata.geometry.size.y),"test")
            playerBullets.push(Pbullet)
            nowEnemies.forEach(nowEnemy => {
                //console.log(nowEnemy.Edata.id)
                nowEnemy.calculator.add(Pbullet.Edata,nowEnemy.Edata,nowEnemy.Edata.id + TotalBulletCount)
            });
            TotalBulletCount++
        }
    }

    var borderJ = player.Edata.col.border(0,0,580,660)
    if(borderJ[0]){
        player.Edata.pos.y += PlayerSpeed
    }
    if(borderJ[1]){
        player.Edata.pos.y -= PlayerSpeed
    }
    if(borderJ[2]){
        player.Edata.pos.x += PlayerSpeed
    }
    if(borderJ[3]){
        player.Edata.pos.x -= PlayerSpeed
    }

    var RemoveBulletsList = []
    var delCount = 0
    playerBullets.forEach(bullet => {
        if(bullet.update(nowEnemies)){
            RemoveBulletsList.push(delCount)
        }
        delCount ++
    });
    for(let i = 0; i<RemoveBulletsList.length; i++){
        playerBullets.splice(RemoveBulletsList[i]-i,1)
    }

    Progress(nowProgress)

    var RemoveBulletsList = []
    var delCount = 0
    DropItems.forEach(di => {
        if(di.update()){
            RemoveBulletsList.push(delCount)
        }
        delCount ++
    });
    for(let i = 0; i<RemoveBulletsList.length; i++){
        DropItems.splice(RemoveBulletsList[i]-i,1)
    }

    if(playerInvFlame > 0){
        if(playerInvFlame%60 >= 29){
            player.Edata.opacity = 0.7
        }else{
            player.Edata.opacity = 1
        }
        playerInvFlame--
    }

    //時間経過のスコア加算
    score += 1
    ChangeScore(score)
    //弾のブレイクタイム更新
    NowBreakFlame --
    //console.log(game.fps)
}
}
}