const xhttp = new XMLHttpRequest();

xhttp.onload = function()
{
    let form = document.getElementsByTagName("form");
    let body = document.body;
    const nameH2 = document.createElement("H2");
    form.hidden = true;
    nameH2.innerHTML = this.responseText;

    body.appendChild(nameH2);

}

function submitForm()
{
    let name = document.getElementById("name").value;
    xhttp.open("POST", "/submit");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name);
}