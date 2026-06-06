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
  title: "Nama Buku",
  author: "Nama Pengarang",
  cover: "", // opsional: URL gambar cover untuk tab browser
  totalPages: 12
};

const PAGES = [
  {
    page: 1,
    src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85",
    description: "Halaman pembuka. Pendahuluan dan kata pengantar dari penulis tentang tema buku ini."
  },
  {
    page: 2,
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=85",
    description: "Daftar isi. Bab satu tentang sejarah awal. Bab dua tentang perkembangan modern."
  },
  {
    page: 3,
    src: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=85",
    description: "Bab 1. Sejarah awal. Pengenalan tokoh utama dan latar belakang cerita."
  },
  {
    page: 4,
    src: "https://images.unsplash.com/photo-1476275466078-4cdc8b50aa0e?w=800&q=85",
    description: "Lanjutan bab 1. Konflik pertama muncul. Tokoh bertemu hambatan besar."
  },
  {
    page: 5,
    src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=85",
    description: "Bab 2. Perkembangan plot. Penemuan rahasia yang mengubah segalanya."
  },
  {
    page: 6,
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=85",
    description: "Lanjutan bab 2. Dialog penting antara tokoh utama dan mentor."
  },
  {
    page: 7,
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=85",
    description: "Bab 3. Klimaks cerita. Pertarungan besar dan momen penting yang menentukan."
  },
  {
    page: 8,
    src: "https://images.unsplash.com/photo-1473800447596-01729482b8eb?w=800&q=85",
    description: "Lanjutan bab 3. Resolusi konflik. Tokoh menemukan jalan keluar yang tidak terduga."
  },
  {
    page: 9,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=85",
    description: "Bab 4. Epilog dan penutup. Kehidupan tokoh setelah semua kejadian berlalu."
  },
  {
    page: 10,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
    description: "Catatan penulis. Inspirasi dan proses penulisan buku ini selama bertahun-tahun."
  },
  {
    page: 11,
    src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=85",
    description: "Bibliografi dan referensi. Daftar sumber bacaan yang digunakan dalam buku."
  },
  {
    page: 12,
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=85",
    description: "Tentang penulis. Biografi singkat dan karya-karya sebelumnya."
  }
];
