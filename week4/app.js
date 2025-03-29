// 1. js 파일에서 접근해야하는 html dom요소 선언
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

const computerText = document.getElementById("computer-hand-text");
const computerIcon = document.getElementById("computer-hand-icon");

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

const result = document.getElementById("display-result"); // 결과 알려줌
const displayMyScore = document.querySelector(".my-score"); // 내 점수
const displayComputerScore = document.querySelector(".computer-score"); // 컴퓨터 점수

const displayWinStreak = document.getElementById("winStreak"); // 연승 기록
const displayStreakMsg = document.getElementById("winStreakMsg"); // 연승 메세지
displayStreakMsg.style.display = "none";

const resetBtn = document.getElementById("reset-button"); // 리셋 버튼

const darkModeBtn = document.getElementById("dark-mode-button"); // 다크 모드 버튼

let myScore = 0; // 실제 출력될 내 점수
let computerScore = 0; // 실제 출력될 컴퓨터의 점수
let streak = 0; // 연승 출력

// 2. 이벤트 설정
rockBtn.addEventListener("click", displayMyChoice); // 바위 버튼을 누르면, displayMyChoice를 호출
scissorsBtn.addEventListener("click", displayMyChoice); // 가위 버튼을 누르면, displayMyChoice를 호출
paperBtn.addEventListener("click", displayMyChoice); // 보 버튼을 누르면, displayMyChoice를 호출
resetBtn.addEventListener("click", resetGame); // reset 버튼을 누르면, resetGame를 호출
darkModeBtn.addEventListener("click", toggleDarkMode); // 다크 모드 버튼을 누르면, toggleDarkMode를 호출

// 3. displayMyChoice 함수 작성
function displayMyChoice(e) {
  let clickedBtn = e.currentTarget.id; // 사용자가 "바위(rock)" 버튼 클릭 시 rock이 됨.
  let clickedIcon = e.target.className; // 사용자가 버튼의 아이콘 (<i>) 부분을 클릭 시

  myHandText.innerText = clickedBtn;
  myHandIcon.className = clickedIcon;

  start(clickedBtn);
}

// 4. 랜덤으로 뱉는 컴퓨터

function getComChoice() {
  const randomValue = {
    0: ["rock", "fa-regular fa-hand-back-fist change"],
    1: ["scissors", "fa-regular fa-hand-scissors fa-rotate-90 change"],
    2: ["paper", "fa-regular fa-hand change"],
  };

  const randomIndex = Math.floor(Math.random() * 3);

  return randomValue[randomIndex];
}

// 5. 컴퓨터의 선택이 화면에 보이도록 하는 함수

function displayComChoice(result) {
  computerText.innerText = result[0];
  computerIcon.className = result[1];
}

// 6. Start 함수

function start(myChoice) {
  let resultArray = getComChoice(); // resultArray에 컴퓨터 랜덤 값 저장
  let computerChoice = resultArray[0]; // rock, scissors, paper 중에 하나 저장
  displayComChoice(resultArray); // 해당 결과를 화면에 띄우기

  displayMyScore.style.display = "inline";
  displayComputerScore.style.display = "inline";

  if (myChoice === computerChoice) {
    // 비겼을 경우
    result.innerText = "draw";
  } else if (
    // 내가 이겼을 경우
    (myChoice === "scissors" && computerChoice === "paper") ||
    (myChoice === "paper" && computerChoice === "rock") ||
    (myChoice === "rock" && computerChoice === "scissors")
  ) {
    myScore++; // 내 점수 +1
    result.innerText = "win";
    streak++;
  } else {
    // 컴퓨터가 이겼을 경우
    computerScore++; // 컴퓨터 점수 +1
    result.innerText = "lose";
    streak = 0;
  }

  winStreak();
  updateScore();
}

// 7. 점수를 업데이트하는 함수

function updateScore() {
  displayMyScore.innerText = myScore;
  displayComputerScore.innerText = computerScore;
}

// 8. 리셋하는 함수

function resetGame() {
  myScore = 0;
  computerScore = 0;

  myHandText.innerText = "";
  myHandIcon.className = "";

  computerText.innerText = "";
  computerIcon.className = "";

  result.innerText = "";

  streak = 0;

  displayMyScore.style.display = "none";
  displayComputerScore.style.display = "none";
  displayWinStreak.style.display = "none";
  displayStreakMsg.style.display = "none";
}

// 9. 다크 모드 토글 함수

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode"))
    darkModeBtn.innerText = "day";
  else darkModeBtn.innerText = "night";
}

function winStreak() {
  if (streak >= 2) {
    displayWinStreak.style.display = "inline";
    displayStreakMsg.style.display = "inline";
    displayWinStreak.innerText = streak;
  } else {
    displayWinStreak.style.display = "none";
    displayStreakMsg.style.display = "none";
  }
}
