var PSTime
var PTime

var JudgeBool

//原住民
var genjumins = []
var GenBreakFlame = 120
var GenNowBreakFlame

//ウサギ
var rabbits = []
var rabBreakFlame = 240
var rabNowBreakFlame

function progressReset(){
    PSTime = game.fps.nowTime
}


//ゲームの現在の進捗
function Progress(progress){
    switch(progress){
        case 0://2待つ
            if(PTime - PSTime >= 2000){
                nowProgress = 1
                JudgeBool = false
            }
            break
        case 1://ノーマル原住民10体
            if(JudgeBool){
                EnemySlide(genjumins,GESPEED,[new Vector2(0,0),new Vector2(580,660)])
                
                if(GenNowBreakFlame == 0){
                    var tmpgenbul = EnemiesStAtt(genjumins,GenBImg,new Vector2(20,20),new Vector2(0,-3))
                    tmpgenbul.forEach(bullet => {
                        genbullets.push(bullet)
                    });
                    GenNowBreakFlame = GenBreakFlame
                }
                //console.log(genbullets)
                EnemiesBulSt(genbullets)
                
                if(genjumins.length == 0){
                    genbullets.forEach(bullet => {
                        bullet.delete()
                    });
                    genbullets = []
                    //console.log(GameScene.objects)
                    nowProgress = 2
                    JudgeBool = false
                    PSTime = game.fps.nowTime
                }

                GenNowBreakFlame --
            }else{
                PSTime = game.fps.nowTime
                JudgeBool = true
                createEnemies(10,"gen","genjumin",GEHP,GESPEED,GESCORE,GEDROP,genjumins,true,true)
                randomheight(genjumins)
                SlideInit(genjumins,new Vector2(60,0))
                nowEnemies = genjumins
                GenNowBreakFlame = 0
            }
            break
        case 2:
            if(JudgeBool){
                EnemySlide(rabbits,RASPEED,[new Vector2(0,0),new Vector2(580,220)])
            }else{
                if(PTime - PSTime >= 1000){
                    JudgeBool = true
                    PSTime = game.fps.nowTime
                    createEnemies(5,"rab","rabbit",RAHP,RASPEED,RASCORE,RADROP,rabbits,true,true)
                    //console.log(rabbits)
                    SlideInit(rabbits,new Vector2(50,40))
                    nowEnemies = rabbits
                }
            }
            break
    }

    PTime = game.fps.nowTime
}