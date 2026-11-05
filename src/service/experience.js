import imgHyrma from '@/assets/imgPastWork/imgHyrma/hyrma.png'
import imgSkolon from '@/assets/imgPastWork/imgSkolon/skolon.jpg'
import imgSaab from '@/assets/imgPastWork/imgSaab/saabVisbyCorvett.jpg'
import imgBredakra from '@/assets/imgPastWork/imgBredakra/bredakraHalloween.jpg'

const experience = [
  {
    id: 'infobric',
    titleKey: 'experience.infobricTitle',
    textKey: 'experience.infobric',
    image: imgHyrma,
  },
  {
    id: 'skolon',
    titleKey: 'experience.skolonTitle',
    textKey: 'experience.skolon',
    image: imgSkolon,
  },
  {
    id: 'saab',
    titleKey: 'experience.saabTitle',
    textKey: 'experience.saab',
    image: imgSaab,
  },
  {
    id: 'bredakra',
    titleKey: 'experience.bredakraTitle',
    textKey: 'experience.bredakra',
    image: imgBredakra,
  },
]

function getExperience() {
  return experience
}

export default {
  getExperience,
}
