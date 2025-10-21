let genBtn =  document.getElementById("gen");

genBtn.addEventListener('click', function(){
    const length = 8;
    const lowerCase = true;
    const upperCase = true;
    const num = true;

    let pass = document.getElementById("ranPass");
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChar = "0123456789";

    let allowedChar = "";
    let password = "";

    allowedChar += lowerCase ? lowerCaseChar : "";
    allowedChar += upperCase ? upperCaseChar : "";
    allowedChar += num ? numberChar : "";

    for (let i = 0; i < length; i++)
    {
        const ranPass = Math.floor(Math.random() * allowedChar.length);
        password += allowedChar[ranPass];
        pass.textContent = password;
    }
    return password;
});
