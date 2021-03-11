import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getToken } from "../api";

function ImportPage() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      async function doIt() {
        const token = await getToken("admin", "admin");
        const response = await fetch("/api/timetable/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          await response.json();
          navigate("/");
        }
      }
      doIt();
    },
    [navigate]
  );

  return (
    <div className="vw-100 vh-100 flex items-center justify-center">
      <form name="upload" onSubmit={handleSubmit}>
        <div className="mb3 flex flex-column">
          <label className="db mb1 b" htmlFor="week">
            Week
          </label>
          <input className="flex-auto" type="week" id="week" name="week" />
        </div>
        <div className="mb3">
          <label className="db mb1 b" htmlFor="file">
            File
          </label>
          <input type="file" id="file" name="file" />
        </div>
        <div className="mb3 flex flex-column">
          <input
            className="flex-auto pv2 ph3 ba br2 b--dark-green bg-green white b mb3 "
            type="submit"
            value="Upload"
          />
          <Link
            className="flex-auto db w-100 link near-black pv2 ph3 ba br2 b--silver bg-near-white tc"
            to="/"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ImportPage;
