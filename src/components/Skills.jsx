import { Container, Row, Col } from 'react-bootstrap';
import { FaLaptopCode, FaTools, FaChess } from 'react-icons/fa';

const Skills = () => {
    const skillGroups = [
        {
            id: "01",
            title: "Development",
            icon: <FaLaptopCode />,
            tags: ["Java", "Kotlin", "JavaScript", "React", "HTML5 & CSS3", "C", "SQL", "PHP"]
        },
        {
            id: "02",
            title: "Tools & Platform",
            icon: <FaTools />,
            tags: ["Git & GitHub", "Node.js / Express", "PostgreSQL", "MySQL", "Android Studio", "VS Code", "IntelliJ", "Figma", "Maven"]
        },
        {
            id: "03",
            title: "Strategic",
            icon: <FaChess />,
            tags: ["Design Patterns", "RESTful APIs", "Database Design", "Software Architecture", "Problem Solving", "Agile / Scrum", "UML", "GRASP / SOLID"]
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
                        <Col key={index} xs={12} md={6} lg={4} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="skill-category">
                                <div className="skill-id">{group.id}</div>
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
