import React, { useState, useEffect } from "react"
import Cards from "../../card"
import "./analytics.scss"
import { Loader } from "../../../../common"
import AnalyticsChartCard from "./analyticsChartCard"
import { server } from "../../../../../utils/baseUrl"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"

function AnalyticsCard() {
  const [analytics, setAnalytics] = useState({})
  const apiBaseUrl = useBaseUrl()

  // analytics data
  useEffect(() => {
    try {
      server.get(`${apiBaseUrl}/todo/analytics/todo`).then(analytics => {
        setAnalytics({
          totalItems: analytics.data.totalItems,
          todo: analytics.data.todo,
          analyticsLoader: false,
        })
      })
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of 2xx range
        console.error('Error Response:', error.response?.status, error.response?.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error Request:', error.request);
      } else {
        // Something else happened
        console.error('Error Message:', error.message);
      }
    }
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
                  {(analytics?.todo?.totalUncompletedTodo > 0 ||
                    analytics?.todo?.totalCompletedTodo > 0) && (
                    <hr className="tabHeaderHR" />
                  )}

                  <div className="analyticsTotalItemsTitle">
                    {analytics?.todo?.totalUncompletedTodo > 0 && (
                      <h4>
                        {analytics?.todo?.totalUncompletedTodo} Ongoing
                      </h4>
                    )}
                    {analytics?.todo?.totalCompletedTodo > 0 && (
                      <h4>
                        {analytics?.todo?.totalCompletedTodo} Completed
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
              ongoingTodo={analytics?.todo?.totalUncompletedTodo} 
              completedTodo={analytics?.todo?.totalCompletedTodo}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AnalyticsCard
