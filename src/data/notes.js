import { images } from './images'

/*
 * How any composition unfolds on skin. This is the structure of a perfume, not a list of
 * Kimem ingredients; the images are mood only.
 */
export const notes = [
  {
    key: 'top',
    layer: 'Top note',
    tagline: 'the first breath',
    title: 'Opening',
    timing: 'The first minutes',
    text: 'The brightest, lightest materials rise first. They are what you notice the moment it touches skin, and they are gone almost as soon as you have named them.',
    image: images.citrus,
  },
  {
    key: 'heart',
    layer: 'Heart note',
    tagline: 'what settles in',
    title: 'Heart',
    timing: 'The hours after',
    text: 'As the opening lifts, the character of the composition comes through. Rounder, warmer, closer to the skin: this is the part people will know you by.',
    image: images.papaya,
  },
  {
    key: 'base',
    layer: 'Base note',
    tagline: 'what remains',
    title: 'Trail',
    timing: 'Into the next day',
    text: 'The heaviest materials move slowest. They anchor everything above them and linger on a collar or a scarf long after the rest has faded.',
    image: images.smoke,
  },
]
