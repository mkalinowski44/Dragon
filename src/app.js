import Loop from './js/Loop'
import './scss/index.scss'

const mainLoop = new Loop({
   speed: 10,
   start: true,
   update: (loop) => {},
   render: (loop) => {},
})
