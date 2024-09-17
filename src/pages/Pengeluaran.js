import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import {
  fetchPengeluaran,
  fetchCreatePengeluaran,
  fetchPengeluaranByYear,
  fetchDeletePengeluaran,
} from "../utils/Api";
import DatePicker from "react-datepicker";

function Pengeluaran() {
  const [dataPengeluaran, setDataPengeluaran] = React.useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showModalCreatePengeluaran, setShowModalCreatePengeluaran] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPengeluaran();
      setDataPengeluaran(response.data.data);
      console.log(response.data.data);
    };
    fetchData();
  }, []);

  const handleYearChange = async (date) => {
    const year = date.getFullYear();
    setSelectedYear(year);
    const response = await fetchPengeluaranByYear(year);
    setDataPengeluaran(response.data.data);
  };

  const handleShowAddModal = (e) => {
    setShowModalCreatePengeluaran(true);
  };

  const handleCloseModal = () => {
    setShowModalCreatePengeluaran(false);
  };

  const handleAddPengeluaran = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      jenis_pengeluaran: formData.get("jenis_pengeluaran"),
      jumlah_pengeluaran: formData.get("jumlah_pengeluaran"),
      keterangan: formData.get("keterangan"),
      tgl_pengeluaran: formData.get("tgl_pengeluaran"),
    };
    const response = await fetchCreatePengeluaran(data);
    console.log(response);
    if (response.status === 201) {
      alert("Pengeluaran berhasil ditambahkan");
      fetchLatestData();
      setShowModalCreatePengeluaran(false);
    } else {
      alert("Pengeluaran gagal ditambahkan");
    }
  };

  const fetchLatestData = async () => {
    const response = await fetchPengeluaran();
    setDataPengeluaran(response.data.data);
  };

  const handleDeletePengeluaran = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pengeluaran ini?"
    );
    if (confirmDelete) {
      const response = await fetchDeletePengeluaran(id);
      if (response.status === 200) {
        alert("Pengeluaran berhasil dihapus");
        fetchLatestData();
      } else {
        alert("Pengeluaran gagal dihapus !");
      }
    } else {
      alert("Penghapusan dibatalkan.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataPengeluaran.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataPengeluaran.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Row className="header-kavling">
        <Col lg={6}>
          <div className="penghuni-main-tittle-group">
            <h3>Pengeluaran</h3>
            <p className="text-muted">Halaman Mengelola Pengeluaran</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleShowAddModal}>
            Tambahkan Pengeluaran
          </Button>
          <Card style={{ width: "100px" }}>
            <DatePicker
              selected={new Date(selectedYear, 0, 1)}
              onChange={handleYearChange}
              showYearPicker
              dateFormat="yyyy"
              className="form-control date-picker-form"
            />
          </Card>
        </Col>
      </Row>
      <Row className="mt-4" style={{ height: "70vh" }}>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tanggal Pengeluaran</th>
                <th>Jenis Pengeluaran</th>
                <th>Jumlah</th>
                <th>Keterangan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((pengeluaran, index) => (
                <tr key={pengeluaran.id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{pengeluaran.tgl_pengeluaran}</td>
                  <td>{pengeluaran.jenis_pengeluaran}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(pengeluaran.jumlah_pengeluaran)}
                  </td>
                  <td>{pengeluaran.keterangan}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePengeluaran(pengeluaran.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
        </Col>
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

      <Modal show={showModalCreatePengeluaran} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pengeluaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPengeluaran}>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Pengeluaran</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Jenis Pengeluaran"
                name="jenis_pengeluaran"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah Pengeluaran</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Jumlah Pengeluaran"
                name="jumlah_pengeluaran"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Keterangan"
                name="keterangan"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Pengeluaran</Form.Label>
              <Form.Control type="date" name="tgl_pengeluaran" />
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

export default Pengeluaran;
