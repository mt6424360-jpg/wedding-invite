import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import envelope from "./assets/lace-envelope.jpg"
import invitationPattern from "./assets/invitation-pattern.jpg"
import laceCard from "./assets/lace-card-transparent.png"
import seal from "./assets/wax-seal.jpg"
import openingSong from "./assets/opening-song.mp3?url"

const WEDDING_DATE = new Date("2026-11-12T20:00:00")
const WEDDING_LOCATION_URL = "https://maps.app.goo.gl/SBxYdejZH2wH4Byd7"
const SNAP_LENS_URL =
  "https://www.snapchat.com/lens/043ca74b50c841c6a904cb472b0b16ea?share_id=jVvBhlgHJKE&locale=en-GB"
const ENVELOPE_OPENING_AUDIO = openingSong
const COUPLE_HANDS =
  "https://images.unsplash.com/photo-1521544213200-ee65f73b6238?auto=format&fit=crop&w=1200&q=88"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3m10-3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8.5h3l1.2-2h7.6l1.2 2h3v10H4v-10Z" />
      <circle cx="12" cy="13.5" r="3" />
      <path d="m5 5 14 15" />
    </svg>
  )
}

function ChildIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="6.5" r="2.5" />
      <path d="M8 20v-4.5l-2-2 2-4h8l2 4-2 2V20M9 12h6" />
      <path d="m5 4 14 16" />
    </svg>
  )
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8c2.8 0 4.9 2.1 4.9 4.9 0 1.1-.3 2-.9 2.9-.7.9-1.6 1.4-2.7 1.8.8.4 1.4 1.1 1.8 1.9.6 1.1.5 2.3-.3 3.3-.9 1.2-2.3 1.8-4.1 1.8-1.8 0-3.2-.6-4.1-1.8-.8-1-.9-2.2-.3-3.3.4-.8 1-1.5" />
      <path d="M9.5 7.3c.7-.7 1.6-1 2.5-1 .9 0 1.8.3 2.5 1" />
    </svg>
  )
}

function Detail({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="detail">
      <span className="detail-icon">{icon}</span>
      <div>
        <p className="detail-title">{title}</p>
        <div className="detail-copy">{children}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [opening, setOpening] = useState(false)
  const [opened, setOpened] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => {
      window.clearInterval(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const openInvitation = () => {
    if (opening) return
    setOpening(true)

    const audio = new Audio(openingSong)
    audioRef.current = audio
    audio.volume = 0.7
    audio.currentTime = 0
    audio.play().catch(() => undefined)

    window.setTimeout(() => setOpened(true), 1200)
  }

  const countdown = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ]

  return (
    <main
      className="wedding-page"
      style={{ "--paper-pattern": `url(${invitationPattern})` } as CSSProperties}
    >
      <audio ref={audioRef} src={ENVELOPE_OPENING_AUDIO} preload="auto" />

      <section className={`welcome ${opening ? "is-opening" : ""}`}>
        <div className="welcome-heading">
          <span>Save the date</span>
          <h1>You're Invited</h1>
          <i />
        </div>

        <button
          className="envelope-button"
          onClick={openInvitation}
          aria-label="فتح دعوة الزفاف"
        >
          <span className="envelope-shadow" />
          <span className="envelope-contents" aria-hidden="true">
            <span className="hands-photo">
              <img src={COUPLE_HANDS} alt="" />
              <small>12 · 11 · 26</small>
            </span>
            <span className="vinyl-record" />
            <span className="name-ticket">
              <small>THE WEDDING OF</small>
              <strong>
                esraa <i>&amp;</i> abdo
              </strong>
              <b>Save the date</b>
            </span>
          </span>
          <img className="envelope-image" src={envelope} alt="" />
          <img className="envelope-flap" src={envelope} alt="" />
          <img className="wax-seal" src={seal} alt="" />
        </button>

        {!opening ? (
          <button className="open-prompt" onClick={openInvitation}>
            <svg className="prompt-arrow" viewBox="0 0 80 78" aria-hidden="true">
              <path d="M12 70C10 43 28 18 62 12" />
              <path d="m49 7 14 5-8 13" />
            </svg>
            <span>Tap the envelope to view the invitation</span>
            <span className="prompt-line" />
          </button>
        ) : (
          <a className="scroll-prompt" href="#invitation">
            <span>مرّري للأسفل لرؤية الدعوة</span>
            <i />
          </a>
        )}
      </section>

      <section id="invitation" className={`invitation ${opened ? "is-visible" : ""}`} dir="rtl">
        <header className="invitation-header">
          <p>حكاية تشبه الروايات</p>
          <span>امتزجت بأجمل الدعوات وتكللت بأسعد النهايات</span>
          <p>ولا تكتمل فرحتنا إلا بوجود زغاريت الأحباب</p>
        </header>

        <article className="invitation-card">
          <img className="lace-card" src={laceCard} alt="" />
          <div className="card-content">
            <div className="story-copy">
             
            </div>
            <div className="host-copy">
              <span>تتشرف حرم الحاج</span>
              <strong>/محمد ميلاد المائل</strong>
              <span>السيدة</span>
              <strong>/سميرة علي الأحمر</strong>
            </div>
            <p className="invitation-line">بدعوتكم لحضور حفل زفاف حبيبتهم</p>
            <div className="modern-title">
              <h2>إسراء</h2>
            </div>
            
            <div className="card-date">
              <span>الخميس</span>
              <strong>12</strong>
              <span>نوفمبر 2026</span>
            </div>
          </div>
        </article>

        <section className="details-section" aria-label="تفاصيل الحفل">
          <p className="section-kicker">تفاصيل الأمسية</p>
          <p className="blessing-line">وذلك بمشيئة الله تعالى </p>
          
          <div className="details-grid">
            <Detail icon={<CalendarIcon />} title="التاريخ">
              الخميس، 12 نوفمبر 2026
            </Detail>
            <Detail icon={<ClockIcon />} title="الوقت">
              الساعة الثامنة مساءً
            </Detail>
            <Detail icon={<PinIcon />} title="المكان">
              <a href={WEDDING_LOCATION_URL} target="_blank" rel="noreferrer">
                موقع قاعة رويال بلاس
                <span>عرض على الخريطة</span>
              </a>
            </Detail>
            <Detail icon={<SnapchatIcon />} title="فلتر المناسبة">
              <a href={SNAP_LENS_URL} target="_blank" rel="noreferrer">
                Try this lens!
                <span>فتح الفلتر</span>
              </a>
            </Detail>
          </div>
        </section>

        <section className="notes" aria-label="تنبيهات الحفل">
          <div>
            <CameraIcon />
            <p>
              <strong>لحظاتنا أجمل بخصوصيتها</strong>يُمنع التصوير داخل القاعة
            </p>
          </div>
          <span className="notes-divider" />
          <div>
            <ChildIcon />
            <p>
              <strong>نعتذر منكم</strong>إدارة الصالة تمنع اصطحاب الأطفال
            </p>
          </div>
        </section>

        <section className="countdown-section" aria-label="العد التنازلي">
          <p>باقي على ليلة العمر</p>
          <div className="countdown" dir="ltr">
            {countdown.map((item) => (
              <div className="countdown-item" key={item.label}>
                <strong>{String(item.value).padStart(2, "0")}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <span>We can't wait to celebrate with you</span>
          <div className="footer-names">
            إسراء <i>&amp;</i> عبد الحفيظ
          </div>
          <p>12 · 11 · 2026</p>
        </footer>
      </section>
    </main>
  )
}
