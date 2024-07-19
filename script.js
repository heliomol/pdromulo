// script.js

const ctx = document.getElementById('myChart').getContext('2d');

const data = [
    {"Fluxo": "1", "Iteracao": "1"},
    {"Fluxo": "2", "Iteracao": "2"},
    {"Fluxo": "15", "Iteracao": "3"},
    {"Fluxo": "16", "Iteracao": "4"},
    {"Fluxo": "30", "Iteracao": "5"},
    {"Fluxo": "31", "Iteracao": "6"},
    {"Fluxo": "16", "Iteracao": "7"},
    {"Fluxo": "15", "Iteracao": "8"},
    {"Fluxo": "14", "Iteracao": "9"},
    {"Fluxo": "13", "Iteracao": "10"},
    {"Fluxo": "12", "Iteracao": "11"},
    {"Fluxo": "11", "Iteracao": "12"},
    {"Fluxo": "10", "Iteracao": "13"},
    {"Fluxo": "9", "Iteracao": "14"}
];

const fluxoData = data.map(item => parseInt(item.Fluxo));
const iteracaoLabels = data.map(item => item.Iteracao);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: iteracaoLabels,
        datasets: [{
            label: 'Fluxo vs Iteracao',
            data: fluxoData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Iteracao'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Fluxo'
                }
            }
        }
    }
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    const canvas = document.getElementById('myChart');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    pdf.setFontSize(20);
    pdf.setTextColor('#2a369b');
    pdf.text("Exame de Fluxometria", pdf.internal.pageSize.getWidth() / 2, 20, null, null, 'center');
    pdf.setFontSize(12);
    pdf.setTextColor('#000');
    pdf.text("Nome: [Nome]", 10, 30);
    pdf.text("Sexo: [Sexo]", 10, 35);
    pdf.text("Realização: [Data]", 10, 40);
    pdf.addImage(imgData, 'PNG', 10, 50, 190, 100);
    pdf.text("Conclusão:", 10, 160);
    pdf.text("[Conclusão]", 10, 165);
    pdf.setLineWidth(0.5);
    pdf.line(150, 270, 200, 270); // Signature line
    pdf.text("Assinatura", 155, 275);
    pdf.save('chart.pdf');
});
