var ModeSelectScene
var TextModeTitle
var TMTImg
var MEImg
var MEFocusImg
var ModeEasy
var MNImg
var MNFocusImg
var ModeNormal
var MHImg
var MHFocusImg
var ModeHard
var MIImg
var MIFocusImg
var ModeImp

function ReadyModeSelect(){
    //画像取得
    TMTImg = game.ImgLoader.getImage("MST")
    MEImg = game.ImgLoader.getImage("ME")
    MEFocusImg = game.ImgLoader.getImage("MEFocus")
    MNImg = game.ImgLoader.getImage("MN")
    MNFocusImg = game.ImgLoader.getImage("MNFocus")
    MHImg = game.ImgLoader.getImage("MH")
    MHFocusImg = game.ImgLoader.getImage("MHFocus")
    MIImg = game.ImgLoader.getImage("MI")
    MIFocusImg = game.ImgLoader.getImage("MIFocus")

    ModeSelectScene = new Scene();

    TextModeTitle = new NormalUI("MST",new ImageGeometry(TMTImg),new ImageMaterial(TMTImg))
    TextModeTitle.pos = new Vector2(440,100)
    ModeSelectScene.addUI(TextModeTitle)

    //モードイージー
    ModeEasy = new NormalUI("ME",new ImageGeometry(MEImg),new ImageMaterial(MEImg))
    ModeEasy.pos = new Vector2(440,250)
    ModeEasy.geometry.size = new Vector2(200,87.5)
    ModeEasy.col = new SquareCollision(ModeEasy.geometry.size.x,ModeEasy.geometry.size.y)
    ModeSelectScene.addUI(ModeEasy)
    /*
    //モードノーマル
    ModeNormal = new NormalUI("MN",new ImageGeometry(MNImg),new ImageMaterial(MNImg))
    ModeNormal.pos = new Vector2(440,350)
    ModeNormal.geometry.size = new Vector2(200,87.5)
    ModeNormal.col = new SquareCollision(ModeNormal.geometry.size.x,ModeNormal.geometry.size.y)
    ModeSelectScene.addUI(ModeNormal)
    //モードハード
    ModeHard = new NormalUI("MH",new ImageGeometry(MHImg),new ImageMaterial(MHImg))
    ModeHard.pos = new Vector2(440,450)
    ModeHard.geometry.size = new Vector2(200,87.5)
    ModeHard.col = new SquareCollision(ModeHard.geometry.size.x,ModeHard.geometry.size.y)
    ModeSelectScene.addUI(ModeHard)
    //モードインポッシブル
    ModeImp = new NormalUI("MI",new ImageGeometry(MIImg),new ImageMaterial(MIImg))
    ModeImp.pos = new Vector2(440,580)
    ModeImp.geometry.size = new Vector2(300,131.25)
    ModeImp.col = new SquareCollision(ModeImp.geometry.size.x,ModeImp.geometry.size.y)
    ModeSelectScene.addUI(ModeImp)
    */

    NowSCB = SceneChangeBreak
}

function showModeSelect(){
 game.set_scene(ModeSelectScene)
}

function MSRepeat(){
    if(ModeEasy.focus()){
        ModeEasy.material.img = MEFocusImg
    }else{
        ModeEasy.material.img = MEImg
    }
    /*
    if(ModeNormal.focus()){
        ModeNormal.material.img = MNFocusImg
    }else{
        ModeNormal.material.img = MNImg
    }
    if(ModeHard.focus()){
        ModeHard.material.img = MHFocusImg
    }else{
        ModeHard.material.img = MHImg
    }
    if(ModeImp.focus()){
        ModeImp.material.img = MIFocusImg
    }else{
        ModeImp.material.img = MIImg
    }
    */

    if(NowSCB <= 0){
    if(ModeEasy.onclick()){
        GameInit(0)
        alert("ハイスコア："+HighScore)
    }
    /*
    if(ModeNormal.onclick()){
        GameInit(1)
    }
    if(ModeHard.onclick()){
        GameInit(2)
    }
    if(ModeImp.onclick()){
        GameInit(3)
    }
    */
}else{
    NowSCB--
}
}