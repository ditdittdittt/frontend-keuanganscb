export default {
  alert: {
    error: 'terjadi kesalahan: ',
    login: {
      success: 'login berhasil',
      error: 'login gagal',
      warning: 'email atau password salah'
    },
    update: {
      success: 'data berhasil diperbarui',
      error: 'gagal memperbarui data'
    },
    delete: {
      success: 'data berhasil dihapus',
      error: 'gagal menghapus data'
    },
    detail: {
      sign: 'Gagal karena tidak ada tanda tangan',
      getError: 'Terjadi kesalahan saat mengirim data ke server'
    },
    formPetty: {
      success: 'Berhasil membuat form petty cash',
      failed: 'Gagal membuat form petty cash'
    },
    formRequest: {
      success: 'Berhasil membuat form request',
      failed: 'Gagal membuat form request',
      error: 'Terdapat kesalahan saat validasi data',
      overBalance: 'Nominal lebih besar dari pada balance pada budget code '
    },
    formSubmission: {
      success: 'Berhasil membuat form submission',
      failed: 'Gagal membuat form submission',
      error: 'Terdapat kesalahan saat validasi data'
    },
    managementBank: {
      save: 'Rekening berhasil di simpan',
      delete: 'Rekening berhasil di hapus',
      store: 'Form belum valid'
    },
    managementBudget: {
      save: 'Budget code berhasil di simpan',
      delete: 'Budget code berhasil di hapus',
      store: 'Form belum valid'
    },
    managementUser: {
      update: 'Berhasil mengupdate user',
      show: 'Gagal menampilkan daftar peran user'
    },
    validation: {
      textTooLong: 'Kata terlalu panjang',
      alphabetic: 'tolong gunakan huruf dan angka saja'
    }
  },
  components: {
    button: {
      text: 'tombol',
      login: 'masuk',
      logout: 'keluar',
      save: 'simpan',
      reset: 'setel ulang',
      submit: 'kirim',
      add: 'tambah',
      delete: 'hapus',
      cancel: 'batal',
      done: 'selesai',
      close: 'tutup',
      update: 'perbarui',
      sure_button_yes: 'ya',
      sure_button_no: 'tidak',
      already_paid: 'sudah dibayarkan',
      reject: 'tolak',
      need_submission: 'apakah form ini membutuhkan submisi?'
    },
    row: {
      text: 'baris'
    },
    table: {
      title: {
        request: 'tabel request',
        submission: 'tabel submission',
        petty_cash: 'tabel petty cash',
        budget_code: 'tabel kode anggaran',
        role: 'tabel peran',
        user: 'tabel pengguna',
        bank: 'tabel rekening bank'
      },
      subtitle: {
        request: 'daftar pengajuan dana',
        submission: 'daftar submisi dana',
        petty_cash: 'daftar pengajuan uang belanja kecil',
        budget_code: 'daftar kode anggaran',
        role: 'daftar peran',
        user: 'daftar pengguna',
        bank: 'daftar rekening bank'
      }
    },
    form: {
      title: {
        request: 'formulir pengajuan dana',
        submission: 'formulir submisi dana',
        petty_cash: 'formulir petty cash',
        role: 'formulir peran',
        budget_code: 'formulir kode anggaran',
        bank: 'formulir akun bank'
      },
      subtitle: {
        request: 'isi formulir untuk mengajukan dana',
        submission: 'isi formulir untuk submisi dana',
        petty_cash: 'isi formulir untuk pengajuan uang belanja kecil',
        role: 'isi formulit peran',
        budget_code: 'isi formulir untuk membuat kode anggaran',
        bank: 'isi formulir untuk membuat akun bank'
      }
    }
  },
  text: {
    language: 'bahasa',
    request: 'pesanan',
    pic: 'penanggung jawab',
    division: 'divisi',
    cash: 'tunai',
    transfer: 'transfer',
    date: 'tanggal',
    budget_code: 'kode anggaran',
    budget_name: 'nama anggaran',
    budget_nominal: 'nominal anggaran',
    allocation: 'alokasi',
    amount: 'jumlah',
    balance: 'saldo',
    note: 'catatan',
    additional_file: 'berkas tambahan',
    attachment_file: 'berkas lampiran',
    fund: 'dana',
    submission: 'submisi',
    use: 'kegunaan',
    petty_cash: 'petty cash',
    amount_in_word: 'jumlah terbilang',
    setting: 'setelan',
    theme: 'tema',
    light: 'terang',
    dark: 'gelap',
    mode: 'mode',
    color: 'warna',
    primary: 'primer',
    secondary: 'sekunder',
    accent: 'aksen',
    form: 'formulir',
    all: 'semua',
    file: 'berkas',
    budget: 'anggaran',
    account: 'akun',
    name: 'nama',
    username: 'username',
    password: 'sandi',
    new_password: 'sandi baru',
    old_password: 'sandi lama',
    email: 'email',
    job: 'pekerjaan',
    position: 'posisi',
    additional_information: 'informasi tambahan',
    nik: 'nik',
    address: 'alamat',
    required: 'harus di isi',
    payment_type: 'tipe pembayaran',
    verification: 'pembuktian',
    confirmation: 'konfirmasi',
    head_dept: 'kepala dept',
    head_office: 'kepala kantor',
    manager_ops: 'manajer operasi',
    cashier: 'kasir',
    verificator: 'pemeriksa',
    view: 'lihat',
    user: 'pengguna',
    action: 'aksi',
    total_item: 'total barang',
    created_at: 'dibuat saat',
    updated_at: 'diubah saat',
    search: 'cari',
    bank_name: 'nama bank',
    bank_code: 'kode bank',
    account_number: 'nomor rekening',
    account_owner: 'pemilik rekening',
    status: 'status',
    sure_delete_head: 'hapus form ini?',
    sure_delete_bank_head: 'hapus akun bank ini?',
    sure_delete_body: 'form ini tidak dapat dipulihkan setelah di buang',
    sure_delete_bank_body:
      'akun bank ini tidak dapat dipulihkan setelah di buang',
    sure_verify_head: 'verifikasi form ini?',
    sure_verify_body: 'form ini tidak bisa diubah setelah diverifikasi',
    current_file: 'berkas saat ini',
    back: 'kembali',
    positive: 'harus bernilai positif',
    convert_to_image: 'mengonversi ke dalam gambar, harap menunggu',
    number: 'nomor',
    role: 'peran',
    confirm_password: 'konfirmasi password',
    code: 'Kode',
    sure_reject_head: 'tolak form ini?',
    sure_reject_body: 'form ini tidak bisa dipulihkan setelah ditolak',
    sure_paid_head: 'anda yakin uang sudah diterima?',
    sure_paid_body: 'form tidak bisa dikembalikan setelah melakukan konfirmasi',
    paid_at: 'dibayarkan saat',
    information: 'informasi',
    top_up: 'isi saldo',
    nominal: 'nominal',
    sure_need_submission_head: 'apakah form ini butuh submisi?',
    sure_need_submission_body:
      'pilih ya jika membutuhkan, tidak jika tidak dibutuhkan',
    bank_account: 'rekening bank',
    rawData: 'Data Mentah',
    history_log: 'pencatatan',
    no_log: 'tidak ada log',
    no_signature_yet: 'belum ada tanda tangan',
    signature_is_ready:
      'tanda tangan siap disimpan, tekan tombol ya untuk menyimpan'
  },
  helper: {
    messages: {
      attachment_file: 'klik untuk memilih lampiran',
      amount_in_word: 'otomatis terisi',
      auto: 'otomatis terisi'
    },
    name: 'nama lengkap',
    username: 'nama panggilan atau singkatan',
    email: 'gunakan email yang benar',
    wrong_email: 'format email tidak tepat',
    password: 'gunakan kata sandi yang aman',
    confirm_password: 'tulis ulang kata sandi',
    different_password: 'password yang tertulis berbeda',
    division: 'divisi pada tempat kerja',
    role: 'peran pada penggunaan software',
    nik: 'nomor induk kependudukan',
    address: 'alamat tempat tinggal',
    multiple_bank: 'pisahkan dengan koma untuk data yang lebih dari satu',
    need_more_detail_in_table:
      'jika ingin melihat lebih lengkap, pilih table view',
    login_keep_fail:
      'Apabila gagal melakukan login terus menerus, tolong periksa data yang diinput, sambungan internet, dan koneksi pada server'
  },
  export: {
    pdf: 'ekspor ke PDF',
    excel: 'ekspor ke Excel'
  }
}
