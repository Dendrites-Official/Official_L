import DnDxRoadmapPremium from '@/components/ui/DndxRoadmapPremium';
import Footer from '@/components/Footer';

export default function Roadmap() {
  return (
    <>
      <DnDxRoadmapPremium />
      <div className="bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20">
        <Footer />
      </div>
    </>
  );
}