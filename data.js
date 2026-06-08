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
  cover: "https://lh3.googleusercontent.com/d/1LV84D3pcCcNdqpd9shG8iKttevzjAtcY=w9999", // opsional: URL gambar cover untuk tab browser
  totalPages: 92
};

const PAGES = [
 {
    "page": 1,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP1wtP5sJo7vTcaZHcV26jsb7dLl1cv5ez2ttgI4DJCVPaq62NrgF63WiP1ooSeMNsLK5u6WDG1-QAB9IaBNdkg_BPKI-5c0ze9ZYU4Ju8rbvzIAqo",
    "description": "Cover 1"
  },
  {
    "page": 2,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPLxHTckMJ2gDckpKvWgxoppTCfh9TynNMHEoYkMfHQaT-GKgtVs-M8I4dBvUkK_W3Lnxsa_2RrVHqAM_by-E172ZAe_XW1vmhyEGw930Y-fwLm5uk",
    "description": "Blank"
  },
  {
    "page": 3,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPLz9HWoa0GV0sm8ULWbbXSsn4-X8phGtik2B4kZzyoN53o3ZjFtUE3gm-hEfNZZuIB-u8uVUssNkLT7dZLRtuGRAvZxZdpIASOHfdF2bn32UavFIA",
    "description": "Kepala sekolah"
  },
  {
    "page": 4,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNn9tz4B2x80g8wSjHZSwFTdLtKdoUYUmewThd2Srp3owndDB98oL0g6TZSCcGJBP4vRwRTNvJA7OBaXRCBK7ktdZB525zoUGWJgv-e9ujjVfbM7Mc",
    "description": "Guru 1"
  },
  {
    "page": 5,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNJdFrBRW2Od4NPb5ZxFLPZRdF7T3o0F4Gst66e_TjUUAt615M_5ucpIcMXCa1xQgzVwZYfn3uTYAFsU9Zg0aQD_6lCiX10KiVM9EXy-JJN7dt2pLI",
    "description": "Guru 2"
  },
  {
    "page": 6,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOlnqqwoUuPighi81emsFM0L9CoRo1twCZZ_aRVntQIEp28ICTfENq8fHtJq4GC5_umI-a-PZf-Sp1GzYAgUiBXL0AOQcu2DsmUo0ULOJk3xaAMQqY",
    "description": "Guru 3"
  },
  {
    "page": 7,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOHgD93DE-BmiaRINT3mzsD6H-8xd3BLB2z721T4eKfH8CxRTDnny2ZpQkIenrwYtwg_XgwOKC0I9CPheHh-s3yQPyFiPh8bJ77RXrSag1TikoXenU",
    "description": "Staff"
  },
  {
    "page": 8,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNODGTaKMUhG7CazLuEyBeHZUKV8XkwVNYQMJVSSdVd68QA3XC6iswJFoltPGXncxQS5FzS9aKpZ8AP314hEJgnByw76GNcknyJfa84-h7Yio3CGBQ",
    "description": "Sambutan"
  },
  {
    "page": 9,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOpie0y2vUyjREB7t05D6rwTVUoezC7ngISvAubAOg65CIUGV0eG5Em-PYkrjPtRsH-IUD_iAsFDGYw2VqXRgpuTyCxRfuYKxnPUd8wYr13wqUdrBM",
    "description": "Drone 1"
  },
  {
    "page": 10,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM0ehSsBvyxPto2MwqYI9hZYRCSqPo_vLZjtjT5-Pf121weaVnVdQH8VPdAB4ol3WjU0Jrn_vRUI2HdoNmVhzHNjrzz4PSF45pMhhY3tgQ6Y6BNi6k",
    "description": "Drone 2"
  },
  {
    "page": 11,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMzchp9LFAx_Gx3dlikJBTQyUSUvs-3DcJIo-onhWsIjaUk9XdTC18df_LqK068P9kvT8QyvcgN0zsvTG7GiOruXJJu3G0Yj9xZygrLho_aTDRlrio",
    "description": "IPA 1 - Guru"
  },
  {
    "page": 12,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOmHAPEsnloKr_QxAQHM2wdQ0AjLyTwvhrMoFMxEDB03j55wts6YIhSJ0ffcyiQPLisS7SUG_bGrZpv8TmPUTKF_74Dupod12in8akev3ebmfk9Sag",
    "description": "IPA 1 - Kelompok 1"
  },
  {
    "page": 13,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPUi3km_-wxDPfJYHRBC9lgQwXm32LLNPDTl0VTgG9za8Jb-kY6LEbEjU3FMuRnqP8koOq3AEHQGcbfVW5jT0_CTJAV42ShOr4XlN9MPMSoggOkkeo",
    "description": "IPA 1 - Kelompok 2"
  },
  {
    "page": 14,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMt4FIU1KUn5Hub2EWYXQw6uszFBPQobf20Q0YZI8aERjQijwsuRTJPV0bPVraTHmIOaLkeHTTojFUoUFGe7kjQadksWvE4LNViSUqkyGYsS1tIHIU",
    "description": "IPA 1 - Kelompok 3"
  },
  {
    "page": 15,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMdhJZF8I7E0v3ALWB8EWOwK3ragyJwgDikjO8olNX6mOdkhyzm5rNIcWGvagm15dMz31Hj8pdQO8tugZX3Cud5eApDiba5p_hf5FN5r87THIw2mUI",
    "description": "IPA 1 - Kelompok 4"
  },
  {
    "page": 16,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNMNT2L6_WsIRdnowT2mTkuUe4STnofh7kU_npLHSibJGy4OTrWtK3aRLnt3Ydw94fnFmxtaht4p5Kl3BpKEb33Zh8Srinz5KneGCYsULO-YFPKD94",
    "description": "IPA 1 - Kelompok 5"
  },
  {
    "page": 17,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNXE4FF-zx1kVjPR9GVqDEeLl-VnJMZYcRq9oTUrpOnYQ4sMM1c6INR1vZypDUHVzkRuNtPmnEFcczlUWxrOXE7kCSw6tw_qvQig1HoEctdlAlfcfk",
    "description": "IPA 1 - Anandya Pramesti, Hanni Masykuroh, Hapsari Indah Astuti, Anis Dwi Ariska, Handika Rahman Trinanda, Karina Kunandari, Asti Hatnyono Wati, Guntara Falah Darmawan Suprapto, Bayu Aditya Purbandaru, Gita Sintya Pratiwi, Choirul Inayah, Fakhruddin Iman Wafi, Dina Ayuni Cahyana, Erizta Alifa Prabandani."
  },
  {
    "page": 18,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNdHo11AKOMZZFsGxXDng6A7-K71YgitDa9hDES543A4Ptb_bmHVX-z38cNIcTGNvoQT8t2nTIsqWL0efpNTYya80qyXJWdVQJbJYeO-_2kmiWUOI0",
    "description": "IPA 1 - Kurniawati Aprilia Enispratiwi, Zahfarina Nurkholisa, Zulaikho Nur Ahdiyya, Monita Christya Gita, Yola Fathan P. a.k.a CLEMENZA, Monitta Yuharwanti, Ulya Himawati, Nirwanasari Nurkhayani, Silfia Aknalia, Nugraheni Putri Swastika, Rika Meilani, Nuha Nur Umara Rafi, Putri Cita Andrilia."
  },
  {
    "page": 19,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMLSacabaYlWWX4iuOWSqx1wsCmh0DfbD_byOtyNPVUKRGrLYFBB39mwFud5yzGwZzQQK9VHrQ_HqHZq9CC9tuwhd4OoG3lQWyUUGUl0y_PRXlbXP8",
    "description": "IPA 1 - Kelas"
  },
  {
    "page": 20,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPq5THq8P4KO_jPF4IHI8EptnnhyJYqGKM1myt-GE4F8C1iDdfsSlmLSF-XV_s8vKKql8X5xf-T57sS_k4sWyVjoleNHqG1kTxil5FIH8QRGPVPrZM",
    "description": "IPA 2 - Guru"
  },
  {
    "page": 21,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM0ep2NTyXS5Rxej_j4OzVwhLY2HHMq2qN30ZxMV6-iVALEkMS1UfID1UQzBGPJtLCMBFYjhuzTzt3iSesj9sGM6DHD1wLO3QYYAkS0G6sjQXgtISw",
    "description": "IPA 2 - Kelompok 1"
  },
  {
    "page": 22,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP1ceacdu6lb0z147Q_2jdwfRwLCoNNIyWCh9i3HpAFl1hho0_kfWdL6nda2v9ZCCvtntfB1sGlSXhs_Sd3RJUL6Wwf0FLi4BDOcOmtU7nt0JAfZos",
    "description": "IPA 2 - Kelompok 2"
  },
  {
    "page": 23,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPA_Y-pG0teEUbHK5xqpF3oybQd3JI4PbFNvLViRj_6U8No6pmLJ6uKRHJHMA9LwzvZNd3hgD_SWNGP4lOxb5T5LMEv0X8bAEMV9bFIjNcE8w9EqzA",
    "description": "IPA 2 - Kelompok 3"
  },
  {
    "page": 24,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOkkGgzssRsiTWxxZBuoU_nmDcItvTMjhqA19ZotG345BMwbJJam62LaCOILZGUgBFPQ75kpt_FoQSXfYUOvJALuTH-xTx2YAiWSzcdKHxo83nlNTE",
    "description": "IPA 2 - Kelompok 4"
  },
  {
    "page": 25,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPXWVUeEALDm08NPDhaH3qZFKGxUIFN4_TQn7FRC3bs1lf1TQDmG4BGoBCgxA9lfvMDPwYqH94fs_GBpYujQBpzXpvA_LH3iVwVLKc9H9R-TSrY6Mg",
    "description": "IPA 2 - Kelompok 5"
  },
  {
    "page": 26,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMOqvwOO4KxuPo9AHt8BI12GdyFg4AYMn5zGjAArs6qFZDMh9BqbwxT-ZjizwQbXrTf9jRms_YZznkA0ViGYPbS9wzC0RZRhsaKrYaujS-Yye_0i4U",
    "description": "IPA 2 - Afni Nirwana, Choirun Nisa Dwi R, Annisa Pratiwi, Anis Khusniyati, Erma Nurunia, Akhmad Al Faradcy, Dentang Jaya Wijaya, Kunti Rismiwandira, Antonius Hegarian, Dwi Anggraeni Mulatsih, Faisal Ramdani, Amir Wahyu Nugroho, Hesti Milawati, Liza Sofiana Devi."
  },
  {
    "page": 27,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOVP62lOod-ZyBPweuATiMgQP1SFMN8dV8wUWpBamB1sVfY6MCLjdGY87qt_KmvTLaxK9qKr3HCIa6OAcq8-4RkopByU4qEP1tjx_8BpgznKmT_bFE",
    "description": "IPA 2 - Niken Raidyna Laksmi Timur, Safa Rosmita, Granita Khanaria, Resti Rafani, Sofia Hidayatur Rohmah, Miftachul Hanifah, Patrecia Purigena Watugilang, Ulfa Nafi'Atuzzakiyah, Muhammad Widyatmoko, Rizki Wulan Yunitasari, Uswatun Khasanah, Riska Amelia, Rami Rindy Karuniawati, Yosephine Nurmalasari."
  },
  {
    "page": 28,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMgNNQ0b9ud_56HCnaCtffZY1WmZi4CPEtUIAoIrJjQk2j0vtHOUITAvIhvTAQTRThjthR_HF1E2IjXO4EFgE07y7pFg52-7KgXNZQQyKBmpIZwMrs",
    "description": "IPA 2 - Kelas"
  },
  {
    "page": 29,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNOGGWouJ3wr2ojS-TU1PKkwFW98OE3Y-_b4w5VIhd0QG7--YywNwmO9HCFDajdMJzihZJWsL08mNfZ7tRrSwvTRudA-v7jqP7ffMZ5TETnH9GBF7Q",
    "description": "IPA 3 - Guru"
  },
  {
    "page": 30,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMWWOE2aCSfEG93OgpTGNoMtU_0zocQTtPx8tCkNP5HQMUvSJ-ZdMs96BZlHP5TYShIWrTkt1-fH6u5pU4OWVFOLhPTBNZS7NT1KaFfTrSjNnUhPrA",
    "description": "IPA 3 - Kelompok 1"
  },
  {
    "page": 31,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOXZMo9_nH-JPn0-7jh64tycRZecaL7IVU3xYEFAQRz0IA-cmdZQiCYOk0ItazJoVjzHm--t0_jl473cB8AFBXP1v_bO3hpkrhRaA8Dipw-Od3171I",
    "description": "IPA 3 - Kelompok 2"
  },
  {
    "page": 32,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOMtA65xaESrJyBjO5tJ1tgEZUfLifaWF7y0aHte0cEgPU9GFpeRIv_mP4u7aqQwmgQC_scdCr9JtEtdhz4MKtL0xLKz1gwJJGAr7dLMyGAcTvYbyU",
    "description": "IPA 3 - Kelompok 3"
  },
  {
    "page": 33,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOfWNQw8dk-e9ik3vXQhbUEsGKR1xTAYl2tMpF8-DVWvFQwvaGmuFYEi2ip4a3CyQnkvWFFBpvlfNeGtuFeM21we1AoL7FTuck9pr7NC8_ITBApVF0",
    "description": "IPA 3 - Kelompok 4"
  },
  {
    "page": 34,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOYGyMTz-KK-GseUg0HD4zJY-ViBN4jyAMiiPAm72bZz3tYVOd_uDlwb99j8tokaLOgFHJcW5n2kdYA7ObfoWrAasFNS8a9v4q6oS362GY0Ml4rbrs",
    "description": "IPA 3 - Kelompok 5"
  },
  {
    "page": 35,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPGCh_9oQWbSjrdVJTklVu6fnvij9QUpBCr1g_CprkuKSycgysYIr84M0aJb1ZgWuOnGRqC9MgyV1ovQVBql_1wWvn66l_mRpfF2jn7JZyReDQABYU",
    "description": "IPA 3 - Ali Al Faras, Desy Aryani, Ike Previa Redayosita, Aliva Putri Nurdiyanti, Dinorma Intan Zulqa, Indah Zuli Pratami, Annisa Rahmawati, Farida Intan Rizki Kusumawardani, Megananda, Arif Imam Pambudi, Hafizha Kurnia Indahsari, Nabela Dhea Ulhaq, Candra Kurnia Saputri, Hamah Murti Dina Usmana, Nazar Idam Setyayuda."
  },
  {
    "page": 36,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM6bembdFnziA5bUqWrIsvQpb7n34hXeVXt1iyg4FJCEEfpXKUtFT3WZAfUO5DLSSimkfEEs8LLEB3x0Y6QzJH1RLSoekdEMqgdeXprl9Yi0YUZv_g",
    "description": "IPA 3 - Nikmatul Hidayah, Rivandha Reva Arvianto, Nisma Akila, Rizki Setyo Dwipasari, Suprapti, Ogi Hafit Purnama, Rosalina Putri Utami, Umi Latifah, Puji Astuti, Salsabila Pawestri, Vera Melinda, Ridha Nur Zulaekha, Siwi Prihandini, Yuliana Eka Setyaningrum."
  },
  {
    "page": 37,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczO749EB8YXa1iyqdUU6w-M0IsAJzIJkR_zYxPQTU4nX0XBMMtIiMg9ZX8g0q0fJoxf1S_eNGSShNjB55TwchTaDxL9jwKYkllE22t3zKhdxV-IGxC8",
    "description": "IPA 3 - Kelas"
  },
  {
    "page": 38,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMMaUibiDsLfGZ4c5SeHBwg6H4A_hN6UPhdm68SX3hhS15DKjj6h4w9nkRhjupNim39ATYttHDfme7ALyH3WI576A8UoBhZnM3SAdUP9tgLvqRpUXc",
    "description": "IPA 4 - Guru"
  },
  {
    "page": 39,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPpz7qt3osnNKFKe2GgafSDxw2aukuqytPeyvdFvJNJdkfBqQbkD-Z9WuNcQEMpkxpZe436UvdrtbBTs390cRCiwZER_GOdoR61cU10Njvgo8g2R4k",
    "description": "IPA 4 - Kelompok 1"
  },
  {
    "page": 40,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczN69w8ayQs7VdSrd2d_sUXw5_2rUyCS5qIzFl59s4qntQu6U274nRTWwmgEdhXxrEpFY6iV8DnlRDvLUqNMGnP6YTpYxuETzYeIaI5dv01ui8b4Cnk",
    "description": "IPA 4 - Kelompok 2"
  },
  {
    "page": 41,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPjWH08pNEma2fNtpJe3U0qcC22Wx2k6MedS9aDJD7Q6PWUzgb0R2By15jAb-tdaMSVoUXxPTXtcUvZoC57oLdS4M0PKUVH3TE_HdgGzmFqEbjMhs0",
    "description": "IPA 4 - Kelompok 3"
  },
  {
    "page": 42,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP3QwCm17M87vcue07nUhJGGw5gqefwe6Y_C1aF8x5UICbMHp3oPWw8B21A1zfigYv6uvl6675M8Hs-sInbOkcjC3rRScS52yFNLTgfHc2ntwegafI",
    "description": "IPA 4 - Kelompok 4"
  },
  {
    "page": 43,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNGN53pCLvfsCjk4le5cCL3tToBGYIQIs3f4ySWHizAsIT_OD3r6GnErT2vzjAmipiiuLd6FSj_k7wKy_aBFKy4LrdUwD_aqe7m8Cv4Nkhar-iPFfc",
    "description": "IPA 4 - Gazha Hanudya Al- Hafid, Aldila Rofiana Aprianingrum, Amir Muez, Arini Nidianingsih, Dwi Aji Wicaksana, Dwi Sakinnatul Jannah, Dwiana Yoga Saputra, Dyah Sekar Widyaningrum, Farhan Puja Mahendra, Farid Azhari."
  },
  {
    "page": 44,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOyE3qXM_PYaLejwFG7qDgwhy2WqNnqzP9Y7JlU2zSgbdqKyDBNA6IZ1hSx04blGZmG8Nh-Q56NBWl5LfD0oI8UNGQxIdhnUsZRfoVCPYIhqTLthl8",
    "description": "IPA 4 - Sulis Setyaningsih, Nicky Fahriyanti Salasa, Irfan Ardani, Putri Pradana Hernawati, Kurnia Dewi Anisaa, Rahayu Dwi Astiti Gunesti, Laelatul Wakhidah, Rakhmat Dwi Putra, Muhammad Agung Wicaksono, Riska Anggraini, Sabrina Atria Sani."
  },
  {
    "page": 45,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMXWdYE42RJGutrz-o239O5zQ07bYtpR4DxYU92Syji-IaxqgbNkGaU4tnFXfgwtohfAF5ayKl3A3N8KWWDMI_NU0On41OVt8UCiG6bFlCZfGOS7lY",
    "description": "IPA 4 - Kelas"
  },
  {
    "page": 46,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczO5Bt3_1mclACuYoKsGiZRFGdWl5vr89OdZubeUBnn14AQYmzOUtSqqIsQv0uaXw4cgE5uBPzG9rLiWFneeMMJWrN6OikT8SV6JotysVsYtVBk3rMk",
    "description": "IPA 5 - Guru"
  },
  {
    "page": 47,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNFoGcF2H_oetP2z6hMr7ILC5jatkxs60blS2srxS5fivKVheKza_cYZboTDAD5b79hOF29dWpTb3H34OzMib8LTgFNjAvZwEeQOlO68QiY2b848b0",
    "description": "IPA 5 - Kelompok 1"
  },
  {
    "page": 48,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNOR72MmDXPjdIK7jCd9uT6toUbA5AXwsz9uaU0LBOgq4l3GfgkRFD30FPhT9pDXMUBw6tNtLviomolExge-XP-fpTFwW9CZRAUVB5m61G0E8k5MW8",
    "description": "IPA 5 - Kelompok 2"
  },
  {
    "page": 49,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM62enwasjI8CzifFwQg3G-V0nZnHrDakD8rlIztw4UTdxur1cxVTWa-4_lR612Mo5i3GSXQl6iXSFqDTXsG0rp6qDYBXg9pnuHdSobRtXkGhzQvcY",
    "description": "IPA 5 - Kelompok 3"
  },
  {
    "page": 50,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNQEOSOrXRHF-q71i4R10WK3Fj2OIjVl4I4ARU-56Q5hSECsPlFtrrGjrwocHx9ZxJkl_eZeJPIxBlB2ZtOR6saLSi9emp8sYz_2Bo7TpYpvmpYH0Y",
    "description": "IPA 5 - Kelompok 4"
  },
  {
    "page": 51,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPJoISkUJzUKjo3G05LOneOQveqCFrQ7K3Vt3JjTs3zyzOcBdcbaIBYwyaHoQ7W-fxKUS4nE2qu3eA6dz0V8-mJNOxaEZZsb5cty3uIJXSofNYFz7g",
    "description": "IPA 5 - Adhe Irfan Mahfud, Aji Prayoga, Anisa Prihatiningsih, Aulia Khairunisa, Hanif Awandani, Bima Wahyu Sanditya, Candra Widi Nugraha, Damas Muhammad Yunus, Dewry Arinta, Akhmad Aadam Maulana."
  },
  {
    "page": 52,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczN5P8tKTDkDcBU-vIYe0fjIuCkq-VC8ft5jF74IuN6EFgqZLwuc7JTSYXbBbIMMgrL5z_lzVq9s2stG0-16M03XM4xle2pgJwbyavCgnSIgQ0HNCUo",
    "description": "IPA 5 - Ratih Yuniar Widyastuti, Candra Widi Nugraha, Rizqi Puspasari S.P., Firman Malik Parlindungan, Rosli Mohamad Arif, Lailatul Ibriza, Sheila Maharani Putri, Mega Katon Rahayu, Tina Irmadany, Nency Wulan E., Nisaul Fitri."
  },
  {
    "page": 53,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPfu2_BC8cD7DRLFYFfuVS32_haxSus-ySpdfc9M_CycCxf2s19LqUo7YCQW4U8UFEZsnBaqabhdRgioGmPUOPFnQZD_Q7_-cdqjCEZGMosIL7T-8Y",
    "description": "IPA 5 - Kelas"
  },
  {
    "page": 54,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczN-kegKtdSqLbE1_47zZ1EuDdzZkYo-O66-xWVOKDS_8-fbUCnlUBmJw4SQLjXxi7Ky2BuUkX4sFRqBtffnvcdHbXpeakwBHjeaRYXcyoVyIuZqBgw",
    "description": "IPS 1 - Guru"
  },
  {
    "page": 55,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOYXwpoiWY2IJprGqZ1ho85GWNeVXabHl-jkcFSCzcWg48lvHEezaiWrBtHP9BIpYf5810MOQHeh5Wov1nVPsOmv57IFmfXY-3zLhQ1KviIJ-rwZJA",
    "description": "IPS 1 - Kelompok 1"
  },
  {
    "page": 56,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczO0EwpvYGZ3Iu4wVAobWljqiiDAgdyHj-A29iLmecTXdaU-xF7A9CLg-KZM2UzEQ-2iZwQyg_ENpiUQih6d5uuHO9ZGyzlsYi_DzuSKWbSe0Vyl6kU",
    "description": "IPS 1 - Kelompok 2"
  },
  {
    "page": 57,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNxtiOqnLNNdfyareiRpTvEdExzgWRGoFTS1V96Aqop-bMdKSEZHEAawr7j3_9HOxiVbH91mqzB0AWL3JpklsUIEUH83dPwefv1p_OtZLG8A5rACp8",
    "description": "IPS 1 - Kelompok 3"
  },
  {
    "page": 58,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMiRFFlz_EFf1OTJjvYXzXhpGeSfQibi08ZvtVLXQhIE8y5eErvRAcfdHetkWNj6fjjGkRMFtfks7rTkvJHtFDt3OB6nNgXXGktWr1a05CVQSFOt4A",
    "description": "IPS 1 - Kelompok 4"
  },
  {
    "page": 59,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPiq2pF8l-JQbT_wNapJUzj3qHLRfklzEbBpUhVJ_W9qTPC5uWdFaKw5rR3LkdU_zp5hjlV3AcwMUOdfyNJtMzXZTX-FkrsneJqMS8lNq4JlBBaR1s",
    "description": "IPS 1 - Kelompok 5"
  },
  {
    "page": 60,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOuTbtaO8wcMcmhOq7-XYKc1rFsqzLZmDxtDSnOMLVzVmY51UJXm7D5lM7lCVH2C6WsEbCC2DfMDjfvtDbo9-9e_iWHaO20AGG3dlw0K4aM7tpYj8c",
    "description": "IPS 1 - Abednego Petra Prasetya, Dicky Satria Mulya D, Kevin Septa Krisdian, Adzanninta Lintang Pahlevi, Dinda Fariz Alamsyah, Krisna Guntur Dwi Saputra, Ainun Fatiha Utami, Dwi Chandra Kusumawati, Lois Errita Purnamasari, Albertha Daisy Arya Palupi, Elizabeth Febe Yulian Suwandi, Lydia Mutiara Elim Loblobly, Azzam Alif Muhammad, Fariz Ahmad Veryawan, Muhammad Adnan Hidayat, Dedi Setiawan, Habin Teguh Kurniawan, Natsha Chusna Pratifa."
  },
  {
    "page": 61,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP4Ii05tCVxkliXVAvIHSgPT_QbiB0yT3E8-mqoTDrbwfR7Rd2A8pZr6zO2wwD2VUDSOGDnB1cZbO0n15olMWiw14rTm_o2QxyHNH5fkZ5kS4v80q8",
    "description": "IPS 1 - Rizaldi Naufal Herdanto, Sasya Hanindha, Vira Syavilla Tanalo, Rr. Fransisca Krisdianutami Mawaski, Sulthan Yusuf Althaf Hafidh, Yoga Arih Wirasta, Safitri Febyana Hapsari ES."
  },
  {
    "page": 62,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM4-mNxC_izzWdYUtewSC84jny4ivitM-_pLCDmPkEUU_QwOLtagq7hXF1DIj792pQ8nLFjMuZ_6h9E11sEHLzNhnjJ2OZT2hKMYnAyFZ0HcC31l4s",
    "description": "IPS 1 - Kelas"
  },
  {
    "page": 63,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP7s1czJsNu1VaZNhyJaYATcWAIN8A_CrylRn-XeLi65v3Y4CBqQ1Hc0jGcCelJ33J3K5qZTnEfA0INeXowFzgEXYRe54Xg6xaeVwiFPda1ldDm7lE",
    "description": "IPS 2 - Guru"
  },
  {
    "page": 64,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOHVhd3PENuUlZDFGfcBrsCn1Sb0MfYw6_rWoswNYbgE4460aOjnGK1wEkFrzxp37Ys72-Q_9n-IcYZQ2HzRMaigAONLN_-LD7tEsBiH4xTR4DwuI8",
    "description": "IPS 2 - Kelompok 1"
  },
  {
    "page": 65,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOGgzyirbs8qd1Lv9u2lP1A-Z-EKpl6MbUVcUeVeuIEL6hDD43rO9hVLLAGKuahZE7o1UZdIWpZTBVQ8jMGvlsCmWg-YjDfEqfEssVhhRVfZKY7DkY",
    "description": "IPS 2 - Kelompok 2"
  },
  {
    "page": 66,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczORpydGiqaM6LhdqxdWXmC4TT_bpONh9t5hqQV2gtFcQM-f_yJzxH5nTKiY6agU3HBZim_I4ln5M1COV9by__rUTyhVUHjmK0DuoG5e_SZfcleAHSo",
    "description": "IPS 2 - Kelompok 3"
  },
  {
    "page": 67,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczO_ol1GCvUK49jq2tOPKmi1chpBBjdIQVtC_yad_4QpjPL6srQoztJubs9QnKAE6HBBcOkrS6RjBLwrT_YdSL_TW3iTdSQXW32uMPMJ0WDXyHLY-C4",
    "description": "IPS 2 - Kelompok 4"
  },
  {
    "page": 68,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPnO2Vj5rndtOEr4RvsEwLsHgD00oiHa_E4Bdq8McfQ8nje6U7YpEVqVi249f2ikIxJD-1-u2GS9PamGn38SHg2c_DOn3AubBAuYJQy9uZiht7UHfk",
    "description": "IPS 2 - Aditya Bagus Saputra, Alif Bryan Pradana Kusuma, Anggi Kusumawati, Aniestiyana, Arifin Raj Sanda, Bayu Adjie Indoyo, Catur Retno Rahayu, Egga Bayu Prastyo, Fandyco Prima Yusuf, Fikri Dwi Andriyanto, Firdaus Fakhri Azizi, Indah Sofiatul Nuraini, Intan Praptika Darmawan, Kartika Ayu Pramesti, Kiki Rosalia, Klara Dwi Anjani, Muhammad Bintang Nabila, Muhammad Daffa Fahrizal."
  },
  {
    "page": 69,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczP5Fmsi7JaJm6oFESVcjyChkfOA02o-GYMLmbMogG5iyQjR_NiSUMx-k8cOrhGjNqkJBGzLry5v4AJX4we3GdVuR84ydQYQuz20Xwp96ng5ew-fqdk",
    "description": "IPS 2 - Nurul Aisyah, Nurul Cesaria Maulina, Qois Nadalathifah, Reynaldi Arga Satriawan, Titik Indah Yunita, Yogi Putra Anggitatama."
  },
  {
    "page": 70,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM86a5VNn1yjtzaYIyBCgG0HFvxqgpr9zKH2q_VcVzLOtC1bDPpp0rzYzXq0_FIPHlBcLwsGSFvCkKyHszdn9pXS_r7Srk0zLYjw3cnKqoN08fYXkg",
    "description": "IPS 2 - Kelas"
  },
  {
    "page": 71,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNKe0k1q0y-3wa3O9ha1XkWFsFH01363wZHYESy8eVjaxifVzBhEkYfdOXi_1nP0YIGQQj9-pe2dcKT-Y8B23e-omms_07lQjYVROb-CBI6ZWN4IDM",
    "description": "IPS 3 - Guru"
  },
  {
    "page": 72,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOp6sKPXLZP4arXd3FS_EuKOODZ-xfrvMP4FBxBGKXvSKTuelemYiFHSumu7-UfphSU-1R5MWbsYTman06Vd5SiVFI03g2h6t2at03rbaqlpGQBJNQ",
    "description": "IPS 3 - Kelompok 1"
  },
  {
    "page": 73,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMo_WfqXxt_HT0qtoncNpPy6DjysUWw8fI_tTy0AQZUiMa8VD4ETYfPmSyQbtkXn-vmLRLAyMI1i42w804-rzvti6gjivG3B8uqW7_7SBb99fyUdGA",
    "description": "IPS 3 - Kelompok 2"
  },
  {
    "page": 74,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOP9yJ6Dwn4FfpqLpmcMNmnZ6Uttti1Ka605R-pavRh70BaqK-CVmNCnuEGffYrd4vDUTxTt35-rVPkXmV0SuRvFF6lr360PLXidy4EzMkvkdz4rhg",
    "description": "IPS 3 - Kelompok 3"
  },
  {
    "page": 75,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPQO4XgEv3Ds6Lm-YxdmVYKVj8HUmRPg9Ml4Ki1-u6o3clrwqmCMhmkBdE_EjyOeGaouEwj-aWVo90pWz7a3ab1HWrQRGJ6ge7T-vwgWCabmEmTXaU",
    "description": "IPS 3 - Kelompok 4"
  },
  {
    "page": 76,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOhXh5itiQJSF9Ihjdk9x0VGxauk_qIhxmSbL2ul1kkVP2edMogZgeGmYfilM7P4Tizp3VZKjnwnBFZndquYnojNDdQMB5FHLqetM4yP6Q6IsbNHgo",
    "description": "IPS 3 - Adam Ghozali Reynaldo Suharto, Adi Saputra Hidayat, Advent Surya D.D, Amandasari Mardiana, Ayu Dian Lestari, Bagas Winektu, Cesarioni Anggra Septa Rajasya Effendi, Damarjiwa Natajagad, Damay Ria Aprillia Nugraha, Deajeng Ardinasari, Diandra Izzani Sari, Dwi Suseno Aji, Fadel Rachmad Hermanto, Kemal Shideqi Abrar, Meilina Fatmawati, Refina Nidya Prikiswari, Regitta Fatmawati Octarina, Risky Budi Kurniawan."
  },
  {
    "page": 77,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMNHQEpVoB6JmofnaxceREM0tPqQ-t_zKbzLq2ueXJbGBKKuVW4JvHij9T1gu9MrATCIDu5SMwxQ2BQEHxVP0tm6hufRufTFcQedWnmXsicWwc2EoU",
    "description": "IPS 3 - Rosemala Ghassani Asmaraningtyas, Sekar Pinilih, Vania Ayu Shafira, Wahyu Bimo Santoso, Yoga Ardiyanto, Yulia Ayu Puspitasari."
  },
  {
    "page": 78,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPZDWu9gZKYDEd2tQCqW5R6fGG4jEFhJ03UKZ36-5pwBLfmUy75SHfsqqpmBp0u4uK_InJ3AQSVQIC0Tbpqxuma3EH0Tvbg26FvWwPj_XkEc9DtZDs",
    "description": "IPS 3 - Kelas"
  },
  {
    "page": 79,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMWdwzXNAgwxtZkpwVWD5qZ2nmL2kiPYx2cbNc1U18chzJqKSg3xPkkLiaBQbcqS9YoS_SzR7mlSCRsqILmg4BH-XFB9-ePi4asPHf4-C_lh2WepDs",
    "description": "IPS 4 - Guru"
  },
  {
    "page": 80,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNkuA4BDYpHICw4GKUY92tBzuvgx-XKQB6ZVRjyOqwBRLHVQ1QzRPYvlm9bfym3pZ1Ruul_mRAPVTHi4Y5G0MGuRso4_gxhLW8j31XwUQHRhS8ak9Q",
    "description": "IPS 4 - Kelompok 1"
  },
  {
    "page": 81,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczN8JhNLECTxUoECEyUQeBKElxsoCyYgKG4kjuddH8oJsdEmpCAgsgZiKWFu-MfcDM7m6IMtyakBRYJ1vig1a9mRxYZ7A9bArq2DcMXDFHuOaQm69rA",
    "description": "IPS 4 - Kelompok 2"
  },
  {
    "page": 82,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPLuR396h9A7lC1U7w9Z93qDhkS_7ZtVRY6o_P0p5N7GKMtI1IDdf_LqK068P9kvT8QyvcgN0zsvTG7GiOruXJJu3G0Yj9xZygrLho_aTDRlrio",
    "description": "IPS 4 - Kelompok 3"
  },
  {
    "page": 83,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOmHA_PsnloKr_QxAQHM2wdQ0AjLyTwvhrMoFMxEDB03j55wts6YIhSJ0ffcyiQPLisS7SUG_bGrZpv8TmPUTKF_74Dupod12in8akev3ebmfk9Sag",
    "description": "IPS 4 - Kelompok 4"
  },
  {
    "page": 84,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczOUi3km_-wxDPfJYHRBC9lgQwXm32LLNPDTl0VTgG9za8Jb-kY6LEbEjU3FMuRnqP8koOq3AEHQGcbfVW5jT0_CTJAV42ShOr4XlN9MPMSoggOkkeo",
    "description": "IPS 4 - Kelompok 5"
  },
  {
    "page": 85,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMt4FIU1KUn5Hub2EWYXQw6uszFBPQobf20Q0YZI8aERjQijwsuRTJPV0bPVraTHmIOaLkeHTTojFUoUFGe7kjQadksWvE4LNViSUqkyGYsS1tIHIU",
    "description": "IPS 4 - Biodata Berfoto 1"
  },
  {
    "page": 86,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMdhJZF8I7E0v3ALWB8EWOwK3ragyJwgDikjO8olNX6mOdkhyzm5rNIcWGvagm15dMz31Hj8pdQO8tugZX3Cud5eApDiba5p_hf5FN5r87THIw2mUI",
    "description": "IPS 4 - Biodata Berfoto 2"
  },
  {
    "page": 87,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNMNT2L6_WsIRdnowT2mTkuUe4STnofh7kU_npLHSibJGy4OTrWtK3aRLnt3Ydw94fnFmxtaht4p5Kl3BpKEb33Zh8Srinz5KneGCYsULO-YFPKD94",
    "description": "IPS 4 - Kelas"
  },
  {
    "page": 88,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNXE4FF-zx1kVjPR9GVqDEeLl-VnJMZYcRq9oTUrpOnYQ4sMM1c6INR1vZypDUHVzkRuNtPmnEFcczlUWxrOXE7kCSw6tw_qvQig1HoEctdlAlfcfk",
    "description": "Panitia 1"
  },
  {
    "page": 89,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczNdHo11AKOMZZFsGxXDng6A7-K71YgitDa9hDES543A4Ptb_bmHVX-z38cNIcTGNvoQT8t2nTIsqWL0efpNTYya80qyXJWdVQJbJYeO-_2kmiWUOI0",
    "description": "Panitia 2"
  },
  {
    "page": 90,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczMLSacabaYlWWX4iuOWSqx1wsCmh0DfbD_byOtyNPVUKRGrLYFBB39mwFud5yzGwZzQQK9VHrQ_HqHZq9CC9tuwhd4OoG3lQWyUUGUl0y_PRXlbXP8",
    "description": "Behind The Scene 1"
  },
  {
    "page": 91,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczPq5THq8P4KO_jPF4IHI8EptnnhyJYqGKM1myt-GE4F8C1iDdfsSlmLSF-XV_s8vKKql8X5xf-T57sS_k4sWyVjoleNHqG1kTxil5FIH8QRGPVPrZM",
    "description": "Behind The Scene 2"
  },
  {
    "page": 92,
    "src": "https://lh3.googleusercontent.com/pw/AP1GczM0ep2NTyXS5Rxej_j4OzVwhLY2HHMq2qN30ZxMV6-iVALEkMS1UfID1UQzBGPJtLCMBFYjhuzTzt3iSesj9sGM6DHD1wLO3QYYAkS0G6sjQXgtISw",
    "description": "Cover Belakang"
  }
];
