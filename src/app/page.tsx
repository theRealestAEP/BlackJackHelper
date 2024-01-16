import Image from 'next/image'
import BlackJack from './components/Blackjack'

export default function Home() {
  return (
    <main>
      <header className="absolute left-0 top-0 max-w-md mx-auto p-8 bg-white p-4 rounded-lg shadow-md">
        <h1 className='text-lg font-semibold px20'>Black Jack Assistant</h1>
        <p>Count Cards and reference the book easily</p>
      </header>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <BlackJack />
        </div>

      </div>
    </main>
  )
}
