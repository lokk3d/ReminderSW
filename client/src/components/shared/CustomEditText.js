import EdiText from 'react-editext'
import styled from "styled-components"
const StyledEdiText = styled(EdiText)`
button {
    border-radius: 5px;
  }
  button[editext="edit-button"] {
    color: #000;
    width: 30px;
    background:#fff;
    border:0px;
  }
  button[editext="save-button"] {
    color: #000;
    width: 30px;
    background:#fff;
    border:0px;

    &:hover {
      background: greenyellow;
    }
  }

  button[editext="cancel-button"] {
    color: #000;
    width: 30px;
    background:#fff;
    border:0px;

    &:hover {
      background: crimson;
      color: #fff;
    }
  }


`

export default StyledEdiText