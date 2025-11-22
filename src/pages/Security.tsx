import Footer from '@/components/Footer';

export default function LeadBoard() {
  return (
    <>
      <div className='pt-28 text-white max-w-4xl mx-auto px-4 py-24'>
        <h1 className='text-4xl font-bold mb-6'>LeadBoard</h1>
        <p className='text-white/70 mb-12'>Track top performers and community leaders.</p>
        
        <div className='space-y-8'>
          <article className='border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors'>
            <h2 className='text-2xl font-semibold mb-2'>LeadBoard Coming Soon</h2>
            <p className='text-white/60 text-sm mb-4'>Stay tuned for updates</p>
            <p className='text-white/70'>
              Our LeadBoard is currently being prepared. Check back soon to see rankings, 
              top contributors, and community achievements.
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