import React, { useEffect, useState } from "react";
import { ItemsType } from "../../types";
import Ballot from "../Ballot/Ballot";
import { CategoryContainer, Container, BallotGrid } from "./components";

type CategoryProps = {
  id: string;
  items: ItemsType[];
};
type mutatedObjType = ItemsType & {
  selected: boolean;
};
export const Category = ({ id, items }: CategoryProps) => {
  const [mutatedState, setMutatedState] = useState<mutatedObjType[]>();
  useEffect(() => {
    const mutatedItems = items.map((item) => {
      const newObj = { ...item, selected: false };
      newObj["selected"] = false;
      return newObj;
    });
    setMutatedState(mutatedItems);
  }, [items]);
  const clickHandler = (data: mutatedObjType[]) => {
    setMutatedState(data);
  };
  return (
    <Container>
      <CategoryContainer>
        <p style={{ textTransform: "capitalize", margin: "0px" }}>{id}</p>
      </CategoryContainer>

      <BallotGrid>
        {mutatedState?.map(({ id, photoUrL, title, selected }) => {
          return (
            <React.Fragment key={id}>
              <Ballot
                id={id}
                photoUrL={photoUrL}
                title={title}
                selected={selected}
                clickHandler={clickHandler}
                mutatedState={mutatedState}
              />
            </React.Fragment>
          );
        })}
      </BallotGrid>
    </Container>
  );
};
