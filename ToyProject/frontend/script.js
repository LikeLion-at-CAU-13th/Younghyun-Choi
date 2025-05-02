const modal = document.getElementById("modal");
const cardContainer = document.getElementById("card-container");
const deleteModal = document.getElementById("delete-modal");
let deleteTargetId = null;
let deleteTargetCard = null;

/* 모달 창 열기 */
function openModal() {
  modal.classList.remove("hidden"); // modal 요소에서 hidden 클래스를 제거하면서 CSS display: none으로 숨겨져 있던 모달이 보이게 됨
}

/* 모달 창 닫기 */
function closeModal() {
  modal.classList.add("hidden"); // modal 요소에서 hidden 클래스를 추가하면서 CSS display: none으로 숨겨져 있던 모달이 보이게 됨
  document.getElementById("title").value = "";
  document.getElementById("writer").value = "";
  document.getElementById("content").value = "";
  document.getElementById("password").value = "";
}

/* 어떤 게시글을 삭제할지 */
function openDeleteModal(id, cardElement) {
  deleteTargetId = id;
  deleteTargetCard = cardElement;
  deleteModal.classList.remove("hidden");
}

function closeDeleteModal() {
  deleteModal.classList.add("hidden");
  document.getElementById("delete-password").value = "";
  deleteTargetId = null;
  deleteTargetCard = null;
}

/* 카드 생성 */
function createCard(post) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
      <div class="card-title">${post.title}</div>
      <div class="card-meta">${post.writer} | 📆 ${new Date(
    post.date
  ).toLocaleDateString()}</div>
      <div class="card-content">${post.content}</div>
    `;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "삭제";
  deleteButton.className = "button-red";
  deleteButton.onclick = () => openDeleteModal(post.id, card);

  card.appendChild(deleteButton);

  cardContainer.prepend(card); // 최신 글이 위로 오게 하기 위해 appendChild 대신 prepend() 사용
}

async function fetchPosts() {
  // 백엔드 API에서 전체 방명록 목록을 불러와서 화면에 렌더링하기
  try {
    const res = await fetch("http://43.202.120.161:8000/guestbook/");
    const json = await res.json();
    json.data.forEach((post) => createCard(post));
  } catch (err) {
    console.error("방명록 불러오기 실패:", err);
  }
}

/* 작성 버튼 누르면 실행되게 */
/* 사용자가 작성한 방명록을 서버에 POST 요청으로 전송하기 */

async function submitPost() {
  //
  const title = document.getElementById("title").value; // 사용자가 입력한 4개 값을 가져옴
  const writer = document.getElementById("writer").value; // 사용자가 입력한 4개 값을 가져옴
  const content = document.getElementById("content").value; // 사용자가 입력한 4개 값을 가져옴
  const password = document.getElementById("password").value; // 사용자가 입력한 4개 값을 가져옴

  if (!title || !writer || !content || !password) {
    // 하나라도 입력 안했을 경우 대비
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const payload = { title, writer, content, password }; // 서버에 전송할 JSON 데이터 객체로 만들기

  try {
    const res = await fetch("http://43.202.120.161:8000/guestbook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json(); // 서버에서 응답 온 값을 json 형태로 변환
    if (json.status === 200) {
      // 응답코드가 200이면 성공
      createCard(json.data);
      closeModal();
    } else {
      alert("작성 실패: " + json.message);
    }
  } catch (err) {
    console.error("작성 중 오류 발생:", err);
    alert("서버와 통신 중 문제가 발생하였습니다.");
  }
}

async function confirmDelete() {
  const password = document.getElementById("delete-password").value;
  if (!deleteTargetId || !password) return;

  try {
    const res = await fetch(
      `http://43.202.120.161:8000/guestbook/${deleteTargetId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await res.json();
    if (json.status === 200) {
      deleteTargetCard.remove();
      closeDeleteModal();
      alert("삭제되었습니다!");
    } else {
      alert("삭제 실패: " + json.message);
    }
  } catch (err) {
    console.error("삭제 요청 중 오류:", err);
    alert("서버 오류로 삭제에 실패했습니다.");
  }
}

fetchPosts(); // 페이지 로드시 방명록 불러오기 실행
