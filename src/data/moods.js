import { images } from './images'

/*
 * The four moods the photographs stand for. Used by the hero captions and the scent finder.
 * Labels and lines are in the i18n files under `moods.<key>`.
 * A product lists the moods it belongs to in `moods: ['warmth', …]`.
 */
export const moods = [
  { key: 'warmth', image: images.citrus },
  { key: 'ripeness', image: images.papaya },
  { key: 'morning', image: images.leaves },
  { key: 'stillness', image: images.smoke },
]

export const moodByKey = Object.fromEntries(moods.map((m) => [m.key, m]))
