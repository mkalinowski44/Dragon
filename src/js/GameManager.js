import Board, { boardsList } from './Board'
import Dragon, { dragonSkins } from './Dragon'
import Loop from './Loop'
import MainMenu from './MainMenu'
import UIController from './UIController'

const MODE = {
   STOP: 0,
   PAUSE: 1,
   RUN: 2,
}

class GameManager {
   constructor(config) {
      this.element = config.element
      this.state = {}
      this.mainLoop = new Loop()
      this.board = new Board()
      this.boardsList = boardsList
      this.dragonSkins = dragonSkins
      this.dragon = new Dragon()
      this.UIController = new UIController()
      this.mainMenu = new MainMenu(this.UIController)
      this.gameMode = MODE.STOP
   }

   init() {
      this.board.element = this.element
      this.UIController.showMenu()

      this.mainMenu.renderBoardList(this.boardsList)
      this.mainMenu.renderDragonList(this.dragonSkins)
      this.mainMenu.renderSettings(this.dragonSkins)
      this.UIController.element.newGameButton.addEventListener('click', () => {
         this.newGame({
            board: this.mainMenu.map,
            dragonSkin: this.mainMenu.dragonSkin,
            speed: this.mainMenu.settings.speed,
            target: this.mainMenu.settings.target,
         })
      })
      this.UIController.element.restartButton.addEventListener(
         'click',
         this.restart.bind(this)
      )
      this.UIController.element.restartButton2.addEventListener(
         'click',
         this.restart.bind(this)
      )
      this.UIController.element.backToMenuButton.addEventListener(
         'click',
         this.backToMenu.bind(this)
      )
      this.UIController.element.backToMenuButton2.addEventListener(
         'click',
         this.backToMenu.bind(this)
      )

      window.addEventListener('keydown', this.onKey.bind(this))
   }

   onKey(e) {
      switch (e.code) {
         case 'KeyP': {
            this.setPause()
            break
         }
         case 'Escape': {
            this.backToMenu()
            break
         }
      }
   }

   gameOver() {
      this.gameMode = MODE.STOP
      this.mainLoop.stop()
      this.UIController.showView('failure')
   }

   winGame() {
      this.gameMode = MODE.STOP
      this.mainLoop.stop()
      this.UIController.showView('win')
   }

   clearGame() {
      this.state = {}
      this.board.reset()
      this.dragon.reset()
   }

   backToMenu() {
      this.gameMode = MODE.STOP
      this.mainLoop.stop()
      this.UIController.hideView()
      this.clearGame()
      this.UIController.hideGameSidebar()
      this.UIController.showMenu()
   }

   restart() {
      this.UIController.hideView()
      this.clearGame()
      this.newGame({
         board: this.mainMenu.map,
         dragonSkin: this.mainMenu.dragonSkin,
         speed: this.mainMenu.settings.speed,
         target: this.mainMenu.settings.target,
      })
   }

   setPause() {
      if (this.gameMode === MODE.RUN) {
         this.gameMode = MODE.PAUSE
         this.mainLoop.stop()
         this.UIController.showView('pause')
      } else if (this.gameMode === MODE.PAUSE) {
         this.gameMode = MODE.RUN
         this.mainLoop.start()
         this.UIController.hideView()
      }
   }

   newGame({ board, dragonSkin, speed, target }) {
      this.gameMode = MODE.RUN
      this.state = {
         healthMax: 3,
         health: 3,
         fireMax: 1,
         fire: 1,
         fireLoad: 10,
         fireLoadCur: 0,
         targetMax: target,
         target: 3,
         gameOver: false,
      }

      this.board.loadBoard(board)
      this.dragon.getDragonStartPos(this.board.findField('d'))
      this.dragon.loadSkin(dragonSkin)
      this.UIController.showGameSidebar()
      this.UIController.hideMenu()
      this.UIController.setHealth(this.state.health, this.state.healthMax)
      this.UIController.setFire(this.state.fire, this.state.fireMax)
      this.UIController.setTarget(this.state.target, this.state.targetMax)

      this.mainLoop.speed = speed
      this.mainLoop.render = (loop) => {
         this.board.render((boardControl) => {
            const nextMove = this.dragon.getNextMove()
            const collision = this.board.getField(nextMove.x, nextMove.y)

            if (this.state.fire < this.state.fireMax) {
               this.state.fireLoadCur++
            }
            if (this.state.fireLoadCur >= this.state.fireLoad) {
               this.state.fire++
               this.state.fireLoadCur = 0
               this.UIController.setFire(this.state.fire, this.state.fireMax)
            }

            if (collision === 'o') {
               this.board.removeObject(nextMove.x, nextMove.y, 'o')
               this.dragon.rise()
               this.state.health++
               this.state.healthMax++
               this.state.fireMax = Math.round(this.state.healthMax / 3)
               this.state.target++
               this.UIController.setHealth(
                  this.state.health,
                  this.state.healthMax
               )
               this.UIController.setFire(this.state.fire, this.state.fireMax)
               this.UIController.setTarget(
                  this.state.target,
                  this.state.targetMax
               )
            }

            if (collision === 0) {
               this.mainLoop.stop()
               this.state.gameOver = true
            }
            if (this.dragon.direction && collision === 'd') {
               this.mainLoop.stop()
               this.state.gameOver = true
            }
            if (this.dragon.direction && collision === '#') {
               this.mainLoop.stop()
               this.state.gameOver = true
            }

            this.board.setFields(this.dragon.body, '.')
            this.dragon.move()
            this.board.setFields(this.dragon.body, 'd')

            this.board.imagesDynamic = []
            this.board.imagesDynamic = this.dragon.body

            if (
               this.board.spawnObjects.findIndex((x) => x.object === 'o') === -1
            ) {
               this.board.spawnObject('o')
            }
            this.board.drawLayer('o')

            this.board.drawDragon(this.dragon.body)

            if (this.state.gameOver) {
               this.gameOver()
            }
         })

         if (this.state.target >= this.state.targetMax) {
            this.winGame()
         }
      }
      this.mainLoop.start()
   }
}

export default GameManager
