const nextbtn = document.querySelector(".nextbtn");
const rulescontainer = document.querySelector(".rules-container");

const hideheader = () => {
  nextbtn.parentElement.parentElement.classList.add("hide");
  rulescontainer.classList.remove("hide");
  rulescontainer.classList.add("w3-animate-opacity");
};

nextbtn.addEventListener("click", hideheader);

var category = "javascript";
const startbtn = document.querySelector(".startbtn");
const questionscontainer = document.querySelector(".questions-container");

const hiderules = () => {
  const api_url = `https://quizapi.io/api/v1/questions?apiKey=Ki3fX8OZk4uB81gflPqhJAA9kyp0bdOuRnsyyTNm&limit=10&tags=${category}`;
  startbtn.parentElement.parentElement.parentElement.classList.add("hide");
  questionscontainer.classList.remove("hide");
  getdata(api_url);
};

startbtn.addEventListener("click", hiderules);

//--------- Global Varibles--------

var index = 0;
var data;
var total = 0;
var same_question;
var opbtn1;
var opbtn2;
var opbtn3;
var opbtn4;
var time;
var interval;

// -------- API Call Start --------

async function getdata(url) {
  const response = await fetch(url);
  data = await response.json();
  nextquestion();
}

// -------- API Call End --------

const setTimer = () => {
  interval = setInterval(() => {
    time -= 1;
    if (time == 0) {
      nextquestion();
    }
  }, 1000);
};

const nextquestion = () => {
  time = 16;
  if (index < 10) {
    clearInterval(interval);
    setTimer();
  }

  if (index >= 10) {
    questionscontainer.classList.add("hide");
    const points_container = document.querySelector(".points-container");
    points_container.classList.remove("hide");
    points_container.classList.add("w3-animate-opacity");
    var point_text = document.querySelector(".point-text");
    if (total > 5) {
      point_text.innerText =
        "Congratulations! 🌟 Your score is " + total + "/10 Points";
    } else {
      point_text.innerText =
        "Sorry! You could only score " +
        total +
        "/10 Points. Better luck next time!!";
    }
    return;
  }

  index++;
  same_question = false;

  // ---------------- Add Question Start ----------------

  const questions_container_html = document.querySelector(
    ".questions-container"
  );
  questions_container_html.innerHTML = "";

  var questions_container = document.querySelector(".questions-container");

  var question_box = document.createElement("div");
  question_box.classList.add("question-box");
  question_box.classList.add("w3-animate-opacity");
  questions_container.appendChild(question_box);

  var timer = document.createElement("div");
  timer.classList.add("timer");

  setInterval(() => {
    timer.innerText = time;
  }, 1000);

  question_box.appendChild(timer);

  const q_box = document.createElement("div");
  q_box.classList.add("q");

  const questions = document.createElement("div");
  questions.classList.add("questions");
  question_box.appendChild(questions);

  if (data) {
    const main_question = document.createElement("p");
    main_question.classList.add("main-question");
    questions.appendChild(main_question);

    const options = document.createElement("div");
    options.classList.add("options");
    questions.appendChild(options);

    main_question.innerText = index + "). " + data[index - 1].question;

    if (data[index - 1].answers.answer_a !== null) {
      opbtn1 = document.createElement("button");
      opbtn1.innerText = data[index - 1].answers.answer_a;
      opbtn1.classList.add("option-1");
      opbtn1.onclick = () => {
        calculate("1", opbtn1);
      };
      options.appendChild(opbtn1);
    }

    if (data[index - 1].answers.answer_b !== null) {
      opbtn2 = document.createElement("button");
      opbtn2.innerText = data[index - 1].answers.answer_b;
      opbtn2.classList.add("option-2");
      opbtn2.onclick = () => {
        calculate("2", opbtn2);
      };
      options.appendChild(opbtn2);
    }

    if (data[index - 1].answers.answer_c !== null) {
      opbtn3 = document.createElement("button");
      opbtn3.innerText = data[index - 1].answers.answer_c;
      opbtn3.classList.add("option-3");
      opbtn3.onclick = () => {
        calculate("3", opbtn3);
      };
      options.appendChild(opbtn3);
    }

    if (data[index - 1].answers.answer_d !== null) {
      opbtn4 = document.createElement("button");
      opbtn4.innerText = data[index - 1].answers.answer_d;
      opbtn4.classList.add("option-4");
      opbtn4.onclick = () => {
        calculate("4", opbtn4);
      };
      options.appendChild(opbtn4);
    }

    const next_question = document.createElement("div");
    next_question.classList.add("next-question");

    questions_container.appendChild(next_question);

    const nextq_btn = document.createElement("button");
    nextq_btn.classList.add("nextq-btn");
    if (index <= 9) {
      nextq_btn.innerText = "Next Question";
    } else {
      nextq_btn.innerText = "Submit";
    }
    nextq_btn.onclick = nextquestion;
    next_question.appendChild(nextq_btn);
  }

  // ---------------- Add Question End ----------------
};

const calculate = (user_choice, button) => {
  if (opbtn1 && opbtn1.classList.contains("choosen")) {
    opbtn1.classList.remove("choosen");
  } else if (opbtn2 && opbtn2.classList.contains("choosen")) {
    opbtn2.classList.remove("choosen");
  } else if (opbtn3 && opbtn3.classList.contains("choosen")) {
    opbtn3.classList.remove("choosen");
  } else if (opbtn4 && opbtn4.classList.contains("choosen")) {
    opbtn4.classList.remove("choosen");
  }

  button.classList.add("choosen");

  const answeris = Object.values(data[index - 1].correct_answers)[
    user_choice - 1
  ];
  if (answeris == "true" && !same_question) {
    total++;
    same_question = true;
  }
  if (answeris == "false" && same_question) {
    total--;
    same_question = null;
  }
};

// -------- Category Buttons----------
const javascript_btn = document.querySelector(".cjs");
javascript_btn.onclick = () => {
  highlight_cate();
  category = "javascript";
  javascript_btn.classList.add("choosen");
};

const html_btn = document.querySelector(".chtml");
html_btn.onclick = () => {
  highlight_cate();
  category = "html";
  html_btn.classList.add("choosen");
};

const linux_btn = document.querySelector(".clinux");
linux_btn.onclick = () => {
  highlight_cate();
  category = "linux";
  linux_btn.classList.add("choosen");
};

const highlight_cate = () => {
  if (javascript_btn && javascript_btn.classList.contains("choosen")) {
    javascript_btn.classList.remove("choosen");
  } else if (html_btn && html_btn.classList.contains("choosen")) {
    html_btn.classList.remove("choosen");
  } else if (linux_btn && linux_btn.classList.contains("choosen")) {
    linux_btn.classList.remove("choosen");
  }
};
