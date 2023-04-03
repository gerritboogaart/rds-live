import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as circle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  padding: 2rem 1rem;
  border-top: 1px solid lightgrey;
  gap: 4rem;
`;

const StyledDD = styled.div`
  width: 22rem;
  height: 30rem;
  border-right: 3px double #ded6d6;
  text-align: left;
  overflow: auto;
  text-overflow: ellipsis;

  li {
    list-style-type: none;
  }
`;

const RightCol = styled.div`
  width: 30rem;
  height: 30rem;
  text-align: left;

  li {
    list-style-type: none;
  }
`;

const ClauseWrapper = styled.div``;

const TIERS = { tier1: "Clauses", tier2: "", tier3: "", tier4: "" };

const Nav = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 0.75rem;
  padding: 0.5rem 3rem;
  text-align: left;
`;

export const MainDropdown = ({ clauses = [], allClauses = [] }) => {
  const [selected, SetSelected] = useState("");
  const [useClauses, setUseClauses] = useState([]);
  const [current, setCurrent] = useState("tier2");
  const tiers = ["tier1", "tier2", "tier3", "tier4"];
  const [printClauses, setPrintClauses] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState(TIERS);

  const getPrint = (tier) => {
    console.log("inside getPrint", selectedTiers);
    switch (tier) {
      case "tier2":
        return allClauses.filter((c) => c.tier2 === selectedTiers.tier2);
      case "tier3":
        return allClauses.filter(
          (c) =>
            c.tier2 === selectedTiers.tier2 && c.tier3 === selectedTiers.tier3
        );
      default:
        return allClauses.filter(
          (c) =>
            c.tier2 === selectedTiers.tier2 &&
            c.tier3 === selectedTiers.tier3 &&
            c.tier4 === selectedTiers.tier4
        );
    }
  };

  const onSelectNext = () => {
    const nextTier =
      current === "tier4" ? 3 : tiers.findIndex((i) => i === current) + 1;
    if (tiers[nextTier] === current) {
      console.log("this");
      console.log("");
      setPrintClauses(getPrint(current));
    }
    const tier = tiers[nextTier];

    const nextList = allClauses.reduce((acc, cl) => {
      if (tier === "tier3") {
        if (selectedTiers.tier2 !== cl.tier2) return acc;
      }
      if (tier === "tier4") {
        if (
          selectedTiers.tier2 !== cl.tier2 ||
          selectedTiers.tier3 !== cl.tier3
        )
          return acc;
      }
      if (!acc.includes(cl[tier])) {
        acc.push(cl[tier]);
      }
      return acc;
    }, []);
    console.log("but why", nextList, selectedTiers, allClauses, tier);
    setCurrent(tier);

    if (!nextList.length || (nextList.length === 1 && nextList[0] === "")) {
      //   if (nextList?.[0] === "") {
      //     setUseClauses(nextList);
      //   }
      setPrintClauses(getPrint(current));
    } else {
      setUseClauses(nextList);
    }
  };

  useEffect(() => {
    if (selected?.length > 1) onSelectNext();
  }, [selected]);

  useEffect(() => {
    if (!useClauses.length) setUseClauses(clauses);
  }, [clauses]);

  console.log(printClauses);

  return (
    <>
      <Nav>
        {selectedTiers.tier2.length > 0 ? (
          <>
            Selected: {selectedTiers.tier1} / {selectedTiers.tier2}{" "}
            {selectedTiers.tier3.length > 0 && (
              <span> / {selectedTiers.tier3}</span>
            )}{" "}
            {selectedTiers.tier4.length > 0 && (
              <span> / {selectedTiers.tier4}</span>
            )}
          </>
        ) : (
          <div></div>
        )}
      </Nav>
      <Wrapper>
        <StyledDD>
          {useClauses.map((c) => {
            return (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedTiers({ ...selectedTiers, [current]: c });
                  SetSelected(c);
                }}
              >
                <FontAwesomeIcon
                  icon={c === selected ? faCircle : circle}
                  style={{ marginRight: "12px", cursor: "pointer" }}
                />
                {c}
              </li>
            );
          })}
        </StyledDD>
        <RightCol>
          {printClauses?.length ? (
            printClauses.map((cl) => {
              return <ClauseWrapper>{cl.clauses}</ClauseWrapper>;
            })
          ) : (
            <div />
          )}
        </RightCol>
      </Wrapper>
    </>
  );
};
