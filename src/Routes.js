import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login";
import LayoutPage from "./component/layout";
import StudentList from "./component/studentList";
import DetailCard from "./component/detail";
import Overview from "./pages/overview";
import Students from "./pages/students";

const RoutesTree = (user = null) => {
  function PrivateRoute({ user, redirectPath = "/login" }) {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  }

  const element = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <PrivateRoute user={user} />,
      children: [
        {
          path: "dashboard/manager",
          element: <LayoutPage />,
          children: [
            {
              path: "",
              key: "Overview",
              element: <Overview />,
            },
            {
              path: "students",
              key: "Student",
              element: <Students />,
              children: [
                {
                  path: "",
                  key: "Student List",
                  element: <StudentList />,
                },
                {
                  path: ":id",
                  element: <DetailCard />,
                },
              ],
            },
            {
              path: "teachers",
              key: "Teacher",
              children: [
                {
                  path: "",
                  key: "Teacher List",
                },
                {
                  path: ":id",
                },
              ],
            },
            {
              path: "courses",
              key: "Course",
              children: [
                {
                  path: "",
                  key: "All Courses",
                },
                {
                  path: ":id",
                },
                {
                  path: "add-course",
                  key: "Add Course",
                },
                {
                  path: "edit-course",
                  key: "Edit Course",
                },
              ],
            },
            {
              path: "message",
              key: "Message",
            },
          ],
        },
      ],
    },
  ];

  return element;
};
export default RoutesTree;