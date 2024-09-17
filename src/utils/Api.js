import axios from "axios";

const baseUrl = "paste your ngrok url here";
// for example: const baseUrl = "https://0035-158-140-172-84.ngrok-free.app/api/";

export async function fetchRumahData() {
  try {
    const response = await axios.get(`${baseUrl}rumahs`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching rumah data:", error);
    return [];
  }
}

export async function fetchCreateRumah(data) {
  try {
    const response = await axios.post(`${baseUrl}rumahs`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating rumah:", error);
    return [];
  }
}

export async function fetchRumahById(id) {
  try {
    const response = await axios.get(`${baseUrl}rumahs/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching rumah data:", error);
    return [];
  }
}

export async function fetchUpdateRumah(data, id) {
  try {
    const response = await axios.put(`${baseUrl}rumahs/${id}`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating rumah:", error);
    return [];
  }
}

export async function fetchDeleteRumah(id) {
  try {
    const response = await axios.delete(`${baseUrl}rumahs/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting rumah:", error);
    return [];
  }
}

export async function fetchPenghuniRumah(id) {
  try {
    const response = await axios.get(`${baseUrl}penghuni_rumahs/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching penghuni rumah:", error);
    return [];
  }
}

export async function fetchAllPenghuniRumah() {
  try {
    const response = await axios.get(`${baseUrl}penghuni_rumahs`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching penghuni rumah:", error);
    return [];
  }
}

export async function fetchCreatePenghuniRumah(data) {
  try {
    const response = await axios.post(`${baseUrl}warga-penghuni`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating penghuni rumah:", error);
    return [];
  }
}

export async function fetchUpdatePenghuniRumah(data, id) {
  try {
    const response = await axios.put(`${baseUrl}penghuni_rumahs/${id}`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating penghuni rumah:", error);
    return [];
  }
}

export async function fetchDeletePenghuniRumah(id) {
  try {
    const response = await axios.delete(`${baseUrl}penghuni_rumahs/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting penghuni rumah:", error);
    return [];
  }
}

export async function fetchWargaData() {
  try {
    const response = await axios.get(`${baseUrl}wargas`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching warga data:", error);
    return [];
  }
}

export async function fetchCreateWarga(data) {
  try {
    const response = await axios.post(`${baseUrl}wargas`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating warga:", error);
    return [];
  }
}

export async function fetchWargaById(id) {
  try {
    const response = await axios.get(`${baseUrl}wargas/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching warga data:", error);
    return [];
  }
}

export async function fetchUpdateWarga(data, id) {
  try {
    const response = await axios.put(`${baseUrl}wargas/${id}`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating warga:", error);
    return [];
  }
}

export async function fetchDeleteWarga(id) {
  try {
    const response = await axios.delete(`${baseUrl}wargas/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting warga:", error);
    return [];
  }
}

export async function fetchPembayaranIuranByRumahId(id) {
  try {
    const response = await axios.get(
      `${baseUrl}getPembayaranIuranByRumahId/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching pembayaran iuran:", error);
    return [];
  }
}

export async function fetchWargaByRumahIdinPenghunirumah(id) {
  try {
    const response = await axios.get(
      `${baseUrl}getWargaByRumahIdinPenghunirumah/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching warga by rumah id:", error);
    return [];
  }
}

export async function fetchCreatePembayaranIuran(data) {
  try {
    const response = await axios.post(`${baseUrl}pembayaran_iurans`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating pembayaran iuran:", error);
    return [];
  }
}

export async function fetchTotalIuranPerBulanIn1Year(year) {
  try {
    const response = await axios.get(
      `${baseUrl}getIuranPerBulanDalamTahun/${year}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching total iuran per bulan in 1 year:", error);
    return [];
  }
}

export async function fetchTotalIuranIn1Year(year) {
  try {
    const response = await axios.get(`${baseUrl}totalIuranIn1Year/${year}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching total iuran in 1 year:", error);
    return [];
  }
}

export async function fetchPengeluaranPerBulanIn1Year(year) {
  try {
    const response = await axios.get(
      `${baseUrl}getPengeluaraByDateIn1Year/${year}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching pengeluaran per bulan in 1 year:", error);
    return [];
  }
}

export async function fetchPengeluaran() {
  try {
    const response = await axios.get(`${baseUrl}pengeluarans`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching pengeluaran:", error);
    return [];
  }
}

export async function fetchCreatePengeluaran(data) {
  try {
    const response = await axios.post(`${baseUrl}pengeluarans`, data, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating pengeluaran:", error);
    return [];
  }
}

export async function fetchPengeluaranByYear(year) {
  try {
    const response = await axios.get(`${baseUrl}getPengeluaranByYear/${year}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching pengeluaran by year:", error);
    return [];
  }
}

export async function fetchTotalPengeluaranByYear(year) {
  try {
    const response = await axios.get(
      `${baseUrl}totalPengeluaranIn1Year/${year}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching total pengeluaran by year:", error);
    return [];
  }
}

export async function fetchDeletePengeluaran(id) {
  try {
    const response = await axios.delete(`${baseUrl}pengeluarans/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting pengeluaran:", error);
    return [];
  }
}

export async function fetchTotalWarga() {
  try {
    const response = await axios.get(`${baseUrl}totalWarga`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching total warga:", error);
    return [];
  }
}

export async function fetchTotalRumah() {
  try {
    const response = await axios.get(`${baseUrl}totalRumah`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching total rumah:", error);
    return [];
  }
}

export async function fetchDeletePembayaranIuran(id) {
  try {
    const response = await axios.delete(`${baseUrl}pembayaran_iurans/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting pembayaran iuran:", error);
    return [];
  }
}
