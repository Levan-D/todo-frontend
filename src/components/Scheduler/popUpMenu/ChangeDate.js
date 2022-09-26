import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./popUpMenu.css";
import { ADD_DATE_LIST } from "../todoSlice";
import { resetState, setCalendarMenu } from "./popupMenuSlice";
import Calendar from "react-calendar";
import { POPUPVISIBILITY } from "../indexingSlice";

const ChangeDate = () => {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);
  const subMenu = useSelector((store) => store.subMenu.data);
  const [calendarPick, setCalendarPick] = useState(new Date());
  useEffect(() => {
    if (subMenu.confCalM) {
      dispatch(
        ADD_DATE_LIST({
          index: indexingData.listIndex,
          newData: `${calendarPick.yyyymmdd()} `,
        })
      );
      dispatch(resetState());
      dispatch(POPUPVISIBILITY(false));
    }
  }, [calendarPick]);

  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ]
      .join("/")
      .substr(2);
  };

  return (
    <>
      <div
        className="confirmTab confirmTabAd"
        style={{
          height: `auto`,
          padding: `10px 0px`,
          width: `auto`,
        }}
      >
        <div>
          <div
            className="todaysDateButton"
            onClick={() => {
              dispatch(
                ADD_DATE_LIST({
                  index: indexingData.listIndex,
                  newData: `${new Date().yyyymmdd()} `,
                })
              );
              dispatch(resetState());
              dispatch(POPUPVISIBILITY(false));
            }}
          >
            Add today's date
          </div>

          <div
            className="pickDateButton"
            onClick={() => {
              dispatch(setCalendarMenu(!subMenu.confCalM));
            }}
          >
            Pick a date
          </div>
          <div
            className="clearDateButton"
            onClick={() => {
              dispatch(
                ADD_DATE_LIST({
                  index: indexingData.listIndex,
                  newData: ``,
                })
              );
              dispatch(resetState());
              dispatch(POPUPVISIBILITY(false));
            }}
          >
            Clear Date
          </div>
          {subMenu.confCalM && (
            <div className="calendar">
              <Calendar onChange={setCalendarPick} value={calendarPick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeDate;