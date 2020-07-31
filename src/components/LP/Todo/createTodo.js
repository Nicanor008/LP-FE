import React from "react"
import Input from "../../common/inputs/input"
import Button from "../../common/buttons/button"

const CreateTodoInputs = props => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Keyword"
        name="tags"
        value={props.form.keyword}
        onchange={props.onInputChange}
      />
      <Input
        type="text"
        placeholder="Todo Item"
        name="name"
        value={props.form.todo}
        onchange={props.onInputChange}
      />

      {/* time details */}
      <div className="timeDurationWrapper">
        <div className="timeWrapper">
          <div className="time">
            <Input
              type="time"
              name="startTime"
              id="startTime"
              labelClassName="startTime"
              labelName="Start Time"
              value={props.form.startTime}
              onchange={props.onInputChange}
            />
          </div>
          &nbsp;
          <div>
            <Input
              type="time"
              name="endTime"
              id="endTime"
              labelClassName="endTime"
              labelName="End Time"
              value={props.form.endTime}
              onchange={props.onInputChange}
            />
          </div>
          &nbsp;&nbsp;
        </div>
        <div>
          {props.form.duration !== "" && (
            <>
              <span>Duration</span>
              <br />
              <p style={{ paddingTop: "0.8rem" }} id="duration">
                {props.form.duration}
              </p>
            </>
          )}
        </div>
      </div>

      {/* check box */}
      {/* remind me to start and end task */}

      {/* submit button */}
      <Button
        name="Add Todo"
        classButtonName="button"
        onclick={props.onClickAddTodoButton}
      />
      <br />
    </div>
  )
}

export default CreateTodoInputs
