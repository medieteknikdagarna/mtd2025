import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding-top: 140px;
  gap: 2rem;
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Pane = styled.div`
  flex: ${(props) => props.weight};
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const SplitScreen = ({ children, LeftWeight = 1, RightWeight = 1 }) => {
  const [left, right] = children;
  return (
    <Container>
      <Pane weight={LeftWeight}>{left}</Pane>
      <Pane weight={RightWeight}>{right}</Pane>
    </Container>
  );
};
