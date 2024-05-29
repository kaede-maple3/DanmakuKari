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
    console.log(arr)
    arr.forEach(element => {
       element.Edata.pos.x -= vec.x*count
       element.Edata.pos.y -= vec.y*count
       console.log(element.Edata.id)
       count++
    });
}

function EnemySlide(arr,speed,border){
    var tmpSpeed = speed.copy()
    arr.forEach(element => {
        //console.log(element.Edata.pos.y)
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

function EnemiesStAtt(EneArr,BulImg,size,Speedvec){
    returnBullets = []
    EneArr.forEach(enemy => {
        var Genbullet = new EneBullet("Gen"+TotalGenBulletCount,BulImg,enemy.Edata.pos,Speedvec)
        //console.log(Genbullet.Edata)
        Genbullet.Edata.geometry.size = size
        Genbullet.Edata.col = new Body("Genbullet"+TotalGenBulletCount,new SquareCollision(Genbullet.Edata.geometry.size.x,Genbullet.Edata.geometry.size.y),"test")
        returnBullets.push(Genbullet)
        TotalGenBulletCount++
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
    console.log(random)
    for(let i = 0; i<tmpCount; i++){
        var randomPos = randomDispersion(pos,25)
        var newDI = new DropItem("DI"+TotalDropItemCount,DIImg,randomPos)
        DropItems.push(newDI)
        TotalDropItemCount++
    }
}