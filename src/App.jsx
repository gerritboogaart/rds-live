import { useState } from "react";
import "./App.css";
import { getClauses } from "./api/api";
import { useEffect } from "react";
import { Dropdowns } from "./components/dropdowns";
import styled from "styled-components";
import { AddMoreRows } from "./components/addMoreRows";
import { MainDropdown } from "./components/mainDropdown";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 1px;
  z-index: 3;
  opacity: 0.7;
  background-color: #514545;
`;

const Modal = styled.div`
  position: absolute;
  left: 20%;
  top: 10%;
  height: 32rem;
  width: 75rem;
  border: 1px solid #bcacac;
  z-index: 10;
  background-color: white;
`;

function App() {
  const [clauses, setClauses] = useState([]);
  const [start, setStart] = useState([]);
  const [modalopen, setModalOpen] = useState(false);

  const cls = JSON.parse(localStorage.getItem("clauses"));

  useEffect(() => {
    if (!cls) {
      refreshClauses();
    } else if (!clauses.length) {
      const s = cls.reduce((acc, cl) => {
        if (!acc.includes(cl.tier2)) {
          acc.push(cl.tier2);
        }
        return acc;
      }, []);
      setStart(s);
      setClauses(cls);
    }
  }, [cls, clauses]);

  const refreshClauses = () => {
    getClauses().then((res) => {
      const json = JSON.stringify(res.data);
      localStorage.setItem("clauses", json);
      setClauses(res.data);
    });
  };

  return (
    <div className="App">
      <p>Select your options and see the results below</p>
      {/* <Dropdowns
        clauses={clauses}
        setClauses={setClauses}
        setModalOpen={setModalOpen}
      /> */}
      {clauses && start && (
        <MainDropdown clauses={start} allClauses={clauses} />
      )}
      {modalopen && <Wrapper onClick={() => setModalOpen(false)} />}
      {modalopen && (
        <Modal>
          <AddMoreRows
            setModalOpen={setModalOpen}
            refreshClauses={refreshClauses}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
