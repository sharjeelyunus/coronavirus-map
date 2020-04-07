import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, <a href="https://www.linkedin.com/in/sharjeel-yunus/"></a> Shatjeel Yunus</p>
      </Container>
    </footer>
  );
};

export default Footer;
