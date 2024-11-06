import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { MdKeyboardArrowUp } from "@react-icons/all-files/md/MdKeyboardArrowUp";
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown";
import moment from "moment";
import CommonIcons from "../icons/editAndDeleteIcons";
import TodoModal from "../TodoModal";
import { server } from "../../../../utils/baseUrl";
import "../../../common/modal/modal.scss";
import "./byKeywords.scss";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";

export const timeByDuration = ({ time, value }) => {
  return moment(time, "YYYYMMDDhhmm").fromNow().indexOf(value) > 1;
};

const TodoItemByKeywords = (props) => {
  const apiBaseUrl = useBaseUrl();
  const [dataModal, setDataModal] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

   // Initialize all groups as minimized by default
   const [expandedGroups, setExpandedGroups] = useState(
    Object.fromEntries(props.data.map((group) => [group[0], true]))
  );

  // Toggle expand/minimize for each group by tag name
  const toggleGroup = (tag) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [tag]: !prevState[tag], // Toggle the current group
    }));
  };

  // open/close modal
  const CloseOrOpenModal = () => {
    setShowModal(!showModal);
  };

  // view single item
  const onClickViewOneItem = (id) => {
    setLoading(true);
    setShowModal(!showModal);
    server.get(`${apiBaseUrl}/todo/${id}`).then((item) => {
      setLoading(false);
      return setDataModal(item.data.data);
    });
  };

  const cleanAndTruncateHTML = (html, maxLength = 200) => {
    const plainText = html.replace(/<p><br\s*\/?><\/p>/g, "").trim();
    return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
  };

  const IconsWithTodoName = (prop) => (
    <Flex className="todo" alignItems="center" borderBottom="0.2px solid" borderColor="blue.100" w="100%">
      <CommonIcons
        data={prop.data}
        complete={prop.complete}
        editTodoItem={prop.editTodoItem}
        deleteTodoItem={prop.deleteTodoItem}
        id={prop.id}
        viewTodoItem={onClickViewOneItem}
      />
      <Box
        bg="inherit"
        m={0}
        cursor="pointer"
        fontSize="initial"
        fontFamily="IBM Plex Mono"
        onClick={() => onClickViewOneItem(prop.data?.id)}
        dangerouslySetInnerHTML={{ __html: cleanAndTruncateHTML(prop.data?.name) }}
      />
    </Flex>
  );

  return (
    <Box>
      <Box className="groupedTodo">
        {/* Group Title with Toggle */}
        <Flex
          justify="space-between"
          align="center"
          onClick={() => toggleGroup(props.data[0])} // Toggle expand/minimize
          className="groupedTodoTitle"
          cursor="pointer"
          py={1}
        >
          <Flex alignItems="center">
            <Text mb={0} fontWeight={500} mr={1} fontSize="xs">
              {props.data[1].length > 3 ? props.data[1].length : " "}
            </Text>{" "}
            <Text mb={0}>{props.data[0]}</Text>
          </Flex>
          <Button size="xs" variant="link" colorScheme="blue">
            {expandedGroups[props.data[0]] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </Button>
        </Flex>

        {/* Conditionally render group content based on expand/collapse state */}
        {!expandedGroups[props.data[0]] && (
          <ul className="GroupedTodoTextWrapper">
            {props.data[1].map((data) => (
              <li key={data._id} style={{ alignItems: "center", marginBottom: 0 }}>
                <IconsWithTodoName
                  data={data}
                  complete={props.complete}
                  editTodoItem={props.editTodoItem}
                  deleteTodoItem={props.deleteTodoItem}
                  id={data._id}
                />
              </li>
            ))}
          </ul>
        )}
      </Box>

      {/* modal */}
      {showModal && (
        <TodoModal
          data={dataModal}
          loading={loading}
          CloseOrOpenModal={CloseOrOpenModal}
          showModal={showModal}
          complete={props.complete}
          id={props.id}
          editTodoItem={props.editTodoItem}
          deleteTodoItem={props.deleteTodoItem}
        />
      )}
    </Box>
  );
};

export default TodoItemByKeywords;
