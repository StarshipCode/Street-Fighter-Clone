import { Entity } from "../Entity.js"

export class Fighter extends Entity{
    constructor(name) {
        super()
        this.name = name
        this.life = 100

        this.x = 0
        this.y = 0
        this.velocityX = 0
        this.velocityY = 0

        this.currentState = "idle"
        this.currentAnimation = "idle"

        this.jumpTime = new Date().getTime()
    }
    setState(newState) {
        if (this.currentState === newState || !this.states[newState].validFrom.includes(this.currentState))
            return
        this.currentState = newState
        this.states[this.currentState].init()
    }

}