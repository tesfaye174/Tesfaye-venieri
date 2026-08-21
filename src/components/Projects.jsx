import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef, useCallback } from 'react';

const Projects = () => {
    const cardRefs = useRef({});

    const handleCardMouseMove = useCallback((e, projId) => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        const card = cardRefs.current[projId];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transition = 'box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = `
            perspective(800px)
            rotateX(${y * -10}deg)
            rotateY(${x * 14}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    }, []);

    const handleCardMouseLeave = useCallback((e, projId) => {
        const card = cardRefs.current[projId];
        if (!card) return;

        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';
    }, []);

    const projects = [
        {
            id: "01",
            title: "LABSO_SOSquad",
            description: "Sistema client-server Java con pattern Publish/Subscribe. Comunicazione TCP multithreaded, gestione topic e persistenza messaggi su file system.",
            tags: ["Java", "Socket TCP", "Multithreading"],
            meta: "LAB_SO // SERVER",
            github: "https://github.com/tesfaye174",
            imageClass: "project-gradient-3"
        },
        {
            id: "02",
            title: "Portfolio Website",
            description: "Questo sito: design dark luxury, architettura React component-based, backend serverless per form contatti, CSS modulare e deploy ottimizzato con Vite.",
            tags: ["React", "Vite", "Bootstrap"],
            meta: "SELF // LIVE",
            link: "#home",
            github: "https://github.com/tesfaye174/Tesfaye-venieri",
            imageClass: "project-gradient-2"
        },
        {
            id: "03",
            title: "ESG-BALANCE",
            description: "Piattaforma per bilanci ESG aziendali: gestione utenti multi-ruolo (admin, revisori, manager), indicatori ambientali/sociali/governance, stored procedures e trigger MySQL.",
            tags: ["MySQL", "PHP", "MongoDB"],
            meta: "BASI_DI_DATI // XAMPP",
            github: "https://github.com/tesfaye174/ESG-Balance",
            imageClass: "project-gradient-1"
        },
        {
            id: "04",
            title: "Travel Companion",
            description: "App Android per gestione viaggi: tracciamento GPS in tempo reale, galleria foto con CameraX, geofencing per notifiche di prossimità e statistiche di viaggio avanzate.",
            tags: ["Kotlin", "Android Jetpack", "Google Maps"],
            meta: "LAM_PROJECT // MOBILE",
            github: "https://github.com/tesfaye174/travel-companion",
            imageClass: "project-gradient-2"
        },
        {
            id: "05",
            title: "BOSTARTER",
            description: "Piattaforma di crowdfunding ispirata a Kickstarter: gestione campagne, sistema di finanziamento, dashboard utenti e pannello amministrativo con PHP e MySQL.",
            tags: ["PHP", "MySQL", "Web"],
            meta: "BASI_DI_DATI // WEB",
            github: "https://github.com/tesfaye174/BOSTARTER",
            imageClass: "project-gradient-3"
        },
        {
            id: "06",
            title: "Interactive Stories",
            description: "Web app per creare e giocare storie interattive a bivi: autenticazione utenti, sistema inventario, salvataggio progressi e scelte narrative ramificate.",
            tags: ["Java", "Maven", "GWT"],
            meta: "SWENG // IN_DEV",
            github: "https://github.com/tesfaye174/software",
            imageClass: "project-gradient-1"
        },
        {
            id: "07",
            title: "Gymbro",
            description: "Web app per il fitness e tracking allenamenti: gestione schede personalizzate, monitoraggio progressi, statistiche workout e interfaccia moderna in TypeScript.",
            tags: ["TypeScript", "Next.js", "Fitness"],
            meta: "PERSONAL // WEB_APP",
            github: "https://github.com/tesfaye174/Gymbro",
            imageClass: "project-gradient-2"
        },
        {
            id: "08",
            title: "Java OOP Collection",
            description: "21 esercizi Java progressivi: da calcolatrice e numeri primi fino a gestione studenti, sistema libreria e smartphone manager con ereditarietà e polimorfismo.",
            tags: ["Java", "OOP", "Algorithms"],
            meta: "PROG_INTERNET // 21_EX",
            github: "https://github.com/tesfaye174/Algoritmi",
            imageClass: "project-gradient-3"
        },
        {
            id: "09",
            title: "Dress",
            description: "App Android per la gestione del guardaroba digitale: catalogazione outfit, suggerimenti abbinamenti, organizzazione capi per categoria e stagione in Kotlin.",
            tags: ["Kotlin", "Android", "Mobile"],
            meta: "LAM_PROJECT // MOBILE",
            github: "https://github.com/tesfaye174/dress",
            imageClass: "project-gradient-1"
        }
    ];

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="section-head" data-aos="fade-right">
                    <h2 className="section-title" data-label="WORKS">Progetti Selezionati</h2>
                </div>

                <div className="projects-grid">
                    {projects.map((proj, index) => (
                        <div
                            key={proj.id}
                            className="project-col"
                            data-aos="fade-up"
                            data-aos-delay={index * 80}
                        >
                            <div
                                ref={(el) => cardRefs.current[proj.id] = el}
                                className="project-card-mini"
                                onMouseMove={(e) => handleCardMouseMove(e, proj.id)}
                                onMouseLeave={(e) => handleCardMouseLeave(e, proj.id)}
                            >
                                <div className="project-image-mini">
                                    <div className={`project-img-display-mini ${proj.imageClass}`}>
                                        <div className="project-gradient-title">
                                            <span>{proj.title}</span>
                                        </div>
                                    </div>
                                    <div className="project-overlay-mini">
                                        <div className="project-links">
                                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link-mini" aria-label={`Codice GitHub di ${proj.title}`}><FaGithub /></a>
                                            {proj.link && proj.link !== "#" && (
                                                <a href={proj.link} className="project-link-mini" aria-label={`Demo di ${proj.title}`}><FaExternalLinkAlt /></a>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
