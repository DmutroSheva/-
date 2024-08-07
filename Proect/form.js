const form = document.querySelector("#form");
const inputname = document.querySelector("#inputname");
const inputtel = document.querySelector("#inputtel");
const inputemail = document.querySelector("#inputemail");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid = checkInputs();

  if (isValid) {
    document.querySelector("#form").reset();
    document.querySelector(".b-popup").style.display = "none";
    alert(
      "Ваше замовлення прийнято, очікуйте дзвінка для уточнення данних! Ми вдячні, що обрали саме нас!"
    );
  }
});
function checkInputs() {
  const inputnameValue = inputname.value.trim();
  const inputtelValue = inputtel.value.trim();
  const inputemailValue = inputemail.value.trim();

  let isValid = true;

  const validations = [
    {
      value: inputnameValue,
      element: inputname,
      rules: [
        {
          condition: (val) => val === "",
          message: "Поле не повинно бути пустим",
        },
        {
          condition: (val) => val.length > 32,
          message: "Максимальна довжина поля 32 символи",
        },
        {
          condition: (val) => val.length <= 1,
          message: "Мінімальна довжина поля 1 символ",
        },
      ],
    },
    {
      value: inputemailValue,
      element: inputemail,
      rules: [
        {
          condition: (val) => val === "",
          message: "Email не може бути пустим",
        },
        {
          condition: (val) => !isEmail(val),
          message: "Некорректний e-mail адрес",
        },
      ],
    },

    {
      value: inputtelValue,
      element: inputtel,
      rules: [
        {
          condition: (val) => val === "" || isNaN(val) || val <= 0,
          message: "Поле не повинно бути пустим",
        },
      ],
    },
  ];

  validations.forEach(({ value, element, rules }) => {
    rules.forEach(({ condition, message }) => {
      if (condition(value)) {
        setErrorFor(element, message);
        isValid = false;
      } else {
        setSuccessFor(element);
      }
    });
  });

  return isValid;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  formControl.querySelector("small").innerText = "";
}

function isEmail(inputemail) {
  return /\w+[@]\w+[.]\w+/.test(inputemail);
}
