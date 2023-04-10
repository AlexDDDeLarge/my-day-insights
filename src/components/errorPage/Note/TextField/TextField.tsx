import React from "react";

type PropsType = {
  question: string,
  fieldValue: string,
  register: any,
  name: "importantOccasion" | "theDayGoodThings" | "insights",
  errors: any,
  editMode: boolean
}

const TextField: React.FC<PropsType> = ({
  question, fieldValue, register, name, errors, editMode
}) => {
  return (
    <div>
      <h2 className="question">{question}</h2>
      {(!fieldValue || editMode) ? (<>
        <textarea defaultValue="" {...register(name, { required: "This is required." })} id=""></textarea>
        <p>{errors[name]?.message}</p>
      </>)
      : <p>{fieldValue}</p>}
    </div>
  )
}

export default TextField;

{/* <h2 className="importantOccasion Question">What important thing happened today?</h2>
{!importantOccasion ? (<>
  <textarea defaultValue="" {...register("importantOccasion", { required: "This is required." })} id=""></textarea>
  <p>{errors.importantOccasion?.message}</p>
</>)
: <p>{importantOccasion}</p>}


<h2 className="theDayGoodThings Question">What good thing happened today?</h2>
{!theDayGoodThings ? (<>
  <textarea defaultValue="" {...register("theDayGoodThings", {required: "This is required."})} id=""></textarea>
  <p>{errors.theDayGoodThings?.message}</p>
</>)
: <p>{theDayGoodThings}</p>}


<h2 className="insights Question">What insights do you have today?</h2>
{!insights ? (<>
  <textarea defaultValue="" {...register("insights", {required: "This is required."})} id=""></textarea>
  <p>{errors.insights?.message}</p>
</>)
: <p>{insights}</p>} */}