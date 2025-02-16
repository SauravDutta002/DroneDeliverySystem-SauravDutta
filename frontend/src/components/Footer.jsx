import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Icons for LinkedIn, GitHub, Facebook, and Instagram

const Footer = () => {
  return (
    <footer className="corporate-footer">
      <div className="footer-content">
        <p>&copy; 2024 Saurav Dutta. All Rights Reserved.</p>
        I’m Saurav Dutta, a passionate web developer with expertise in React and
        the MERN stack. I focus on building high-performance, scalable
        applications, delivering seamless user experiences, and writing clean,
        maintainable code. With a strong focus on problem-solving, I stay ahead
        of the latest trends in web development.
        <br />
        Connect with me on social media or visit my GitHub to explore my
        projects and contributions!
      </div>

      <div className="social-icons">
        <a href="https://github.com/SauravDutta002" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a
          href="https://www.linkedin.com/in/saurav-dutta-450355315/"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/sauravdutta02/profilecard/?igsh=MThsc2lub2NjZmNrcw%3D%3D"
          target="_blank"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
