import { random } from 'lodash'
import boards from '../data/boards'
import UI from '../data/UIImages'

class Board {
   constructor(config) {
      if (!config) config = {}
      this.element = config.element || null
      this.boardData = null
      this.canvas = null
      this.ctx = null
      this.boardVars = {
         offsetX: 0,
         offsetY: 0,
         fieldSize: 0,
         fieldsX: 0,
         fieldsY: 0,
      }
      this.spawnObjects = []
      this.imagesDynamic = []
      this.imagesStatic = []
   }

   reset() {
      this.canvas.remove()
      this.boardData = null
      this.canvas = null
      this.ctx = null
      this.boardVars = {
         offsetX: 0,
         offsetY: 0,
         fieldSize: 0,
         fieldsX: 0,
         fieldsY: 0,
      }
      this.spawnObjects = []
      this.imagesDynamic = []
      this.imagesStatic = []
   }

   loadBoard(name) {
      if (!this.element) {
         console.error('The board element is not defined.')
         return
      }

      this.boardData = { ...boards.find((x) => x.name === name) }
      const images = {
         ground: new Image(),
         wall: {
            single: new Image(),
            cross: new Image(),
            down: new Image(),
            horizontalDown: new Image(),
            horizontalUp: new Image(),
            left: new Image(),
            leftDown: new Image(),
            leftUp: new Image(),
            right: new Image(),
            rightDown: new Image(),
            rightUp: new Image(),
            up: new Image(),
            verticalLeft: new Image(),
            verticalRight: new Image(),
            horizontal: new Image(),
            vertical: new Image(),
         },
         man: new Image(),
      }

      images.ground.src = this.boardData.images.ground
      images.man.src = this.boardData.images.man
      images.wall.single.src = this.boardData.images.wall.single
      images.wall.cross.src = this.boardData.images.wall.cross
      images.wall.down.src = this.boardData.images.wall.down
      images.wall.horizontalDown.src = this.boardData.images.wall.horizontalDown
      images.wall.horizontalUp.src = this.boardData.images.wall.horizontalUp
      images.wall.left.src = this.boardData.images.wall.left
      images.wall.leftDown.src = this.boardData.images.wall.leftDown
      images.wall.leftUp.src = this.boardData.images.wall.leftUp
      images.wall.right.src = this.boardData.images.wall.right
      images.wall.rightDown.src = this.boardData.images.wall.rightDown
      images.wall.rightUp.src = this.boardData.images.wall.rightUp
      images.wall.up.src = this.boardData.images.wall.up
      images.wall.verticalLeft.src = this.boardData.images.wall.verticalLeft
      images.wall.verticalRight.src = this.boardData.images.wall.verticalRight
      images.wall.horizontal.src = this.boardData.images.wall.horizontal
      images.wall.vertical.src = this.boardData.images.wall.vertical

      this.boardData.images = images

      this.boardData = this.convertBoardData(this.boardData)
      this.canvas = document.createElement('canvas')
      this.canvas.innerHTML = 'Main board'
      this.canvas.width = this.element.offsetWidth - 50
      this.canvas.height = this.element.offsetHeight - 50
      this.element.appendChild(this.canvas)
      this.ctx = this.canvas.getContext('2d')
      this.setBoardVars()
      this.setStaticImages()
   }

   setBoardVars() {
      let boardVars = {
         fieldsX: this.boardData.board[0].length,
         fieldsY: this.boardData.board.length,
         fieldSize: 0,
         offsetX: 0,
         offsetY: 0,
      }

      const fieldSizeX = this.canvas.width / (boardVars.fieldsX + 2)
      const fieldSizeY = this.canvas.height / (boardVars.fieldsY + 2)

      if (fieldSizeX > fieldSizeY) {
         boardVars.fieldSize = fieldSizeY
         boardVars.offsetX =
            (this.canvas.width - (fieldSizeY * boardVars.fieldsX + 2)) / 2
         boardVars.offsetY = boardVars.fieldSize
      } else {
         boardVars.fieldSize = fieldSizeX
         boardVars.offsetY =
            (this.canvas.height - (fieldSizeX * boardVars.fieldsY + 2)) / 2
         boardVars.offsetX = boardVars.fieldSize
      }

      this.boardVars = boardVars
   }

   setStaticImages() {
      this.imagesStatic = []

      this.boardData.board.map((row, y) => {
         row.map((field, x) => {
            if (field === '#') {
               let image = this.boardData.images.wall.single

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.vertical
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.horizontal
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.up
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.down
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.left
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.right
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.rightDown
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.leftDown
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.rightUp
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.leftUp
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] !== '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.verticalLeft
               }

               if (
                  this.boardData.board[y][x - 1] !== '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.verticalRight
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  (!this.boardData.board[y + 1] ||
                     this.boardData.board[y + 1][x] !== '#')
               ) {
                  image = this.boardData.images.wall.horizontalUp
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  (!this.boardData.board[y - 1] ||
                     this.boardData.board[y - 1][x] !== '#') &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.horizontalDown
               }

               if (
                  this.boardData.board[y][x - 1] === '#' &&
                  this.boardData.board[y][x + 1] === '#' &&
                  this.boardData.board[y - 1] &&
                  this.boardData.board[y - 1][x] === '#' &&
                  this.boardData.board[y + 1] &&
                  this.boardData.board[y + 1][x] === '#'
               ) {
                  image = this.boardData.images.wall.cross
               }

               this.imagesStatic.push({
                  x: x,
                  y: y,
                  image: image,
               })
            }
         })
      })
   }

   convertBoardData(data) {
      let newBoard = []
      let columns = 0
      data.board.map((element) => {
         const row = element.split(' ')
         if (columns === 0) columns = row.length
         if (row.length !== columns) {
            console.error('Invalid board data at board: ' + data.name)
         }
         newBoard.push(row)
      })
      let newData = data
      newData.board = newBoard
      return newData
   }

   getField(x, y) {
      x--
      y--
      if (
         x < 0 ||
         x >= this.boardData.board[0].length ||
         y < 0 ||
         y >= this.boardData.board.length
      )
         return 0
      const field = this.boardData.board[y][x]
      return field
   }

   findField(char) {
      let pos = null
      this.boardData.board.map((row, y) => {
         row.map((field, x) => {
            if (pos === null && field === char) {
               pos = {
                  x: x + 1,
                  y: y + 1,
               }
            }
         })
      })
      return pos
   }

   setField(x, y, field) {
      x--
      y--
      if (
         x < 0 ||
         x >= this.boardData.board[0].length ||
         y < 0 ||
         y >= this.boardData.board.length
      )
         return 0
      this.boardData.board[y][x] = field
   }

   setFields(posArray, field) {
      posArray.map((pos) => {
         this.setField(pos.x, pos.y, field)
      })
   }

   spawnObject(object) {
      let spawnArea = []
      this.boardData.board.map((row, y) => {
         row.map((field, x) => {
            if (field === '.') {
               spawnArea.push({
                  x: x + 1,
                  y: y + 1,
               })
            }
         })
      })
      if (spawnArea.length) {
         const spawnPosition = spawnArea[random(0, spawnArea.length - 1)]
         this.setField(spawnPosition.x, spawnPosition.y, object)
         this.spawnObjects.push({
            x: spawnPosition.x,
            y: spawnPosition.y,
            object: object,
         })

         return true
      } else {
         return false
      }
   }

   removeObject(x, y, object) {
      const obj = {
         x: x,
         y: y,
         object: object,
      }

      this.spawnObjects.splice(
         this.spawnObjects.findIndex((x) => x === obj),
         1
      )
      this.setField(x, y, '.')
   }

   render(draw) {
      if (!this.ctx) {
         console.error('The board is not loaded.')
         return
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.drawBackground()
      this.drawBorder()
      draw(this.boardControls())
      this.drawStatic()
   }

   drawLayer(field) {
      this.boardData.board.map((row, y) => {
         row.map((boardField, x) => {
            if (boardField === field) {
               if (field === 'o') {
                  this.drawImage(
                     this.boardData.images.man,
                     this.boardVars.offsetX +
                        x * this.boardVars.fieldSize +
                        this.boardVars.fieldSize / 2,
                     this.boardVars.offsetY +
                        y * this.boardVars.fieldSize +
                        this.boardVars.fieldSize / 2,
                     this.boardVars.fieldSize,
                     3,
                     0,
                     false
                  )
               } else {
                  this.ctx.fillRect(
                     this.boardVars.offsetX + x * this.boardVars.fieldSize,
                     this.boardVars.offsetY + y * this.boardVars.fieldSize,
                     this.boardVars.fieldSize,
                     this.boardVars.fieldSize
                  )
               }
            }
         })
      })
   }

   drawDragon(body) {
      for (let i = body.length - 1; i >= 0; i--) {
         let rotate = 0
         let flip = false
         if (body[i].render.state === 1) rotate = 0
         if (body[i].render.state === 2) rotate = 90
         if (body[i].render.state === 3) rotate = 180
         if (body[i].render.state === 4) rotate = 270
         if (body[i].render.state === 5) {
            rotate = 0
            flip = true
         }
         if (body[i].render.state === 6) {
            rotate = 90
            flip = true
         }
         if (body[i].render.state === 7) {
            rotate = 180
            flip = true
         }
         if (body[i].render.state === 8) {
            rotate = 270
            flip = true
         }

         this.drawImage(
            body[i].render.image,
            this.boardVars.offsetX +
               (body[i].x - 1) * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.offsetY +
               (body[i].y - 1) * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.fieldSize,
            3,
            rotate,
            flip
         )
      }
   }

   drawImage(image, x, y, size, scale, rotation, flip) {
      this.ctx.save()
      this.ctx.setTransform(scale + 0.05, 0, 0, flip ? -scale : scale, x, y)
      this.ctx.rotate((rotation * Math.PI) / 180)
      this.ctx.drawImage(image, -size / 2, -size / 2, size, size)
      this.ctx.restore()
   }

   drawStatic() {
      this.imagesStatic.map((element) => {
         this.drawImage(
            element.image,
            this.boardVars.offsetX +
               element.x * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.offsetY +
               element.y * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.fieldSize,
            3,
            0,
            false
         )
      })
   }

   drawBackground() {
      this.ctx.save()
      this.ctx.fillStyle = this.ctx.createPattern(
         this.boardData.images.ground,
         'repeat'
      )
      this.ctx.fillRect(
         this.boardVars.offsetX - this.boardVars.fieldSize / 2,
         this.boardVars.offsetY - this.boardVars.fieldSize / 2,
         this.boardVars.fieldSize * this.boardVars.fieldsX +
            this.boardVars.fieldSize,
         this.boardVars.fieldSize * this.boardVars.fieldsY +
            this.boardVars.fieldSize
      )
      this.ctx.restore()
   }

   drawBorder() {
      for (let i = -1; i <= this.boardVars.fieldsX; i++) {
         if (i === -1 || i === this.boardVars.fieldsX) {
            this.drawImage(
               UI.corner,
               this.boardVars.offsetX +
                  i * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.offsetY +
                  -1 * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.fieldSize,
               1,
               0,
               false
            )
            this.drawImage(
               UI.corner,
               this.boardVars.offsetX +
                  i * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.offsetY +
                  this.boardVars.fieldsY * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.fieldSize,
               1,
               0,
               false
            )
         } else {
            this.drawImage(
               UI.bar,
               this.boardVars.offsetX +
                  i * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.offsetY +
                  -1 * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.fieldSize,
               1,
               90,
               false
            )
            this.drawImage(
               UI.bar,
               this.boardVars.offsetX +
                  i * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.offsetY +
                  this.boardVars.fieldsY * this.boardVars.fieldSize +
                  this.boardVars.fieldSize / 2,
               this.boardVars.fieldSize,
               1,
               90,
               false
            )
         }
      }
      for (let i = 0; i < this.boardVars.fieldsY; i++) {
         this.drawImage(
            UI.bar,
            this.boardVars.offsetX +
               -1 * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.offsetY +
               i * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.fieldSize,
            1,
            0,
            false
         )
         this.drawImage(
            UI.bar,
            this.boardVars.offsetX +
               this.boardVars.fieldsX * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.offsetY +
               i * this.boardVars.fieldSize +
               this.boardVars.fieldSize / 2,
            this.boardVars.fieldSize,
            1,
            0,
            false
         )
      }
   }

   boardControls() {
      return {
         getField: this.getField.bind(this),
      }
   }
}

function getBoardsList() {
   const boardsList = []
   boards.map((board) => {
      boardsList.push({
         name: board.name,
         title: board.title,
         description: board.description,
      })
   })
   return boardsList
}

export const boardsList = getBoardsList()

export default Board
