var game
var TitleScene
var Nowscene
const SceneChangeBreak = 20
var NowSCB

function init(){
    HighScore = localStorage.getItem("HighScore")
    if(HighScore == null){
        HighScore = 0
    }
    console.log(HighScore)
    game.make_canvas(880,660,"#252525");
    game.dev.mode = true

    TitleScene = new Scene();
    game.set_scene(TitleScene);

    //UI読み込み
    var UIImgs = {
        "start":"./img/UI/Start.png",
        "scoreText":"./img/UI/scoreboard/SCORE.png",
        "powerText":"./img/UI/scoreboard/POWER.png",
        "lifeText":"./img/UI/scoreboard/LIFE.png",
        "lifeicon":"./img/UI/scoreboard/lifefire.png",
        "fig0":"./img/UI/scoreboard/figure/0.png",
        "fig1":"./img/UI/scoreboard/figure/1.png",
        "fig2":"./img/UI/scoreboard/figure/2.png",
        "fig3":"./img/UI/scoreboard/figure/3.png",
        "fig4":"./img/UI/scoreboard/figure/4.png",
        "fig5":"./img/UI/scoreboard/figure/5.png",
        "fig6":"./img/UI/scoreboard/figure/6.png",
        "fig7":"./img/UI/scoreboard/figure/7.png",
        "fig8":"./img/UI/scoreboard/figure/8.png",
        "fig9":"./img/UI/scoreboard/figure/9.png",
        "dot":"./img/UI/scoreboard/dot.png",
        "continue":"./img/UI/pause/continue.png",
        "menu":"./img/UI/pause/menu.png",
        "pause":"./img/UI/pause/PAUSE.png",
        "GC":"./img/UI/title/GameClear.png",
        "GO":"./img/UI/title/GameOver.png",
        "bad":"./img/UI/comment/bad.png",
        "soso":"./img/UI/comment/soso.png",
        "nt":"./img/UI/comment/nt.png",
        "vg":"./img/UI/comment/vg.png",
        "opex":"./img/UI/OpeExp.png"
    }
    game.ImgLoader.addImgs(UIImgs)

    //画像読み込み
    var Imgs = {
        "player":"./img/player/player.png",
        "gen":"./img/character/gentyan2.png",
        "genAng":"./img/character/gentyan.png",
        "rab":"./img/character/rabbit.png",
        "PB1":"./img/Bullet/hi01.png",
        "PB2":"./img/Bullet/hi02.png",
        "PB3":"./img/Bullet/hi03.png",
        "PB4":"./img/Bullet/hi04.png",
        "genB":"./img/Bullet/genbullet.png",
        "DI":"./img/DI/kyuriipon.png",
        "yo":"./img/player/yoltu.png"
    }
    game.ImgLoader.addImgs(Imgs)

    Nowscene = "タイトル"

    //JSファイルの読み込み
    
    var JSFiles = [
            "src/class.js",
            "src/Title.js",
            "src/functions.js",
            "src/scoreboard.js",
            "src/progress.js",
            "src/Game.js"
        ]

    for(let i = 0; i<JSFiles.length; i++){
        var script = document.createElement("script")
        script.src = JSFiles[i]
        document.body.appendChild(script)
    }
    
    NowSCB = 0
}

function ready(){
    try{
        ReadyTitle()
    }catch(e){
        location.reload()
    }
}

function repeat(){
    switch(Nowscene){
        case "タイトル":
            TitleRepeat()
            break
        case "ゲーム":
            GameRepeat();
            break
        case "ゲーム終了":
            if(menuB.onclick()){
                Nowscene = "ループ抜け出す"
                if(HighScore<=score){
                    alert("ハイスコア!\nあなたの記録：" + score)
                }else{
                    alert("ハイスコア："+HighScore)
                }
                location.reload()
            }
            if(menuB.focus()){
                menuB.opacity = 0.5
            }else{
                menuB.opacity = 1
            }
            break
        case "ループ抜け出す":
            break
    }
    
}
