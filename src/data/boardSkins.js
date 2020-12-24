import dark_ground from '../assets/images/boards/darkBoard/ground.png'
import dark_man from '../assets/images/boards/darkBoard/man.svg'
import dark_wallSingle from '../assets/images/boards/darkBoard/wall/Tower.svg'
import dark_wallCross from '../assets/images/boards/darkBoard/wall/TowerCross.svg'
import dark_wallDown from '../assets/images/boards/darkBoard/wall/TowerDown.svg'
import dark_wallHorizontalDown from '../assets/images/boards/darkBoard/wall/TowerHorizontalDown.svg'
import dark_wallHorizontalUp from '../assets/images/boards/darkBoard/wall/TowerHorizontalUp.svg'
import dark_wallLeft from '../assets/images/boards/darkBoard/wall/TowerLeft.svg'
import dark_wallLeftDown from '../assets/images/boards/darkBoard/wall/TowerLeftDown.svg'
import dark_wallLeftUp from '../assets/images/boards/darkBoard/wall/TowerLeftUp.svg'
import dark_wallRight from '../assets/images/boards/darkBoard/wall/TowerRight.svg'
import dark_wallRightDown from '../assets/images/boards/darkBoard/wall/TowerRightDown.svg'
import dark_wallRightUp from '../assets/images/boards/darkBoard/wall/TowerRightUp.svg'
import dark_wallUp from '../assets/images/boards/darkBoard/wall/TowerUp.svg'
import dark_wallVerticalLeft from '../assets/images/boards/darkBoard/wall/TowerVerticalLeft.svg'
import dark_wallVerticalRight from '../assets/images/boards/darkBoard/wall/TowerVerticalRight.svg'
import dark_wallHorizontal from '../assets/images/boards/darkBoard/wall/WallHorizontal.svg'
import dark_wallVertical from '../assets/images/boards/darkBoard/wall/WallVertical.svg'
import forest_ground from '../assets/images/boards/forestBoard/ground.png'
import forest_man from '../assets/images/boards/forestBoard/man.svg'
import forest_wallSingle from '../assets/images/boards/forestBoard/wall/Tower.svg'
import forest_wallCross from '../assets/images/boards/forestBoard/wall/TowerCross.svg'
import forest_wallDown from '../assets/images/boards/forestBoard/wall/TowerDown.svg'
import forest_wallHorizontalDown from '../assets/images/boards/forestBoard/wall/TowerHorizontalDown.svg'
import forest_wallHorizontalUp from '../assets/images/boards/forestBoard/wall/TowerHorizontalUp.svg'
import forest_wallLeft from '../assets/images/boards/forestBoard/wall/TowerLeft.svg'
import forest_wallLeftDown from '../assets/images/boards/forestBoard/wall/TowerLeftDown.svg'
import forest_wallLeftUp from '../assets/images/boards/forestBoard/wall/TowerLeftUp.svg'
import forest_wallRight from '../assets/images/boards/forestBoard/wall/TowerRight.svg'
import forest_wallRightDown from '../assets/images/boards/forestBoard/wall/TowerRightDown.svg'
import forest_wallRightUp from '../assets/images/boards/forestBoard/wall/TowerRightUp.svg'
import forest_wallUp from '../assets/images/boards/forestBoard/wall/TowerUp.svg'
import forest_wallVerticalLeft from '../assets/images/boards/forestBoard/wall/TowerVerticalLeft.svg'
import forest_wallVerticalRight from '../assets/images/boards/forestBoard/wall/TowerVerticalRight.svg'
import forest_wallHorizontal from '../assets/images/boards/forestBoard/wall/WallHorizontal.svg'
import forest_wallVertical from '../assets/images/boards/forestBoard/wall/WallVertical.svg'

const THEMES = {
   forest: {
      ground: forest_ground,
      wall: {
         single: forest_wallSingle,
         cross: forest_wallCross,
         down: forest_wallDown,
         horizontalDown: forest_wallHorizontalDown,
         horizontalUp: forest_wallHorizontalUp,
         left: forest_wallLeft,
         leftDown: forest_wallLeftDown,
         leftUp: forest_wallLeftUp,
         right: forest_wallRight,
         rightDown: forest_wallRightDown,
         rightUp: forest_wallRightUp,
         up: forest_wallUp,
         verticalLeft: forest_wallVerticalLeft,
         verticalRight: forest_wallVerticalRight,
         horizontal: forest_wallHorizontal,
         vertical: forest_wallVertical,
      },
      man: forest_man,
   },
   darkGround: {
      ground: dark_ground,
      wall: {
         single: dark_wallSingle,
         cross: dark_wallCross,
         down: dark_wallDown,
         horizontalDown: dark_wallHorizontalDown,
         horizontalUp: dark_wallHorizontalUp,
         left: dark_wallLeft,
         leftDown: dark_wallLeftDown,
         leftUp: dark_wallLeftUp,
         right: dark_wallRight,
         rightDown: dark_wallRightDown,
         rightUp: dark_wallRightUp,
         up: dark_wallUp,
         verticalLeft: dark_wallVerticalLeft,
         verticalRight: dark_wallVerticalRight,
         horizontal: dark_wallHorizontal,
         vertical: dark_wallVertical,
      },
      man: dark_man,
   },
}

export default THEMES
