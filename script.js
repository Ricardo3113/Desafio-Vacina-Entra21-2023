// classe do formulário com os atributos
class FormData {
    constructor(cpf, name, dob, vaccineName, vaccineDate) {
        this.cpf = formatCPF(cpf);
        this.name = name;
        this.dob = formatDate(dob);
        this.vaccineName = vaccineName;
        this.vaccineDate = formatDate(vaccineDate);
    }
    // Função para cálculo da data do reforço da vacina, a partir da data atual do sistema  
    calculateBoosterDate() {
        const currentDate = new Date();
        const boosterDate = new Date(currentDate);
        boosterDate.setDate(currentDate.getDate() + 30);
        return boosterDate;
    }
}

function getElemById(id) {
    return document.getElementById(id);
}

// Captura dos dados informados no formulário
function submitForm() {
    const formData = new FormData(
        getElemById("cpf").value,
        getElemById("name").value,
        getElemById("dob").value,
        getElemById("vaccineName").value,
        getElemById("vaccineDate").value
    );

    if (!formData.cpf || !formData.name || !formData.dob || !formData.vaccineName || !formData.vaccineDate) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const boosterDate = formData.calculateBoosterDate();

    // Retorno do formulário cadastrado na lista 
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>CPF: </strong>${formData.cpf}<br>
        <strong>Nome: </strong>${formData.name}<br>
        <strong>Data de Nascimento: </strong>${formData.dob}<br>
        <strong>Nome da Vacina: </strong>${formData.vaccineName}<br>
        <strong>Data de Vacinação: </strong>${formData.vaccineDate}<br>
        <strong>Data do Reforço: </strong>${boosterDate.toLocaleDateString("pt-BR")}
    `;

    const vaccineList = getElemById("vaccine-list");
    vaccineList.appendChild(listItem);

    // Limpar o formulário
    const inputFields = ["cpf", "name", "dob", "vaccineName", "vaccineDate", "boosterDate"];
    inputFields.forEach(field => getElemById(field).value = "");
    getElemById("boosterDate").value = boosterDate.toISOString().split("T")[0];
}

// Adiciona evento de clique no botão de cadastro
const submitButton = getElemById("submit-button");
submitButton.addEventListener("click", submitForm);

// Inicialização 
// Quando a data de vacinação muda, recalcula a data do reforço e atualiza o valor do campo de data do reforço 
const vaccineDateInput = getElemById("vaccineDate");
vaccineDateInput.addEventListener("change", function () {
    const boosterDate = new FormData("", "", "", "", vaccineDateInput.value).calculateBoosterDate();
    getElemById("boosterDate").value = boosterDate.toISOString().split("T")[0];
});

// Função para formatar CPF
function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar datas no formato "dd/mm/yyyy"
function formatDate(date) {
    const parts = date.split("-");
    if (parts.length === 3) {
        return parts.reverse().join("/");
    }
    return date;
}
