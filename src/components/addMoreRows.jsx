import { useState } from "react";
import styled from "styled-components";
import { insertInto } from "../api/api";

const ModalBody = styled.div`
  margin: 0;
  padding: 12px;

  legend {
    text-align: left;
    padding-left: 3rem;
  }
  .pure-control-group {
    margin-bottom: 1rem;
  }
  label {
    padding-right: 2rem;
  }

  input[type="text"],
  textarea {
    width: 30rem;
  }
`;

export const AddMoreRows = ({ setModalOpen, refreshClauses }) => {
  const [tier1] = useState("Clauses");
  const [tier2, setTier2] = useState("");
  const [tier3, setTier3] = useState("");
  const [tier4, setTier4] = useState("");
  const [clause, setClause] = useState("");
  const [confirm, setConfirm] = useState(false);

  const onSubmit = async () => {
    setConfirm(false);
    if (tier1 && tier2 && clause) {
      const res = await insertInto({ tier1, tier2, tier3, tier4, clause });
      if (res !== "error") {
        refreshClauses();
        setModalOpen(false);
      } else {
        alert("error writing to mysql database");
      }
    } else {
      alert("You need at least tier2 and a clause filled out");
    }
  };

  return (
    <ModalBody>
      <form className="pure-form">
        <fieldset>
          <legend>Enter your new Tiers and Clauses here: </legend>
          <div className="pure-control-group">
            <label htmlFor="aligned-tier1">Tier 1</label>
            <input
              value={tier1}
              type="text"
              id="aligned-tier1"
              placeholder="Tier 1"
              disabled
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-tier1">Tier 2</label>
            <input
              value={tier2}
              type="text"
              id="aligned-tier1"
              placeholder="Tier 2"
              onChange={(e) => setTier2(e.target.value)}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-tier1">Tier 3</label>
            <input
              value={tier3}
              type="text"
              id="aligned-tier1"
              placeholder="Tier 3"
              onChange={(e) => setTier3(e.target.value)}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-tier1">Tier 4</label>
            <input
              value={tier4}
              type="text"
              id="aligned-tier1"
              placeholder="Tier 4"
              onChange={(e) => setTier4(e.target.value)}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="aligned-tier1">Clause</label>
            <textarea
              value={clause}
              type="text"
              id="aligned-tier1"
              placeholder="Clause..."
              rows="6"
              onChange={(e) => setClause(e.target.value)}
            />
          </div>
          <div className="pure-controls">
            <label htmlFor="aligned-cb" className="pure-checkbox">
              <input
                onChange={() => setConfirm(!confirm)}
                type="checkbox"
                id="aligned-cb"
                checked={confirm}
              />{" "}
              Are you sure you want to upload these tiers and clause?
            </label>
            <button
              type="submit"
              className="pure-button pure-button-primary"
              disabled={!confirm}
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </ModalBody>
  );
};
