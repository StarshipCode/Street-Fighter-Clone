import { Context } from "../index.js";
import { Entity } from "./Entity.js";

export class Text extends Entity {
    constructor(text = "", x = 0, y = 0, maxWidth = 0, color = "#fff", size = 20, temporalDelay = 1000) {
        super()
        this.text = text
        this.x = x
        this.y = y
        this.maxWidth = maxWidth
        this.color = color
        this.size = size
        this.show = true
        this.temporal = false
        this.temporalTime = new Date().getTime()
        this.temporalDelay = temporalDelay
    }
    draw() {
        Context.font = this.size + "px Arial"
        Context.fillStyle = this.color
        if (this.show)
            Context.fillText(this.text, this.x, this.y, this.maxWidth)
        Context.fillColor = "#000"
        if(new Date().getTime() - this.temporalTime >= this.temporalDelay)
            this.show = false
    }
    update() {

    }
}