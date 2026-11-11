
import { useState, useRef } from "react";
import "./App.css";

const slides = [
  {
    label: "A SPECIAL DAY",
    title: "Happy Birthday,",
    highlight: "Yuvasir! ♡",
    text: "From our tiny Pre-KG selves to the people we are today, you have been one of the most beautiful parts of my life. Unna friend-ah kidaichadhu romba lucky.",
    photo: "/photos/cover.jpeg",
    emoji: "🎂",
    type: "cover",
  },
  {
    label: "CHAPTER 01",
    title: "Where our",
    highlight: "story began",
    text: "Rendu chinna kids-ah start aana namma friendship, one day ivlo special aagum nu appove theriyala. Those little days became the beginning of my favourite story. 🧸",
    photo: "/photos/prekg.jpeg",
    emoji: "🧸",
    type: "memory",
    year: "Pre-KG",
  },
  {
    label: "CHAPTER 02",
    title: "Little kids,",
    highlight: "big memories",
    text: "School bags, lunch boxes, little fights, silly games and endless happiness. Andha days-la perusa edhuvum theriyala, but now those are some of the memories I miss the most. 🎒",
    photo: "/photos/primary.jpeg",
    emoji: "🎒",
    type: "memory",
    year: "1st – 5th Standard",
  },
  {
    label: "CHAPTER 03",
    title: "Growing up",
    highlight: "together",
    text: "Konjam konjama grow aanaalum, namma bond mattum special-ah irundhuchu. More secrets, more laughter, more memories that only we understand. 💗",
    photo: "/photos/middle.jpeg",
    emoji: "🦋",
    type: "memory",
    year: "6th – 8th Standard",
  },
  {
    label: "CHAPTER 04",
    title: "My person,",
    highlight: "always",
    text: "Exam tension, silly fights, random talks and all those school-day moments. Everything felt a little better because you were part of it. 🫶",
    photo: "/photos/highschool.jpeg",
    emoji: "🫶",
    type: "memory",
    year: "9th – 10th Standard",
  },
  {
    label: "CHAPTER 05",
    title: "Our final",
    highlight: "school chapters",
    text: "11th and 12th standard… appo normal-ah irundha moments, ippo priceless memories aayiduchu. We didn't realise how quickly those days would become memories. 🎓",
    photo: "/photos/12th.jpeg",
    emoji: "🎓",
    type: "memory",
    year: "11th – 12th Standard",
  },
  {
    label: "CHAPTER 06",
    title: "School ended,",
    highlight: "we didn't ♾️",
    text: "School mudinjiruchu, but namma story mudiyala. Life changes, routines change, but I'm genuinely happy that we're still part of each other's lives. ❤️",
    photo: "/photos/afterschool.jpeg",
    emoji: "❤️",
    type: "memory",
    year: "After School",
  },
  {
    label: "OUR LITTLE WORLD",
    title: "Every picture",
    highlight: "has a story",
    text: "Some photos are blurry, some memories are crazy, and some moments are impossible to explain. But every memory with you means something to me. 📸",
    photo: "/photos/favourite.jpeg",
    emoji: "📸",
    type: "memory",
    year: "Our Favourite Memories",
  },
  {
    label: "FROM MY HEART",
    title: "To my bestie,",
    highlight: "my Yuvasir ♡",
    text: `Happy Birthday, di! ❤️

Sometimes I think about how we went from being those little kids in Pre-KG to growing up together all the way till 12th. Back then, we didn't know that those ordinary school days would become some of our favourite memories.

We've laughed over the smallest things, had our silly fights, shared so many moments, and made memories that I'll always keep close to my heart.

And now, school is over. Life is different, we're growing up, and things aren't exactly like they used to be. But one thing I'm genuinely happy about is that we're still in each other's lives.

Honestly, I'm so glad I got to grow up with you. You're not just someone I went to school with; you're a part of my childhood that I'll always be grateful for.

I don't know what the future has planned for us, but I really hope we never become strangers. I hope we keep talking about random things, laughing at our old memories, meeting whenever we can, and being there for each other through all the different stages of life.

Thank you for being my friend, Yuvasir. No matter how much we grow or how much life changes, a part of my heart will always remember us as those little kids who started this friendship in Pre-KG.

Happy Birthday once again, di! Love you so much. 🫶🏻

— Your moni, always ♡`,
    photo: "/photos/letter.jpeg",
    emoji: "💌",
    type: "letter",
  },
  {
    label: "ONE LAST THING",
    title: "My favourite",
    highlight: "person, forever",
    text: "Innum neraya birthdays, neraya memories, neraya sirippu… namma story-ku ending kedaiyadhu. Wherever life takes us, I hope we keep choosing this friendship. Happy Birthday, Yuvasir! Love, moni. 💗",
    photo: "/photos/celebration.jpeg",
    emoji: "🎁",
    type: "final",
  },
];

function PhotoFrame({ src, emoji, year }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="photo-frame">
      {!failed && (
        <img
          src={src}
          alt={year || "A birthday memory of moni and Yuvasir"}
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <div className="photo-placeholder">
          <span>{emoji}</span>
          <p>Our memory goes here</p>
          <small>Add your photo ♡</small>
        </div>
      )}

      <div className="photo-caption">
        moni + Yuvasir · Always
      </div>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const touchStart = useRef(null);
  const slide = slides[current];

  const checkPassword = (event) => {
    event.preventDefault();

    if (password === "jungkook") {
      setUnlocked(true);
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
      setPassword("");
    }
  };

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const previous = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const goTo = (index) => {
    setCurrent(index);
  };

  const handleTouchStart = (event) => {
    touchStart.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const difference = endX - touchStart.current;

    if (difference < -55) next();
    if (difference > 55) previous();

    touchStart.current = null;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  };

  if (!unlocked) {
    return (
      <main className="lock-screen">
        <div className="lock-card">
          <div className="lock-icon">🔒</div>

          <p className="lock-label">
            A LITTLE SURPRISE FOR YOU
          </p>

          <h1>
            Hey, Yuvasir!
            <br />
            <span>Something special awaits ♡</span>
          </h1>

          <p className="lock-description">
            A little journey through our memories.
            Enter the secret password to open it.
          </p>

          <form onSubmit={checkPassword}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setWrongPassword(false);
              }}
              required
            />

            <button type="submit">
              Unlock My Surprise ♡
            </button>
          </form>

          {wrongPassword && (
            <p className="wrong-password">
              Oops! Wrong password. Try again ♡
            </p>
          )}

          <small>Made with love by moni ♡</small>
        </div>
      </main>
    );
  }

  return (
    <main
      className="app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <header className="topbar">
        <div className="brand">♥ moni &amp; Yuvasir</div>
        <span className="top-caption">OUR STORY, FOREVER</span>
      </header>

      <section className={`slide slide-${slide.type}`} key={current}>
        <div className="film-grain" />

        <div className="slide-content">
          <div className="slide-copy">
            <p className="eyebrow">{slide.label}</p>

            <h1>
              {slide.title}
              <br />
              <span>{slide.highlight}</span>
            </h1>

            <div className="gold-line" />

            <p className="description">{slide.text}</p>

            {slide.year && (
              <div className="year-tag">
                {slide.emoji} {slide.year}
              </div>
            )}

            {slide.type === "cover" && (
              <p className="handwritten">
                Pre-KG to 12th and beyond. Always us. ♡
              </p>
            )}

            {slide.type === "letter" && (
              <p className="signature">Forever your moni ♡</p>
            )}

            {slide.type === "final" && (
              <p className="signature">
                Made with love, just for you.
              </p>
            )}
          </div>

          <div className="visual">
            <PhotoFrame
              src={slide.photo}
              emoji={slide.emoji}
              year={slide.year}
            />

            <span className="decor decor-one">✦</span>
            <span className="decor decor-two">♡</span>
            <span className="decor decor-three">✧</span>
          </div>
        </div>

        <div className="slide-footer">
          <span>MADE WITH LOVE BY moni</span>
          <span>
            {String(current + 1).padStart(2, "0")} / {slides.length}
          </span>
        </div>
      </section>

      <footer className="controls">
        <button
          className="nav-button"
          onClick={previous}
          disabled={current === 0}
        >
          ← Previous
        </button>

        <div className="dots" aria-label="Choose a slide">
          {slides.map((item, index) => (
            <button
              key={item.label}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "step" : undefined}
            />
          ))}
        </div>

        {current < slides.length - 1 ? (
          <button
            className="nav-button next-button"
            onClick={next}
          >
            Next slide →
          </button>
        ) : (
          <button
            className="nav-button next-button"
            onClick={() => goTo(0)}
          >
            ↻ Replay story
          </button>
        )}
      </footer>

      <p className="swipe-hint">
        ♡ Tap Next or swipe left/right to travel through our memories ♡
      </p>
    </main>
  );
}
