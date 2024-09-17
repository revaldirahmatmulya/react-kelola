import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataTable from "datatables.net-dt";

import {
  fetchRumahById,
  fetchUpdateRumah,
  fetchPenghuniRumah,
  fetchCreatePenghuniRumah,
  fetchUpdateWarga,
  fetchPembayaranIuranByRumahId,
  fetchWargaByRumahIdinPenghunirumah,
  fetchCreatePembayaranIuran,
  fetchDeleteRumah,
  fetchDeletePenghuniRumah,
  fetchDeletePembayaranIuran,
} from "../utils/Api";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Tab,
  Tabs,
  Modal,
  Table,
  Pagination,
} from "react-bootstrap";

const AssetDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [rumahDetails, setRumahDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [penghuniData, setPenghuniData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalAddPenghuni, setShowAddModal] = useState(false);
  const [modalEditPenghuni, setShowEditModal] = useState(false);
  const [selectedPenghuni, setSelectedPenghuni] = useState({
    nama: "",
    ktp: "",
    no_telp: "",
    status: "",
    status_menikah: "",
  });
  const [pembayaranData, setPembayaranData] = useState([]);
  const [modalAddTagihan, setShowAddTagihan] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modalDetail, setShowDetail] = useState(false);

  const urlAPI = "paste your API URL here, without /api";
  // for example: const urlAPI = "https://0035-158-140-172-84.ngrok-free.app/";

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        setIsLoading(true);
        const details = await fetchRumahById(id);
        setRumahDetails(details.data.data);
        console.log(details.data.data);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchPembayaran = async () => {
      if (id) {
        const pembayaran = await fetchPembayaranIuranByRumahId(id);
        setPembayaranData(pembayaran.data.data);
        console.log(pembayaran.data.data);
      }
    };
    fetchPembayaran();
  }, [id]);

  useEffect(() => {
    const fetchPenghuni = async () => {
      if (id) {
        const penghuni = await fetchPenghuniRumah(id);
        setPenghuniData(penghuni.data.data);
        console.log(penghuni.data.data);
      }
    };
    fetchPenghuni();
  }, [id]);

  if (!id) {
    return <p>No ID provided</p>;
  }

  const handleUpdateRumah = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    const form = e.target;
    const data = {
      alamat: form.elements[0].value,
      status_rumah: form.elements[1].value,
    };
    const response = await fetchUpdateRumah(data, id);
    console.log(data);

    if (response.status === 200) {
      setIsLoadingAction(false);
      setIsEditFormVisible(false);
      fetchLatestData();
      alert("Berhasil mengupdate data");
    } else {
      alert("Gagal mengupdate data");
    }
  };

  const handleAddPenghuni = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    const form = e.target;

    const formData = new FormData();
    formData.append("nama", form.elements[0].value);
    formData.append("ktp", form.elements["ktp"].files[0]);
    formData.append("no_telp", form.elements[2].value);
    formData.append("status", form.elements[3].value);
    formData.append("status_menikah", form.elements[4].value);
    formData.append("rumah_id", id);
    formData.append("tgl_bergabung", new Date().toISOString().split("T")[0]);

    try {
      const response = await fetchCreatePenghuniRumah(formData, id);

      console.log(formData);
      console.log(response);

      if (response.status === 201) {
        setIsLoadingAction(false);
        setShowAddModal(false);
        fetchLatestData();
        alert("Berhasil menambahkan penghuni");
      } else {
        alert("Gagal menambahkan penghuni");
      }
    } catch (error) {
      console.error("Error adding penghuni: ", error);
      alert("Terjadi kesalahan saat menambahkan penghuni");
    }
  };

  const handleUpdatePenghuni = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    const form = e.target;
    const formData = new FormData();
    formData.append("nama", form.elements[0].value);
    formData.append("ktp", form.elements["ktp"].files[0]); // Mengambil file KTP
    formData.append("no_telp", form.elements[2].value);
    formData.append("status", form.elements[3].value);
    formData.append("status_menikah", form.elements[4].value);
    formData.append("rumah_id", id);
    formData.append("tgl_bergabung", new Date().toISOString().split("T")[0]);
    const response = await fetchUpdateWarga(formData, selectedPenghuni.id);
    console.log(formData);
    if (response.status === 200) {
      setIsLoadingAction(false);
      setShowEditModal(false);
      fetchLatestData();
      alert("Berhasil mengupdate penghuni");
    } else {
      alert("Gagal mengupdate penghuni");
    }
  };

  const handleAddTagihan = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    const form = e.target;
    const data = {
      PenghuniRumah_id: form.elements[0].value,
      jenis_iuran: form.elements[1].value,
      periode_bayar: form.elements[2].value,
      status_pembayaran: form.elements[3].value,
      jumlah_iuran: form.elements[4].value,
      tgl_pembayaran: form.elements[5].value,
    };
    const response = await fetchCreatePembayaranIuran(data);
    console.log(response);
    console.log(data);
    if (response.status === 201) {
      setIsLoadingAction(false);
      setShowAddTagihan(false);
      fetchLatestData();
      alert("Berhasil menambahkan tagihan");
    } else {
      alert("Gagal menambahkan tagihan");
    }
  };

  const fetchLatestData = async () => {
    const details = await fetchRumahById(id);
    const penghuni = await fetchPenghuniRumah(id);
    const pembayaran = await fetchPembayaranIuranByRumahId(id);
    setRumahDetails(details.data.data);
    setPenghuniData(penghuni.data.data);
    setPembayaranData(pembayaran.data.data);
  };

  const handleEditRumah = () => {
    isEditFormVisible
      ? setIsEditFormVisible(false)
      : setIsEditFormVisible(true);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (penghuni) => {
    setSelectedPenghuni(penghuni);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowAddTagihan(false);
    setShowDetail(false);
  };

  const handleShowAddTagihan = () => {
    setShowAddTagihan(true);
  };

  const handleDeleteRumah = async () => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (confirmDelete) {
      const response = await fetchDeleteRumah(id);
      if (response.status === 200) {
        alert("Rumah berhasil dihapus");
        window.location.href = "/rumah";
      } else {
        alert("Rumah gagal dihapus !");
      }
    }
  };

  const handleShowDetail = (warga) => {
    setSelectedPenghuni(warga);
    setShowDetail(true);
  };

  const handleDeletePenghuni = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus penghuni ini?"
    );
    if (confirmDelete) {
      const response = await fetchDeletePenghuniRumah(id);
      if (response.status === 200) {
        alert("Penghuni berhasil dihapus");
        fetchLatestData();
      } else {
        alert("Penghuni gagal dihapus !");
      }
    }
  };

  const handleDeletePembayaran = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus pembayaran ini?"
    );
    if (confirmDelete) {
      const response = await fetchDeletePembayaranIuran(id);
      if (response.status === 200) {
        alert("Pembayaran berhasil dihapus");
        fetchLatestData();
      } else {
        alert("Pembayaran gagal dihapus !");
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsPenghuni = penghuniData
    .filter((penghuni) =>
      penghuni.warga.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsPembayaran = pembayaranData
    .filter((pembayaran) =>
      pembayaran.penghuni_rumah.warga.nama
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPagesPenghuni = Math.ceil(penghuniData.length / itemsPerPage);
  const totalPagesPembayaran = Math.ceil(pembayaranData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && rumahDetails && (
        <>
          <Row>
            <Col lg={3}>
              <div className="image-kavling">
                <img
                  src="https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{ width: "265px" }}
                  className="rounded"
                />
              </div>
            </Col>
            <Col lg={9}>
              <Row>
                <Col lg={12}>
                  <div className="detail-modal-tittle d-flex justify-content-between mb-3 ms-2">
                    <h3>{rumahDetails.alamat}</h3>
                    {isEditFormVisible ? (
                      <div className="">
                        <Button
                          variant="danger"
                          onClick={handleDeleteRumah}
                          style={{ width: "200px" }}
                          className="me-2"
                        >
                          Hapus Rumah
                        </Button>
                        <Button
                          variant="warning"
                          onClick={handleEditRumah}
                          style={{ width: "100px" }}
                        >
                          Batal
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="success"
                        onClick={handleEditRumah}
                        style={{ width: "100px" }}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>

              {isEditFormVisible ? (
                <Form onSubmit={handleUpdateRumah}>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat Rumah</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={rumahDetails.alamat}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option
                        selected={rumahDetails.status_rumah === "dihuni"}
                        value="dihuni"
                      >
                        Dihuni
                      </option>
                      <option
                        selected={rumahDetails.status_rumah === "tidak_dihuni"}
                        value="tidak_dihuni"
                      >
                        Tidak dihuni
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Simpan
                  </Button>
                </Form>
              ) : (
                <>
                  <Row>
                    <Col lg={12}>
                      <Card>
                        <Card.Body>
                          <Card.Text as="div">
                            <Row>
                              <Col lg={6}>
                                <p className="text-muted">Alamat Rumah</p>
                                <h4>{rumahDetails.alamat}</h4>
                              </Col>
                              <Col lg={6}>
                                <p className="text-muted">Status</p>
                                <h4>{rumahDetails.status_rumah}</h4>
                              </Col>
                            </Row>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg={12}>
              <h3>Data Rumah</h3>
            </Col>
            <Col lg={12}>
              <Tabs
                defaultActiveKey="penghuni"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="penghuni" title="Penghuni">
                  <Row className="mb-3">
                    <Col lg={3}>
                      <Button variant="primary" onClick={handleShowAddModal}>
                        Tambah Penghuni
                      </Button>
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
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th style={{ cursor: "pointer" }}>No Telp</th>
                        <th style={{ cursor: "pointer" }}>Status Menikah</th>
                        <th style={{ cursor: "pointer" }}>Status Huni</th>
                        <th>Tgl Bergabung</th>
                        <th width="20%">Opsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsPenghuni.length === 0 && (
                        <p>Belum ada data kamar</p>
                      )}
                      {currentItemsPenghuni.map((penghuni) => {
                        return (
                          <tr key={penghuni.warga.id}>
                            <td>{penghuni.warga.nama}</td>

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
                              {penghuni.warga.status
                                ? penghuni.warga.status
                                : "kosong"}
                            </td>
                            <td>{penghuni.tgl_masuk}</td>
                            <td>
                              <Button
                                onClick={(e) =>
                                  handleShowEditModal(penghuni.warga)
                                }
                                className="btn btn-primary m-3"
                              >
                                Edit
                              </Button>
                              <Button
                                className="btn btn-warning me-3"
                                onClick={(e) =>
                                  handleShowDetail(penghuni.warga)
                                }
                              >
                                Lihat
                              </Button>
                              <Button
                                onClick={(e) =>
                                  handleDeletePenghuni(penghuni.id)
                                }
                                className="btn btn-danger"
                              >
                                Hapus Data
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>

                  <Row>
                    <Col>
                      <Pagination>
                        {Array.from(
                          { length: totalPagesPenghuni },
                          (_, index) => (
                            <Pagination.Item
                              key={index + 1}
                              active={index + 1 === currentPage}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </Pagination.Item>
                          )
                        )}
                      </Pagination>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="riwayat" title="Riwayat Tagihan">
                  <Row className="mb-3">
                    <Col lg={3}>
                      <Button variant="primary" onClick={handleShowAddTagihan}>
                        Tambahkan Tagihan
                      </Button>
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
                  <Table id="myTable" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th style={{ cursor: "pointer" }}>Jenis Iuran</th>
                        <th style={{ cursor: "pointer" }}>Jumlah Pembayaran</th>
                        <th>Periode Bayar</th>
                        <th style={{ cursor: "pointer" }}>
                          Tanggal Pembayaran
                        </th>
                        <th>Status Pembayaran</th>
                        <th>Opsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsPembayaran.length === 0 && (
                        <p>Belum ada data</p>
                      )}
                      {currentItemsPembayaran.map((pembayaran) => {
                        return (
                          <tr key={pembayaran.id}>
                            <td>{pembayaran.penghuni_rumah.warga.nama}</td>
                            <td>{pembayaran.jenis_iuran}</td>
                            <td>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(pembayaran.jumlah_iuran)}
                            </td>
                            <td>{pembayaran.periode_bayar}</td>
                            <td>{pembayaran.tgl_pembayaran}</td>
                            <td>{pembayaran.status_pembayaran}</td>
                            <td>
                              <Button
                                onClick={(e) =>
                                  handleDeletePembayaran(pembayaran.id)
                                }
                                className="btn btn-danger"
                              >
                                Hapus Data
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Row>
                    <Col>
                      <Pagination>
                        {Array.from(
                          { length: totalPagesPembayaran },
                          (_, index) => (
                            <Pagination.Item
                              key={index + 1}
                              active={index + 1 === currentPage}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </Pagination.Item>
                          )
                        )}
                      </Pagination>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}

      <Modal
        show={modalAddPenghuni}
        onHide={handleCloseModal}
        encType="multipart/form-data"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Penghuni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPenghuni}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                name="nama"
                type="text"
                placeholder="Masukkan nama"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Foto KTP</Form.Label>
              <Form.Control name="ktp" type="file" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>No Telp</Form.Label>
              <Form.Control
                name="no_telp"
                type="text"
                placeholder="Masukkan nomor telepon"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Huni</Form.Label>
              <Form.Select name="status" aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="tetap">Tetap</option>
                <option value="kontrak">Kontrak</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Menikah</Form.Label>
              <Form.Select
                name="statu_menikah"
                aria-label="Default select example"
              >
                <option>Open this select menu</option>
                <option value="Sudah">Sudah Menikah</option>
                <option value="Belum">Belum Menikah</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Tambah
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalEditPenghuni}
        onHide={handleCloseModal}
        encType="multipart/form-data"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Penghuni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdatePenghuni}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                placeholder="Masukkan nama"
                defaultValue={selectedPenghuni.nama}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Foto KTP</Form.Label>
              <Form.Control name="ktp" type="file" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>No Telp</Form.Label>
              <Form.Control
                type="text"
                name="no_telp"
                placeholder="Masukkan nomor telepon"
                defaultValue={selectedPenghuni.no_telp}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Huni</Form.Label>
              <Form.Select aria-label="Default select example" name="status">
                <option>Open this select menu</option>
                <option
                  value="tetap"
                  selected={selectedPenghuni.status === "tetap"}
                >
                  Tetap
                </option>
                <option
                  value="kontrak"
                  selected={selectedPenghuni.status === "kontrak"}
                >
                  Kontrak
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Menikah</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="status_menikah"
              >
                <option>Open this select menu</option>
                <option
                  defaultValue="Sudah"
                  selected={selectedPenghuni.status_menikah === "Sudah"}
                >
                  Sudah
                </option>
                <option
                  defaultValue="Belum"
                  selected={selectedPenghuni.status_menikah === "Belum"}
                >
                  Belum
                </option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={modalAddTagihan} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Tagihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTagihan}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                {penghuniData.map((penghuni) => (
                  <option value={penghuni.id}>{penghuni.warga.nama}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Iuran</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="satpam">Satpam</option>
                <option value="kebersihan">Kebersihan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Periode Bayar</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="tahun">Tahunan</option>
                <option value="bulan">Bulanan</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status Pembayaran</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="lunas">Lunas</option>
                <option value="belum">Belum</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah Iuran</Form.Label>
              <Form.Control type="text" placeholder="Masukkan jumlah iuran" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Pembayaran</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Tambah
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={modalDetail} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img
              src={`${urlAPI}${selectedPenghuni.ktp}`}
              alt="Foto KTP"
              style={{ width: "500px" }}
            />
          </div>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>{selectedPenghuni.nama}</td>
              </tr>

              <tr>
                <td>No Telp</td>
                <td>{selectedPenghuni.no_telp}</td>
              </tr>
              <tr>
                <td>Status Menikah</td>
                <td>{selectedPenghuni.status_menikah}</td>
              </tr>
              <tr>
                <td>Status Huni</td>
                <td>{selectedPenghuni.status}</td>
              </tr>
              <tr>
                <td>Tgl Bergabung</td>
                <td>{selectedPenghuni.tgl_bergabung}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssetDetail;
