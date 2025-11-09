function toggleMenu(){
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const open = menu.classList.toggle('show');
  overlay.classList.toggle('show', open);
}

// إنشاء الرسم البياني
document.addEventListener('DOMContentLoaded', ()=>{
  const ctx = document.getElementById('reportsChart').getContext('2d');

  const data = {
    labels: ['يناير','فبراير','مارس','أبريل','مايو'],
    datasets: [
      { label:'موثقة', data:[5,6,4,7,10], backgroundColor:'rgba(0,255,163,0.7)' },
      { label:'مرفوضة', data:[1,2,0,1,1], backgroundColor:'rgba(255,107,107,0.7)' },
      { label:'تحت المراجعة', data:[2,1,2,1,1], backgroundColor:'rgba(255,205,86,0.7)' }
    ]
  };

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: { legend:{ labels:{ color:'#fff' } } },
      scales: {
        x:{ ticks:{ color:'#fff' }, grid:{ color:'rgba(255,255,255,0.1)' } },
        y:{ ticks:{ color:'#fff' }, grid:{ color:'rgba(255,255,255,0.1)' } }
      }
    }
  });
});

// تحميل التقرير PDF
async function downloadPDF(){
  const section = document.getElementById('reportSection');
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(section, {scale:2});
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p','mm','a4');
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData,'PNG',0,0,width,height);
  pdf.save('تقرير_التوثيق.pdf');
}

// تحميل Excel بسيط
function downloadExcel(){
  let table = document.getElementById('summaryTable');
  let html = table.outerHTML;
  let url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
  let link = document.createElement('a');
  link.href = url;
  link.download = 'تقرير_التوثيق.xls';
  link.click();
}