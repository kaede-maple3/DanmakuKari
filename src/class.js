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
    update(enearr){
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
        if(this.Edata.pos.y <= -5 || col){
            if(col){
                enearr[count].hp -= this.attack
                if(enearr[count].hp<=0){
                    GameScene.remove(enearr[count].Edata)
                    enearr[count].calculator.remove(enearr[count].Edata.id + this.id)
                    //console.log(enearr[count].score)
                    score += enearr[count].score
                    DropKyuri(enearr[count].drop,enearr[count].Edata.pos)
                    enearr.splice(count,1)
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
        this.speed = vec
        game.scene.add(this.Edata)
    }
    update(){
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
        /*
        var col = false
        var count = false
        for(let i = 0; i<enearr.length; i++){
            var enemy = enearr[i]
            col = enemy.calculator.calSpecify(enemy.Edata.id + this.id)
            if(col){
                count = i
                break
            }
        }
        if(this.Edata.pos.y <= -5 || col){
            if(col){
                enearr[count].hp -= this.attack
                if(enearr[count].hp<=0){
                    GameScene.remove(enearr[count].Edata)
                    enearr[count].calculator.remove(enearr[count].Edata.id + this.id)
                    enearr.splice(count,1)
                    //console.log("down")
                }
            }
            //console.log(this.id)
            game.scene.remove(this.Edata)
            //colDet.remove("gpb" + this.id)
            return true
        }
        return false*/
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