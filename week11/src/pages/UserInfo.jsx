import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserFilter from "../components/UserFilter";
import UserSection from "../components/UserSection";
import { getAllUsers } from "../apis/userlist";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > h1 {
    font-size: 3.5rem;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  border-radius: 1rem;
  border: 5px solid #ff7710;
`;

const UserInfo = () => {
  const [filter, setFilter] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [curPage, setCurPage] = useState();
  const [userData, setUserData] = useState([]);
  const offset = 5;

  useEffect(() => {
    const fetchData = async () => {
      const all = await getAllUsers();
      setAllUsers(all);
      setCurPage(1);
      setUserData(all.slice(0, offset)); // 처음엔 1페이지 data들
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    const start = (page - 1) * offset;
    const end = start + offset;
    setUserData(allUsers.slice(start, end));
    setCurPage(page);
  };

  return (
    <MainLayout>
      <h1>🦁13기 아기사자 리스트🦁</h1>
      <ContentBox>
        <UserFilter
          filter={filter}
          setFilter={setFilter}
          setUserData={setUserData}
          setCurPage={setCurPage}
          allUsers={allUsers}
          offset={offset}
        />
        <UserSection
          filter={filter}
          userData={userData}
          curPage={curPage}
          setCurPage={handlePageChange}
        />
      </ContentBox>
    </MainLayout>
  );
};

export default UserInfo;
