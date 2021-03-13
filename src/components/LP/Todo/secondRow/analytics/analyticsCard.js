import React, { useState, useEffect } from "react"
import axios from "axios"
import Cards from "../../card"
import "./analytics.scss"
import { Loader } from "../../../../common/loader"
import AnalyticsChartCard from "./analyticsChartCard"

function AnalyticsCard(props) {
  const [analytics, setAnalytics] = useState({})

  // analytics data
  useEffect(() => {
    axios.get(`${props.apiBaseUrl}/analytics/todo`, props.headers).then(analytics => {
      setAnalytics({
        totalItems: analytics.data.totalItems,
        todo: analytics.data.todo,
        analyticsLoader: false,
      })
    })
  }, [])

  return (
    <div>
      {analytics.totalItems >= 1 && (
        <>
          <br />
          <Cards title="Analytics">
            <div className="analyticsData">
              {analytics.analyticsLoader ? (
                <Loader />
              ) : (
                <div>
                  <div>
                    <center>
                      <h1>{analytics.totalItems} Total Tasks</h1>
                    </center>
                  </div>
                  {(analytics.todo.totalTodo > 0 ||
                    analytics.todo.todoActive > 0) && (
                    <hr className="tabHeaderHR" />
                  )}

                  <div className="analyticsTotalItemsTitle">
                    {props?.ongoingData?.length > 0 && (
                      <h4>
                        {props?.ongoingData?.length} Ongoing
                      </h4>
                    )}
                    {props?.completedData?.length > 0 && (
                      <h4>
                        {props?.completedData?.length} Completed
                      </h4>
                    )}
                  </div>

                  {(analytics.todo.totalArchived > 0 ||
                    analytics.todo.dailyArchived > 0) && (
                      <hr className="tabHeaderHR" />
                    )}

                  <div className="analyticsTotalItemsTitle">
                    {analytics?.todo?.totalArchived > 0 && (
                      <p>{analytics?.todo?.totalArchived} Archived(total)</p>
                    )}
                    {analytics?.todo?.dailyArchived > 0 && (
                      <>
                        <b>|</b>
                        <p>
                          {analytics?.todo?.dailyArchived} Archived in 24
                          hours
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Cards>
          {analytics.totalItems > 1 && (
            <AnalyticsChartCard 
              data={analytics.todo} 
              ongoingTodo={props.ongoingData} 
              completedTodo={props.completedData}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AnalyticsCard
