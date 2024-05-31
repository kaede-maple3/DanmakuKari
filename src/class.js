class character{
    constructor(hp,speed,score,drop){
        this.Edata
        this.hp = hp
        this.calculator
        this.speed = speed
        this.score = score
        this.drop = drop
    }
}

class bullet{
    constructor(id,img,PPos,type){
        this.id = id
        this.Edata = new NormalMesh(id,new ImageGeometry(img),new ImageMaterial(img))
        this.Edata.pos = PPos.copy()
        this.speed = new Vector2(0,6)
        this.attack = playerPower
        if(type == 2 || type == 3){
            this.Edata.geometry.size = new Vector2(12.5,18)
        }else{
            this.Edata.geometry.size = new Vector2(12.5,15)
        }
        game.scene.add(this.Edata)
    }
    update(enearr,enearr2){
        this.Edata.pos.x -= this.speed.x
        this.Edata.pos.y -= this.speed.y
        var col = false
        var count = false
        for(let i = 0; i<enearr.length; i++){
            var enemy = enearr[i]
            //console.log(enemy)
            col = enemy.calculator.calSpecify(enemy.Edata.id + this.id)
            if(col){
                count = i
                break
            }
        }

        var col2 = false
        var count2 = false
        for(let i = 0; i<enearr2.length; i++){
            var enemy = enearr2[i]
            //console.log(enemy)
            col2 = enemy.calculator.calSpecify(enemy.Edata.id + this.id)
            if(col2){
                count2 = i
                break
            }
        }

        if(this.Edata.pos.y <= -5 || col || col2){
            if(col){
                enearr[count].hp -= this.attack
                if(enearr[count].Edata.id=="GR"){
                    ChangeBossHPBar(enearr[count].hp)
                }
                if(enearr[count].hp<=0){
                    //console.log(enearr[count].Edata.id)
                    GameScene.remove(enearr[count].Edata)
                    enearr[count].calculator.remove(enearr[count].Edata.id + this.id)
                    //console.log(enearr[count].score)
                    score += enearr[count].score
                    DropKyuri(enearr[count].drop,enearr[count].Edata.pos)
                    enearr.splice(count,1)
                    //console.log("down")
                }
            }
            if(col2){
                enearr2[count2].hp -= this.attack
                if(enearr2[count2].hp<=0){
                    //console.log(enearr2[count2].Edata.id)
                    GameScene.remove(enearr2[count2].Edata)
                    enearr2[count2].calculator.remove(enearr2[count2].Edata.id + this.id)
                    //console.log(enearr[count].score)
                    score += enearr2[count2].score
                    DropKyuri(enearr2[count2].drop,enearr2[count2].Edata.pos)
                    enearr2.splice(count2,1)
                    //console.log("down")
                }
            }
            //console.log(this.id)
            game.scene.remove(this.Edata)
            //colDet.remove("gpb" + this.id)
            return true
        }
        return false
    }
}

class EneBullet{
    constructor(id,img,EnePos,vec){
        this.id = id
        this.Edata = new NormalMesh(id,new ImageGeometry(img),new ImageMaterial(img))
        this.Edata.pos = EnePos.copy()
        this.Edata.col = new Body(id,new SquareCollision(this.Edata.geometry.size.x,this.Edata.geometry.size.y),"test")
        player.calculator.add(player.Edata,this.Edata,id)
        this.speed = vec.copy()
        this.NSpeed = vec.copy()
        game.scene.add(this.Edata)
    }
    update(){
        this.Edata.col.updatePoints(this.Edata.pos,0)
        var borderJ = this.Edata.col.border(0,0,580,860)
        var tmpSpeed = this.NSpeed.copy()
        if(borderJ[3]){
            this.speed.x = tmpSpeed.x*-1
            //console.log(this.speed.x)
        }else if(borderJ[2]){
            //console.log(this.Edata.pos.x)
            this.speed.x = tmpSpeed.x*-1
        }
        //console.log(this.speed.x)
        if(borderJ[0] || borderJ[1]){
            this.speed.y = tmpSpeed.y
        }
        this.Edata.pos.x -= this.speed.x
        this.Edata.pos.y -= this.speed.y
        //console.log(this.Edata.pos.y)

        var col = player.calculator.calSpecify(this.id)

        if(this.Edata.pos.y >= 660 || col){
            if(col && playerInvFlame <= 0){
                playerHP -= DAMAGE
                ChangePlayerLife(playerHP)
                playerInvFlame = InvFlame
            }
            player.calculator.remove(this.id)
            game.scene.remove(this.Edata)
            return true
        }
        return false
    }
    delete(){
        game.scene.remove(this.Edata)
    }
}

class EneBullet2{
    constructor(id,img,EnePos,vec){
        this.id = id
        this.Edata = new NormalMesh(id,new ImageGeometry(img),new ImageMaterial(img))
        this.Edata.pos = EnePos.copy()
        this.Edata.col = new Body(id,new SquareCollision(this.Edata.geometry.size.x,this.Edata.geometry.size.y),"test")
        player.calculator.add(player.Edata,this.Edata,id)
        this.speed = vec.copy()
        this.NSpeed = vec.copy()
        game.scene.add(this.Edata)
    }
    update(){
        this.Edata.col.updatePoints(this.Edata.pos,0)
        var borderJ = this.Edata.col.border(0,0,580,860)
        var borderJudge = false
        if(borderJ[0] || borderJ[1] || borderJ[2] || borderJ[3]){
            borderJudge = true
        }
        this.Edata.pos.x -= this.speed.x
        this.Edata.pos.y -= this.speed.y
        //console.log(this.Edata.pos.y)

        var col = player.calculator.calSpecify(this.id)

        if(this.Edata.pos.y >= 660 || col ||borderJudge){
            if(col && playerInvFlame <= 0){
                playerHP -= DAMAGE
                ChangePlayerLife(playerHP)
                playerInvFlame = InvFlame
            }
            player.calculator.remove(this.id)
            game.scene.remove(this.Edata)
            return true
        }
        return false
    }
    delete(){
        game.scene.remove(this.Edata)
    }
}

class DropItem{
    constructor(id,img,pos){
        this.Edata = new NormalMesh(id,new ImageGeometry(img),new ImageMaterial(img))
        this.Edata.geometry.size = new Vector2(7,22.5)
        this.Edata.pos = pos.copy()
        this.Edata.col = new Body(id,new SquareCollision(this.Edata.geometry.size.x,this.Edata.geometry.size.y),"test")
        player.calculator.add(player.Edata,this.Edata,id)
        this.speed = DISPEED
        this.id = id
        game.scene.add(this.Edata)
    }
    update(){
        this.Edata.pos.y += this.speed

        var col = player.calculator.calSpecify(this.id)

        if(this.Edata.pos.y >= 660 || col){
            if(col){
                playerPower += DIPSCORE;
                ChangePlayerPower(playerPower)
            }
            player.calculator.remove(this.id)
            game.scene.remove(this.Edata)
            return true
        }
        return false
    }
}

class GR{
    constructor(mesh,hp,score,drop){
        this.Edata = mesh
        this.hp = hp
        this.calculator
        this.MovingTime = 2000
        this.score = score
        this.drop = drop
    }
}