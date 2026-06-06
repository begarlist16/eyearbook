// ============================================================
//  Begarlist 16 — Ebook Reader Data
//  Format setiap halaman:
//  {
//    page: 1,                       // Nomor halaman (1-indexed)
//    src: "images/page-001.jpg",    // Path gambar halaman
//    description: "..."             // Deskripsi teks untuk fitur pencarian
//  }
//
//  CATATAN:
//  - src bisa berupa path relatif (images/page-001.jpg)
//    atau URL penuh (https://...)
//  - description digunakan untuk indeks pencarian;
//    tulis kata kunci penting dari halaman tersebut
// ============================================================

const BOOK = {
  title: "Buku Tahunan Begarlist 16",
  author: "AbankIrenk & Begarlist 16",
  cover: "https://drive.google.com/thumbnail?id=1LV84D3pcCcNdqpd9shG8iKttevzjAtcY&sz=w9999", // opsional: URL gambar cover untuk tab browser
  totalPages: 92
};

const PAGES = [
  {
    "page": 1,
    "src": "https://drive.google.com/file/d/1LV84D3pcCcNdqpd9shG8iKttevzjAtcY/view?usp=drivesdk",
    "description": "Cover 1"
  },
  {
    "page": 2,
    "src": "https://drive.google.com/file/d/1pzQwY3t7zW9GuwqvC2kxn2GIIbTGTtm_/view?usp=drivesdk",
    "description": "Blank"
  },
  {
    "page": 3,
    "src": "https://drive.google.com/file/d/1JznQeihvm_EAfCSmxUN7UnULAU-YmmqO/view?usp=drivesdk",
    "description": "Kepala sekolah"
  },
  ...
  {
    "page": 91,
    "src": "https://drive.google.com/file/d/1LWhCNHl3nR-pwwQYnluDUPHZbffLAmEs/view?usp=drivesdk",
    "description": "Moving School"
  },
  {
    "page": 92,
    "src": "https://drive.google.com/file/d/1HI9F_3aS8XMKQGYb8tCdRLFhb8p4noX4/view?usp=drivesdk",
    "description": "Cover 2"
  }
];
