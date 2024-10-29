import React, { useState } from 'react'
import CreateTodoInputs from "../CreateTodoInputs"
import Tabs from "../../tabs"
import { useBaseUrl } from "../../../../../hooks/useBaseUrl"
import WriteSmall from "../../../../../images/icons/write-small.svg"
import { server } from '../../../../../utils/baseUrl'
import { Box } from '@chakra-ui/react'

const CreateTodo = ({ form, setState }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const apiBaseUrl = useBaseUrl()
   
  // submit todo
  const onClickAddTodoButton = e => {
    e.preventDefault()
    setCreateLoading(true)
    try {
      server
        .post(`${apiBaseUrl}/todo`, form)
        .then(function (response) {
          setState({
            ...form,
            category: "",
            tags: "",
            name: "",
            startTime: "",
            endTime: "",
            newDataAdded: !form.newDataAdded,
          })
          setCreateLoading(false)
        })
        .catch(function (error) {
          alert(error?.response?.data?.message)
          setCreateLoading(false)
        })
    } catch (e) {
      alert(e?.response?.data?.message)
      setCreateLoading(false)
    }
  }

  // close create todo body
  const onClickArrowOnCreateTodo = e => {
      if (typeof window !== "undefined") {
          sessionStorage.setItem("showCreateTodo", !form.showCreateTodo)
          if (form.showCreateTodo === undefined) {
          return setState({
              ...form,
              showCreateTodo: false,
          })
      }
      return setState({
      ...form,
      showCreateTodo: !form.showCreateTodo,
      })
    }
  }

  // on change event
  const onInputChange = e => {
      setState({
        ...form,
        [e.target.name]: e.target.value,
      })
    }

  return (
    <Box mt={[1, 4]} className="FirstRowCreateTodo">
      <Tabs
        todoTitleIcon={WriteSmall}
        title="Write Todo"
        showBody={
        form.showCreateTodo === undefined
            ? true
            : form.showCreateTodo
        }
        onClickArrow={onClickArrowOnCreateTodo}
      >
        <CreateTodoInputs
          onClickAddTodoButton={onClickAddTodoButton}
          form={form}
          onInputChange={onInputChange}
          loading={createLoading}
        />
      </Tabs>
    </Box>
  )
}

export default CreateTodo
