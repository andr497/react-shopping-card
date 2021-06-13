import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  
  button{
    border-radius: 0 0 20px 20px;
  }
  .contenedor-img{
    overflow: hidden;
    display: flex;
    justify-content: center;
    max-height: 350px;
  }
  img{
    max-height: 350px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }
  .contenedor-info{
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
