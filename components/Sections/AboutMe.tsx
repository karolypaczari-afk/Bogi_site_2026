import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <section className="py-24 bg-white reveal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-32">
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 border-2 border-accent/20 rounded-[50px] -z-10 translate-x-6 translate-y-6"></div>
            <div className="rounded-[45px] overflow-hidden shadow-2xl ring-8 ring-white bg-accent-subtle aspect-square">
               <img src="https://bogihorvath.com/wp-content/uploads/2024/08/image-27.png" alt="Bogi Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Meet the Expert</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight">
              Bridging the Gap Between <span className="text-accent italic">Potential</span> and <span className="text-accent italic">Performance</span>
            </h1>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                Hello, I'm Boglarka Paczari-Horvath (most people call me <strong>Bogi</strong>). With over 14 years of experience in the ICT sector, I have dedicated my career to one singular goal: <strong>making operations work better.</strong>
              </p>
              <p>
                My journey hasn't been just about charts and spreadsheets. It’s been about people, culture, and the subtle art of transformation. From my early days at T-Systems to leadership roles at BT, NTT, and S.W.I.F.T., I have seen firsthand how structural waste can quietly erode even the most ambitious organizations.
              </p>
              <p>
                I don't believe in "one-size-fits-all" solutions. Whether I'm implementing Lean Six Sigma, guiding an Agile migration, or standardizing global value streams, my approach is always tailored, data-driven, and human-centric.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          <div className="bg-bg-secondary p-10 rounded-[40px] border border-slate-100">
             <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-accent/20"><i className="fas fa-eye"></i></div>
             <h3 className="text-2xl font-bold mb-4">My Vision</h3>
             <p className="text-text-muted leading-relaxed">To transform the ICT landscape into a space where efficiency and innovation coexist, powered by streamlined processes and empowered teams.</p>
          </div>
          <div className="bg-bg-secondary p-10 rounded-[40px] border border-slate-100">
             <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-accent/20"><i className="fas fa-bullseye"></i></div>
             <h3 className="text-2xl font-bold mb-4">My Mission</h3>
             <p className="text-text-muted leading-relaxed">To identify and eliminate operational waste, unlocking organizational capacity and delivering measurable financial ROI for global enterprises.</p>
          </div>
          <div className="bg-bg-secondary p-10 rounded-[40px] border border-slate-100">
             <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-accent/20"><i className="fas fa-heart"></i></div>
             <h3 className="text-2xl font-bold mb-4">My Values</h3>
             <p className="text-text-muted leading-relaxed">Integrity, extreme ownership, and a belief that simplicity is the ultimate sophistication. I value transparent data over noise.</p>
          </div>
        </div>

        <div className="bg-bg-dark rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent opacity-10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 max-w-4xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-10">Why I Do What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400">
              <p>
                In 2024, I founded <strong>InnovateIT Consulting</strong> to bring my specialized process optimization toolkit to a wider range of clients. I saw a recurring theme in the industry: brilliant technical teams held back by legacy processes. 
              </p>
              <p>
                My work at S.W.I.F.T. today as a Functional Lead allows me to operate at the cutting edge of digital transformation, merging API consolidation with Lean methodologies. I thrive in environments that challenge the status quo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;