const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1";

const option = {
  serviceKey:
    "ipmid9zFYi0Bm%2BsRp%2FNr3oYny7GksBYhOR6wlevj0660MSteyYEgXMEJAyHj1Yti1hoGueVu4V725elbEzyfSA%3D%3D",
  numofRows: 6,
  MobileApp: "test",
  MobileOS: "ETC",
  arrange: "A",
  _type: "json",
};

const container = document.getElementById("container");

let photoIndex = 0; // 사진 번호 카운터 (계속 증가할 예정)

async function getData() {
  const count = Math.floor(Math.random() * 100) + 1; // 지역변수로 설정 (불러오기 할때마다 값이 바뀌어야 함)
  const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${count}&serviceKey=${option.serviceKey}`;

  const fetchData = await fetch(url);
  // console.log(fetchData);
  const toJson = await fetchData.json();
  // console.log(toJson);
  const datas = await toJson.response.body.items.item;
  console.log(datas);

  datas.map((data) => {
    const list = document.createElement("div");
    list.id = "list";

    const image = document.createElement("img");
    image.src = data.galWebImageUrl;

    const info = document.createElement("span");
    info.innerText = `
    ${++photoIndex}번째 사진
    📸 제목 : ${data.galTitle}
    🏝️ 장소 : ${data.galPhotographyLocation}`;

    const button = document.createElement("button");
    button.innerText = "더보기";
    button.addEventListener("click", () => {
      const params = new URLSearchParams({
        title: data.galTitle,
        location: data.galPhotographyLocation,
        photographer: data.galPhotographer,
        date: data.galCreatedtime,
        keyword: data.galSearchKeyword,
        image: data.galWebImageUrl,
      });

      window.open(`detail.html?${params.toString()}`, "_blank");
    });

    list.appendChild(image); // <img> 태그
    list.appendChild(info); // <span> 태그
    list.appendChild(button); // <button> 태그

    container.appendChild(list); // <div> 하나를 container에 포함
  });
}
