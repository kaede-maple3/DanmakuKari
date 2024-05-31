function createEnemies(count,idName,type,hp,speed,score,drop,arr,col,add){
    for(let i = 0; i<count; i++){
        var tmpEne = new character(hp,speed.copy(),score,drop)
        switch(type){
            case "genjumin":
                tmpEne.Edata = new NormalMesh(idName + i,new ImageGeometry(genImg),new ImageMaterial(genImg))
                tmpEne.Edata.geometry.size = new Vector2(30,29)
                break
            case "rabbit":
                tmpEne.Edata = new NormalMesh(idName + i,new ImageGeometry(rabImg),new ImageMaterial(rabImg))
                tmpEne.Edata.geometry.size = new Vector2(30,29)
                break
            case "wolf":
                tmpEne.Edata = new NormalMesh(idName + i,new ImageGeometry(wolfImg),new ImageMaterial(wolfImg))
                tmpEne.Edata.geometry.size = new Vector2(30,29)
                break
        }
        tmpEne.calculator = new ColDet()
        if(col){
            tmpEne.Edata.col = new Body(tmpEne.Edata.id,new SquareCollision(tmpEne.Edata.geometry.size.x,tmpEne.Edata.geometry.size.y),"test")
        }
        if(add){
            GameScene.add(tmpEne.Edata)
        }

        playerBullets.forEach(Pbullet => {
            tmpEne.calculator.add(Pbullet.Edata,tmpEne.Edata,tmpEne.Edata.id + Pbullet.id)
        });
        arr.push(tmpEne)
    }
}

function randomheight(arr){
    var heightRandom = Math.random()*130 + 30
    arr.forEach(element => {
        element.Edata.pos.y = heightRandom
    });
}

function SlideInit(arr,vec){
    var count = 0
    //console.log(arr)
    arr.forEach(element => {
       element.Edata.pos.x -= vec.x*count
       element.Edata.pos.y -= vec.y*count
       //console.log(element.Edata.id)
       count++
    });
}

function EnemySlide(arr,speed,border){
    var tmpSpeed = speed.copy()
    arr.forEach(element => {
        //console.log(element.Edata.pos.y)
        //console.log(element)
        element.Edata.pos.x += element.speed.x
        element.Edata.pos.y += element.speed.y
        var borderJ = element.Edata.col.border(border[0].x,border[0].y,border[1].x,border[1].y)
        
        if(borderJ[2]){
            element.speed.x = Math.abs(tmpSpeed.x)
        }else if(borderJ[3]){
            element.speed.x = tmpSpeed.x*-1
        }

        if(borderJ[0]){
            element.speed.y = Math.abs(tmpSpeed.y)
        }else if(borderJ[1]){
            element.speed.y = tmpSpeed.y*-1
        }
    });
}

function EnemiesStAtt(EneArr,BulImg,size,Speedvec,r,spe){
    returnBullets = []

    
    EneArr.forEach(enemy => {
        if(Speedvec == "player"){
            var nowPos = enemy.Edata.pos.copy()
            var pPos = player.Edata.pos.copy()
            if(spe==false){
                var x = pPos.x-nowPos.x
                var y = pPos.y-nowPos.y
            }else{
                var x = pPos.x-spe.x
                var y = pPos.y-spe.y
            }
            
            var R = Math.sqrt(x**2+y**2)
            //console.log(R)
            var sin = y/R
            var cos = x/R
            //console.log(cos,sin)
            var speed = new Vector2(-r*cos,-r*sin)
            //console.log(speed)
            var Enebullet = new EneBullet("EneB"+TotalEneBulletCount,BulImg,enemy.Edata.pos,speed)
            if(!spe==false){
                Enebullet.Edata.pos = spe.copy()
            }
        }else{
            var Enebullet = new EneBullet("EneB"+TotalEneBulletCount,BulImg,enemy.Edata.pos,Speedvec)
        }
            //console.log(Enebullet.Edata)
            Enebullet.Edata.geometry.size = size
            Enebullet.Edata.col = new Body("Enebullet"+TotalEneBulletCount,new SquareCollision(Enebullet.Edata.geometry.size.x,Enebullet.Edata.geometry.size.y),"test")
            returnBullets.push(Enebullet)
            TotalEneBulletCount++
    });
    
    return returnBullets
}

function EnemiesAtt(EneArr,BulImg,size,Speedvec){
    returnBullets = []

    
    EneArr.forEach(enemy => {
            var Enebullet = new EneBullet2("EneB"+TotalEneBulletCount,BulImg,enemy.Edata.pos,Speedvec)
            //console.log(Enebullet.Edata)
            Enebullet.Edata.geometry.size = size
            Enebullet.Edata.col = new Body("Enebullet"+TotalEneBulletCount,new SquareCollision(Enebullet.Edata.geometry.size.x,Enebullet.Edata.geometry.size.y),"test")
            returnBullets.push(Enebullet)
            TotalEneBulletCount++
    });
    
    return returnBullets
}

function EnemiesBulSt(BulArr){
    var delCount = 0
    var RemoveBulletsList = []
    BulArr.forEach(bullet => {
        if(bullet.update()){
            RemoveBulletsList.push(delCount)
            //console.log(bullet)
        }
        delCount++
    });
    for(let i = 0; i<RemoveBulletsList.length; i++){
        BulArr.splice(RemoveBulletsList[i]-i,1)
    }
}

function randomDispersion(centerVec,range){
    var angle = Math.random()*360
    var angleRadi = getRadian(angle)
    var dis = Math.random()*range
    var disVec = new Vector2(dis*Math.cos(angleRadi),dis*Math.sin(angleRadi))

    var DIPos = centerVec.sub(disVec)
    return DIPos
}

function DropKyuri(count,pos){
    var random = Math.round(Math.random())
    var tmpCount = count - random
    //console.log(random)
    for(let i = 0; i<tmpCount; i++){
        var randomPos = randomDispersion(pos,25)
        var newDI = new DropItem("DI"+TotalDropItemCount,DIImg,randomPos)
        DropItems.push(newDI)
        TotalDropItemCount++
    }
}

function ChangeBossHPBar(hp){
    if(hp<=0){
        BossHPText.geometry.content = "ボスのHP："+0+"/"+SHHP
    }else{
        BossHPText.geometry.content = "ボスのHP："+hp+"/"+SHHP
    }
}

function RandomMoveSpeed(target,FirstVec,LastVec){
    var XRange = LastVec.x-FirstVec.x
    var randomX = Math.random()*XRange + FirstVec.x
    var YRange = LastVec.y-FirstVec.y
    var randomY = Math.random()*YRange + FirstVec.y
    var destination = new Vector2(randomX,randomY)
    var TarPos = target.Edata.pos.copy()
    var distance = destination.sub(TarPos)
    var speed = distance.div(new Vector2(ShiMoveTime,ShiMoveTime))
    return speed
}