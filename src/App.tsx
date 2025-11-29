import { useState, useEffect } from 'react'
import photoImage from './assets/photo.png'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Компонент для flip анимации цифр
function FlipNumber({ value, className }: { value: string; className?: string }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (value !== displayValue) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setDisplayValue(value)
        setKey(prev => prev + 1)
        setIsFlipping(false)
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [value, displayValue])

  return (
    <span 
      key={key}
      className={`flip-number inline-block ${isFlipping ? 'flip-animation' : ''} ${className || ''}`}
    >
      {displayValue}
    </span>
  )
}

// Функция для правильного склонения слов в русском языке
// Учитывает контекст "через" (винительный падеж)
function pluralize(count: number, forms: [string, string, string]): string {
  const mod10 = count % 10
  const mod100 = count % 100
  
  // Для чисел 11-19 всегда множественное число
  if (mod100 >= 11 && mod100 <= 19) {
    return forms[2] // родительный падеж множественного числа (дней, часов, минут)
  }
  
  // Для 1, 21, 31... - винительный падеж (совпадает с именительным для неодушевленных)
  if (mod10 === 1) {
    return forms[0] // винительный падеж единственного числа (день, час, минута)
  }
  
  // Для 2, 3, 4, 22, 23, 24... - родительный падеж единственного числа
  if (mod10 >= 2 && mod10 <= 4) {
    return forms[1] // родительный падеж единственного числа (дня, часа, минуты)
  }
  
  // Для 5-9, 10, 20, 25-30... - родительный падеж множественного числа
  return forms[2] // родительный падеж множественного числа (дней, часов, минут)
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventPassed, setIsEventPassed] = useState(false)

  useEffect(() => {
    // Дата события: 13 декабря 2025, 19:00 UTC+5 (Уральское время)
    // Создаем дату события: 19:00 UTC+5 = 14:00 UTC
    // Используем ISO строку с явным указанием часового пояса
    const eventDateString = '2025-12-13T19:00:00+05:00'
    const eventDate = new Date(eventDateString)

    const calculateTimeLeft = () => {
      const now = new Date()
      // getTime() возвращает миллисекунды с 1 января 1970 UTC для обеих дат
      // так что сравнение корректно независимо от локального часового пояса
      const difference = eventDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsEventPassed(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isEventPassed) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-2xl md:text-3xl font-bold text-blue-300">
          Событие началось!
        </p>
      </div>
    )
  }

  const daysStr = timeLeft.days.toString().padStart(2, '0')
  const hoursStr = timeLeft.hours.toString().padStart(2, '0')
  const minutesStr = timeLeft.minutes.toString().padStart(2, '0')

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-500/30 text-center">
          <div className="text-3xl md:text-5xl font-bold text-blue-300">
            <FlipNumber value={daysStr[0]} /><FlipNumber value={daysStr[1]} />
          </div>
        </div>
        <div className="text-sm md:text-base text-gray-300 uppercase mt-2">
          {pluralize(timeLeft.days, ['День', 'Дня', 'Дней'])}
        </div>
      </div>
      <span className="text-3xl md:text-5xl font-bold text-blue-300 self-start pt-4 md:pt-6 blink-animation">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-500/30 text-center">
          <div className="text-3xl md:text-5xl font-bold text-blue-300">
            <FlipNumber value={hoursStr[0]} /><FlipNumber value={hoursStr[1]} />
          </div>
        </div>
        <div className="text-sm md:text-base text-gray-300 uppercase mt-2">
          {pluralize(timeLeft.hours, ['Час', 'Часа', 'Часов'])}
        </div>
      </div>
      <span className="text-3xl md:text-5xl font-bold text-blue-300 self-start pt-4 md:pt-6 blink-animation">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-500/30 text-center">
          <div className="text-3xl md:text-5xl font-bold text-blue-300">
            <FlipNumber value={minutesStr[0]} /><FlipNumber value={minutesStr[1]} />
          </div>
        </div>
        <div className="text-sm md:text-base text-gray-300 uppercase mt-2">
          {pluralize(timeLeft.minutes, ['Минуту', 'Минуты', 'Минут'])}
        </div>
      </div>
    </div>
  )
}

function FAQItem() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-blue-500/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-slate-800/50 hover:bg-slate-800/70 transition-colors duration-300"
      >
        <span className="text-xl md:text-2xl font-semibold text-white">
          Что мне подарить?
        </span>
        <svg
          className={`w-6 h-6 text-blue-300 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className={`px-6 bg-slate-800/30 transition-all duration-500 ease-in-out ${
            isOpen ? 'py-4' : 'py-0'
          }`}>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                В этом году я собираю деньги на подарок, который я хочу купить себе очень давно! Так что, будет круто, если ты поддержишь меня) <br />
                Подарок можно отправить мне{' '}
                <a 
                  href="https://tbank.ru/cf/mskIMI3jsw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                >
                  по этой ссылке
                </a>
                {' '}
                или на карту по номеру телефона
                ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Invitation Section */}
      <section className="py-8 px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/30 shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-blue-400/50 shadow-xl bg-blue-600 flex items-center justify-center">
                  {imageError ? (
                    <span className="text-2xl md:text-3xl">🎂</span>
                  ) : (
                    <img 
                      src={photoImage} 
                      alt="Приглашение" 
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </div>
              
              {/* Invitation Text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Привет!
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                  Приглашаю Тебя отметить мой небольшой юбилей!
                </p>
                <p className="text-base md:text-lg text-gray-300">
                  Все подробности ты сможешь найти ниже. Буду рада, если ты сможешь прийти!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer & Date/Time Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br from-indigo-800/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-indigo-500/30 shadow-2xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Countdown Timer */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                Жду тебя через
              </h2>
            </div>
            <CountdownTimer />
            
            {/* Date & Time */}
            <div className="mt-8 pt-8 border-t border-indigo-500/30">
              <div className="text-center">
                <p className="text-xl md:text-2xl text-white font-semibold mb-2">
                  13 декабря, в 19:00
                </p>
                <p className="text-gray-300 text-base md:text-lg">
                  Суббота • Тагильское время
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-500/30 shadow-2xl transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white flex items-center justify-center gap-3">
                <span>По адресу</span>
              </h2>
              <p className="text-xl md:text-2xl text-white font-semibold mb-2">Ресторан "Хачапури" | Грузинская кухня</p>
              <p className="text-base md:text-lg text-gray-300">г. Нижний Тагил, ул. Пархоменко, 41</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <a 
                  href="https://yandex.ru/maps/-/CLcMAXpC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Открыть карту
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <FAQItem />
        </div>
      </section>

    </div>
  )
}

export default App
