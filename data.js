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
  cover: "https://lh3.googleusercontent.com/d/[File1LV84D3pcCcNdqpd9shG8iKttevzjAtcY=w9999", // opsional: URL gambar cover untuk tab browser
  totalPages: 92
};

const PAGES = [
  {
    "page": 1,
    "src": "https://lh3.googleusercontent.com/d/1LV84D3pcCcNdqpd9shG8iKttevzjAtcY=w9999",
    "description": "Cover 1"
  },
  {
    "page": 2,
    "src": "https://lh3.googleusercontent.com/d/1pzQwY3t7zW9GuwqvC2kxn2GIIbTGTtm_=w9999",
    "description": "Blank"
  },
  {
    "page": 3,
    "src": "https://lh3.googleusercontent.com/d/1JznQeihvm_EAfCSmxUN7UnULAU-YmmqO=w9999",
    "description": "Kepala sekolah"
  },
  {
    "page": 4,
    "src": "https://lh3.googleusercontent.com/d/16CVnlza04lZk-rZbsz4z7aQXS0sbjy-l=w9999",
    "description": "Guru 1"
  },
  {
    "page": 5,
    "src": "https://lh3.googleusercontent.com/d/1FySJ_tHYk1kN38yckFKseO9w41ZeVOBG=w9999",
    "description": "Guru 2"
  },
  {
    "page": 6,
    "src": "https://lh3.googleusercontent.com/d/1MXOEqy8ynDdCWJClpdA4Ag9k2OWS4kso=w9999",
    "description": "Guru 3"
  },
  {
    "page": 7,
    "src": "https://lh3.googleusercontent.com/d/1hRf7hOr_jJxJiLaamdHwiWaRlQw7xDeG=w9999",
    "description": "Staff"
  },
  {
    "page": 8,
    "src": "https://lh3.googleusercontent.com/d/1Fq8VDOtKXDyOoxLegGQuvj36jxH0p99O=w9999",
    "description": "Sambutan"
  },
  {
    "page": 9,
    "src": "https://lh3.googleusercontent.com/d/1fiOoK5eTSsoxU49hIwgOD6mp_ffkOuqW=w9999",
    "description": "Drone 1"
  },
  {
    "page": 10,
    "src": "https://lh3.googleusercontent.com/d/1p7-nAyZ7L9VXH717OkxXhqQg-l8BelYX=w9999",
    "description": "Drone 2"
  },
  {
    "page": 11,
    "src": "https://lh3.googleusercontent.com/d/1x8pj8ndrI-TkcNnXpNm5jXu_yxfiG3CN=w9999",
    "description": "IPA 1 - Guru"
  },
  {
    "page": 12,
    "src": "https://lh3.googleusercontent.com/d/1XgBozB6oSvjxYymw2FgsPqQH2exELkd-=w9999",
    "description": "IPA 1 - Kelompok 1"
  },
  {
    "page": 13,
    "src": "https://lh3.googleusercontent.com/d/1TrPuD70wlE9OhDz34nbXQFTQHC-CU7zc=w9999",
    "description": "IPA 1 - Kelompok 2"
  },
  {
    "page": 14,
    "src": "https://lh3.googleusercontent.com/d/1RGmaxQauxTS8uvJjUChdAC163ZHJ7ZpE=w9999",
    "description": "IPA 1 - Kelompok 3"
  },
  {
    "page": 15,
    "src": "https://lh3.googleusercontent.com/d/1rvjKyR7aUPrf_kKgm-hvjjCqhd1KR2E2=w9999",
    "description": "IPA 1 - Kelompok 4"
  },
  {
    "page": 16,
    "src": "https://lh3.googleusercontent.com/d/1XpdaD1PaSFLqgluR_rUigLf5mFOSfjiy=w9999",
    "description": "IPA 1 - Kelompok 5"
  },
  {
    "page": 17,
    "src": "https://lh3.googleusercontent.com/d/1ou2lgy7QPbv36-Aw3QhW6CcleH74jv7y=w9999",
    "description": "IPA 1 - Anandya Pramesti, Hanni Masykuroh, Hapsari Indah Astuti, Anis Dwi Ariska, Handika Rahman Trinanda, Karina Kunandari, Asti Hatnyono Wati, Guntara Falah Darmawan Suprapto, Bayu Aditya Purbandaru, Gita Sintya Pratiwi, Choirul Inayah, Fakhruddin Iman Wafi, Dina Ayuni Cahyana, Erizta Alifa Prabandani."
  },
  {
    "page": 18,
    "src": "https://lh3.googleusercontent.com/d/1m3L-k6iP4ytXgH6VFgmcJ7FePu5Q8r_D=w9999",
    "description": "IPA 1 - Kurniawati Aprilia Enispratiwi, Zahfarina Nurkholisa, Zulaikho Nur Ahdiyya, Monita Christya Gita, Yola Fathan P. a.k.a CLEMENZA, Monitta Yuharwanti, Ulya Himawati, Nirwanasari Nurkhayani, Silfia Aknalia, Nugraheni Putri Swastika, Rika Meilani, Nuha Nur Umara Rafi, Putri Cita Andrilia."
  },
  {
    "page": 19,
    "src": "https://lh3.googleusercontent.com/d/1_fMxfHt2Atr6Z3HR6URakENPZ8jMPv2c=w9999",
    "description": "IPA 1 - Kelas"
  },
  {
    "page": 20,
    "src": "https://lh3.googleusercontent.com/d/1fbJbQVCrNcRfwhc0S_PaWoyJ3P9fivQM=w9999",
    "description": "IPA 2 - Guru"
  },
  {
    "page": 21,
    "src": "https://lh3.googleusercontent.com/d/1rY82C3T3YJ59IjODSs_E8xbCzCZN6WOn=w9999",
    "description": "IPA 2 - Kelompok 1"
  },
  {
    "page": 22,
    "src": "https://lh3.googleusercontent.com/d/1QIz6SDeyD6EXfPAOh6Mk8oc9s6hwRnVZ=w9999",
    "description": "IPA 2 - Kelompok 2"
  },
  {
    "page": 23,
    "src": "https://lh3.googleusercontent.com/d/1-JWlRo61vdKgjtfEDMvn__bK6CGO5wKq=w9999",
    "description": "IPA 2 - Kelompok 3"
  },
  {
    "page": 24,
    "src": "https://lh3.googleusercontent.com/d/1Zs2ivRp9xyZN_K-fnR0Q1Y2a1M1yhFmq=w9999",
    "description": "IPA 2 - Kelompok 4"
  },
  {
    "page": 25,
    "src": "https://lh3.googleusercontent.com/d/1tCLOxG3Z2GSf94AD55tjcE4cS_8CYSaD=w9999",
    "description": "IPA 2 - Kelompok 5"
  },
  {
    "page": 26,
    "src": "https://lh3.googleusercontent.com/d/1RIT-MEle6BYru7OFsf3ewl3bImqxd02K=w9999",
    "description": "IPA 2 - Afni Nirwana, Choirun Nisa Dwi R, Annisa Pratiwi, Anis Khusniyati, Erma Nurunia, Akhmad Al Faradcy, Dentang Jaya Wijaya, Kunti Rismiwandira, Antonius Hegarian, Dwi Anggraeni Mulatsih, Faisal Ramdani, Amir Wahyu Nugroho, Hesti Milawati, Liza Sofiana Devi."
  },
  {
    "page": 27,
    "src": "https://lh3.googleusercontent.com/d/1Py3FACwIIdZcbzEr3mD0BD8boqa5ANK9=w9999",
    "description": "IPA 2 - Niken Raidyna Laksmi Timur, Safa Rosmita, Granita Khanaria, Resti Rafani, Sofia Hidayatur Rohmah, Miftachul Hanifah, Patrecia Purigena Watugilang, Ulfa Nafi'Atuzzakiyah, Muhammad Widyatmoko, Rizki Wulan Yunitasari, Uswatun Khasanah, Riska Amelia, Rami Rindy Karuniawati, Yosephine Nurmalasari."
  },
  {
    "page": 28,
    "src": "https://lh3.googleusercontent.com/d/18UH4--PS8Nqx_oUSItz47G1o1e00yjk5=w9999",
    "description": "IPA 2 - Kelas"
  },
  {
    "page": 29,
    "src": "https://lh3.googleusercontent.com/d/1wJePGO5P3D2uHpAhZEHyivVrlVpIDarJ=w9999",
    "description": "IPA 3 - Guru"
  },
  {
    "page": 30,
    "src": "https://lh3.googleusercontent.com/d/1oBYvew5BcLj--d13B383zR52jN0Rrz9B=w9999",
    "description": "IPA 3 - Kelompok 1"
  },
  {
    "page": 31,
    "src": "https://lh3.googleusercontent.com/d/1zQRsQkWoOTeV0Q_x3fWUMmueLuVDtaM4=w9999",
    "description": "IPA 3 - Kelompok 2"
  },
  {
    "page": 32,
    "src": "https://lh3.googleusercontent.com/d/1VVIx0o3HHMfhiMgzH-JMZyK6tGsHG-v_=w9999",
    "description": "IPA 3 - Kelompok 3"
  },
  {
    "page": 33,
    "src": "https://lh3.googleusercontent.com/d/1f6JxV6B677AdAIVnjoiEijdpkjkxduG_=w9999",
    "description": "IPA 3 - Kelompok 4"
  },
  {
    "page": 34,
    "src": "https://lh3.googleusercontent.com/d/17P6K6AcgPBsZCVCJFKjV02TQHuakeH1d=w9999",
    "description": "IPA 3 - Kelompok 5"
  },
  {
    "page": 35,
    "src": "https://lh3.googleusercontent.com/d/16fe28hkZLangu-hZRo_M1_dwkYkiu9PF=w9999",
    "description": "IPA 3 - Ali Al Faras, Desy Aryani, Ike Previa Redayosita, Aliva Putri Nurdiyanti, Dinorma Intan Zulqa, Indah Zuli Pratami, Annisa Rahmawati, Farida Intan Rizki Kusumawardani, Megananda, Arif Imam Pambudi, Hafizha Kurnia Indahsari, Nabela Dhea Ulhaq, Candra Kurnia Saputri, Hamah Murti Dina Usmana, Nazar Idam Setyayuda."
  },
  {
    "page": 36,
    "src": "https://lh3.googleusercontent.com/d/17-bx11SBhxVmoWbxhlEsYBgeOOwyNUKu=w9999",
    "description": "IPA 3 - Nikmatul Hidayah, Rivandha Reva Arvianto, Nisma Akila, Rizki Setyo Dwipasari, Suprapti, Ogi Hafit Purnama, Rosalina Putri Utami, Umi Latifah, Puji Astuti, Salsabila Pawestri, Vera Melinda, Ridha Nur Zulaekha, Siwi Prihandini, Yuliana Eka Setyaningrum."
  },
  {
    "page": 37,
    "src": "https://lh3.googleusercontent.com/d/1DdEObYqxA96HX2lt0wsr73zHNDdbPeMm=w9999",
    "description": "IPA 3 - Kelas"
  },
  {
    "page": 38,
    "src": "https://lh3.googleusercontent.com/d/12HGG-C31Olcn4LdNsxRc-sds4MVjMoBL=w9999",
    "description": "IPA 4 - Guru"
  },
  {
    "page": 39,
    "src": "https://lh3.googleusercontent.com/d/1L1cz7KEzdbnbs4eaMVm8SB7xda-qqXf2=w9999",
    "description": "IPA 4 - Kelompok 1"
  },
  {
    "page": 40,
    "src": "https://lh3.googleusercontent.com/d/1q6CLcaqu1huwuQoUi6uk4mgYwvZqtpBk=w9999",
    "description": "IPA 4 - Kelompok 2"
  },
  {
    "page": 41,
    "src": "https://lh3.googleusercontent.com/d/1bHR0isuYFqhv04PF5UFUa4keK_TCYO8d=w9999",
    "description": "IPA 4 - Kelompok 3"
  },
  {
    "page": 42,
    "src": "https://lh3.googleusercontent.com/d/1Bp_yOCU-HWGef6hWYoq8QL7aRFvu-fIC=w9999",
    "description": "IPA 4 - Kelompok 4"
  },
  {
    "page": 43,
    "src": "https://lh3.googleusercontent.com/d/1cvHJlQbdTjwZwMSixsFbQ4EPcZTzEhQn=w9999",
    "description": "IPA 4 - Gazha Hanudya Al- Hafid, Aldila Rofiana Aprianingrum, Amir Muez, Arini Nidianingsih, Dwi Aji Wicaksana, Dwi Sakinnatul Jannah, Dwiana Yoga Saputra, Dyah Sekar Widyaningrum, Farhan Puja Mahendra, Farid Azhari."
  },
  {
    "page": 44,
    "src": "https://lh3.googleusercontent.com/d/1EEdd1NlG3thQRiH29zan6Z4szm_RrTTw=w9999",
    "description": "IPA 4 - Sulis Setyaningsih, Nicky Fahriyanti Salasa, Irfan Ardani, Putri Pradana Hernawati, Kurnia Dewi Anisaa, Rahayu Dwi Astiti Gunesti, Laelatul Wakhidah, Rakhmat Dwi Putra, Muhammad Agung Wicaksono, Riska Anggraini, Sabrina Atria Sani."
  },
  {
    "page": 45,
    "src": "https://lh3.googleusercontent.com/d/19ZrgswcWq99nfE1u8Tneozw3Cg9gFxOb=w9999",
    "description": "IPA 4 - Kelas"
  },
  {
    "page": 46,
    "src": "https://lh3.googleusercontent.com/d/1OUfB4yDD2IoldzFDf6a7c9s1K8t8PcJA=w9999",
    "description": "IPA 5 - Guru"
  },
  {
    "page": 47,
    "src": "https://lh3.googleusercontent.com/d/1KSrdZjCVoGrFkLi68UFqBlUvN6WNWcMr=w9999",
    "description": "IPA 5 - Kelompok 1"
  },
  {
    "page": 48,
    "src": "https://lh3.googleusercontent.com/d/1YaKiX_BqoASzXdGR8dL_lGjooG0fWeCr=w9999",
    "description": "IPA 5 - Kelompok 2"
  },
  {
    "page": 49,
    "src": "https://lh3.googleusercontent.com/d/1UlytRttZiY1hNG4nVOPZBr9BlNbnSTyv=w9999",
    "description": "IPA 5 - Kelompok 3"
  },
  {
    "page": 50,
    "src": "https://lh3.googleusercontent.com/d/1BPW2Fw_zWzsdMn2xC8fEH5Vd7tyBxIg6=w9999",
    "description": "IPA 5 - Kelompok 4"
  },
  {
    "page": 51,
    "src": "https://lh3.googleusercontent.com/d/1Ww4QxlY8U0DK_VpmSoencSRvlMSrFCzP=w9999",
    "description": "IPA 5 - Adhe Irfan Mahfud, Aji Prayoga, Anisa Prihatiningsih, Aulia Khairunisa, Hanif Awandani, Bima Wahyu Sanditya, Candra Widi Nugraha, Damas Muhammad Yunus, Dewry Arinta, Akhmad Aadam Maulana."
  },
  {
    "page": 52,
    "src": "https://lh3.googleusercontent.com/d/10yWktYtqmZm3GM1DA2SIcONK5ymdW04v=w9999",
    "description": "IPA 5 - Ratih Yuniar Widyastuti, Candra Widi Nugraha, Rizqi Puspasari S.P., Firman Malik Parlindungan, Rosli Mohamad Arif, Lailatul Ibriza, Sheila Maharani Putri, Mega Katon Rahayu, Tina Irmadany, Nency Wulan E., Nisaul Fitri."
  },
  {
    "page": 53,
    "src": "https://lh3.googleusercontent.com/d/1reirpj55MKE_sGqZW9aaqHoEwkHbfaJQ=w9999",
    "description": "IPA 5 - Kelas"
  },
  {
    "page": 54,
    "src": "https://lh3.googleusercontent.com/d/1NuwhGJSzFhD4G2efi5-62x55rd95HHSG=w9999",
    "description": "IPS 1 - Guru"
  },
  {
    "page": 55,
    "src": "https://lh3.googleusercontent.com/d/1VJwjTYWue3ndClzjuOmEyp6jqaHHVMrq=w9999",
    "description": "IPS 1 - Kelompok 1"
  },
  {
    "page": 56,
    "src": "https://lh3.googleusercontent.com/d/1r1aLX2Vp_l-HspgtBgAdLCA3bgrZgThd=w9999",
    "description": "IPS 1 - Kelompok 2"
  },
  {
    "page": 57,
    "src": "https://lh3.googleusercontent.com/d/19Whvp1sX27cwKGlwLG4rxFgwjMTsoGQ7=w9999",
    "description": "IPS 1 - Kelompok 3"
  },
  {
    "page": 58,
    "src": "https://lh3.googleusercontent.com/d/1LV2re7uOXIaa-vNdmTQ7CEh0Us27Vvna=w9999",
    "description": "IPS 1 - Kelompok 4"
  },
  {
    "page": 59,
    "src": "https://lh3.googleusercontent.com/d/10oanCW1790dXsgkpbgZsHV6A78jIwAiq=w9999",
    "description": "IPS 1 - Kelompok 5"
  },
  {
    "page": 60,
    "src": "https://lh3.googleusercontent.com/d/1DfM2WYvaD63u21roWAt1fzQqkM2wLeVQ=w9999",
    "description": "IPS 1 - Abednego Petra Prasetya, Dicky Satria Mulya D, Kevin Septa Krisdian, Adzanninta Lintang Pahlevi, Dinda Fariz Alamsyah, Krisna Guntur Dwi Saputra, Ainun Fatiha Utami, Dwi Chandra Kusumawati, Lois Errita Purnamasari, Albertha Daisy Arya Palupi, Elizabeth Febe Yulian Suwandi, Lydia Mutiara Elim Loblobly, Azzam Alif Muhammad, Fariz Ahmad Veryawan, Muhammad Adnan Hidayat, Dedi Setiawan, Habin Teguh Kurniawan, Natsha Chusna Pratifa."
  },
  {
    "page": 61,
    "src": "https://lh3.googleusercontent.com/d/1Eb0RrNXl4uZ0DZT8Jrtw1mEfrXbJkNVC=w9999",
    "description": "IPS 1 - Rizaldi Naufal Herdanto, Sasya Hanindha, Vira Syavilla Tanalo, Rr. Fransisca Krisdianutami Mawaski, Sulthan Yusuf Althaf Hafidh, Yoga Arih Wirasta, Safitri Febyana Hapsari ES."
  },
  {
    "page": 62,
    "src": "https://lh3.googleusercontent.com/d/1M5GB30WGXpHCIhnWPTyVvyoJTjBTxwKh=w9999",
    "description": "IPS 1 - Kelas"
  },
  {
    "page": 63,
    "src": "https://lh3.googleusercontent.com/d/1NP3h-4V3QYVhW22dW6zoRu9xPmAStdQn=w9999",
    "description": "IPS 2 - Guru"
  },
  {
    "page": 64,
    "src": "https://lh3.googleusercontent.com/d/1ooy7I6NlX2c5g26cvZdj7FSap9hb0JSa=w9999",
    "description": "IPS 2 - Kelompok 1"
  },
  {
    "page": 65,
    "src": "https://lh3.googleusercontent.com/d/1V9R3xi_fhyF1emWySvYz1deJ1qZJIM9H=w9999",
    "description": "IPS 2 - Kelompok 2"
  },
  {
    "page": 66,
    "src": "https://lh3.googleusercontent.com/d/1bK9DZQWMFtbyvjaKUNdGg-aUAzbTxjij=w9999",
    "description": "IPS 2 - Kelompok 3"
  },
  {
    "page": 67,
    "src": "https://lh3.googleusercontent.com/d/1OJg2MMP7IRzBKtUe6ojENfsU0A0ElHsM=w9999",
    "description": "IPS 2 - Kelompok 4"
  },
  {
    "page": 68,
    "src": "https://lh3.googleusercontent.com/d/1xuSehPlVEjOTPoS_hHJPDoYEXRV6GHFB=w9999",
    "description": "IPS 2 - Aditya Bagus Saputra, Alif Bryan Pradana Kusuma, Anggi Kusumawati, Aniestiyana, Arifin Raj Sanda, Bayu Adjie Indoyo, Catur Retno Rahayu, Egga Bayu Prastyo, Fandyco Prima Yusuf, Fikri Dwi Andriyanto, Firdaus Fakhri Azizi, Indah Sofiatul Nuraini, Intan Praptika Darmawan, Kartika Ayu Pramesti, Kiki Rosalia, Klara Dwi Anjani, Muhammad Bintang Nabila, Muhammad Daffa Fahrizal."
  },
  {
    "page": 69,
    "src": "https://lh3.googleusercontent.com/d/1IMew2KotoGs19VyLhul3L1zY2VWOLDcv=w9999",
    "description": "IPS 2 - Nurul Aisyah, Nurul Cesaria Maulina, Qois Nadalathifah, Reynaldi Arga Satriawan, Titik Indah Yunita, Yogi Putra Anggitatama."
  },
  {
    "page": 70,
    "src": "https://lh3.googleusercontent.com/d/1Ge0CeDjpaQcYGQxeB7oZoGeXkNOSmdjC=w9999",
    "description": "IPS 2 - Kelas"
  },
  {
    "page": 71,
    "src": "https://lh3.googleusercontent.com/d/11ABdAB_K7Rysr49FrOUq1ny5kjA_JOky=w9999",
    "description": "IPS 3 - Guru"
  },
  {
    "page": 72,
    "src": "https://lh3.googleusercontent.com/d/1c0MDqlPvzGtli0okojroWQeYzAEunslo=w9999",
    "description": "IPS 3 - Kelompok 1"
  },
  {
    "page": 73,
    "src": "https://lh3.googleusercontent.com/d/1nfpZReSkDodlrBwdSYo6fykv31mv4oQX=w9999",
    "description": "IPS 3 - Kelompok 2"
  },
  {
    "page": 74,
    "src": "https://lh3.googleusercontent.com/d/1-tPGFfCCx3MKg8gbEKOgkb9UzCVGx16y=w9999",
    "description": "IPS 3 - Kelompok 3"
  },
  {
    "page": 75,
    "src": "https://lh3.googleusercontent.com/d/1RcgaElrovs4-snQxP7H5eRfinjEXWCQ3=w9999",
    "description": "IPS 3 - Kelompok 4"
  },
  {
    "page": 76,
    "src": "https://lh3.googleusercontent.com/d/1fTphczHWrpiSIn0KMuihOzHJHPFk9b5G=w9999",
    "description": "IPS 3 - Adam Ghozali Reynaldo Suharto, Adi Saputra Hidayat, Advent Surya D.D, Amandasari Mardiana, Ayu Dian Lestari, Bagas Winektu, Cesarioni Anggra Septa Rajasya Effendi, Damarjiwa Natajagad, Damay Ria Aprillia Nugraha, Deajeng Ardinasari, Diandra Izzani Sari, Dwi Suseno Aji, Fadel Rachmad Hermanto, Kemal Shideqi Abrar, Meilina Fatmawati, Refina Nidya Prikiswari, Regitta Fatmawati Octarina, Risky Budi Kurniawan."
  },
  {
    "page": 77,
    "src": "https://lh3.googleusercontent.com/d/1uoenoTh0QLPNqvXUxgwU2NfdbeR58Hbj=w9999",
    "description": "IPS 3 - Rosemala Ghassani Asmaraningtyas, Sekar Pinilih, Vania Ayu Shafira, Wahyu Bimo Santoso, Yoga Ardiyanto, Yulia Ayu Puspitasari."
  },
  {
    "page": 78,
    "src": "https://lh3.googleusercontent.com/d/13bmG37-LrtUJHr-HnxlxjQb0zTDEcP2y=w9999",
    "description": "IPS 3 - Kelas"
  },
  {
    "page": 79,
    "src": "https://lh3.googleusercontent.com/d/1pjvOs3A_2jVHSplqm8BVXNu1SNqtgotR=w9999",
    "description": "IPS 4 - Guru"
  },
  {
    "page": 80,
    "src": "https://lh3.googleusercontent.com/d/1uiJJxa1HDcs5qNNvkMAx48oj0FOqHvBN=w9999",
    "description": "IPS 4 - Kelompok 1"
  },
  {
    "page": 81,
    "src": "https://lh3.googleusercontent.com/d/1fbYKQgStPsNc9Cxz8Eyey4XpYIiiqD7D=w9999",
    "description": "IPS 4 - Kelompok 2"
  },
  {
    "page": 82,
    "src": "https://lh3.googleusercontent.com/d/1plWkhPx5Uywz0pcnjK7EdmmJ5Ikv9a6o=w9999",
    "description": "IPS 4 - Kelompok 3"
  },
  {
    "page": 83,
    "src": "https://lh3.googleusercontent.com/d/16EcNqzX1bKl3f-10jesdsADWTAYTKfEV=w9999",
    "description": "IPS 4 - Kelompok 4"
  },
  {
    "page": 84,
    "src": "https://lh3.googleusercontent.com/d/1ekxUEW3yS_0IiLOlDS3BXS8aZyT8moBe=w9999",
    "description": "IPS 4 - Almira Palufi Kesuma, Ariesta Indah P.A, Ceasar Castro Ardi, Choirunnisa Nabila Safitri, Dara Shinta Pratiwi, Darmawan Wahyu Utama, Flo Dina Kristanty, Helmy Ahmad, Ilham Yusril Prihapsoro, Irfansyah Eka Lesmana, Ivan Aditya Ramadhan, Karina Puspa Sari, Muhammad Fahrizal, Noor Faisal Isamunir, Novika Ayu Amalia, Nurul Khusna, Palupi Endang Sejati, Prinka Dea Nurrahma."
  },
  {
    "page": 85,
    "src": "https://lh3.googleusercontent.com/d/1WHPRYKgGRB_2UTuRCMZFhvABeyzfr6Sr=w9999",
    "description": "IPS 4 - Ressa Yuspita, Retno Puji Astuti, Rizka Ainuddina, Santi Pramudita, Yoga Krisna Fardhana, Zora Nayaka Widyadhana."
  },
  {
    "page": 86,
    "src": "https://lh3.googleusercontent.com/d/12q0pO_hktFNe_4PqbMRHchxwSgagf3p7=w9999",
    "description": "IPS 4 - Kelas"
  },
  {
    "page": 87,
    "src": "https://lh3.googleusercontent.com/d/1Nt4Y8TWxD_DzwIf_eCGHOqLFRzDdqkpe=w9999",
    "description": "Panitia"
  },
  {
    "page": 88,
    "src": "https://lh3.googleusercontent.com/d/19wBPb0hOaHchocsVlkJ1_TkTW9kCPhvn=w9999",
    "description": "Kolase"
  },
  {
    "page": 89,
    "src": "https://lh3.googleusercontent.com/d/15G3MTx2FIQ04bWkmL32JFwNbFylkm4ZC=w9999",
    "description": "Pramuka & MPK"
  },
  {
    "page": 90,
    "src": "https://lh3.googleusercontent.com/d/1bsuuIff9Y7gombEoKQQYvCzgcDggtR7N=w9999",
    "description": "Osis"
  },
  {
    "page": 91,
    "src": "https://lh3.googleusercontent.com/d/1LWhCNHl3nR-pwwQYnluDUPHZbffLAmEs=w9999",
    "description": "Moving School"
  },
  {
    "page": 92,
    "src": "https://lh3.googleusercontent.com/d/1HI9F_3aS8XMKQGYb8tCdRLFhb8p4noX4=w9999",
    "description": "Cover 2"
  }
];
