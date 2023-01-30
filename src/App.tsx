import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
} from "react";
import styled from "styled-components";
import "./App.css";
import { ItemsType } from "./types";
import ReactDOM from "react-dom";
import { Category } from "./Components/Category";

type ServerDataType = {
  items: {
    id: string;
    items: ItemsType[];
    title: string;
  }[];
};
let modalRootElement = document.getElementById("modal-root");

if (!modalRootElement) {
  modalRootElement = document.createElement("div");
  modalRootElement.setAttribute("id", "modal-root");
  document.body.appendChild(modalRootElement);
}

function Modal({ children }: { children: ReactNode }) {
  const modalContainer = useRef(document.createElement("div"));

  useLayoutEffect(() => {
    const currentEle = modalContainer.current;
    modalRootElement!.appendChild(currentEle);

    return () => {
      modalRootElement!.removeChild(currentEle);
    };
  }, []);

  return ReactDOM.createPortal(children, modalContainer.current);
}

function App() {
  // Feel free to remove the contents of the header tag to make more room for your code
  const [serverData, setServerData] = useState<ServerDataType>();
  useEffect(() => {
    fetch("http://localhost:8080/api/getBallotData").then((data) => {
      data.json().then((resp: ServerDataType) => {
        setServerData(resp);
      });
    });
  }, []);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <AppContainer>
      <HeaderContainer>
        <p>GOLDEN GLOBE AWARDS</p>
      </HeaderContainer>
      {serverData?.items.map(({ id, items }) => {
        return (
          <React.Fragment key={id}>
            <Category id={id} items={items} />
          </React.Fragment>
        );
      })}

      <SubmitButton onClick={toggleModal}>Submit Vote Button</SubmitButton>
      {showModal && (
        <Modal>
          <div className="modal" onClick={toggleModal}>
            <ModalContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={toggleModal}
                  style={{ cursor: "pointer" }}
                  aria-label="Close"
                >
                  <CloseButton />
                </button>
              </div>
              <p style={{ textAlign: "center" }}>SUCCESS MODAL</p>
              <div style={{ margin: "auto" }}>
                <p style={{ textAlign: "center" }}>VOTE CASTED SUCCESSFULLY</p>
              </div>
            </ModalContent>
          </div>
        </Modal>
      )}
    </AppContainer>
  );
}

export default App;

const ModalContent = styled.div`
  background-color: white;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const SubmitButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  &:hover {
    background-color: #d5e8d4;
  }
`;
const CloseButton = () => {
  return (
    <svg
      height="30px"
      id="Layer_1"
      // style="enable-background: new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      width="30px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
    </svg>
  );
};
