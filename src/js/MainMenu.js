const getSettingsArray = (array, prefix) => {
   const settings = []
   array.map((element) => {
      settings.push({
         name: `${prefix}-${element}`,
         title: element,
      })
   })
   return settings
}

class MainMenu {
   constructor(UIController) {
      this.map = null
      this.dragonSkin = null
      this.settings = {
         speed: 10,
         target: 20,
      }
      this.UIController = UIController
   }

   handleClickMapButton(e) {
      const allButtons = document.querySelectorAll('#mapsList .button')
      allButtons.forEach((button) => {
         button.classList.remove('selected')
      })
      e.target.classList.add('selected')
      this.map = e.target.getAttribute('value')
   }

   handleClickDragonButton(e) {
      const allButtons = document.querySelectorAll('#dragonSkinsList .button')
      allButtons.forEach((button) => {
         button.classList.remove('selected')
      })
      e.target.classList.add('selected')
      this.dragonSkin = e.target.getAttribute('value')
   }

   handleClickSpeedButton(e) {
      const allButtons = document.querySelectorAll('#speedSettingsList .button')
      allButtons.forEach((button) => {
         button.classList.remove('selected')
      })
      e.target.classList.add('selected')
      this.settings.speed = e.target.getAttribute('value')
   }

   handleClickTargetButton(e) {
      const allButtons = document.querySelectorAll(
         '#targetSettingsList .button'
      )
      allButtons.forEach((button) => {
         button.classList.remove('selected')
      })
      e.target.classList.add('selected')
      this.settings.target = e.target.getAttribute('value')
   }

   renderBoardList(list) {
      this.map = list[0].name
      list.map((board) => {
         const button = this.UIController.addButton(
            `map-${board.name}`,
            board.name,
            board.title,
            this.UIController.element.mapsList
         )
         if (board.name === this.map) {
            button.classList.add('selected')
         }
         button.addEventListener('click', (e) =>
            this.handleClickMapButton.call(this, e)
         )
      })
   }

   renderDragonList(list) {
      this.dragonSkin = list[0].name
      list.map((skin) => {
         const button = this.UIController.addButton(
            `dragon-skin-${skin.name}`,
            skin.name,
            skin.title,
            this.UIController.element.dragonSkinsList
         )
         if (skin.name === this.dragonSkin) {
            button.classList.add('selected')
         }
         button.addEventListener('click', (e) =>
            this.handleClickDragonButton.call(this, e)
         )
      })
   }

   renderSettings() {
      this.renderSpeedSettings()
      this.renderTargetSettings()
   }

   renderSpeedSettings() {
      const speedSettings = getSettingsArray([5, 7, 10, 15, 20], 'speed')
      this.settings.speed = 10
      speedSettings.map((setting) => {
         const button = this.UIController.addButton(
            `setting-${setting.name}`,
            setting.title,
            setting.title,
            this.UIController.element.speedSettingsList
         )
         if (setting.title === this.settings.speed) {
            button.classList.add('selected')
         }
         button.addEventListener('click', (e) =>
            this.handleClickSpeedButton.call(this, e)
         )
      })
   }

   renderTargetSettings() {
      const targetSettings = getSettingsArray([20, 50, 100, 200], 'target')
      this.settings.target = 50
      targetSettings.map((setting) => {
         const button = this.UIController.addButton(
            `setting-${setting.name}`,
            setting.title,
            setting.title,
            this.UIController.element.targetSettingsList
         )
         if (setting.title === this.settings.target) {
            button.classList.add('selected')
         }
         button.addEventListener('click', (e) =>
            this.handleClickTargetButton.call(this, e)
         )
      })
   }
}

export default MainMenu
