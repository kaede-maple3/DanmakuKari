var startImg
var start

var opexImg
var opex

function ReadyTitle(){
    startImg = game.ImgLoader.getImage("start")
    start = new NormalUI("start",new ImageGeometry(startImg),new ImageMaterial(startImg))
    start.geometry.size = new Vector2(345,87)
    start.pos = new Vector2(440,280)
    start.col = new SquareCollision(start.geometry.size.x,start.geometry.size.y)
    TitleScene.addUI(start)

    opexImg = game.ImgLoader.getImage("opex")
    opex = new NormalUI("opex",new ImageGeometry(opexImg),new ImageMaterial(opexImg))
    opex.geometry.size = new Vector2(345,87)
    opex.pos = new Vector2(440,420)
    opex.col = new SquareCollision(opex.geometry.size.x,opex.geometry.size.y)
    TitleScene.addUI(opex)
}

function TitleRepeat(){
    if(start.focus()){
        start.opacity = 0.5
    }else{
        start.opacity = 1
    }

    if(start.onclick()){
        Nowscene = "モードセレクト"
        GameInit()
        alert("ハイスコア："+HighScore)
    }

    if(opex.focus()){
        opex.opacity = 0.5
    }else{
        opex.opacity = 1
    }

    if(opex.onclick()){
        //操作説明ヘ
        location.href = "OpeExp/index.html"
    }
}
