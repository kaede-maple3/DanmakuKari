var PSTime
var PTime

var JudgeBool

//原住民
var genjumins = []
const GenBreakFlame = 60
var GenNowBreakFlame

//ウサギ
var rabbits = []
const rabBreakFlame = 180
var rabNowBreakFlame

//狼
var wolves = []
const wolfBreakFlame = 200
var wolfNowBreakFlame

//死神
const ShiMoveTime = 120
var ShiNowMovingTime = 0

//レーザーのやツ
const ShirabBreakFlame = 60
var nowShirabBreakFlame = 0

const ShiHomingCount = 8

const ShiStHomingCount = 8
var nowShiStHomingCount

const ShiStHomingBreakFlame = 2
var nowShiStHomingBreakFlame =0

const ShiDropCount = 5
var nowShiStDropCount

const ShiDropBreakFlame = 60
var nowShiDropBreakFlame =0

const ShiDropBulletsCount = 30
const ShiDropSpeed = 3

var ShiSpeed
var CanMove = false
var ResetSpeed = false
var ShiStartJudge  =false
var CanAttack = false
var AttackInit = false
var NowAttackKind
var shinigami = []
var SMovingBullets = []
var SRandomBullets = []

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
                
                if(genjumins.length == 0 && genbullets.length == 0){
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
                GenNowBreakFlame = GenBreakFlame
            }
            break
        case 2:
            if(JudgeBool){
                EnemySlide(rabbits,RASPEED,[new Vector2(0,0),new Vector2(580,220)])

                if(rabNowBreakFlame == 0){ 
                    
                    var tmpbullet1 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(0,-2))
                    tmpbullet1.forEach(bullet => {
                        rabBullets.push(bullet)
                    });
                    
                    var tmpbullet2 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(-1.5,-2))
                    tmpbullet2.forEach(bullet => {
                        rabBullets.push(bullet)
                        console.log(bullet.Edata.pos)
                    });
                    
                    var tmpbullet3 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(1.5,-2))
                    tmpbullet3.forEach(bullet => {
                        rabBullets.push(bullet)
                    });
                    rabNowBreakFlame = rabBreakFlame
                }

                EnemiesBulSt(rabBullets)

                rabNowBreakFlame--

                if(rabbits.length == 0 && rabBullets.length == 0){
                    nowProgress = 3
                    JudgeBool = false
                    PSTime = game.fps.nowTime
                }
            }else{
                if(PTime - PSTime >= 1000){
                    JudgeBool = true
                    PSTime = game.fps.nowTime
                    createEnemies(5,"rab","rabbit",RAHP,RASPEED,RASCORE,RADROP,rabbits,true,true)
                    //console.log(rabbits)
                    SlideInit(rabbits,new Vector2(50,40))
                    nowEnemies = rabbits
                    rabNowBreakFlame = rabBreakFlame
                }
            }
            break
        case 3:
            if(JudgeBool){
                EnemySlide(wolves,WOSPEED,[new Vector2(0,0),new Vector2(580,200)])
                if(wolfNowBreakFlame == 0){
                    var tmpbullet = EnemiesStAtt(wolves,wolfBImg,new Vector2(20,20),"player",Math.round(Math.random()*5)+4,false)
                    tmpbullet.forEach(bullet => {
                        wolfBullets.push(bullet)
                    });
                    wolfNowBreakFlame = wolfBreakFlame
                }

                EnemiesBulSt(wolfBullets)

                wolfNowBreakFlame--

                /*
                var deleteCounts = []
                var tmpcount = 0
               for(let a = 0; a<wolves.length; a++){
                var wolf = wolves[a]
                    for(let i = 0; i<nowEnemies.length; i++){
                        if(nowEnemies[i].Edata.id == wolf.Edata.id){
                           break 
                        }
                        tmpcount++
                    }
                    if(tmpcount==nowEnemies.length){
                        deleteCounts.push(a)
                    }
                };
                for(let i = 0; i<deleteCounts.length; i++){
                    wolves.splice(deleteCounts[i]-i,1)
                }*/
                
                EnemySlide(rabbits,RASPEED,[new Vector2(0,0),new Vector2(580,220)])

                if(rabNowBreakFlame == 0){  
                    var tmpbullet1 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(0,-2))
                    tmpbullet1.forEach(bullet => {
                        rabBullets.push(bullet)
                    });
                    
                    var tmpbullet2 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(-1.5,-2))
                    tmpbullet2.forEach(bullet => {
                        rabBullets.push(bullet)
                    });
                    var tmpbullet3 = EnemiesStAtt(rabbits,rabBImg,new Vector2(20,20),new Vector2(1.5,-2))
                    tmpbullet3.forEach(bullet => {
                        rabBullets.push(bullet)
                    });
                    rabNowBreakFlame = rabBreakFlame
                }

                EnemiesBulSt(rabBullets)

                rabNowBreakFlame--
                /*
                var deleteCounts = []
                var tmpcount = 0
               for(let a = 0; a<rabbits.length; a++){
                var rabbit = rabbits[a]
                    for(let i = 0; i<nowEnemies.length; i++){
                        if(nowEnemies[i].Edata.id == rabbit.Edata.id){
                           break 
                        }
                        tmpcount++
                    }
                    if(tmpcount==nowEnemies.length){
                        deleteCounts.push(a)
                    }
                };
                for(let i = 0; i<deleteCounts.length; i++){
                    rabbits.splice(deleteCounts[i]-i,1)
                }*/


                if(nowEnemies.length == 0 && rabBullets.length == 0 && wolfBullets.length == 0){
                    nowProgress = 4
                    JudgeBool = false
                    PSTime = game.fps.nowTime
                }
            }else{
                if(PTime - PSTime >= 1000){
                    JudgeBool = true
                    PSTime = game.fps.nowTime
                    createEnemies(5,"wolf","wolf",WOHP,WOSPEED,WOSCORE,WODROP,wolves,true,true)
                    randomheight(wolves)
                    SlideInit(wolves,new Vector2(75,60))
                    nowEnemies = wolves
                    wolfNowBreakFlame = wolfBreakFlame

                    createEnemies(3,"rab","rabbit",RAHP,RASPEED,RASCORE,RADROP,rabbits,true,true)
                    //console.log(rabbits)
                    SlideInit(rabbits,new Vector2(50,40))
                    nowEnemies2 = rabbits
                    rabNowBreakFlame = rabBreakFlame
                    
                    //nowEnemies = [...wolves,...rabbits]
                    /*
                    var rabL = rabbits.length
                    var woL = wolves.length
                    var loopcount = rabL+woL
                    for(let i = 0; i<loopcount; i++){
                        if(i+1 <= rabL){
                            nowEnemies.push(rabbits[i])
                        }else{
                            nowEnemies.push(wolves[i-rabL])
                        }
                    }
                    console.log(nowEnemies)*/
                }
            }
            break
            case 4:
                if(JudgeBool){
                    if(ShiStartJudge){
                        if(shinigami.length == 0){
                            GameClear = true
                            CanMove = false
                            GameClearFunc()
                        }

                        if(ResetSpeed){
                            ShiSpeed = RandomMoveSpeed(shinigami[0],new Vector2(30,30),new Vector2(570,200))
                            //console.log(ShiSpeed)
                            CanMove = true
                            ResetSpeed = false
                            ShiNowMovingTime = 0
                        }
                        if(CanMove && ShiNowMovingTime < ShiMoveTime && !CanAttack){
                            shinigami[0].Edata.pos.x += ShiSpeed.x
                            shinigami[0].Edata.pos.y += ShiSpeed.y
                            if(nowShirabBreakFlame == 0){
                                var tmpbullet1 = EnemiesStAtt(shinigami,rabBImg,new Vector2(20,20),new Vector2(0,-2))
                                tmpbullet1.forEach(bullet => {
                                    SMovingBullets.push(bullet)
                                });
                    
                                var tmpbullet2 = EnemiesStAtt(shinigami,rabBImg,new Vector2(20,20),new Vector2(-1.5,-2))
                                tmpbullet2.forEach(bullet => {
                                    SMovingBullets.push(bullet)
                                    //console.log(bullet.Edata.pos)
                                });
                    
                                var tmpbullet3 = EnemiesStAtt(shinigami,rabBImg,new Vector2(20,20),new Vector2(1.5,-2))
                                tmpbullet3.forEach(bullet => {
                                    SMovingBullets.push(bullet)
                                });
                                nowShirabBreakFlame = ShirabBreakFlame
                            }
                            
                            nowShirabBreakFlame--
                            
                            ShiNowMovingTime++

                            if(ShiNowMovingTime >= ShiMoveTime){
                                CanMove = false
                                CanAttack = true
                                //ResetSpeed = true
                                AttackInit = true
                            }
                        }

                        if(CanAttack){
                            if(AttackInit){
                                AttackInit = false
                                var random = Math.floor(Math.random()*3)
                                //random = 2//一時的
                                NowAttackKind = random
                                switch(random){
                                    case 0://レーザー
                                        for(let i = 0; i<ShiHomingCount; i++){
                                            var tmpbullet = EnemiesStAtt(shinigami,shiLaserImg,new Vector2(20,20),"player",2+i*0.9,false)
                                            tmpbullet.forEach(bullet => {
                                                SRandomBullets.push(bullet)
                                            });
                                        }
                                        ResetSpeed = true
                                        CanAttack = false
                                    break
                                    case 1:
                                        nowShiStHomingCount = 0
                                        nowShiStHomingBreakFlame = ShiStHomingBreakFlame
                                        break
                                    case 2:
                                        nowShiDropCount = 0
                                        nowShiDropBreakFlame = ShiDropBreakFlame
                                        break
                                }
                            }else{
                                switch(NowAttackKind){
                                    case 1:
                                        if(nowShiStHomingCount<=ShiStHomingCount){
                                            if(nowShiStHomingBreakFlame == 0){
                                                nowShiStHomingBreakFlame = ShiStHomingBreakFlame
                                                var tmpbullet = EnemiesStAtt(shinigami,ShiStHomingImg,new Vector2(20,20),"player",Math.round(Math.random()*2)+4,new Vector2(Math.random()*540 +30,shinigami[0].Edata.pos.y-40))
                                                tmpbullet.forEach(bullet => {
                                                    SRandomBullets.push(bullet)
                                                });
                                                nowShiStHomingCount++
                                            }else{
                                                nowShiStHomingBreakFlame--
                                            }
                                        }else{
                                            ResetSpeed = true
                                            CanAttack = false
                                        }
                                        break
                                    case 2:
                                        if(nowShiDropCount<=ShiDropCount){
                                            if(nowShiDropBreakFlame == 0){
                                                nowShiDropBreakFlame = ShiDropBreakFlame
                                                for(let i = 0; i<ShiDropBulletsCount; i++){
                                                    var randomRadi = getRadian(Math.random()*360)
                                                    var speed = new Vector2(Math.cos(randomRadi*ShiDropSpeed),Math.sin(randomRadi*ShiDropSpeed))
                                                    var tmpbullet = EnemiesAtt(shinigami,ShiDropImg,new Vector2(20,20),speed)
                                                    tmpbullet.forEach(bullet => {
                                                        SRandomBullets.push(bullet)
                                                    });
                                                }
                                                nowShiDropCount++
                                            }else{
                                                nowShiDropBreakFlame--
                                            }
                                        }else{
                                            ResetSpeed = true
                                            CanAttack = false
                                        }
                                        break
                                }
                            }
                            
                            
                        }
                        
                        EnemiesBulSt(SMovingBullets)
                        EnemiesBulSt(SRandomBullets)
                    }else{
                        if(shinigami[0].Edata.pos.y<=50){
                            shinigami[0].Edata.pos.y++
                        }else{
                            ShiStartJudge = true
                            CanMove = false
                            ResetSpeed = true
                        }
                    }
                }else{
                    if(PTime - PSTime >= 1000){
                        JudgeBool = true
                        PSTime = game.fps.nowTime
                        var mesh = new NormalMesh("GR",new ImageGeometry(shiImg),new ImageMaterial(shiImg))
                        mesh.geometry.size = new Vector2(30,29)
                        mesh.pos = new Vector2(300,-10)
                        var tmpEne = new GR(mesh,SHHP,SHSCORE,SHDROP)
                        shinigami.push()
                        tmpEne.calculator = new ColDet()
                        tmpEne.Edata.col = new Body(tmpEne.Edata.id,new SquareCollision(tmpEne.Edata.geometry.size.x,tmpEne.Edata.geometry.size.y),"test")
                        GameScene.add(tmpEne.Edata)
                        playerBullets.forEach(Pbullet => {
                            tmpEne.calculator.add(Pbullet.Edata,tmpEne.Edata,tmpEne.Edata.id + Pbullet.id)
                        });
                        shinigami.push(tmpEne)
                        BossHPText = new NormalUI("BHPT",new TextGeometry("ボスのHP："+shinigami[0].hp+"/"+SHHP),new SimpleMaterial("#FFFFFF"))
                        BossHPText.geometry.size = 20
                        BossHPText.pos = new Vector2(630,500)
                        GameScene.addUI(BossHPText)
                        nowEnemies = shinigami
                        ShiStartJudge = false
                        CanAttack = false
                    }
                }
                break
    }

    PTime = game.fps.nowTime
}