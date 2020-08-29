import React from "react"
import Cards from "../../card"
import "./analytics.scss"
import { Loader } from "../../../../common/loader"
import AnalyticsChartCard from "./analyticsChartCard"

function AnalyticsCard(props) {
  return (
    <div>
      {props.analytics.totalItems >= 1 && (
        <>
          <br />
          <Cards title="Analytics">
            <div className="analyticsData">
              {props.analytics.analyticsLoader ? (
                <Loader />
              ) : (
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
                      <h4>
                        {props.analytics.todo.totalUncompletedTodo} Ongoing
                      </h4>
                    )}
                    {props.analytics.todo.totalCompletedTodo > 0 && (
                      <h4>
                        {props.analytics.todo.totalCompletedTodo} Completed
                      </h4>
                    )}
                  </div>
                  <hr className="tabHeaderHR" />
                  <div className="analyticsTotalItemsTitle">
                    {props.analytics.todo.totalArchived && (
                      <p>{props.analytics.todo.totalArchived} Total Archived</p>
                    )}
                    <b>|</b>
                    {props.analytics.todo.dailyArchived && (
                      <p>
                        {props.analytics.todo.dailyArchived} Archived in 24
                        hours
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Cards>
          {props.analytics.totalItems > 1 && (
            <AnalyticsChartCard data={props.analytics.todo} />
          )}
        </>
      )}
    </div>
  )
}

export default AnalyticsCard
