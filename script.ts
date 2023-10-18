// classe do formulário com os atributos
class FormData {
    cpf: string;
    name: string;
    dob: string;
    vaccineName: string;
    vaccineDate: string;

    constructor(cpf: string, name: string, dob: string, vaccineName: string, vaccineDate: string) {
        this.cpf = this.formatCPF(cpf);
        this.name = name;
        this.dob = this.formatDate(dob);
        this.vaccineName = vaccineName;
        this.vaccineDate = this.formatDate(vaccineDate);
    }
    // Função para cálculo data do reforço da vacina, a partir da data atual do sistema  
    calculateBoosterDate(): Date {
        const currentDate = new Date();
        const boosterDate = new Date(currentDate);
        boosterDate.setDate(currentDate.getDate() + 30);
        return boosterDate;
    }

    // Função para formatar CPF
    private formatCPF(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    // Função para formatar datas no formato "dd/mm/yyyy"
    private formatDate(date: string): string {
        const parts = date.split("-");
        if (parts.length === 3) {
            return parts.reverse().join("/");
        }
        return date;
    }
}

function getElemById(id: string): HTMLElement | null {
    return document.getElementById(id);
}
// Captura dos dados informados no formulário
function submitForm() {
    const cpfInput = getElemById("cpf") as HTMLInputElement;
    const nameInput = getElemById("name") as HTMLInputElement;
    const dobInput = getElemById("dob") as HTMLInputElement;
    const vaccineNameInput = getElemById("vaccineName") as HTMLInputElement;
    const vaccineDateInput = getElemById("vaccineDate") as HTMLInputElement;

    const formData = new FormData(
        cpfInput.value,
        nameInput.value,
        dobInput.value,
        vaccineNameInput.value,
        vaccineDateInput.value
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
    if (vaccineList) {
        vaccineList.appendChild(listItem);
    }

    // Limpar o formulário
    const inputFields = ["cpf", "name", "dob", "vaccineName", "vaccineDate", "boosterDate"];
    inputFields.forEach(field => {
        const input = getElemById(field) as HTMLInputElement;
        if (input) {
            input.value = "";
        }
    });

    const boosterDateInput = getElemById("boosterDate") as HTMLInputElement;
    if (boosterDateInput) {
        boosterDateInput.value = boosterDate.toISOString().split("T")[0];
    }
}

// Adiciona evento de clique no botão de cadastro
const submitButton = getElemById("submit-button");
if (submitButton) {
    submitButton.addEventListener("click", submitForm);
}

// Inicialização 
// Quando a data de vacinação muda, recalcula a data do reforço e atualiza o valor do campo de data do reforço 
const vaccineDateInput = getElemById("vaccineDate") as HTMLInputElement;
if (vaccineDateInput) {
    vaccineDateInput.addEventListener("change", function () {
        const boosterDate = new FormData("", "", "", "", vaccineDateInput.value).calculateBoosterDate();
        const boosterDateInput = getElemById("boosterDate") as HTMLInputElement;
        if (boosterDateInput) {
            boosterDateInput.value = boosterDate.toISOString().split("T")[0];
        }
    });
}
