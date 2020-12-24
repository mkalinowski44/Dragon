import GameManager from './js/GameManager'
import './scss/index.scss'

window.game = new GameManager({
   element: document.getElementById('board')
})

game.init()