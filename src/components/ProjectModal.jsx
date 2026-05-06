import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function ProjectModal({ isOpen, onClose, project }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (!project.mdPath) return;

    let isMounted = true;

    fetch(project.mdPath)
      .then((response) => response.text())
      .then((text) => {
        if (isMounted) setMarkdownContent(text);
      })
      .catch((err) => {
        console.error("Failed to load markdown", err);
        if (isMounted) setMarkdownContent('Error loading description.');
      });

    return () => {
      isMounted = false;
      setMarkdownContent(''); 
    };
  }, [project.mdPath]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) onClose();
    }}>
      <div className="modal-content">
        <h2>{project.title}</h2>
        
        <div className="modal-scroll-area">
          {project.gifSrc && (
            <img id="modal-gif" src={project.gifSrc} alt="Project Gameplay" />
          )}
          
          <div id="modal-body">
            {markdownContent ? (
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            ) : (
              <p>Loading description...</p>
            )}
          </div>
        </div>
        
        <button id="modal-close" className="contact-btn" onClick={onClose}>
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;