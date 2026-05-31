import { getProfile, getSkills, getProjects } from '../lib/sanityClient';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBg from '../components/ParticleBg';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data with seamless local mock fallback
  const profile = await getProfile();
  const skills = await getSkills();
  const projects = await getProjects();

  return (
    <>
      {/* Cyber overlay elements */}
      <div className="scanlines" />
      
      {/* Particle neural grid backdrop */}
      <ParticleBg />
      
      {/* Global Navbar */}
      <Navbar />
      
      {/* Site Sections */}
      <main>
        <Hero profile={profile} />
        <Skills skills={skills} title={profile.skillsTitle} subtitle={profile.skillsSubtitle} />
        <Projects projects={projects} />
        <Contact profile={profile} />
      </main>
      
      {/* Footer */}
      <Footer socials={profile.socials} />
    </>
  );
}
