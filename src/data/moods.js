import { images } from './images'

/*
 * The four moods the photographs stand for. Used by the hero captions and the scent finder.
 * A product lists the moods it belongs to in `moods: ['warmth', …]`.
 */
export const moods = [
  { key: 'warmth', label: 'Warmth', line: 'Sunlight on stone, the middle of the afternoon.', image: images.citrus },
  { key: 'ripeness', label: 'Ripeness', line: 'Something sweet, just before it turns.', image: images.papaya },
  { key: 'morning', label: 'Morning', line: 'Cold water, green things, the day not yet begun.', image: images.leaves },
  { key: 'stillness', label: 'Stillness', line: 'Smoke rising in a quiet room.', image: images.smoke },
]

export const moodByKey = Object.fromEntries(moods.map((m) => [m.key, m]))
