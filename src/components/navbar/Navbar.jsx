import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
function Header() {
  return (
    <Navbar bg="light" expand="lg" className="navigation__bar" >
      <Container>
        <Navbar.Brand href="#home" >Encrypt/Decrypt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto ">
            <Nav.Link href="/Caesar">
              Caesar cipher
            </Nav.Link>
            <Nav.Link href="/Hill">
              Hill cipher
            </Nav.Link>
            <Nav.Link href="/Playfair">
              Playfair cipher
            </Nav.Link>
            <Nav.Link href="/Vigenere">
              Vigenere cipher
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
