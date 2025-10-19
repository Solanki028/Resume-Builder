/* PostCSS configuration to enable Tailwind CSS processing */
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwind(), autoprefixer()]
}


