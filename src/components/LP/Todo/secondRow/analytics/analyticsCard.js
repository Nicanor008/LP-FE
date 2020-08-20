import React from "react"
import Cards from "../../card"
import "./analytics.scss"
import { Loader } from "../../../../common/loader"

function AnalyticsCard(props) {
  return (
    <div>
      <br />
      <br />
      {/* <Link
        style={{ float: "right", color: "blue", fontFamily: "Roboto" }}
        to="/"
      >
        Learn How We calculate Analytics
      </Link> */}
      <br />
      <Cards>
        <div className="analyticsData">
          {props.analytics.analyticsLoader ? (
            <Loader />
          ) : (
            props.analytics.totalItems >= 1 && (
              <div>
                <div>
                  <center>
                    <h1>{props.analytics.totalItems} Total Tasks</h1>
                  </center>
                </div>
                {(props.analytics.todo.totalTodo > 0 ||
                  props.analytics.todo.todoActive > 0) && (
                  <hr className="tabHeaderHR" />
                )}
                <div className="analyticsTotalItemsTitle">
                  {props.analytics.todo.totalTodo > 0 && (
                    <h3>{props.analytics.todo.totalTodo} Total Todo</h3>
                  )}
                  {props.analytics.todo.todoActive > 0 && (
                    <h3>{props.analytics.todo.todoActive} Active Todo</h3>
                  )}
                </div>

                {(props.analytics.todo.totalUncompletedTodo > 0 ||
                  props.analytics.todo.totalCompletedTodo) && (
                  <hr className="tabHeaderHR" />
                )}

                <div className="analyticsTotalItemsTitle">
                  {props.analytics.todo.totalUncompletedTodo > 0 && (
                    <h4>{props.analytics.todo.totalUncompletedTodo} Ongoing</h4>
                  )}
                  {props.analytics.todo.totalCompletedTodo > 0 && (
                    <h4>{props.analytics.todo.totalCompletedTodo} Completed</h4>
                  )}
                </div>

                {console.log(">>>>>>>>>>>>....", props.analytics.todo)}

                {props.analytics.todo.totalArchived > 0 && (
                  <>
                    <hr className="tabHeaderHR" />
                    <div>
                      <center>
                        <p>{props.analytics.todo.totalArchived} Archived</p>
                      </center>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </Cards>
    </div>
  )
}

export default AnalyticsCard
