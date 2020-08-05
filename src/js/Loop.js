class Loop {
   constructor(config) {
      this.lastRenderTime = 0
      this.secondsSinceLastRender = 0
      this.run = false

      this.speed = config.speed || 1
      this.update = config.update ? config.update : () => {}
      this.render = config.render ? config.render : () => {}

      if (config.start) this.start()
   }

   main(currentTime) {
      if (this.run) window.requestAnimationFrame(this.main.bind(this))
      this.secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000
      if (this.secondsSinceLastRender < 1 / this.speed) return
      this.lastRenderTime = currentTime
      this.update(this.loopControl())
      this.render(this.loopControl())
   }

   start() {
      this.run = true
      window.requestAnimationFrame(this.main.bind(this))
   }

   stop() {
      this.run = false
   }

   loopControl() {
      return {
         stop: this.stop.bind(this),
         secondsSinceLastRender: this.secondsSinceLastRender,
         fps: Math.round(1 / this.secondsSinceLastRender),
         loopTime: this.lastRenderTime,
      }
   }
}

export default Loop
