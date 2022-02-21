import styled from "styled-components";

const NavDiv = styled.div`
  display: flex;
  border: 1px;
  justify-content: center;
  align-items: center;

  & input {
    width: 400px;
    height: 40px;
    margin-left: 60px;
  }
  & button {
    width: 100px;
    height: 50px;
  }
`;

export const NavBar = () => {
  return (
    <NavDiv id="navbar">
      <h2>Google</h2>
      <input type="text" />
      <button className="search">Search</button>
    </NavDiv>
  );
};
