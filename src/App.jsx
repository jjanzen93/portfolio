import { useState } from 'react';
import './index.css'; 
import ProjectRow from './components/ProjectRow';
import ProjectModal from './components/ProjectModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState({ title: '', gifSrc: '', mdPath: '' });
  
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    
    navigator.clipboard.writeText('jackjanzen22@gmail.com'); 
    
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const projectsData = [
    {
      id: 1,
      title: 'Pinballistic',
      desc: 'A pinball roguelite set in an intergalactic energy crisis. Upgrade your board, buy unique and powerful balls, and collect as much power as you can.',
      staticImg: '/assets/pinballistic_thumbnail.png',
      gifSrc: '/assets/pinballistic.gif',
      mdPath: '/markdown/pinballistic.md'
    },
    {
      id: 2,
      title: 'Mateynence',
      desc: 'A fast-paced <i>WarioWare</i>-style collection of minigames performing routine maintenence tasks on a pirate ship. Seek your fortune, a high score, on the seven seas.',
      staticImg: '/assets/mateynence_thumbnail.png',
      gifSrc: '/assets/mateynence.gif',
      mdPath: '/markdown/mateynence.md'
    },
    {
      id: 3,
      title: 'Infinite Worlds',
      desc: 'Three infinite and interactive worlds with seed-based procedural generation. Play around with Conway\'s Game of Life, send ripples through a serene water world, or cut through the clouds in the sky.',
      staticImg: '/assets/worlds_thumbnail.png',
      gifSrc: '/assets/worlds.gif',
      mdPath: '/markdown/worlds.md'
    }
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    if (targetId === 'about') {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // FIXED: Removed the direct document.body mutations
  const openModal = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <div className="logo">Jack Janzen</div>
        <nav>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
        </nav>
      </header>

      <div className="intro-wrapper">
        <div className="intro-container">
          <div className="intro-columns">
            <div className="left-content">
              <div className="hero-container">
                <div className="hero-text">
                  Hi, I'm Jack.<br />Check out some of my work!
                </div>
              </div>

              <div id="about" className="about-section">
                <h2>About Me</h2>
                <p>I'm a game and audio designer specializing in Unity and FMOD Studio. I love creating engaging and responsive systems, sculpting mechanics, SFX, and music to fit core design goals and to improve the player experience. Music composition is a passion of mine, and I've found that the right music takes any game from a nifty trinket to an immersive experience.</p>
                <p>In June 2026, I'll graduate from the Computer Science: Game Design program at the University of Califonia, Santa Cruz. In my time there, I've gained worked with both the minutae of development and design, as well as the big picture of a full production cycle. Between that and participating in game jams, I've gleaned a lot of experience that will be of use to any team I have the pleasure of working with. Read more about some of these projects below!</p>
              </div>
            </div>

            <div className="right-content">
              <div className="portrait">
                <img src="/assets/portrait.jpg" alt="Portrait of Jack" />
              </div>
            </div>
          </div>
          <div className="sticky-buffer"></div>
        </div>
      </div>

      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="project-list">
          {projectsData.map((project) => (
            <ProjectRow 
              key={project.id} 
              project={project} 
              onReadMore={() => openModal(project)} 
            />
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2>Let's Connect</h2>
        <div className="contact-links">
          <a 
            href="/assets/Jack_Janzen_Resume.pdf" 
            className="contact-btn" 
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a 
            href="#" 
            className="contact-btn" 
            onClick={handleCopyEmail}
            style={{ 
              position: 'relative', /* Allows us to float text inside it */
              backgroundColor: isCopied ? '#4CAF50' : undefined,
              borderColor: isCopied ? '#4CAF50' : undefined
            }}
          >
            {/* This invisible text holds the physical width of the button open */}
            <span style={{ opacity: isCopied ? 0 : 1 }}>
              Email Me
            </span>
            
            {/* This text floats directly in the center when active */}
            {isCopied && (
              <span style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)' 
              }}>
                Copied!
              </span>
            )}
          </a>

          <a 
            href="https://www.linkedin.com/in/jack-janzen-629b312b1" 
            target="_blank" 
            rel="noreferrer" 
            className="contact-btn"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={activeProject} 
      />
    </>
  );
}

export default App;