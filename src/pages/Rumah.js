import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Pagination,
  Tabs,
  Tab,
} from "react-bootstrap";
import { fetchRumahData, fetchCreateRumah } from "../utils/Api";
import KavlingIcon from "@mui/icons-material/Apartment";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";

function Asset() {
  const [showModalCreateKavling, setShowModalCreateKavling] = useState(false);
  const [rumahData, setRumahData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchRumahData();
      setRumahData(data.data.data);
      console.log(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate("/rumah-detail", { state: { id } });
  };

  const handleShowModalCreateKavling = () => {
    showModalCreateKavling
      ? setShowModalCreateKavling(false)
      : setShowModalCreateKavling(true);
  };

  const handleAddRumah = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      alamat: form.elements[0].value,
      status_rumah: "tidak_dihuni",
    };
    const response = await fetchCreateRumah(data);
    console.log(response);
    setShowModalCreateKavling(false);
    fetchLatestData();
  };

  const fetchLatestData = async () => {
    setIsLoading(true);
    const data = await fetchRumahData();
    setRumahData(data.data.data);
    setIsLoading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rumahData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rumahData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="kavling justify-content-between">
      <div className="card-group-kavling">
        <Row className="header-kavling ">
          <Col>
            <div className="penghuni-main-tittle-group">
              <h3>List Rumah</h3>
              <p className="text-muted">Daftar Rumah</p>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Button variant="primary" onClick={handleShowModalCreateKavling}>
              Tambah Rumah
            </Button>
          </Col>
        </Row>
        <Row className="kavling-card-row" style={{ height: "70vh" }}>
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            currentItems.map((rumah) => (
              <Col
                key={rumah.id}
                lg={4}
                className="d-flex justify-content-center"
              >
                <Card
                  className="my-3 p-3 rounded kavling-card "
                  onClick={() => handleCardClick(rumah.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Row>
                      <Col lg={9}>
                        <Card.Title as="div">
                          <strong
                            className="kavling-card-nama"
                            style={{ fontSize: "16px" }}
                          >
                            {rumah.alamat}
                          </strong>
                        </Card.Title>
                      </Col>
                      <Col lg={3} className="text-end">
                        <KavlingIcon
                          fontSize="large"
                          color={
                            rumah.status_rumah === "tidak_dihuni"
                              ? "error"
                              : "inherit"
                          }
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Row>
          <Col>
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </div>

      <Modal
        show={showModalCreateKavling}
        onHide={handleShowModalCreateKavling}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Rumah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddRumah}>
            <Form.Group className="mb-3">
              <Form.Label>Alamat Rumah</Form.Label>
              <Form.Control type="text" placeholder="Masukkan alamat kavling" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Tambah
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Asset;
