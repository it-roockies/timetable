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
    teachers: getData(teachers),
    subjects: getData(subjects),
    classrooms: getData(classrooms),
    groups: getData(groups),
  });
}

function DataProvider({ children }) {
  const [state, setState] = useState({
    teachers: {},
    subjects: {},
    classrooms: {},
    groups: {},
  });

  useEffect(() => {
    fetchData(setState);
  }, []);

  return (
    <CacheContext.Provider value={state}>{children}</CacheContext.Provider>
  );
}

export { CacheContext, DataProvider as default };
