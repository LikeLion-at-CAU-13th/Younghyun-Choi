// 모달 열기 함수
function modal_open(modalId, title = "", description = "", imageUrl = "") {
  var modal = document.getElementById(modalId);
  if (!modal) return; // 해당 ID의 모달이 없으면 종료

  // 상단커버 업데이트
  var titleElement = document.getElementById(modalId + "_title");
  if (titleElement) {
    titleElement.style.backgroundImage = `url(${imageUrl})`; // 배경 이미지 설정
    titleElement.style.backgroundSize = "cover"; // 이미지가 전체를 덮도록 설정
    titleElement.style.backgroundPosition = "center"; // 이미지 중앙 정렬
  }

  // 제목 업데이트
  document.querySelector(`#${modalId} .desc_name`).innerHTML = title;

  // 설명 업데이트
  document.querySelector(`#${modalId} .desc_inf`).innerHTML = description;

  // 모달 표시
  modal.style.display = "block";
}

// 모달 닫기 함수
function modal_close(element) {
  var modalId = element.getAttribute("close");
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}
