import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>Corona Virus (COVID-19)</p>
        <ul>
          <li>
            <Link to="https://github.com/sharjeelyunus/coronavirus-map">Source Code</Link>
          </li>
          <li>
            <Link to="https://github.com/sharjeelyunus"><FaGithub /></Link>
          </li>
          <li>
            <Link to="https://facebook.com/sharjeelyunus1"><FaFacebook /></Link>
          </li>
          <li>
            <Link to="https://twitter.com/sharjeelyunus"><FaTwitter /></Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/sharjeel-yunus/"><FaLinkedIn /></Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
