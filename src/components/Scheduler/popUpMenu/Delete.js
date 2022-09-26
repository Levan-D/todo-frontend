import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./popUpMenu.css";
import { DELETE_LIST } from "../todoSlice";
import { POPUPVISIBILITY, CHANGE_LISTINDEX } from "../indexingSlice";
import { resetState } from "./popupMenuSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);

  return (
    <>
      <div className="confirmTab confirmTabAc">
        <div
          onClick={() => {
            if (todosRedux.length > 1) {
              if (indexingData.listIndex !== 0) {
                dispatch(CHANGE_LISTINDEX(indexingData.listIndex - 1));
              }
              dispatch(
                DELETE_LIST({
                  index: indexingData.listIndex,
                  zeName: todosRedux[indexingData.listIndex].listName,
                })
              );
            }
            dispatch(resetState());
            dispatch(POPUPVISIBILITY(false));
          }}
        >
          Confirm
        </div>
      </div>
    </>
  );
};

export default Delete;