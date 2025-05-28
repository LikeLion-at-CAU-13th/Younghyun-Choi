import React from "react";
import styled from "styled-components";

const ArchiveSection = styled.section`
  margin-top: 200px;
  text-align: center;

  h1 {
    font-size: 70px;
    color: white;
    margin-bottom: 200px;
  }
`;

const ArchiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px;
  width: 100%;
`;

const ArchiveImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  border: 2px solid #ddd;

  &:hover {
    transform: scale(1.1);
  }
`;

const imageList = Array.from({ length: 28 }, (_, i) => {
  const num = i + 1;
  return `/assets/Archive-${num}.JPG`;
});

export default function Archive() {
  return (
    <ArchiveSection id="archive">
      <h1>순간의 기록들.</h1>
      <ArchiveGrid>
        {imageList.map((src, index) => (
          <ArchiveImage key={index} src={src} alt={`Archive ${index + 1}`} />
        ))}
      </ArchiveGrid>
    </ArchiveSection>
  );
}
