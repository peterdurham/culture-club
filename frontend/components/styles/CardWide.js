import styled from "styled-components";

const CardWide = styled.div`
  width: 380px;
  height: 220px;
  margin: 16px 10px;
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  /* box-shadow: ${(props) => props.theme.bs}; */
  position: relative;
  display: flex;
  padding: 8px;
  .cardWideImage {
    min-width: 133px;
    background-size: cover;
    height: 100%;
    width: 133px;
    transition: all 0.3s;
    cursor: pointer;
  }
  .cardWideImage:hover {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5);
  }

  .cardWideDetails {
    width: 100%;
    text-align: left;
    padding-left: 12px;
    flex-direction: column;
  }
  .cardWideDetailsTop {
    width: 100%;

    font-size: 13px;
    line-height: 24px;
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  .cardWideTitle {
    font-size: 21px;
    line-height: 29px;
    font-weight: 700;
  }
  .cardWideYear {
   font-size: 15px;
   margin-bottom: 12px;
  }
 
  .list-buttons button {
    transition: all 0.3s;

  }
  .list-buttons svg {
    margin-left: 4px;
  }
  .list-buttons button:not(:last-child) {
    margin-right: 8px;
  }
  .cardWideListButtons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .cardWideButtonList {
    position: absolute;
    top: 14px;
    left: 88px;
    height:4.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;

    button {
      cursor: pointer;
    }
    

 
  }
`;

export default CardWide;
