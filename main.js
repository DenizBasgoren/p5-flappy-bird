

let images, sounds, font, score = 0

let FLAPPY = {
    X: 250,
    Y: 250,
    W: 50,
    H: 30,
    V: 1,
    FRAME: 1
}

let BORULAR = [
    // {
    //     X: 500,
    //     Y: 400
    // }
]

function preload() {
    images = {
        background: loadImage('images/background.png'),
        flappy1: loadImage('images/flappy1.png'),
        flappy2: loadImage('images/flappy2.png'),
        flappy3: loadImage('images/flappy3.png'),
        boru: loadImage('images/pipe.png')
    }

    sounds = {
        flap: loadSound('audio/flap.wav'),
        gameover: loadSound('audio/gameover.wav'),
        score: loadSound('audio/score.wav')
    }

    font = loadFont('font/flappy.ttf')

}

function setup() {
    // createCanvas( 1000 , 500 )
    createCanvas( windowWidth, windowHeight)
    background(0,0,0)
    fill(255, 0, 0)
}

function draw() {
    scale( windowWidth/1000 , windowHeight/500 )
    background(0,0,0)

    flappyyiGuncelle()
    borulariGuncelle()

    backgrounduCiz()
    flappyyiCiz()
    borulariCiz()
    skoruCiz()
    
}

function windowResized() {
    resizeCanvas( windowWidth, windowHeight )
}

function backgrounduCiz() {
    image(images.background, 0, 0, 334, 500)
    image(images.background, 333, 0, 334, 500)
    image(images.background, 666, 0, 334, 500)

}

function flappyyiCiz() {

    if( FLAPPY.FRAME === 1) {
        image(images.flappy1, FLAPPY.X, FLAPPY.Y, FLAPPY.W, FLAPPY.H)
    }
    else if ( FLAPPY.FRAME === 2) {
        image(images.flappy2, FLAPPY.X, FLAPPY.Y, FLAPPY.W, FLAPPY.H)
    }
    else if ( FLAPPY.FRAME === 3) {
        image(images.flappy3, FLAPPY.X, FLAPPY.Y, FLAPPY.W, FLAPPY.H)
    }

}

function flappyyiGuncelle() {

    if ( frameCount % 5 === 0) {
        FLAPPY.FRAME++
    }

    if (FLAPPY.FRAME > 3) {
        FLAPPY.FRAME = 1
    }


    FLAPPY.V += 0.3 // FIX
    FLAPPY.Y += FLAPPY.V
    

    if (FLAPPY.Y > 500) {
        restart()
    }

    if (carpismaVarmi()) {
        sounds.gameover.play()
        restart()
    }

    if (puanVarmi()) {
        sounds.score.play()
        score++
    }

}


// key event
function keyPressed() {
    flapHandler()
}

// mouse event
function mousePressed() {
    flapHandler()
}

function flapHandler() {
    sounds.flap.play()
    FLAPPY.V = -5
}

function restart() {

    FLAPPY.X = 250
    FLAPPY.Y = 250
    FLAPPY.V = 0

    score = 0
    BORULAR = []
}

function borulariCiz() {

    for (let i = 0; i< BORULAR.length; i++) {
        image( images.boru, BORULAR[i].X, BORULAR[i].Y, 100, 100 * 320/52)

        
    }

    scale(1, -1)

    for (let i = 0; i< BORULAR.length; i++) {
        image( images.boru, BORULAR[i].X, 150 - BORULAR[i].Y , 100, 100 * 320/52)
    }

    scale(1, -1)
}

function yeniBoru() {
    BORULAR[ BORULAR.length ] = {
        X: 1000,
        Y: Math.random() * 150 + 250
    }
}

function borulariGuncelle () {

    if (!BORULAR.length) {
        yeniBoru()
    }

    if (BORULAR[ BORULAR.length -1].X < 500) {
        yeniBoru()
    }

    for (let i = 0; i<BORULAR.length; i++) {
        BORULAR[i].X -= 4
    }

    if (BORULAR.length === 10) {
        BORULAR = [ BORULAR[7], BORULAR[8], BORULAR[9]]
    }
}

function carpismaVarmi() {
    for (let i = 0; i< BORULAR.length; i++) {
        let B = BORULAR[i]
        let F = FLAPPY

        if ((F.X + F.W > B.X) &&
        (F.X < B.X + 100) &&
        (F.Y + F.H > B.Y)) return true

        else if ((F.X + F.W > B.X) &&
        (F.X < B.X + 100) &&
        (F.Y < B.Y - 150)) return true

    }

    return false
}


function puanVarmi() {
    if ( !BORULAR.length ) return false
    else if ( BORULAR.length === 1) {
        let SON = BORULAR[ BORULAR.length - 1]
        if ( SON.X - 3 < FLAPPY.X && FLAPPY.X < SON.X) return true
        else return false
    }
    else {
        let SON = BORULAR[ BORULAR.length - 2]
        if ( SON.X - 3 < FLAPPY.X && FLAPPY.X < SON.X) return true
        else return false
    }
}


function skoruCiz() {
    textFont(font)
    textSize(100)
    fill(255, 255, 255)
    text( score, 450, 100)
}