export const ryu = {
    keysDownConfig: {
        '71': {state: "special"}, // G
        '87': {state: "jump"}, // W
        '84': {state: "kick"}, // T
        '70': {state: "punch"}, // F
        '83': {state: "crunch"}, // S
        '68': {state: "walkRight"}, // D
        '65': {state: "walkLeft"}, // A
    },
    keysDownHandlers:{
        '68': "flipRight",
        '65': "flipLeft",
    },
    keysUpHandlers:{
        
    },
    keysUpConfig: {
        '83': {state: "idle"}, // S
        '68': {state: "idle"}, // D
        '65': {state: "idle"}, // A
    },
    gravity: 14,
    framesHeight: 80,
    framesWidth:48
}