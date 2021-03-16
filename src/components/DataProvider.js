import { Loading } from "carbon-components-react";
import { createContext, useEffect, useState } from "react";
import {
  getGroups,
  getSubjects,
  getToken,
  getTeachers,
  getClassrooms,
} from "../api";

const CacheContext = createContext({
  teachers: {},
  subjects: {},
  classrooms: {},
  groups: {},
});

function getData(response) {
  const data = {};
  response.forEach((obj) => {
    data[obj.id] = obj;
  });
  return data;
}

async function fetchData(setState) {
  const token = await getToken("admin", "admin");

  const teachers = await getTeachers(token);
  const subjects = await getSubjects(token);
  const classrooms = await getClassrooms(token);
  const groups = await getGroups(token);

  setState({
    isLoading: false,
    teachers: getData(teachers),
    subjects: getData(subjects),
    classrooms: getData(classrooms),
    groups: getData(groups),
  });
}

function DataProvider({ children }) {
  const [state, setState] = useState({
    isLoading: true,
    teachers: {},
    subjects: {},
    classrooms: {},
    groups: {},
  });

  useEffect(() => {
    fetchData(setState);
  }, []);

  if (state.isLoading) {
    return <Loading description="Loading data..." />;
  }

  return (
    <CacheContext.Provider value={state}>{children}</CacheContext.Provider>
  );
}

export { CacheContext, DataProvider as default };
