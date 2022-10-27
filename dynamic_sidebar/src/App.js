import "./App.css";
import logo from "./logo.svg";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsFillGearFill } from "react-icons/bs";
import { useState } from "react";
import { generateId } from "./util/generate";

function App() {
  const defaultVal = [
    {
      id: generateId(),
      title: "First Menu",
      content: "This is content 1",
    },
    {
      id: generateId(),
      title: "Second Menu",
      content: "This is content 2",
    },
    {
      id: generateId(),
      title: "Third Menu",
      content: "This is content 3",
    },
  ];
  const [menu, setMenu] = useState(defaultVal);

  const addMenu = () => {
    let title = prompt("Enter menu title: ");
    let id = generateId();
    let newMenu = {
      id: id,
      title: title,
      content: "This is content of " + title,
    };

    setMenu((menu) => [...menu, newMenu]);
  };

  const editMenu = (id) => {
    let title = prompt("Enter new menu title: ");
    setMenu(
      menu.map((item) => {
        if (item.id === id) item.title = title;
        return item;
      })
    );
  };

  const deleteMenu = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      let newMenu = menu.filter((item) => item.id != id);
      setMenu(newMenu);
      alert("Deleted successfully!");
    }
  };

  const menuTools = (id) => {
    return (
      <DropdownButton
        key={"setting-" + id}
        drop="end"
        variant="link"
        id="settings"
        title={<BsFillGearFill />}
      >
        <Dropdown.Item eventKey={"edit-" + id} onClick={() => editMenu(id)}>
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={"edit-" + id}
          className="text-danger"
          onClick={() => deleteMenu(id)}
        >
          Delete
        </Dropdown.Item>
      </DropdownButton>
    );
  };

  return (
    <Tab.Container defaultActiveKey="first">
      <Row>
        <Col sm={3} id="sidebar">
          <div className="sidebar-title">
            <img src={logo} id="logo" alt="logo" />
            <h4>Dynamic sidebar</h4>
          </div>
          <Nav variant="pills" className="flex-column">
            {menu.map((item, index) => (
              <Nav.Item key={item.id}>
                <Nav.Link eventKey={"content-" + item.id}>
                  {item.title}
                </Nav.Link>
                {menuTools(item.id)}
              </Nav.Item>
            ))}
            <Nav.Item key="add-item">
              <Nav.Link
                eventKey={"none"}
                className="add-item"
                onClick={() => addMenu()}
              >
                ADD NEW ITEM (+){" "}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {menu.map((item) => (
              <Tab.Pane
                eventKey={"content-" + item.id}
                key={"content-" + item.id}
              >
                <h5>{item.content}</h5>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default App;
