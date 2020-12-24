import UI from '../data/UIImages'

class UIController {
   constructor() {
      this.element = {
         healthIcon: document.getElementById('healthIcon'),
         healthBar: document.querySelector('#healthBar .visibleContainer'),
         healthText: document.querySelector('#healthBar .placeholderBar'),
         fireIcon: document.getElementById('fireIcon'),
         fireBar: document.querySelector('#fireBar .visibleContainer'),
         fireText: document.querySelector('#fireBar .placeholderBar'),
         targetIcon: document.getElementById('targetIcon'),
         targetBar: document.querySelector('#targetBar .visibleContainer'),
         targetText: document.querySelector('#targetBar .placeholderBar'),
         instructionsImage: document.getElementById('instructionsImage'),
         gameSidebar: document.getElementById('gameSidebar'),
         menu: document.getElementById('menu'),
         mapsList: document.getElementById('mapsList'),
         dragonSkinsList: document.getElementById('dragonSkinsList'),
         speedSettingsList: document.getElementById('speedSettingsList'),
         targetSettingsList: document.getElementById('targetSettingsList'),
         newGameButton: document.getElementById('newGame'),
         pauseView: document.getElementById('pauseInfo'),
         winView: document.getElementById('winInfo'),
         failureView: document.getElementById('failureInfo'),
         restartButton: document.getElementById('restart'),
         restartButton2: document.getElementById('restart2'),
         backToMenuButton: document.getElementById('backToMenu'),
         backToMenuButton2: document.getElementById('backToMenu2'),
      }
      this.loadImages()
      this.buttons = {}
   }

   addButton(name, value, text, place) {
      const button = document.createElement('div')
      button.classList.add('button')
      button.setAttribute('id', name)
      button.setAttribute('value', value)
      button.innerHTML = `
         <div class="background">
            <div class="visibleContainer">
               <div class="fillColor"></div>
               <div class="fillReflex"></div>
            </div>
            <div class="placeholder">${text}</div>
         </div>
      `
      place.appendChild(button)
      this.buttons = {
         ...this.buttons,
         [name]: button,
      }
      return button
   }

   loadImages() {
      this.element.healthIcon.appendChild(UI.healthIcon)
      this.element.fireIcon.appendChild(UI.fireIcon)
      this.element.targetIcon.appendChild(UI.targetIcon)
      this.element.instructionsImage.appendChild(UI.instructions)
   }

   setHealth(current, max) {
      const percent = (current / max) * 100
      this.element.healthBar.style.width = percent + '%'
      this.element.healthText.innerHTML = `${current}/${max}`
   }

   setFire(current, max) {
      const percent = (current / max) * 100
      this.element.fireBar.style.width = percent + '%'
      this.element.fireText.innerHTML = `${current}/${max}`
   }

   setTarget(current, max) {
      const percent = (current / max) * 100
      this.element.targetBar.style.width = percent + '%'
      this.element.targetText.innerHTML = `${current}/${max}`
   }

   showGameSidebar() {
      this.element.gameSidebar.classList.add('show')
   }

   hideGameSidebar() {
      this.element.gameSidebar.classList.remove('show')
   }

   showMenu() {
      this.element.menu.classList.add('show')
   }

   hideMenu() {
      this.element.menu.classList.remove('show')
   }

   showView(name) {
      this.hideView()
      switch (name) {
         case 'win': {
            this.element.winView.classList.add('show')
            break
         }
         case 'failure': {
            this.element.failureView.classList.add('show')
            break
         }
         case 'pause': {
            this.element.pauseView.classList.add('show')
            break
         }
      }
   }

   hideView() {
      const view = document.querySelector('.boardWrapper .boardView.show')
      if (view) {
         view.classList.remove('show')
      }
   }
}

export default UIController
