import redDragon_flex from '../assets/images/dragons/redDragon/flex.svg'
import redDragon_head from '../assets/images/dragons/redDragon/head.svg'
import redDragon_segment from '../assets/images/dragons/redDragon/segment.svg'
import redDragon_tail from '../assets/images/dragons/redDragon/tail.svg'
import toxicDragon_flex from '../assets/images/dragons/toxicDragon/flex.svg'
import toxicDragon_head from '../assets/images/dragons/toxicDragon/head.svg'
import toxicDragon_segment from '../assets/images/dragons/toxicDragon/segment.svg'
import toxicDragon_tail from '../assets/images/dragons/toxicDragon/tail.svg'
import waterDragon_flex from '../assets/images/dragons/waterDragon/flex.svg'
import waterDragon_head from '../assets/images/dragons/waterDragon/head.svg'
import waterDragon_segment from '../assets/images/dragons/waterDragon/segment.svg'
import waterDragon_tail from '../assets/images/dragons/waterDragon/tail.svg'

const skins = [
   {
      name: 'redDragon',
      title: 'Czerwony smok',
      description: 'Lorem ipsum dolor sit amet',
      images: {
         head: redDragon_head,
         tail: redDragon_tail,
         segment: redDragon_segment,
         flex: redDragon_flex,
      },
   },
   {
      name: 'toxicDragon',
      title: 'Toksyczny smok',
      description: 'Lorem ipsum dolor sit amet',
      images: {
         head: toxicDragon_head,
         tail: toxicDragon_tail,
         segment: toxicDragon_segment,
         flex: toxicDragon_flex,
      },
   },
   {
      name: 'waterDragon',
      title: 'Wodny smok',
      description: 'Lorem ipsum dolor sit amet',
      images: {
         head: waterDragon_head,
         tail: waterDragon_tail,
         segment: waterDragon_segment,
         flex: waterDragon_flex,
      },
   },
]

export default skins
