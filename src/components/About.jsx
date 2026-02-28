import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';

const About = () => {
    const experiences = [
        {
            year: "2026",
            title: "Il Presente",
            role: "Full-Stack Developer & Strategist",
            location: "Bologna, Italia",
            description: "6 progetti universitari attivi, un portfolio che racconta chi sono e una visione chiara: unire tecnologia e management per costruire qualcosa che conta. Il mio nome significa Hope — e questa e la promessa.",
            icon: <FaBriefcase />
        },
        {
            year: "2022",
            title: "La Formazione",
            role: "Informatica per il Management",
            location: "Alma Mater Studiorum — UniBo",
            description: "Java, Kotlin, SQL, sistemi operativi, ingegneria del software. Non solo codice: ho imparato a pensare in modo strategico, analizzare problemi complessi e trasformarli in soluzioni concrete.",
            icon: <FaCode />
        },
        {
            year: "ORIGIN",
            title: "L'Origine",
            role: "Da Addis Abeba al Mondo",
            location: "Addis Abeba, Etiopia",
            description: "Nato ad Addis Abeba, cresciuto tra due culture. Il viaggio dall'Etiopia all'Italia mi ha insegnato l'adattabilita, la resilienza e il valore di ogni opportunita. Tesfaye significa Speranza — e porto questo significato in tutto cio che faccio.",
            icon: <FaGraduationCap />
        }
    ];

    return (
        <section className="about" id="about">
            <Container>
                <div className="section-head" data-aos="fade-right">
                    <h2 className="section-title" data-label="JOURNEY">Il Mio Viaggio</h2>
                </div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div className="timeline-item" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                            <span className="timeline-year">{exp.year}</span>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-icon-mobile">{exp.icon}</div>
                                <span className="timeline-role">{exp.role}</span>
                                <h3>{exp.title}</h3>
                                <div className="timeline-location">
                                    {exp.location}
                                </div>
                                <p>{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default About;
