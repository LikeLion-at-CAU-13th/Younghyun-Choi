import React from "react";
import styled from "styled-components";

const SelectionLayout = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const PageBox = styled.div`
  font-size: 2rem;
  color: ${(props) => (props.$active ? "#000000" : "#C9C9C9")};
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const PageSelection = ({ curPage, onPageChange }) => {
  return (
    <SelectionLayout>
      {[1, 2, 3, 4, 5, 6].map((val) => (
        <PageBox
          key={val}
          $active={val === curPage}
          onClick={() => onPageChange(val)}
        >
          {val}
        </PageBox>
      ))}
    </SelectionLayout>
  );
};

export default PageSelection;
