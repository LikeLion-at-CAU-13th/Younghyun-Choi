import styled from "styled-components";
import { filterType } from "../constants/filterType";
import { getGenderUser, getPartUser } from "../apis/userlist";

const FilterLayout = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  overflow-x: scroll;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2rem;
  gap: 2rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterBox = styled.div`
  display: flex;
  padding: 1rem 4rem 1rem 4rem;
  background-color: "#C9C9C9";
  border-radius: 1rem;
  font-size: 3rem;
  white-space: nowrap;
  color: ${(props) => (props.$active ? "black" : "lightgray")};
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const UserFilter = ({
  allUsers,
  offset,
  filter,
  setFilter,
  setUserData,
  setCurPage,
}) => {
  const handleClick = async (type, param) => {
    if (type === "all") {
      setUserData(allUsers.slice(0, offset));
      setCurPage(1);
    } else if (type === "gender") {
      const response = await getGenderUser(param);
      console.log(response);
      setUserData(response);
      setCurPage(1);
    } else if (type === "part") {
      const response = await getPartUser(param);
      console.log(response);
      setUserData(response);
      setCurPage(1);
    }
    setFilter(param);
  };
  return (
    <FilterLayout>
      {filterType.map((data, idx) => (
        <FilterBox
          key={idx}
          $active={filter === data.param}
          onClick={() => handleClick(data.type, data.param)}
        >
          {data.title}
        </FilterBox>
      ))}
    </FilterLayout>
  );
};

export default UserFilter;
