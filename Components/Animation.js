import { Context } from "../../index.js"
export function SpriteAnimation(image, sx, sy, sw, sh, frames, fps, scale = 1, stopOnFinish = false, framesDelay = []) {
    this.image = image
    this.sx = sx
    this.sy = sy
    this.sw = sw
    this.sh = sh
    this.offY = 0
    this.offX = 0
    this.frames = frames
    this.frameWidth = this.sw / this.frames
    this.fps = fps
    this.currentFrame = 0
    this.lastDraw = new Date().getTime()
    this.scale = scale
    this.stop = false
    this.stopOnFinish = stopOnFinish
    this.framesDelay = framesDelay
    this.isAnimationOver = () => {

    }
    this.isAnimationOverCalled = false
    this.restart = () => {
        this.currentFrame = 0
        this.lastDraw = new Date().getTime()
    }
    this.update = () => {
        if (this.stopOnFinish && this.currentFrame == this.frames - 1) {
            if (!this.isAnimationOverCalled) {
                this.isAnimationOver()
                this.isAnimationOverCalled = true
            }
            return
        }
        else if (this.framesDelay.length > 0 && new Date().getTime() - this.lastDraw >= this.framesDelay[this.currentFrame]) {
            this.isAnimationOverCalled = false
            this.currentFrame++
            if (this.currentFrame > this.frames - 1) {
                this.isAnimationOver()
                this.currentFrame = 0
            }
            this.lastDraw = new Date().getTime()
        }
        else if (new Date().getTime() - this.lastDraw > 1000 / this.fps && !this.stop && this.framesDelay.length == 0) {
            this.isAnimationOverCalled = false
            this.currentFrame++
            if (this.currentFrame > this.frames - 1) {
                this.isAnimationOver()
                this.currentFrame = 0
            }
            this.lastDraw = new Date().getTime()
        }

    }
    this.scaleTo = (scaleX = 1, scaleY = 1) => {
    }

    this.draw = (x, y, flip) => {
        if(flip < 0)
            x = this.frameWidth * this.scale - x
        Context.scale(flip, 1)
        Context.drawImage(this.image, this.sx + this.frameWidth * this.currentFrame, this.sy, this.frameWidth, this.sh, x + this.offX - this.frameWidth * this.scale / 2, y + this.offY, this.frameWidth * this.scale * flip, this.sh * this.scale)
        Context.scale(flip, 1)
    }
}