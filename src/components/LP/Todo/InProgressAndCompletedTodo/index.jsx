import { Box } from '@chakra-ui/react'
import React from 'react'
import { useBaseUrl } from "../../../../hooks/useBaseUrl"
import { server } from "../../../../utils/baseUrl"
import { CompletedTodo } from "../Completed"
import { InProgress } from "../InProgress"

const InProgressAndCompletedTodo = ({
    form,
    setState,
}) => {
    const apiBaseUrl = useBaseUrl()
    // edit/update todo item - mark as done and undone
    const editTodoItem = props => {
        setState({ ...form, loading: true, analytics: { analyticsLoader: true } })
        server
            .patch(
                `${apiBaseUrl}/todo/status/${props.id}`,
                {
                completed: props.complete,
                }
            )
            .then(() => {
                setState({
                    ...form,
                    newDataAdded: !form.newDataAdded,
                    newCompletedData: !form.newCompletedData,
                    loading: false,
                })
            })
            .catch(e => {
                alert(e.response.data.message)
            })
    }

    // delete todo
    const deleteTodoItem = props => {
        server
            .patch(
                `${apiBaseUrl}/todo/archive/${props.id}`,
                { archived: false }
            )
            .then(async () => {
                if (props.complete) {
                setState({
                    ...form,
                    newCompletedData: !form.newCompletedData,
                })
                } else {
                setState({
                    ...form,
                    newDataAdded: !form.newDataAdded,
                })
                }
            })
            .catch(e => {
                alert(e.response.data.message)
            })
    }

    return (
        <Box>
            {/* ongoing todo */}
            <InProgress
                form={form}
                deleteTodoItem={deleteTodoItem}
                editTodoItem={editTodoItem}
                setState={setState}
            />

            {/* completed todo */}
            <CompletedTodo
            form={form}
            deleteTodoItem={deleteTodoItem}
            editTodoItem={editTodoItem}
            setState={setState}
            />
        </Box>
    )
}

export default InProgressAndCompletedTodo
