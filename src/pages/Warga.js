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
import { fetchAllPenghuniRumah } from "../utils/Api";

function Warga() {
  const [dataWarga, setDataWarga] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllPenghuniRumah();
      console.log(response);
      setDataWarga(response.data.data);
    };
    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataWarga
    .filter((item) => {
      return (
        item.warga.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.warga.ktp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rumah.alamat.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataWarga.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Row className="header-kavling">
        <Col lg={3}>
          <div className="penghuni-main-tittle-group">
            <h3>Warga</h3>
            <p className="text-muted">List Data Warga</p>
          </div>
        </Col>
        <Col lg={9}>
          <div className="group-search d-flex justify-content-end">
            <Form.Control
              type="text"
              placeholder="Cari Penghuni"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
              style={{ width: "300px" }}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ height: "60vh" }}>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nama</th>
                <th style={{ cursor: "pointer" }}>KTP</th>
                <th style={{ cursor: "pointer" }}>No Telp</th>
                <th style={{ cursor: "pointer" }}>Status Menikah</th>
                <th style={{ cursor: "pointer" }}>Status Huni</th>
                <th>Tgl Bergabung</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 && <p>Belum ada data</p>}
              {currentItems.map((penghuni) => {
                return (
                  <tr key={penghuni.warga.id}>
                    <td>{penghuni.warga.nama}</td>
                    <td>
                      {penghuni.warga.ktp ? penghuni.warga.ktp : "kosong"}
                    </td>
                    <td>
                      {penghuni.warga.no_telp
                        ? penghuni.warga.no_telp
                        : "kosong"}
                    </td>
                    <td>
                      {penghuni.warga.status_menikah
                        ? penghuni.warga.status_menikah
                        : "kosong"}
                    </td>
                    <td>
                      {penghuni.warga.status ? penghuni.warga.status : "kosong"}
                    </td>
                    <td>{penghuni.tgl_masuk}</td>
                    <td>
                      {penghuni.rumah.alamat ? penghuni.rumah.alamat : "kosong"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
    </div>
  );
}

export default Warga;
