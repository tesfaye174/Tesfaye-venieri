import { Container, Row, Col } from 'react-bootstrap';
import { FaLaptopCode, FaDatabase, FaCogs, FaMobileAlt } from 'react-icons/fa';

const Skills = () => {
    const skillGroups = [
        {
            id: "01",
            title: "Linguaggi & Sviluppo",
            icon: <FaLaptopCode />,
            tags: ["Java", "Kotlin", "PHP", "JavaScript", "React.js", "HTML5 & CSS3"]
        },
        {
            id: "02",
            title: "Data & Infrastruttura",
            icon: <FaDatabase />,
            tags: ["MySQL", "MongoDB", "XAMPP", "Git & GitHub", "Maven", "Linux/Bash"]
        },
        {
            id: "03",
            title: "Mobile & Architettura",
            icon: <FaMobileAlt />,
            tags: ["Android Jetpack", "Google Maps API", "CameraX", "Socket TCP", "Multithreading", "REST APIs"]
        },
        {
            id: "04",
            title: "Management & Metodologie",
            icon: <FaCogs />,
            tags: ["Agile/Scrum", "UML & Design Patterns", "GRASP/SOLID", "Business Analysis", "Problem Solving"]
        }
    ];

    return (
        <section className="skills" id="skills">
            <Container>
                <div className="section-head" data-aos="fade-right">
                    <h2 className="section-title" data-label="TOOLKIT">Competenze Tecniche</h2>
                </div>

                <Row className="g-4 g-lg-5">
                    {skillGroups.map((group, index) => (
                        <Col key={index} xs={12} md={6} lg={3} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="skill-category">
                                <div className="skill-icon">
                                    {group.icon}
                                </div>
                                <h3>{group.title}</h3>
                                <div className="skill-tags">
                                    {group.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="skill-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
