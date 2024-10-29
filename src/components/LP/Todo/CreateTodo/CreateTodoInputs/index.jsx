import React from "react"
import Plus from "../../../../../images/icons/plus.svg"
import PropTypes from "prop-types"
import { AddTodoButton, InputWithLabel } from "../../../../common"

const CreateTodoInputs = ({onClickAddTodoButton, form, onInputChange, loading}) => {
  return (
    <div>
      <InputWithLabel
        type="text"
        placeholder="Keyword"
        name="tags"
        value={form.tags}
        onchange={onInputChange}
      />
      <InputWithLabel
        type="text"
        placeholder="Todo Item"
        name="name"
        value={form.name}
        onchange={onInputChange}
      />

      {/* time details */}
      {/* <div className="timeDurationWrapper">
        <div className="timeWrapper">
          <div className="time">
            <InputWithLabel
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
            <InputWithLabel
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
      </div> */}

      {/* check box */}
      {/* remind me to start and end task */}

      {/* submit button */}
      <AddTodoButton
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

CreateTodoInputs.propTypes = {
  onClickAddTodoButton: PropTypes.func,
  form: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  onInputChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default CreateTodoInputs
