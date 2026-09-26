import { createApp } from 'vue'
import App from './App.vue'

import './styles/tokens.css'
import './styles/base.css'

import reveal from './directives/reveal'
import magnetic from './directives/magnetic'
import parallax from './directives/parallax'
import splitWords from './directives/splitWords'
import theme from './directives/theme'

createApp(App)
  .directive('reveal', reveal)
  .directive('magnetic', magnetic)
  .directive('parallax', parallax)
  .directive('split-words', splitWords)
  .directive('theme', theme)
  .mount('#app')
