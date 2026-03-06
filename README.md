# PMSAC - Poor Man's System Attendance Control

A lightweight barcode-scanning attendance tracking system built with Node.js. Employees scan barcodes or QR codes to check in/out, and admins can register employees, view attendance records, and export reports — all without needing a database server.

## Features

- **Barcode/QR scanning** — Uses the device camera to scan employee ID barcodes for instant check-in/check-out
- **Automatic entry/exit detection** — The system alternates between "entrada" (entry) and "salida" (exit) based on the last record
- **Employee registration** — Register employees with name, last name, position, ID number, and photo
- **Photo upload** — Upload employee photos via drag-and-drop (FilePond)
- **Attendance reports** — View all attendance records in a searchable, sortable DataTable
- **Export options** — Export reports to Excel, CSV, PDF, copy to clipboard, or print directly
- **Zero database setup** — All data is stored in a single JSON file (`public/registro.json`)
- **Spanish language UI**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | Bootstrap 5, jQuery 3.6, DataTables 1.11 |
| Barcode scanning | Html5Qrcode |
| File uploads | FilePond (client) + Formidable (server) |
| PDF generation | PDFMake |
| Data storage | JSON file |

## Prerequisites

- **Node.js** v14 or higher
- A modern web browser (Chrome, Firefox, Edge)
- Camera access (for barcode scanning feature)

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/99Arrzel/PMSAC.git
cd PMSAC

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Open http://localhost:3000 in your browser. That's it.

## Pages

| URL | Description |
|-----|-------------|
| `http://localhost:3000/` | Main page — scan barcodes to mark attendance |
| `http://localhost:3000/registro_personal` | Employee registration and management |

## How It Works

1. **Register employees** at `/registro_personal` — enter their ID number, name, position, and upload a photo
2. **Mark attendance** at `/` — scan an employee's barcode or enter their ID manually
3. The system automatically records the timestamp and determines if it's an entry or exit
4. **View reports** — click "Ver todos los registros" to see all attendance records with export options

### Employee Positions

- `DIRECTOR`
- `PERSONAL`
- `PASANTE`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main attendance page |
| `GET` | `/registro_personal` | Employee registration page |
| `POST` | `/checkId` | Record attendance (body: `id`) |
| `POST` | `/addUser` | Register new employee (body: `id`, `nombre`, `apellido`, `puesto`, `img`) |
| `POST` | `/getMarcas` | Get attendance records for an employee (body: `id`) |
| `POST` | `/img/upload` | Upload employee photo (multipart form) |
| `GET` | `/public/registro.json` | Raw JSON data (used by DataTables) |

## Data Format

All data lives in `public/registro.json`:

```json
{
  "data": [
    {
      "colaborador": 1,
      "nombre": "Andrés",
      "apellido": "Carrillo",
      "puesto": "Programador",
      "img": "2.gif",
      "marcas": [
        { "fecha": "2021/10/13", "hora": "13:58", "tipo": "entrada" },
        { "fecha": "2021/10/13", "hora": "17:00", "tipo": "salida" }
      ]
    }
  ]
}
```

## Project Structure

```
PMSAC/
├── index.js                    # Express server (entry point)
├── index.html                  # Main attendance page
├── registro_personal.html      # Employee registration page
├── package.json
├── public/
│   └── registro.json           # Data file (the "database")
├── img/                        # Employee photos
├── dependencias/
│   ├── js/                     # Frontend JS libraries and custom scripts
│   └── css/                    # Stylesheets
└── imagenes_datatables/        # DataTables icon assets
```

### Key source files

- `index.js` — All server logic (routes, file I/O, upload handling)
- `dependencias/js/indexPost.js` — Attendance check-in/out client logic
- `dependencias/js/validaciones.js` — Form validation and user registration
- `dependencias/js/modalAsistencia.js` — DataTable setup and export buttons
- `dependencias/js/qrAplicado.js` — Barcode/QR scanning logic
- `dependencias/js/filepondGozu.js` — FilePond upload configuration

## Development

```bash
# Auto-reload on file changes
npm run dev
```

## Screenshots

Main attendance page:
![image](https://user-images.githubusercontent.com/64380067/136613010-10213cbc-bbd4-4c70-8eb2-58aba80e04a1.png)

Employee registration:
![image](https://user-images.githubusercontent.com/64380067/136613079-332424c4-0e34-42e3-9211-dc6d741c5498.png)
![image](https://user-images.githubusercontent.com/64380067/136613089-f2c17a1d-ec21-4ab1-a40e-f70c159f55fb.png)

Attendance records listing:
![image](https://user-images.githubusercontent.com/64380067/137189768-39997728-3470-47b1-b9da-a81d00293baf.png)

## License

MIT
