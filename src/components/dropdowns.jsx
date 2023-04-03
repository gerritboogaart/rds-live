import { useState } from "react";
import styled from "styled-components";

const DS = ["tier1", "tier2", "tier3", "tier4"];

const ResultWrapper = styled.div`
  height: 10rem;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem auto;
  border: 1px solid #8f9caf;
  width: 80%;
  box-shadow: #cccedb 4px 4px 16px;
  overflow: auto;

  li {
    list-style: none;
    border-bottom: 1px solid lightgrey;
  }
`;

const DDWrapper = styled.div`
  display: flex;
  gap: 1rem;

  .list-wrapper {
    min-width: 20rem;
  }

  .pure-menu-list {
    width: 75%;
    max-height: 15rem;
    height: 15rem;
    margin: auto;
    border: 1px solid lightgrey;
    overflow: auto;
  }
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  left: 5rem;
  top: 2rem;
  width: 20rem;
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  border: 1px solid lightgrey;
  margin-bottom: 1rem;
  width: 14rem;
  padding: 5px;
  font-size: 12px;
`;

const NoSearchInput = styled.div`
  width: 8rem;
  height: 46px;
  font-size: 12px;
`;

export const Dropdowns = ({ clauses, setClauses, setModalOpen }) => {
  const [tier1, setTier1] = useState("Clauses");
  const [tier2, setTier2] = useState("");
  const [tier3, setTier3] = useState("");
  const [tier4, setTier4] = useState("");

  const [tier2s, setTier2s] = useState("");
  const [tier3s, setTier3s] = useState("");
  const [tier4s, setTier4s] = useState("");

  const [result, setResult] = useState("");

  const findTrue = (el, set) => {
    if (el === "tier3" && set) {
      if (set.tier1 === tier1 && set.tier2 === tier2) return true;
    }
    if (el === "tier4") {
      if (set.tier1 === tier1 && set.tier2 === tier2 && set.tier3 === tier3)
        return true;
    }
  };

  const ds = (name, setF, tier, child, search, setSearch) => {
    if (!child) return <div />;
    const list = clauses.reduce((acc, set) => {
      if (!acc.includes(set[name])) {
        if (name === "tier1" || name === "tier2" || findTrue(name, set))
          acc.push(set[name]);
      }
      return acc;
    }, []);

    if (!result?.length && !list[0]?.length) {
      setResult(
        clauses.filter(
          (e) =>
            e.tier1 === tier1 &&
            e.tier2 === tier2 &&
            e.tier3 === tier3 &&
            e.tier4 === tier4
        )
      );
      return <div />;
    }

    if (!list[0]?.length) return <div />;

    return (
      <div className="list-wrapper">
        {name !== "tier1" && (
          <SearchInput
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`search ${name}`}
          ></SearchInput>
        )}
        {name === "tier1" && <NoSearchInput>Tier 1:</NoSearchInput>}
        <ul className="pure-menu-list">
          {list.map((e, i) => {
            if (search && search.length > 0 && !e.includes(search))
              return undefined;
            const selected = tier === e ? "dropdown-selected" : "";
            return (
              <div
                key={"div" + e + i}
                className="pure-menu pure-menu-scrollable custom-restricted"
              >
                <li
                  key={"li" + e + i}
                  className="pure-menu-item"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    key={"div2" + e + i}
                    onClick={() => {
                      if (name !== DS[0] && tier === e) {
                        setF("");
                        setResult("");
                        if (name === "tier2") {
                          setTier3("");
                          setTier4("");
                        }
                        if (name === "tier3") {
                          setTier4("");
                        }
                      } else {
                        setF(e);
                        if (name === "tier2") {
                          setTier3("");
                          setTier4("");
                        }
                        if (name === "tier3") {
                          setTier4("");
                        }
                        if (name === "tier4") {
                          const res = clauses.filter(
                            (c) =>
                              c.tier1 === tier1 &&
                              c.tier2 === tier2 &&
                              c.tier3 === tier3 &&
                              c.tier4 === e
                          );
                          const result = !res.length ? ["No Results"] : res;
                          setResult(result);
                        } else {
                          setResult("");
                        }
                      }
                    }}
                    className={`pure-menu-link ${selected}`}
                  >
                    {e}
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  const drawDSs = () => {
    const first = () => ds("tier1", setTier1, tier1, "Clauses");
    const second = () => ds("tier2", setTier2, tier2, tier1, tier2s, setTier2s);
    const third = () => ds("tier3", setTier3, tier3, tier2, tier3s, setTier3s);
    const fourth = () => ds("tier4", setTier4, tier4, tier3, tier4s, setTier4s);
    return [first(), second(), third(), fourth()];
  };

  if (!clauses?.length) return <div>no soup for you</div>;

  const resetSels = () => {
    setTier2("");
    setTier3("");
    setTier3("");
    setResult("");
  };

  return (
    <>
      <ButtonsWrapper>
        <button onClick={() => resetSels()} className="pure-button">
          Reset Selectors
        </button>
        <button onClick={() => resetSels()} className="pure-button">
          Reset Data
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="pure-button button-success"
        >
          Add More Data
        </button>
      </ButtonsWrapper>
      <DDWrapper>{drawDSs()}</DDWrapper>
      {result && (
        <ResultWrapper>
          {result.map((r, i) => (
            <li key={`clausid${i}`}>{r.clauses}</li>
          ))}
        </ResultWrapper>
      )}
    </>
  );
};
