import { Context } from "../index.js"
import { Entity } from "./Entity.js"

export class Stage extends Entity{
    constructor(stageID, x = 0, y = 0, width = 0, height = 0){
        super()
        this.stageID = stageID
        this.image = new Image()
        this.image.src = "../textures/stages/" + this.stageID + ".png"
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw(){
        Context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height)
    }
    update(){

    }
}