<template>
    <div class="game-outer">
        <div class="game">
            <div class="top-left-panel panel" @click="clicked(1)" :class="{ active: isLit[1] }"></div>
            <div class="top-right-panel panel" @click="clicked(2)" :class="{ active: isLit[2] }"></div>
            <div class="bottom-left-panel panel" @click="clicked(3)" :class="{ active: isLit[3] }"></div>
            <div class="bottom-right-panel panel" @click="clicked(4)"  :class="{ active: isLit[4] }"></div>
        </div>
        <div class="button-round" @click="startGame">
            <span class="round" v-show="isPlaying">Round: {{ score + 1 }}</span>
            <span class="main-button">{{ centerButton }}</span>
        </div>
        <div class="choose-mode">
            <p>Сложность:</p>
            <label for="mode1"><input type="radio" class="radio" checked @change="easyToggle()" name="mode" id="mode1">Лёгкая</label>
            <label for="mode2"><input type="radio" class="radio" @change="averageToggle()" name="mode" id="mode2">Средняя</label>
            <label for="mode3"><input type="radio" class="radio" @change="hardToggle()" name="mode" id="mode3">Сложная</label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mods: {
                easy: true,
                average: false,
                hard: false,
            },
            centerButton: 'START',
            isPlaying: false,
            isClickable: false,
            isWrong: false,
            score: 0,
            sequence: [],
            sequenceInterval: null,
            playerSequence: [],
            isLit: {
                1: false,
                2: false,
                3: false,
                4: false,
            }
        }
    },
    methods: {
        startGame() {
            this.isPlaying = true;
            this.sequence = [];
            this.playerSequence = [];
            this.centerButton = "RESET";
            this.isWrong = false;
            this.score = 0;
            clearInterval(this.sequenceInterval);
            this.showSequence();
        },
        clicked(tile) {
            if (this.isClickable) {
                this.playSound(tile);
                this.flash(tile);
                this.playerSequence.push(tile);
                this.checkIfLose();
            }
        },
        gameOver() {
            if (this.isPlaying) {
                this.centerButton = "Game over!";
                this.isWrong = true;
                this.isClickable = false;
                return setTimeout(() => {
                    this.startGame();
                }, 1000);
            }
        },
        checkIfLose() {
            for (let i = 0; i < this.playerSequence.length; i++) {
                if (this.playerSequence[i] !== this.sequence[i]) {
                    this.gameOver();
                }
            }
            if (this.playerSequence.length === this.sequence.length) {
                this.playerSequence = [];
                this.score++;
                this.showSequence();
            }
        },
        flash(tile) {
            this.isLit[tile] = true;
            setTimeout(() => {
                this.isLit[tile] = false;
            }, 300);
        },
        playSound(tile) {
            switch(tile) {
                case 1 :
                    tile = new Audio(require('../assets/sounds/yellow.mp3'));
                    break;
                case 2 :
                    tile = new Audio(require('../assets/sounds/green.mp3'));
                    break;
                case 3 :
                    tile = new Audio(require('../assets/sounds/blue.mp3'));
                    break;
                case 4 :
                    tile = new Audio(require('../assets/sounds/red.mp3'));
                    break;
            }
            tile.play();
        },
        showSequence(redo) {
            let currentIndex = 0;
            let speed 
            if (this.mods.easy) {
                speed = this.sequence.length === 0 ? 1000 : 1500;
            } else if (this.mods.average) {
                speed = this.sequence.length === 0 ? 1000 : 1000;
            } else if (this.mods.hard) {
                speed = this.sequence.length === 0 ? 1000 : 400;
            }
            this.isClickable = false;
            if (!redo) {
                // don't add number on incorrect
                this.sequence.push(Math.floor(Math.random() * 4 + 1));
            }
            this.sequenceInterval = setInterval(() => {
                if (currentIndex >= this.sequence.length) {
                    clearInterval(this.sequenceInterval);
                return (this.isClickable = true);
                }
                this.playSound(this.sequence[currentIndex]);
                this.flash(this.sequence[currentIndex]);
                currentIndex++;
            }, speed);
        },
        easyToggle() {
            this.mods.easy = !this.mods.easy;
            this.mods.average = false;
            this.mods.hard = false;
            this.gameOver();
        },
        averageToggle() {
            this.mods.average = !this.mods.average;
            this.mods.easy = false;
            this.mods.hard = false;
            this.gameOver();
        },
        hardToggle() {
            this.mods.hard = !this.mods.hard;
            this.mods.easy = false;
            this.mods.average = false;
            this.gameOver();
        }
    }
}   
</script>

<style scoped lang="scss">
    .game-outer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .game {
        display: grid;
        grid-template-columns: 10rem 10rem;
        grid-gap: .1rem;
    }
    .bottom-right-panel {
        border-bottom-right-radius: 200%;
        background: red;
    }
    .bottom-left-panel {
        border-bottom-left-radius: 200%;
        background: blue;
    }
    .top-right-panel {
        border-top-right-radius: 200%;
        background: green;
    }
    .top-left-panel {
        border-top-left-radius: 200%;
        background: yellow;
    }
    .panel {
        width: 10rem;
        height: 10rem;
        text-align: center;
        margin: 1px;
        cursor: pointer;
    }
    .active {
        background: #FFFFFF;
        box-shadow: inset 0 0 0 2px cyan;
        box-sizing: border-box;
    }
    .button-round {
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .main-button {
        text-align: center;
        cursor: pointer;
        margin: 2rem;
        background: rgba(30, 139, 195, 1);
        box-sizing: border-box;
        padding: .6rem 1.2rem;
        border-radius: 8px;
    }
    .round {
        font-size: 1.2rem;
    }
    .choose-mode {
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
    }
   
</style>