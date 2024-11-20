import { Flex, useBreakpointValue } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import moment from 'moment';
import Cards from "../../card"
import "./analytics.scss"
import { Loader } from "../../../../common"
import AnalyticsChartCard from "./analyticsChartCard"
import { server } from "../../../../../utils/baseUrl"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"

function AnalyticsCard({ updateAnalytics }) {
  const [analytics, setAnalytics] = useState({})
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const apiBaseUrl = useBaseUrl()
  const isMobile = useBreakpointValue({ base: true, md: false });

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

      server.get(`${apiBaseUrl}/todo/ongoing`).then((tt) => setInProgressTasks(tt.data?.data))
      server.get(`${apiBaseUrl}/todo/complete`).then((complete) => {
        const now = moment();

        const filteredData = complete?.data?.data?.filter((todo) =>
          moment(todo.updatedAt).isAfter(now.clone().subtract(24, 'hours'))
        )

        return setCompletedTasks(filteredData)
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
  }, [updateAnalytics])

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

                  <Flex className="analyticsTotalItemsTitle" flexDir={["column", "row"]}>
                    {(analytics?.todo?.totalUncompletedTodo > 0 || inProgressTasks.length > 0) && (
                      <h4>
                        {inProgressTasks.length ?? analytics?.todo?.totalUncompletedTodo} Ongoing
                      </h4>
                    )}
                    {analytics?.todo?.totalCompletedTodo > 0 && (
                      <h4>
                        {analytics?.todo?.totalCompletedTodo} Completed
                      </h4>
                    )}
                  </Flex>

                  {(analytics.todo.totalArchived > 0) && (
                      <hr className="tabHeaderHR" />
                    )}

                  <div className="analyticsTotalItemsTitle">
                    {analytics?.todo?.totalArchived > 0 && (
                      <p>{analytics?.todo?.totalArchived} Archived(total)</p>
                    )}
                    {/* {analytics?.todo?.dailyArchived > 0 && (
                      <>
                        <b>|</b>
                        <p>
                          {analytics?.todo?.dailyArchived} Archived in 24
                          hours
                        </p>
                      </>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </Cards>
          {analytics.totalItems > 1 && !isMobile && (
            <AnalyticsChartCard
              data={analytics.todo}
              ongoingTodo={inProgressTasks?.length ?? analytics?.todo?.totalUncompletedTodo} 
              completedTodo={completedTasks?.length ?? analytics?.todo?.totalCompletedTodo}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AnalyticsCard
