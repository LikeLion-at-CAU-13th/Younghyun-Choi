import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const HobbySection = styled.section`
  margin: 200px auto;
  text-align: center;

  h1 {
    font-size: 70px;
    color: white;
    margin-bottom: 100px;
  }
`;

const HobbyContainer = styled.div`
  padding: 0 200px;
`;

const HobbyCategory = styled.div`
  text-align: left;
  margin-bottom: 100px;
`;

const HobbyTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HobbyImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const HobbyImage = styled.img`
  width: 360px;
  height: 220px;
  background-color: white;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.4);
  }
`;

const hobbyData = [
  {
    category: "개발",
    items: [
      { src: "/assets/react.jpg" },
      { src: "/assets/python.jpg" },
      { src: "/assets/java.jpg" },
      { src: "/assets/html.webp" },
      { src: "/assets/css.png" },
      { src: "/assets/js.png" },
    ],
  },
  {
    category: "악기",
    items: [
      {
        src: "/assets/saxophone-man.jpg",
        title: "색소폰",
        description: "색소폰을 열심히 불고 있습니다.",
      },
      { src: "/assets/guitar-man.webp" },
      { src: "/assets/piano.avif" },
      { src: "/assets/singer.jpeg" },
    ],
  },
  {
    category: "그 외",
    items: [
      { src: "/assets/tarot.webp" },
      { src: "/assets/japanese.jpg" },
      { src: "/assets/table-tennis.png" },
      { src: "/assets/pasta.jpg" },
    ],
  },
];

export default function Hobby() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleImageClick = (item) => {
    if (item.title) {
      setModalData({
        title: item.title,
        description: item.description,
        imageUrl: item.src,
      });
      setModalOpen(true);
    }
  };

  return (
    <HobbySection id="hobby">
      <h1>저는 이런 것을 좋아해요.</h1>
      <HobbyContainer>
        {hobbyData.map((category, i) => (
          <HobbyCategory key={i}>
            <HobbyTitle>{category.category}</HobbyTitle>
            <HobbyImages>
              {category.items.map((item, idx) => (
                <HobbyImage
                  key={idx}
                  src={item.src}
                  onClick={() => handleImageClick(item)}
                  alt={item.title || "hobby image"}
                />
              ))}
            </HobbyImages>
          </HobbyCategory>
        ))}
      </HobbyContainer>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        description={modalData.description}
        imageUrl={modalData.imageUrl}
      />
    </HobbySection>
  );
}
