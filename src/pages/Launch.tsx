import BackgroundDnDx from '@/components/BackgroundDnDx';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';

const isDev = import.meta.env.MODE === 'development';

export default function LaunchDNDX() {
  if (isDev) {
    console.log('🚀 Launch page rendering');
  }
  
  return (
    <>
      <div className='relative min-h-screen w-full'>
        <BackgroundDnDx />
        <MusicPlayer />
      </div>
      <div className='relative bg-black text-white max-w-4xl mx-auto px-4 py-16'>
        <div className='space-y-8'>
          <article className='border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors'>
            <h2 className='text-2xl font-semibold mb-2'>Coming Soon</h2>
            <p className='text-white/60 text-sm mb-4'>Stay tuned for updates</p>
            <p className='text-white/70'>
              Experience the full interactive demonstration soon. Check back for the complete 
              DNDX launch experience with advanced features and capabilities.
            </p>
          </article>
        </div>
      </div>
      <div className="bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20">
        <Footer />
      </div>
    </>
  );
}
