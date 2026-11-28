interface siswa  {
  name : string;
  class : string;
  score : number;
  status : "Aktif" | "Nonaktif";
}

const students : siswa[] = [
  { name: "Andi Saputra",    class: "Full Stack A", score: 85, status: "Aktif" },
  { name: "Budi Santoso",    class: "Full Stack A", score: 78, status: "Aktif" },
  { name: "Citra Lestari",   class: "Full Stack B", score: 92, status: "Aktif" },
  { name: "Dewi Anggraini",  class: "Backend Core", score: 88, status: "Aktif" },
  { name: "Eko Prasetyo",    class: "Backend Core", score: 75, status: "Nonaktif" },
  { name: "Fina Amelia",     class: "Full Stack A", score: 95, status: "Aktif" },
  { name: "Gilang Ramadhan", class: "Full Stack B", score: 80, status: "Aktif" },
  { name: "Hani Fitriani",   class: "Backend Core", score: 89, status: "Aktif" },
  { name: "Irfan Hakim",     class: "Full Stack B", score: 70, status: "Nonaktif" },
  { name: "Joko Susilo",     class: "Backend Core", score: 82, status: "Aktif" }
];

const inputCari = document.getElementById("inputCari") as HTMLInputElement; 
const infoJumlah = document.getElementById("infoJumlah") as HTMLElement;
const tableBody = document.getElementById("isiTabelSiswa") as HTMLElement;
const nilaiRataRata = document.getElementById("nilaiRataRata") as HTMLElement;

function getScoreClass(score:number): string {
  if (score >= 85) {
    return "tanda-hijau";
  } else if (score >= 75) {
    return "tanda-kuning";
  } else {
    return "tanda-merah";
  }
}

function getStatusClass(status:siswa["status"]):string  {
  if (status === "Aktif") {
    return "tanda-aktif";
  } else {
    return "tanda-nonaktif";
  }
}

function renderTable(data:siswa[]):void {
  infoJumlah.textContent = "Siswa " + data.length + " dari " + students.length + " siswa";

  if (data.length === 0) {
    tableBody.innerHTML =
      '<tr class="baris-kosong"><td colspan="5">Siswa tidak ditemukan. Coba kata kunci lain.</td></tr>';
    return;
  }

  const rows:string[] = data.map(function (student:siswa, index:number):string {
    return `
      <tr>
        <td class="kolom-no">${index + 1}</td>
        <td class="kolom-nama">${student.name}</td>
        <td class="kolom-tengah"><span class="tanda tanda-kelas">${student.class}</span></td>
        <td class="kolom-tengah"><span class="tanda ${getStatusClass(student.status)}">${student.status}</span></td>
        <td class="kolom-tengah"><span class="tanda ${getScoreClass(student.score)}">${student.score}</span></td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows.join("");
}

function renderAverage(data:siswa[]):void {
  if (data.length === 0) {
    nilaiRataRata.textContent = "0";
    return;
  }

  const totalScore:number = data.reduce(function (total:number, student:siswa):number {
    return total + student.score;
  }, 0);

  const average:number = totalScore / data.length;

  nilaiRataRata.textContent = average.toFixed(1);
}

inputCari.addEventListener("input", function ():void {
  const keyword:string = inputCari.value.toLowerCase().trim();

  const filterStudents:siswa[] = students.filter(function (student:siswa):boolean {
    return student.name.toLowerCase().includes(keyword);
  });

  renderTable(filterStudents);
  renderAverage(filterStudents);
});

renderTable(students);
renderAverage(students);