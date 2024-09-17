import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart";
import { Row, Col, Card, Form } from "react-bootstrap";
import {
  fetchTotalIuranPerBulanIn1Year,
  fetchPengeluaranPerBulanIn1Year,
  fetchTotalIuranIn1Year,
  fetchTotalPengeluaranByYear,
  fetchTotalWarga,
  fetchTotalRumah,
} from "../utils/Api";
import DatePicker from "react-datepicker";

function Homepage() {
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [totalIuran, setTotalIuran] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalWarga, setTotalWarga] = useState(0);
  const [totalRumah, setTotalRumah] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTotalWarga();
        const response2 = await fetchTotalRumah();
        setTotalWarga(response.data.data);
        setTotalRumah(response2.data.data);
      } catch (error) {
        console.error("Fetch data error: ", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTotalIuranPerBulanIn1Year(currentYear);
        const response2 = await fetchTotalIuranIn1Year(currentYear);
        console.log(response.data.data);
        setPemasukan(response.data.data);
        setTotalIuran(response2.data.data);
      } catch (error) {
        console.error("Fetch data error: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPengeluaranPerBulanIn1Year(currentYear);
        const response2 = await fetchTotalPengeluaranByYear(currentYear);
        console.log(response.data.data);
        setPengeluaran(response.data.data);
        setTotalPengeluaran(response2.data.data);
      } catch (error) {
        console.error("Fetch data error: ", error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = async (date) => {
    const year = date.getFullYear();
    setSelectedYear(year);

    try {
      const response = await fetchTotalIuranPerBulanIn1Year(year);
      const response2 = await fetchPengeluaranPerBulanIn1Year(year);
      const response3 = await fetchTotalIuranIn1Year(year);
      const response4 = await fetchTotalPengeluaranByYear(year);

      setPemasukan(
        response.status === 200 ? response.data.data : Array(12).fill(0)
      );
      setPengeluaran(
        response2.status === 200 ? response2.data.data : Array(12).fill(0)
      );
      setTotalIuran(response3.status === 200 ? response3.data.data : 0);
      setTotalPengeluaran(response4.status === 200 ? response4.data.data : 0);
    } catch (error) {
      console.error("Error fetching data:", error);

      setPemasukan(Array(12).fill(0));
      setPengeluaran(Array(12).fill(0));
      setTotalIuran(0);
      setTotalPengeluaran(0);
    }
  };

  return (
    <div>
      <Row className="header-kavling">
        <Col lg={6}>
          <div className="penghuni-main-tittle-group">
            <h3>Selamat Datang !</h3>
            <p className="text-muted">Homepage</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Title className="text-center">Jumlah Warga</Card.Title>
            <Card.Body className="text-center">
              <h1>{totalWarga || 0}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Title className="text-center">Jumlah Rumah</Card.Title>
            <Card.Body className="text-center">
              <h1>{totalRumah || 0}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={8}>
          <Card className="card-chart">
            <Card.Body>
              <LineChart
                className="chart-homepage"
                data={pemasukan}
                data2={pengeluaran}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card style={{ height: "100%" }} className="p-4">
            <Card.Title>Pilih Tahun</Card.Title>
            <Form.Group>
              <Form.Label className="fw-bold">Periode</Form.Label>
              <DatePicker
                selected={new Date(selectedYear, 0, 1)}
                onChange={handleYearChange}
                showYearPicker
                dateFormat="yyyy"
                className="form-control date-picker-form"
              />
            </Form.Group>
            <div className="mt-4">
              <h4>Total Uang Iuran Dalam 1 Tahun</h4>
              <h1>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalIuran)}
              </h1>
            </div>
            <div className="mt-4">
              <h4>Total Pengeluaran Dalam 1 Tahun</h4>
              <h1>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalPengeluaran)}
              </h1>
            </div>
            <div className="mt-4">
              <h4>Sisa Saldo</h4>
              <h1>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalIuran - totalPengeluaran)}
              </h1>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;
