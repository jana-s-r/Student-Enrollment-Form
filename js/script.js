document.addEventListener("DOMContentLoaded", function() {
    var name = document.getElementById("name");
    var age = document.getElementById("age");
    var gendervalue = document.getElementsByName('gender');
    var selectedGender = "";
    var coursevalue = document.getElementsByName('course');
    var selectedCourse = "";
    var email = document.getElementById("email");
    var tbody = document.querySelector("tbody");

    function validateForm() {
        var valid = true;
        
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            valid = false;
        } else {
            name.classList.remove('is-invalid');
        }

        if (!age.value || age.value < 1) {
            age.classList.add('is-invalid');
            valid = false;
        } else {
            age.classList.remove('is-invalid');
        }

        if (!selectedGender) {
            gendervalue.forEach(function(gender) {
                gender.classList.add('is-invalid');
            });
            valid = false;
        } else {
            gendervalue.forEach(function(gender) {
                gender.classList.remove('is-invalid');
            });
        }

        if (!selectedCourse) {
            coursevalue.forEach(function(course) {
                course.classList.add('is-invalid');
            });
            valid = false;
        } else {
            coursevalue.forEach(function(course) {
                course.classList.remove('is-invalid');
            });
        }

        if (!email.value.trim() || !email.checkValidity()) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        return valid;
    }

    function save(event) {
        event.preventDefault();

        for (var i = 0; i < gendervalue.length; i++) {
            if (gendervalue[i].checked) {
                selectedGender = gendervalue[i].value;
            }
        }

        for (var i = 0; i < coursevalue.length; i++) {
            if (coursevalue[i].checked) {
                selectedCourse = coursevalue[i].value;
            }
        }

        if (!validateForm()) {
            return;
        }

        var formData = new FormData();
        formData.append('name', name.value);
        formData.append('age', age.value);
        formData.append('gender', selectedGender);
        formData.append('course', selectedCourse);
        formData.append('email', email.value);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                alert('Data submitted successfully.');
                console.log(xhr.responseText);
            } else {
                alert('Submission failed.');
            }
        };

        xhr.send(formData);

        var tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name.value}</td>
            <td>${age.value}</td>
            <td>${selectedGender}</td>
            <td>${selectedCourse}</td>
            <td>${email.value}</td>
            <td><button class="btn btn-danger btn-sm deleteButton">Delete</button></td>
        `;
        tbody.appendChild(tr);

        name.value = '';
        age.value = '';
        email.value = '';

        for (var i = 0; i < gendervalue.length; i++) {
            gendervalue[i].checked = false;
        }
        for (var i = 0; i < coursevalue.length; i++) {
            coursevalue[i].checked = false;
        }
    }

    var submitButton = document.querySelector("button[type='submit']");
    submitButton.addEventListener("click", save);

    tbody.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('deleteButton')) {
            var row = event.target.closest('tr');
            row.remove();
        }
    });
});
