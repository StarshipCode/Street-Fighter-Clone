import { Fighter } from "./Fighter.js"
import { SpriteAnimation } from "../../Components/Animation.js"
import { ken } from "../../Constants/ken.js"

export class Ken extends Fighter {
    constructor() {
        super("Ken")
        this.image = new Image()
        this.image.src = "../../textures/Ken.png"
        this.x = 290
        this.y = 310

        this.flipX = 1

        this.states = {
            idle: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleUpdate.bind(this),
                validFrom: ["special", "kick", "punch", "crunch", "walkRight", "walkLeft"]
            },
            special: {
                init: this.handleSpecialInit.bind(this),
                update: this.handleSpecialUpdate.bind(this),
                validFrom: ["idle"]
            },
            jump: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpUpdate.bind(this),
                validFrom: ["idle"]
            },
            kick: {
                init: this.handleKickInit.bind(this),
                update: this.handleKickUpdate.bind(this),
                validFrom: ["idle"]
            },
            punch: {
                init: this.handlePunchInit.bind(this),
                update: this.handlePunchUpdate.bind(this),
                validFrom: ["idle"]
            },
            crunch: {
                init: this.handleCrunchInit.bind(this),
                update: this.handleCrunchUpdate.bind(this),
                validFrom: ["idle"]
            },
            walkRight: {
                init: this.handleWalkRightInit.bind(this),
                update: this.handleWalkRightUpdate.bind(this),
                validFrom: ["idle", "crunch", "punch"]
            },
            walkLeft: {
                init: this.handleWalkLeftInit.bind(this),
                update: this.handleWalkLeftUpdate.bind(this),
                validFrom: ["idle", "crunch", "punch"]
            },
        }

        this.animations = {
            idle: new SpriteAnimation(this.image, 0, ken.framesHeight, ken.framesWidth * 4, ken.framesHeight, 4, 9, 2.5, false),
            special: new SpriteAnimation(this.image, 0, 0, ken.framesWidth * 4, ken.framesHeight, 4, 9, 2.5, false, [111, 111, 111, 300]),
            jump: new SpriteAnimation(this.image, 0, ken.framesHeight * 8, ken.framesWidth * 7, ken.framesHeight, 7, 18, 2.5, true, [50, 50, 50, 77, 50, 50, 50]),
            kick: new SpriteAnimation(this.image, 0, ken.framesHeight * 6, ken.framesWidth * 5, ken.framesHeight, 5, 14, 2.5, false, [71, 71, 210, 90, 71]),
            punch: new SpriteAnimation(this.image, 0, ken.framesHeight * 2, ken.framesWidth * 3, ken.framesHeight, 3, 14, 2.5, false, [60, 100, 60]),
            crunch: new SpriteAnimation(this.image, 0, ken.framesHeight * 9, ken.framesWidth, ken.framesHeight, 1, 14, 2.5, false, [60, 100, 60]),
            walk: new SpriteAnimation(this.image, 0, ken.framesHeight * 3, ken.framesWidth * 5, ken.framesHeight, 5, 14, 2.5, false, [70, 100, 70, 70, 70]),
        }
    }
    //Idle
    handleIdleInit() {
        this.animations[this.currentAnimation].scaleTo(this.flipX)
        this.currentAnimation = "idle"
        this.animations["idle"].restart()
        this.velocityX = 0
        this.velocityY = 0
    }
    handleIdleUpdate() {

    }
    //Special
    handleSpecialInit() {
        this.currentAnimation = "special"
        this.animations["special"].restart()
        this.animations["special"].offY = 8
        this.velocityX = 0
        this.velocityY = 0
        
        const isAnimationOver = () => {
            this.setState("idle")
        }
        this.animations[this.currentAnimation].isAnimationOver = isAnimationOver.bind(this)
    }
    handleSpecialUpdate() {

    }
    //Kump
    handleJumpInit() {
        this.velocityX = 0
        this.velocityY = -20
        this.jumpTime = new Date().getTime()
        this.currentAnimation = "jump"
        this.animations[this.currentAnimation].restart()
    }
    handleJumpUpdate() {
        let jumpingTime = new Date().getTime() - this.jumpTime
        if (this.y + this.velocityY >= 310) {
            this.velocityY = 0
            this.y = 310

            this.currentState = "crunch" //To Avoid A Few Bugs
            this.setState("idle")
        }
        else
            this.velocityY += jumpingTime / 1000 * ken.gravity
    }
    //Kick
    handleKickInit() {
        this.currentAnimation = "kick"
        this.animations[this.currentAnimation].restart()
        
        const isAnimationOver = () => {
            this.setState("idle")
        }
        this.animations[this.currentAnimation].isAnimationOver = isAnimationOver.bind(this)
    }
    handleKickUpdate() {

    }
    //Punch
    handlePunchInit() {
        this.currentAnimation = "punch"
        this.animations[this.currentAnimation].restart()

        const isAnimationOver = () => {
            this.setState("idle")
        }
        this.animations[this.currentAnimation].isAnimationOver = isAnimationOver.bind(this)
    }
    handlePunchUpdate() {

    }
    //Crunch
    handleCrunchInit() {
        this.currentAnimation = "crunch"
        this.animations[this.currentAnimation].restart()
    }
    handleCrunchUpdate() {

    }
    //Walk
    handleWalkRightInit() {
        this.currentAnimation = "walk"
        this.animations[this.currentAnimation].restart()
        this.velocityX = 4
    }
    handleWalkRightUpdate() {

    }
    handleWalkLeftInit() {
        this.currentAnimation = "walk"
        this.animations[this.currentAnimation].restart()
        this.velocityX = -4
    }
    handleWalkLeftUpdate() {

    }
    keyDownEvent(event) {
        //States
        if (ken.keysDownConfig[event.keyCode])
            this.setState(ken.keysDownConfig[event.keyCode].state)
        //Handlers
        switch(ken.keysDownHandlers[event.keyCode]){
            case "flipRight":
                this.flipX = 1
                break
            case "flipLeft":
                this.flipX = -1
                break
        }
    }
    keyUpEvent(event) {
        //States
        if (ken.keysUpConfig[event.keyCode])
            this.setState(ken.keysUpConfig[event.keyCode].state)
        //Handlers
    }
    draw() {
        this.animations[this.currentAnimation].draw(this.x, this.y, this.flipX)
    }
    update() {
        this.y += this.velocityY
        this.x += this.velocityX

        this.states[this.currentState].update()
        this.animations[this.currentAnimation].update()
    }
}