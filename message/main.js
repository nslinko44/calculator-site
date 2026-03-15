function checkForm(el) {
    var username = el.username.value
    var email = el.email.value
    var message = el.message.value
    var gender = el.gender.value

    var pattern_name = /^[A-ZА-ЯІЇЄ][a-zа-яіїє]+$/;
    var pattern_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    
    var error = "";
    if (username.length < 2 || !pattern_name.test(username))
        error = "Ім'я введене не правильно!"
    else if(!pattern_email.test(email) )
        error = "Email вказаний неправильно!"
    else if(message.length < 6)
        error = "Повідомлення занадто коротке!"
    else if(gender == null || gender == "")
        error = "Ви не вказали стать!"

    if(error != "") {
        document.getElementById("error").innerText = error;
        return false;
    }

    document.getElementById('error').innerText = "";
    alert(username + "\n" + email + "\n" + message);

    return false;
}