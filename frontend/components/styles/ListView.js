import styled from "styled-components";

const ListView = styled.div`
  height: 90px;
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  padding: 4px 12px;
  text-align: left;
  .listViewTitle {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 700;
    width: 20%;
  }
  .listViewYear {
    padding: 0 40px;
    width: 10%;
  }
  .listViewGenres {
    padding-right: 40px;

    line-height: 24px;
    display: flex;
    flex-direction: column;
  }
  .listViewDescription {
    width: 50%;

    max-height: 60px;
    overflow: hidden;
    margin: 0;
  }
  .listViewButtons {
    display: flex;
    flex-direction: column;
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
`;

export default ListView;
