import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "MLQC Reader | Mr Love: Queen's Choice Archive",
  description:
    "Read Mr Love: Queen's Choice card stories, browse 300+ events, and track your progress on the go with the MLQC Reader mobile app.",
};

const APK_URL = 'https://app.mlqc-archive.com/1.0.1.apk';

export default function AppPage() {
  return (
    <div className='flex min-h-full flex-col font-[family-name:var(--font-noto-sans)]'>
      {/* Hero */}
      <section className='flex flex-col items-center gap-6 bg-indigo-950 px-8 py-20 text-center text-white'>
        <div className='flex flex-col items-center gap-3'>
          <h1 className='text-4xl font-bold md:text-5xl'>MLQC Reader</h1>
          <p className='max-w-md text-lg text-indigo-200'>
            Browse events, read card transcripts, and track your progress on
            your Android phone.
          </p>
        </div>
        <a
          href={APK_URL}
          className='mt-2 rounded-xl bg-white px-10 py-4 text-lg font-bold text-indigo-950 transition-colors hover:bg-indigo-100'
        >
          Download APK
        </a>
        <p className='text-xs text-indigo-400'>
          Android only &middot; v1.0.1 &middot; Enable &ldquo;Install unknown
          apps&rdquo; in your device settings
        </p>
      </section>

      {/* Feature 1 */}
      <FeatureSection
        src='/app-screens/1.png'
        alt='Home screen'
        reverse={false}
        tinted={false}
        title='Every story, in order'
        bullets={[
          'Pick a love interest and read their full story from the very beginning.',
          'Main story chapters, rumors, secrets, and karma cards all appear in chronological order.',
          'Your progress is saved per character so you can pick up right where you left off.',
        ]}
      />

      {/* Feature 2 */}
      <FeatureSection
        src='/app-screens/2.png'
        alt='Browse screen'
        reverse={true}
        tinted={true}
        title='Browse 300+ events'
        bullets={[
          "Every banner and seasonal event from the game's full run, organised by date.",
          'Filter by character or year to narrow things down quickly.',
          "Search by card name or banner title to jump straight to what you're looking for.",
        ]}
      />

      {/* Feature 3 */}
      <FeatureSection
        src='/app-screens/3.png'
        alt='Card detail screen'
        reverse={false}
        tinted={false}
        title="Watch or read, it's your choice"
        bullets={[
          'Tap the play button to watch the card story on YouTube.',
          'Prefer to read? Every card includes a full written transcript.',
          "Mark a card as Seen to unlock MC's diary entry and track your progress.",
        ]}
      />

      {/* Feature 4 */}
      <FeatureSection
        src='/app-screens/4.png'
        alt='Transcript screen'
        reverse={true}
        tinted={true}
        title="MC's diary"
        bullets={[
          "Once you've marked a card as Seen, MC's diary entry unlocks.",
          'Read her personal take on what just happened: her thoughts, feelings, and secrets.',
        ]}
      />

      {/* Download CTA */}
      <section className='flex flex-col items-center gap-4 bg-indigo-950 px-8 py-16 text-center text-white'>
        <h2 className='text-2xl font-bold'>Ready to start reading?</h2>
        <p className='text-indigo-300'>
          Free to download. No account required.
        </p>
        <a
          href={APK_URL}
          className='rounded-xl bg-white px-10 py-4 text-lg font-bold text-indigo-950 transition-colors hover:bg-indigo-100'
        >
          Download APK
        </a>
        <p className='text-xs text-indigo-500'>
          Android &middot; v1.0.1 &middot; Enable &ldquo;Install unknown
          apps&rdquo; to install
        </p>
      </section>
    </div>
  );
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className='w-72 shrink-0 overflow-hidden rounded-[36px] border-4 border-indigo-950 shadow-2xl'>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={2560}
        className='block w-full'
      />
    </div>
  );
}

function FeatureSection({
  src,
  alt,
  reverse,
  tinted,
  title,
  bullets,
}: {
  src: string;
  alt: string;
  reverse: boolean;
  tinted: boolean;
  title: string;
  bullets: string[];
}) {
  return (
    <section
      className={`flex justify-center px-8 py-20 ${tinted ? 'bg-[#faf8ff]' : 'bg-white'}`}
    >
      <div
        className={`flex w-full max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center ${reverse ? 'md:flex-row-reverse' : ''}`}
      >
        <PhoneFrame src={src} alt={alt} />
        <div className='flex flex-col gap-5'>
          <h2 className='text-3xl font-bold text-indigo-950'>{title}</h2>
          <ul className='flex flex-col gap-3'>
            {bullets.map((b) => (
              <li key={b} className='flex gap-3 text-gray-600'>
                <span className='mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-400' />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
