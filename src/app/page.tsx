import Image from 'next/image'
import BlackJack from './components/Blackjack'

export default function Home() {
  return (
    <main>
      <header className="absolute left-0 top-0 w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className='text-lg font-semibold'>Black Jack Assistant</h1>
        <p>Count Cards and reference the book easily</p>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <BlackJack />
        </div>

      </div>
    </main>
  )
}
