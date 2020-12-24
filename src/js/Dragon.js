import skins from '../data/dragonSkins'

class Dragon {
   constructor() {
      this.direction = null
      this.body = []
      this.lastDirection = null
      this.addToBody = 2
      this.skin = null

      window.addEventListener('keydown', this.setDirection.bind(this))
   }

   reset() {
      this.direction = null
      this.body = []
      this.lastDirection = null
      this.addToBody = 2
      this.skin = null
   }

   getDragonStartPos(pos) {
      this.body.push(pos)
   }

   loadSkin(name) {
      this.direction = null
      this.skin = { ...skins.find((x) => x.name === name) }
      let images = {
         head: new Image(),
         tail: new Image(),
         segment: new Image(),
         flex: new Image(),
      }

      images.head.src = this.skin.images.head
      images.tail.src = this.skin.images.tail
      images.segment.src = this.skin.images.segment
      images.flex.src = this.skin.images.flex

      this.skin.images = images
   }

   setDirection(e) {
      if (e.code === 'ArrowUp' && this.lastDirection !== 'down')
         this.direction = 'up'
      if (e.code === 'ArrowDown' && this.lastDirection !== 'up')
         this.direction = 'down'
      if (e.code === 'ArrowLeft' && this.lastDirection !== 'right')
         this.direction = 'left'
      if (e.code === 'ArrowRight' && this.lastDirection !== 'left')
         this.direction = 'right'
   }

   move() {
      let headPosition = null
      const lastBodyElement = {
         x: this.body[this.body.length - 1].x,
         y: this.body[this.body.length - 1].y,
      }
      for (let i = this.body.length - 1; i >= 0; i--) {
         if (i === 0) {
            if (this.direction === 'up') this.body[0].y--
            if (this.direction === 'down') this.body[0].y++
            if (this.direction === 'left') this.body[0].x--
            if (this.direction === 'right') this.body[0].x++

            headPosition = this.body[i]
         } else {
            this.body[i] = {
               x: this.body[i - 1].x,
               y: this.body[i - 1].y,
            }
         }
      }

      if (this.addToBody > 0 && this.direction) {
         this.body.push(lastBodyElement)
         this.addToBody--
      }

      this.lastDirection = this.direction
      this.setSkinImages()

      return headPosition
   }

   setSkinImages() {
      if (!this.skin) return false

      for (let i = this.body.length - 1; i >= 0; i--) {
         let image = null
         let state = null

         if (i === 0) {
            image = this.skin.images.head
            if (this.body.length > 1) {
               if (
                  this.body[1].x === this.body[0].x &&
                  this.body[1].y === this.body[0].y + 1
               )
                  state = 1
               if (
                  this.body[1].x === this.body[0].x - 1 &&
                  this.body[1].y === this.body[0].y
               )
                  state = 2
               if (
                  this.body[1].x === this.body[0].x &&
                  this.body[1].y === this.body[0].y - 1
               )
                  state = 3
               if (
                  this.body[1].x === this.body[0].x + 1 &&
                  this.body[1].y === this.body[0].y
               )
                  state = 4
            } else {
               state = 1
               if (this.direction === 'up') state = 1
               if (this.direction === 'right') state = 2
               if (this.direction === 'down') state = 3
               if (this.direction === 'left') state = 4
            }
         }

         if (i !== 0 && i === this.body.length - 1) {
            image = this.skin.images.tail
            if (
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].y === this.body[i - 1].y + 1
            )
               state = 1
            if (
               this.body[i].x === this.body[i - 1].x - 1 &&
               this.body[i].y === this.body[i - 1].y
            )
               state = 2
            if (
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].y === this.body[i - 1].y - 1
            )
               state = 3
            if (
               this.body[i].x === this.body[i - 1].x + 1 &&
               this.body[i].y === this.body[i - 1].y
            )
               state = 4
         }

         if (i > 0 && i < this.body.length - 1) {
            if (
               this.body[i].y === this.body[i - 1].y + 1 &&
               this.body[i].y === this.body[i + 1].y - 1 &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.segment
               state = 1
            }
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x - 1 &&
               this.body[i].x === this.body[i + 1].x + 1
            ) {
               image = this.skin.images.segment
               state = 2
            }
            if (
               this.body[i].y === this.body[i - 1].y - 1 &&
               this.body[i].y === this.body[i + 1].y + 1 &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.segment
               state = 3
            }
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x + 1 &&
               this.body[i].x === this.body[i + 1].x - 1
            ) {
               image = this.skin.images.segment
               state = 4
            }

            // Flex
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y - 1 &&
               this.body[i].x === this.body[i - 1].x + 1 &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.flex
               state = 1
            }
            if (
               this.body[i].y === this.body[i - 1].y + 1 &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x + 1
            ) {
               image = this.skin.images.flex
               state = 2
            }
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y + 1 &&
               this.body[i].x === this.body[i - 1].x - 1 &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.flex
               state = 3
            }
            if (
               this.body[i].y === this.body[i - 1].y - 1 &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x - 1
            ) {
               image = this.skin.images.flex
               state = 4
            }
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y + 1 &&
               this.body[i].x === this.body[i - 1].x + 1 &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.flex
               state = 5
            }
            if (
               this.body[i].y === this.body[i - 1].y - 1 &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x + 1
            ) {
               image = this.skin.images.flex
               state = 6
            }
            if (
               this.body[i].y === this.body[i - 1].y &&
               this.body[i].y === this.body[i + 1].y - 1 &&
               this.body[i].x === this.body[i - 1].x - 1 &&
               this.body[i].x === this.body[i + 1].x
            ) {
               image = this.skin.images.flex
               state = 7
            }
            if (
               this.body[i].y === this.body[i - 1].y + 1 &&
               this.body[i].y === this.body[i + 1].y &&
               this.body[i].x === this.body[i - 1].x &&
               this.body[i].x === this.body[i + 1].x - 1
            ) {
               image = this.skin.images.flex
               state = 8
            }
         }

         if (image && state) {
            this.body[i].render = {
               image: image,
               state: state,
            }
         }
      }
   }

   rise(size) {
      if (!size) size = 1
      this.addToBody += size
   }

   getNextMove() {
      if (this.direction === 'up')
         return {
            y: this.body[0].y - 1,
            x: this.body[0].x,
         }
      if (this.direction === 'down')
         return {
            y: this.body[0].y + 1,
            x: this.body[0].x,
         }
      if (this.direction === 'left')
         return {
            y: this.body[0].y,
            x: this.body[0].x - 1,
         }
      if (this.direction === 'right')
         return {
            y: this.body[0].y,
            x: this.body[0].x + 1,
         }
      return {
         y: this.body[0].y,
         x: this.body[0].x,
      }
   }
}

function getDragonSkins() {
   const dragonSkins = []
   skins.map((skin) => {
      dragonSkins.push({
         name: skin.name,
         title: skin.title,
         description: skin.description,
      })
   })
   return dragonSkins
}

export const dragonSkins = getDragonSkins()

export default Dragon
