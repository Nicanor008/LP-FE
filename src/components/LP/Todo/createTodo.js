import React from "react"
import Input from "../../common/inputs/input"
import Button from "../../common/buttons/button"
import Plus from "../../../images/icons/plus.svg"

const CreateTodoInputs = ({onClickAddTodoButton, form, onInputChange, loading}) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Keyword"
        name="tags"
        value={form.tags}
        onchange={onInputChange}
      />
      <Input
        type="text"
        placeholder="Todo Item"
        name="name"
        value={form.name}
        onchange={onInputChange}
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
              value={form.startTime}
              onchange={onInputChange}
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
              value={form.endTime}
              onchange={onInputChange}
            />
          </div>
          &nbsp;&nbsp;
        </div>
        <div>
          {form.duration !== "" && (
            <>
              <span>Duration</span>
              <br />
              <p style={{ paddingTop: "0.8rem" }} id="duration">
                {form.duration}
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
        onclick={onClickAddTodoButton}
        icon={Plus}
        loading={loading}
      />
      <br />
    </div>
  )
}

export default CreateTodoInputs
