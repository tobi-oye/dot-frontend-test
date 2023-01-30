import styled from "styled-components";
import { ItemsType } from "../../types";
type mutatedObjType = ItemsType & {
  selected: boolean;
};
type BallotProps = ItemsType & {
  selected: boolean;
  clickHandler: (data: mutatedObjType[]) => void;
  mutatedState: mutatedObjType[];
};
const Ballot = ({
  title,
  photoUrL,
  selected,
  id,
  mutatedState,
  clickHandler,
}: BallotProps) => {
  const selectionHandler = (id: string) => {
    const newState = mutatedState.map((item) => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    clickHandler(newState);
  };
  return (
    <Container selected={selected}>
      <p style={{ textAlign: "center" }}>{title}</p>
      <NomineeImageContainer>
        <Image src={photoUrL} alt={title} />
      </NomineeImageContainer>

      <Button
        disabled={
          !selected && mutatedState.some(({ selected }) => selected === true)
        }
        onClick={() => selectionHandler(id)}
        aria-label={`select-${id}`}
      >
        {selected ? "Unselect Button" : "Select Button"}
      </Button>
    </Container>
  );
};

export default Ballot;

const Container = styled.div<{ selected: boolean }>`
  width: 200px;
  border: 2px solid blue;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#d5e8d4" : "#dae8fc")};
  cursor: pointer;

  &:hover {
    background-color: #d5e8d4;
  }
`;

const NomineeImageContainer = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid blue;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Button = styled.button`
  background-color: #f5f5f5;
  margin: 4px 2px;
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;

  &:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  &:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: no-drop;
  }

  &:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  &:focus {
    outline: 1px transparent;
  }

  &:before {
    display: none;
  }

  .&:-webkit-details-marker {
    display: none;
  }
`;
