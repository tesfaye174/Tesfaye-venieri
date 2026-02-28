import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            id: "01",
            title: "ESG-BALANCE",
            description: "Piattaforma per bilanci ESG aziendali: gestione utenti multi-ruolo (admin, revisori, manager), indicatori ambientali/sociali/governance, stored procedures, trigger e viste MySQL.",
            tags: ["MySQL", "PHP", "MongoDB"],
            meta: "BASI_DI_DATI // XAMPP",
            link: "#",
            github: "https://github.com/tesfaye174/BOSTARTER",
            imageClass: "project-gradient-1"
        },
        {
            id: "02",
            title: "Travel Companion",
            description: "App Android per gestione viaggi: tracciamento GPS in tempo reale, galleria foto con CameraX, geofencing per notifiche di prossimita e statistiche di viaggio avanzate.",
            tags: ["Kotlin", "Android Jetpack", "Google Maps"],
            meta: "LAM_PROJECT // MOBILE",
            link: "#",
            github: "https://github.com/tesfaye174/travel-companion",
            imageClass: "project-gradient-2"
        },
        {
            id: "03",
            title: "LABSO_SOSquad",
            description: "Sistema client-server Java con pattern Publish/Subscribe. Comunicazione TCP multithreaded, gestione topic e persistenza messaggi su file system.",
            tags: ["Java", "Socket TCP", "Multithreading"],
            meta: "LAB_SO // SERVER",
            link: "#",
            github: "https://github.com/tesfaye174?tab=repositories",
            imageClass: "project-gradient-3"
        },
        {
            id: "04",
            title: "Interactive Stories",
            description: "Web app per creare e giocare storie interattive a bivi: autenticazione utenti, sistema inventario, salvataggio progressi e scelte narrative ramificate.",
            tags: ["Java", "Maven", "GWT"],
            meta: "SWENG // IN_DEV",
            link: "#",
            github: "https://github.com/tesfaye174/software",
            imageClass: "project-gradient-1"
        },
        {
            id: "05",
            title: "Portfolio Website",
            description: "Questo sito: design brutalista, architettura React component-based, backend Express per form contatti, CSS modulare e deploy ottimizzato con Vite.",
            tags: ["React", "Vite", "Bootstrap"],
            meta: "SELF // LIVE",
            link: "#home",
            github: "https://github.com/tesfaye174",
            imageClass: "project-gradient-2"
        },
        {
            id: "06",
            title: "Java OOP Collection",
            description: "21 esercizi Java progressivi: da calcolatrice e numeri primi fino a gestione studenti, sistema libreria e smartphone manager con ereditarieta e polimorfismo.",
            tags: ["Java", "OOP", "Algorithms"],
            meta: "PROG_INTERNET // 21_EX",
            link: "#",
            github: "https://github.com/tesfaye174/Algoritmi",
            imageClass: "project-gradient-3"
        }
    ];

    return (
        <section className="projects" id="projects">
            <Container>
                <div className="section-head" data-aos="fade-right">
                    <h2 className="section-title" data-label="WORKS">Progetti Selezionati</h2>
                </div>

                <Row className="g-4 g-lg-5">
                    {projects.map((proj, index) => (
                        <Col key={proj.id} xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="project-card-mini">
                                <div className="project-image-mini">
                                    <div className={`project-img-display-mini ${proj.imageClass}`}></div>
                                    <div className="project-overlay-mini">
                                        <div className="d-flex gap-3">
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link-mini" aria-label="Github"><FaGithub /></a>
                                            {proj.link && proj.link !== "#" && (
                                                <a href={proj.link} className="project-link-mini" aria-label="Demo"><FaExternalLinkAlt /></a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="project-tag-floating">{proj.id}</div>
                                </div>

                                <div className="project-content-mini">
                                    <div className="project-meta-mini">
                                        <span>{proj.meta}</span>
                                    </div>
                                    <h3 className="project-title-mini">{proj.title}</h3>
                                    <p className="project-description-mini">{proj.description}</p>
                                    <div className="project-tech-stack-mini">
                                        {proj.tags.map((tag, tIndex) => (
                                            <span key={tIndex} className="tech-pill-mini">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Projects;
