var scoreTextImg
var scoreText

var powerTextImg
var powerText
var PowerFigures = []

var lifeTextImg
var lifeText

var lifeImg
var lifes = []

var figureImgs = []
var Scorefigures = []

var yoImg
var yo

var bad
var badImg
var nt
var ntImg
var soso
var sosoImg
var vg
var vgImg

var BossHPText
var BossHPPerText

function SetScoreBoard(){
    badImg = game.ImgLoader.getImage("bad")
    bad = new NormalUI("bad",new ImageGeometry(badImg),new ImageMaterial(badImg))
    bad.pos = new Vector2(400,480)
    bad.geometry.size = new Vector2(460,180)
    ntImg = game.ImgLoader.getImage("nt")
    nt = new NormalUI("nt",new ImageGeometry(ntImg),new ImageMaterial(ntImg))
    nt.pos = new Vector2(400,480)
    nt.geometry.size = new Vector2(460,180)
    sosoImg = game.ImgLoader.getImage("soso")
    soso = new NormalUI("soso",new ImageGeometry(sosoImg),new ImageMaterial(sosoImg))
    soso.pos = new Vector2(400,480)
    soso.geometry.size = new Vector2(460,180)
    vgImg = game.ImgLoader.getImage("vg")
    vg = new NormalUI("vg",new ImageGeometry(vgImg),new ImageMaterial(vgImg))
    vg.pos = new Vector2(400,480)
    vg.geometry.size = new Vector2(460,180)

    yoImg = game.ImgLoader.getImage("yo")
    yo = new NormalUI("yo",new ImageGeometry(yoImg),new ImageMaterial(yoImg))
    yo.geometry.size = new Vector2(500,500)
    yo.pos = new Vector2(200,560)

    scoreTextImg = game.ImgLoader.getImage("scoreText")
    scoreText = new NormalUI("scoreTxt",new ImageGeometry(scoreTextImg),new ImageMaterial(scoreTextImg))
    scoreText.geometry.size = new Vector2(77,19)
    scoreText.pos = new Vector2(650,100)
    GameScene.addUI(scoreText)

    powerTextImg = game.ImgLoader.getImage("powerText")
    powerText = new NormalUI("powerTxt",new ImageGeometry(powerTextImg),new ImageMaterial(powerTextImg))
    powerText.geometry.size = new Vector2(77,19)
    powerText.pos = new Vector2(650,180)
    GameScene.addUI(powerText)

    lifeTextImg = game.ImgLoader.getImage("lifeText")
    lifeText = new NormalUI("lifetxt",new ImageGeometry(lifeTextImg),new ImageMaterial(lifeTextImg))
    lifeText.geometry.size = new Vector2(55,19)
    lifeText.pos = new Vector2(650,140)
    GameScene.addUI(lifeText)

    lifeImg = game.ImgLoader.getImage("lifeicon")
    for(let i = 0; i<PML; i++){
        var tmpLife = new NormalUI("life" + i,new ImageGeometry(lifeImg),new ImageMaterial(lifeImg))
        tmpLife.geometry.size = new Vector2(18,22)
        tmpLife.pos = new Vector2(790-i*20,140)
        lifes.push(tmpLife)
        GameScene.addUI(tmpLife)
    }

    for(let i = 0; i<10; i++){
        figureImgs.push(game.ImgLoader.getImage("fig" + i))
    }

    for(let i = 0; i<MSP; i++){
        var tmp = new NormalUI("score" + i,new ImageGeometry(figureImgs[0]),new ImageMaterial(figureImgs[0]))
        tmp.geometry.size = new Vector2(15,20)
        tmp.pos = new Vector2(710+i*13,100)
        GameScene.addUI(tmp)
        Scorefigures.push(tmp)
    }
    for(let i = 0; i<MPP; i++){
        var tmp = new NormalUI("power" + i,new ImageGeometry(figureImgs[0]),new ImageMaterial(figureImgs[0]))
        tmp.geometry.size = new Vector2(15,20)
        tmp.pos = new Vector2(710+i*13,180)
        GameScene.addUI(tmp)
        PowerFigures.push(tmp)
    }
    ChangePlayerPower(playerPower)
}

function ChangeScore(score){
    var scoreStr = score.toString().padStart( MSP, '0')
    for(let i = 0; i<MSP; i++){
        var str = scoreStr.charAt(i)
        Scorefigures[i].material.img = figureImgs[str]
    }
}

function ChangePlayerPower(power){
    var powerStr = power.toString().padStart( MPP, '0')
    for(let i = 0; i<MPP; i++){
        var str = powerStr.charAt(i)
        PowerFigures[i].material.img = figureImgs[str]
    }
}

function ChangePlayerLife(life){
    GameScene.removeUI(lifes[0])
    lifes.splice(0,1)
    if(life == 0){//ゲームオーバー判定
        GameScene.addUI(Pback)
        GameScene.addUI(yo)
        GameScene.addUI(GOText)

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
    }
}