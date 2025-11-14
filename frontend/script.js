const API_URL = "http://localhost:5000/students";

function loadStudents() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#studentsTable tbody");
            tbody.innerHTML = "";

            data.forEach(s => {
                tbody.innerHTML += `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.department}</td>
                        <td>${s.email}</td>
                        <td>
                            <button onclick="deleteStudent(${s.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addStudent() {
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, department, email })
    })
    .then(() => loadStudents());
}

function deleteStudent(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadStudents());
}

loadStudents();
