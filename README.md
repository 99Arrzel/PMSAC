# PMSAC - Poor Man's System Attendance Control

A lightweight barcode-scanning attendance tracking system. Employees scan barcodes to check in/out, and admins can view, search, and export attendance reports.

## Features

- Barcode/QR code scanning for quick attendance marking (entry/exit)
- Employee registration with photo upload
- Attendance reports with export to Excel, CSV, PDF, and print
- Search across records via DataTables
- Spanish language UI
- JSON file as database (no database setup needed)

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** Bootstrap 5, jQuery, DataTables
- **Barcode scanning:** Html5Qrcode
- **File uploads:** FilePond + Formidable
- **PDF generation:** PDFMake
- **Database:** JSON file (`public/registro.json`)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start
```

Then open http://localhost:3000 in your browser.

- **Main page** (attendance scanning): http://localhost:3000/
- **Employee registration**: http://localhost:3000/registro_personal

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
