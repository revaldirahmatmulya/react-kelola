
## Clone Repository

Lakukan kloning pada repository

```bash
  git clone git@github.com:revaldirahmatmulya/react-kelola.git
  cd react-kelola
```
## Instalasi

Instal dependensi proyek dengan npm atau Yarn

```bash
  npm install
```
atau
```bash
  yarn install
```

## Menambahkan URL API
URL API Ngrok yang sudah anda copy sebelumnya, silahkan paste pada 2 file berikut
1. utils/Api.js
 pada file ini, paste url sebagai contoh :
```javascript
const baseUrl = "https://0035-158-140-172-84.ngrok-free.app/api/";
```

3. pages/RumahDetail.js
  pada file ini, paste url sebagai contoh :
```javascript
const urlAPI = "https://0035-158-140-172-84.ngrok-free.app/";
```

## Menjalankan Project

1. Setelah instalasi selesai, jalankan server pengembangan dengan

```bash
  npm start
```
atau
```bash
  yarn start
```
2. Buka browser dan akses http://localhost:3000 untuk melihat aplikasi berjalan.
    
