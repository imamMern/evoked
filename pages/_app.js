import './globals.css'
import { Josefin_Sans } from '@next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
})


export default function App({ Component, pageProps }) {
  return (
    <main className={josefin.className}>
      <Component {...pageProps} />
    </main>
  )
}
