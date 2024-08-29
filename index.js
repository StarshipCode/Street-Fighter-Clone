import { Ken } from "./Entities/Fighters/Ken.js"
import { Ryu } from "./Entities/Fighters/Ryu.js"
import { Stage } from "./Entities/Stage.js"
import { Text } from "./Entities/Text.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

export const Context = ctx

/* Canvas Settings */
canvas.width = 865
canvas.height = 540

/* Ctx Settings */
ctx.imageSmoothingEnabled = false

//Functionalities
const lastUpdateTime = new Date().getTime()
function limitFPS(fps, callback) {
    const framesDelay = 1000 / fps
    if (new Date().getTime() - lastUpdateTime >= framesDelay)
        callback()
}
let entities = [new Stage("stage1", 0, 0, 865, 540), new Ken(), new Text("Fight!", canvas.width/2 - 63, 300, 500, "#fff", 50)]

function update() {
    for (let entity in entities) {
        entities[entity].update()
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let entity in entities)
        entities[entity].draw()
}

function loop() {
    limitFPS(60, () => {
        update()
        draw()
    })
    requestAnimationFrame(loop)
}

loop()

//Events
document.addEventListener("keydown", e => {
    //console.log(e.keyCode)
    for (let entity in entities)
        entities[entity].keyDownEvent(e)
})

document.addEventListener("keyup", e => {
    for (let entity in entities)
        entities[entity].keyUpEvent(e)
})