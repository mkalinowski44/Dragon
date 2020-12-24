import bar from '../assets/images/UI/bar.png'
import bricks from '../assets/images/UI/bricks.png'
import corner from '../assets/images/UI/corner.png'
import dragonSkin from '../assets/images/UI/dragonSkin.png'
import fireIcon from '../assets/images/UI/fireIcon.svg'
import healthIcon from '../assets/images/UI/healthIcon.svg'
import instructions from '../assets/images/UI/Instrukcja.svg'
import targetIcon from '../assets/images/UI/targetIcon.svg'

const IMAGES = {
   corner: new Image(),
   bar: new Image(),
   dragonSkin: new Image(),
   bricks: new Image(),
   healthIcon: new Image(),
   fireIcon: new Image(),
   targetIcon: new Image(),
   instructions: new Image(),
}

IMAGES.corner.src = corner
IMAGES.bar.src = bar
IMAGES.dragonSkin.src = dragonSkin
IMAGES.bricks.src = bricks
IMAGES.healthIcon.src = healthIcon
IMAGES.fireIcon.src = fireIcon
IMAGES.targetIcon.src = targetIcon
IMAGES.instructions.src = instructions

export default IMAGES