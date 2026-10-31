function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let message = document.getElementById("message");

    if (username === "" || password === "") {
        message.textContent = "Login va parolni kiriting!";
        return;
    }


    localStorage.setItem("userRole", role);
    localStorage.setItem("username", username);

    window.location.href = "dashboard.html";
}



function getPatients() {
    return JSON.parse(localStorage.getItem("patients") || "[]");
}

function addPatient() {
    let name = document.getElementById("patientName").value.trim();
    let surname = document.getElementById("patientSurname").value.trim();
    let phone = document.getElementById("patientPhone").value.trim();
    let doctor = document.getElementById("patientDoctor").value;

    if (!name || !surname || !phone || !doctor) {
        alert("Barcha maydonlarni to'ldiring!");
        return;
    }

    let patients = getPatients();

    patients.push({
        name: name,
        surname: surname,
        phone: phone,
        doctor: doctor
    });

    localStorage.setItem("patients", JSON.stringify(patients));

    document.getElementById("patientName").value = "";
    document.getElementById("patientSurname").value = "";
    document.getElementById("patientPhone").value = "";
    document.getElementById("patientDoctor").value = "";

    showPatients();
    updateCounts();

    alert("Bemor ro'yxatga olindi!");
}



function showPatients() {
    let list = document.getElementById("patientList");

    if (!list) return;

    let patients = getPatients();

    list.innerHTML = "";

    patients.forEach(function(patient) {
        let row = document.createElement("tr");

        [patient.name, patient.surname, patient.phone, patient.doctor]
            .forEach(function(value) {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        list.appendChild(row);
    });
}



function getAppointments() {
    return JSON.parse(localStorage.getItem("appointments") || "[]");
}

function addAppointment() {
    let name = document.getElementById("appointmentName").value.trim();
    let doctor = document.getElementById("appointmentDoctor").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;

    if (!name || !doctor || !date || !time) {
        alert("Barcha ma'lumotlarni kiriting!");
        return;
    }

    let appointments = getAppointments();

    appointments.push({
        name: name,
        doctor: doctor,
        date: date,
        time: time
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("appointmentName").value = "";
    document.getElementById("appointmentDoctor").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("appointmentTime").value = "";

    showAppointments();
    updateCounts();

    alert("Bemor qabulga yozildi!");
}



function showAppointments() {
    let list = document.getElementById("appointmentList");

    if (!list) return;

    let appointments = getAppointments();

    list.innerHTML = "";

    appointments.forEach(function(item) {
        let row = document.createElement("tr");

        [item.name, item.doctor, item.date, item.time]
            .forEach(function(value) {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        list.appendChild(row);
    });
}



function updateCounts() {
    let patientCount = document.getElementById("patientCount");
    let appointmentCount = document.getElementById("appointmentCount");

    if (patientCount) {
        patientCount.textContent = getPatients().length;
    }

    if (appointmentCount) {
        appointmentCount.textContent = getAppointments().length;
    }
}



document.addEventListener("DOMContentLoaded", function() {
    showPatients();
    showAppointments();
    updateCounts();
});
