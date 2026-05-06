function ProjectRow({ project, onReadMore }) {
  return (
    <div className="project-row">
      <div className="project-gif">
        <img src={project.staticImg} alt={`${project.title} Preview`} className="static-img" />
        <img src={project.gifSrc} alt={`${project.title} Gameplay`} className="hover-gif" />
      </div>
      
      <div className="project-name">{project.title}</div>
      <div className="project-desc" dangerouslySetInnerHTML={{ __html: project.desc }}></div>
      
      <button className="project-btn" onClick={onReadMore}>
        Read More
      </button>
    </div>
  );
}

export default ProjectRow;